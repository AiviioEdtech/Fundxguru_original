import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { chatQuestions, debtDetailKeys, debtDetailPurposes, loanTypeQuestions, type ChatQuestion } from "../src/data/chatbot";
import { generateRecommendation, type UserProfile } from "../src/utils/loan";

// Server-side only — the service role key bypasses RLS, which is exactly what
// this function needs (reading/writing session state, inserting leads). It is
// never bundled into the frontend; only ever read from process.env on Vercel.
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;
const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!;
const GRAPH_URL = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

interface Session {
  phone: string;
  step: number;
  profile: UserProfile;
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

// Same skip logic as the website chatbot: debt-detail questions only show up
// when the loan purpose actually needs them.
function getNextStep(currentStep: number, profile: UserProfile, questions: ChatQuestion[]): number {
  let next = currentStep + 1;
  const needsDebtDetails = debtDetailPurposes.includes(profile.purpose || "");
  while (next < questions.length) {
    if (debtDetailKeys.includes(questions[next].key) && !needsDebtDetails) {
      next += 1;
    } else {
      break;
    }
  }
  return next;
}

// Same dynamic question-list logic as the website chatbot (ChatbotEligibility.tsx):
// once "purpose" is known, splice in that loan type's extra follow-up questions.
function buildActiveQuestions(purpose: string | undefined): ChatQuestion[] {
  const list: ChatQuestion[] = [chatQuestions[0], chatQuestions[1]];
  if (purpose && loanTypeQuestions[purpose]) {
    list.push(...loanTypeQuestions[purpose]);
  }
  list.push(...chatQuestions.slice(2));
  return list;
}

async function sendText(to: string, body: string) {
  await fetch(GRAPH_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body } }),
  });
}

async function sendQuestion(to: string, question: (typeof chatQuestions)[number]) {
  if (question.type !== "choice" || !question.options) {
    await sendText(to, question.question);
    return;
  }

  const options = question.options;
  const useButtons = options.length <= 3 && options.every((o) => o.length <= 20);

  if (useButtons) {
    await fetch(GRAPH_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: question.question },
          action: {
            buttons: options.map((opt, i) => ({
              type: "reply",
              reply: { id: `opt_${i}`, title: truncate(opt, 20) },
            })),
          },
        },
      }),
    });
    return;
  }

  await fetch(GRAPH_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "list",
        body: { text: question.question },
        action: {
          button: "Choose",
          sections: [
            {
              title: "Options",
              rows: options.map((opt, i) => ({ id: `opt_${i}`, title: truncate(opt, 24) })),
            },
          ],
        },
      },
    }),
  });
}

async function getSession(phone: string): Promise<Session | null> {
  const { data } = await supabase.from("whatsapp_sessions").select("*").eq("phone", phone).maybeSingle();
  if (data) return { phone, step: data.step, profile: data.profile as UserProfile };
  return null;
}

async function saveSession(session: Session) {
  await supabase.from("whatsapp_sessions").upsert({
    phone: session.phone,
    step: session.step,
    profile: session.profile,
    updated_at: new Date().toISOString(),
  });
}

async function clearSession(phone: string) {
  await supabase.from("whatsapp_sessions").delete().eq("phone", phone);
}

async function finishAndSendSummary(phone: string, profile: UserProfile) {
  const rec = generateRecommendation(profile);

  const id = "ENQ-" + Date.now().toString(36).toUpperCase();
  await supabase.from("enquiries").insert({
    id,
    created_at: new Date().toISOString(),
    name: profile.name || "Anonymous",
    mobile: profile.mobile || phone,
    city: profile.city || "Not provided",
    loan_type: profile.purpose || "WhatsApp Bot Lead",
    amount: profile.amount || "0",
    income: profile.income || "0",
    emi: profile.currentEMI || "0",
    cibil: profile.cibil || "Don't know",
    message: `WhatsApp bot lead. Age: ${profile.age || "N/A"}. Employment: ${profile.employment || "N/A"}, Company: ${profile.company || "N/A"}. Tenure: ${profile.tenure || "N/A"} months.`,
    source: "WhatsApp Bot",
    status: "submitted",
    user_id: null,
  });

  const summary = [
    `✅ *Pre-Eligibility Status:* ${rec.statusLabel}`,
    ``,
    `💰 Estimated Loan Range: ${rec.estimatedAmountRange}`,
    `💸 Estimated EMI Range: ${rec.estimatedEMIRange}`,
    rec.status !== "not-eligible" ? `📊 Approx Rate: ${rec.estimatedRate}% p.a.` : ``,
    `📅 Suggested Tenure: ${rec.suggestedTenure} months`,
    ``,
    `🏦 *Recommended Lenders:*`,
    ...rec.topLenders.map((l) => `• ${l}`),
    ``,
    `📝 *Why:* ${rec.reasoning.join(" ")}`,
    ``,
    `Reference ID: ${id}`,
    `Our advisor will call you shortly. Call us anytime: +91 74111 11164`,
    ``,
    `Type *reset* anytime to check eligibility again.`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendText(phone, summary);
  await clearSession(phone);
}

function extractIncoming(message: any): { text: string; optionIndex: number | null } {
  if (message.type === "interactive") {
    const reply = message.interactive?.button_reply || message.interactive?.list_reply;
    if (reply?.id?.startsWith("opt_")) {
      return { text: reply.title, optionIndex: parseInt(reply.id.replace("opt_", ""), 10) };
    }
  }
  if (message.type === "text") {
    return { text: message.text?.body?.trim() || "", optionIndex: null };
  }
  return { text: "", optionIndex: null };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Webhook verification handshake (Meta calls this once when you set the webhook URL)
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
      res.status(200).send(challenge as string);
      return;
    }
    res.status(403).send("Forbidden");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  try {
    const entry = req.body?.entry?.[0]?.changes?.[0]?.value;
    const message = entry?.messages?.[0];

    // Ignore delivery/read status callbacks — only handle actual incoming messages.
    if (!message) {
      res.status(200).send("OK");
      return;
    }

    const phone: string = message.from;
    const { text, optionIndex } = extractIncoming(message);

    if (/^(reset|restart)$/i.test(text)) {
      await clearSession(phone);
      await sendQuestion(phone, chatQuestions[0]);
      await saveSession({ phone, step: 0, profile: {} });
      res.status(200).send("OK");
      return;
    }

    const session = await getSession(phone);

    // Brand-new conversation (no session row yet) — greet cleanly with Question 1.
    if (!session) {
      await sendQuestion(phone, chatQuestions[0]);
      await saveSession({ phone, step: 0, profile: {} });
      res.status(200).send("OK");
      return;
    }

    const activeQuestions = buildActiveQuestions(session.profile.purpose);
    const currentQ = activeQuestions[session.step];
    if (!currentQ) {
      // Session was stale (already finished) — start a fresh one.
      await clearSession(phone);
      await sendQuestion(phone, chatQuestions[0]);
      await saveSession({ phone, step: 0, profile: {} });
      res.status(200).send("OK");
      return;
    }

    // Resolve the answer: a button/list tap maps straight to the option text;
    // free-typed text is matched case-insensitively against the option list
    // for choice questions, or used as-is for name/mobile.
    let answer = text;
    if (currentQ.type === "choice" && currentQ.options) {
      if (optionIndex !== null && currentQ.options[optionIndex]) {
        answer = currentQ.options[optionIndex];
      } else {
        const matched = currentQ.options.find((o) => o.toLowerCase() === text.toLowerCase());
        if (!matched) {
          await sendText(phone, "Please pick one of the options below 👇");
          await sendQuestion(phone, currentQ);
          res.status(200).send("OK");
          return;
        }
        answer = matched;
      }
    }

    if (currentQ.key === "mobile") {
      const digits = answer.replace(/\D/g, "");
      if (digits.length !== 10) {
        await sendText(phone, "Please enter a valid 10-digit mobile number.");
        res.status(200).send("OK");
        return;
      }
      answer = digits;
    }

    if (!answer) {
      await sendQuestion(phone, currentQ);
      res.status(200).send("OK");
      return;
    }

    const updatedProfile = { ...session.profile, [currentQ.key]: answer };
    const nextActiveQuestions = buildActiveQuestions(updatedProfile.purpose);
    const nextStep = getNextStep(session.step, updatedProfile, nextActiveQuestions);

    if (nextStep >= nextActiveQuestions.length) {
      await finishAndSendSummary(phone, updatedProfile);
    } else {
      await saveSession({ phone, step: nextStep, profile: updatedProfile });
      await sendQuestion(phone, nextActiveQuestions[nextStep]);
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("WhatsApp webhook error:", err);
    res.status(200).send("OK"); // always 200 so Meta doesn't retry-storm on our bugs
  }
}
