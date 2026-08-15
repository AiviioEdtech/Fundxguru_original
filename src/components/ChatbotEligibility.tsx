import { useEffect, useMemo, useRef, useState } from "react";
import type { ChatQuestion } from "../data/chatbot";
import {
  LOAN_SLUG_TO_PURPOSE,
  PURPOSE_TO_LABEL,
  chatQuestions,
  debtDetailKeys,
  debtDetailPurposes,
  loanTypeQuestions,
} from "../data/chatbot";
import { generateRecommendation, type UserProfile } from "../utils/loan";
import { saveEnquiry, submitToGoogleSheet } from "../utils/enquiry";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "./ui";

interface Message {
  from: "bot" | "user";
  text: string;
}

// Next step, skipping the debt-detail questions unless the loan purpose needs them.
function getNextStep(currentStep: number, currentProfile: UserProfile, questions: ChatQuestion[]): number {
  let next = currentStep + 1;
  const needsDebtDetails = debtDetailPurposes.includes(currentProfile.purpose || "");
  while (next < questions.length) {
    const nextQ = questions[next];
    if (debtDetailKeys.includes(nextQ.key) && !needsDebtDetails) {
      next += 1;
    } else {
      break;
    }
  }
  return next;
}

export function ChatbotEligibility() {
  const [presetPurpose] = useState<string | null>(() => {
    const slug = new URLSearchParams(window.location.search).get("loan");
    return slug ? LOAN_SLUG_TO_PURPOSE[slug] || null : null;
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<UserProfile>(() => (presetPurpose ? { purpose: presetPurpose } : {}));
  const [done, setDone] = useState(false);
  const [typing, setTyping] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [savedEnquiryId, setSavedEnquiryId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const leadSubmittedRef = useRef(false);

  // The active question flow: base questions, plus loan-type-specific ones
  // inserted right after "purpose" is known (either preset via URL, or answered live).
  const activeQuestions = useMemo(() => {
    const list: ChatQuestion[] = [];
    const amountQ = chatQuestions[0];
    if (presetPurpose) {
      const label = PURPOSE_TO_LABEL[presetPurpose] || "loan";
      list.push({
        ...amountQ,
        question: `Hi! 👋 I'm the FundXGuru AI Advisor. Let's check your eligibility for a ${label}. How much loan amount do you need?`,
      });
    } else {
      list.push(amountQ);
      list.push(chatQuestions[1]); // ask "purpose" only when it isn't already known
    }
    const activePurpose = presetPurpose || profile.purpose;
    if (activePurpose && loanTypeQuestions[activePurpose]) {
      list.push(...loanTypeQuestions[activePurpose]);
    }
    list.push(...chatQuestions.slice(2));
    return list;
  }, [presetPurpose, profile.purpose]);

  const currentQ = activeQuestions[step];

  useEffect(() => {
    if (done || !currentQ) return;
    setTyping(true);
    const t = setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: currentQ.question }]);
      setTyping(false);
    }, 600);
    return () => clearTimeout(t);
  }, [step, done, currentQ]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (done && !leadSubmittedRef.current) {
      leadSubmittedRef.current = true;
      submitLead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function submitAnswer(value: string) {
    if (!value.trim() || !currentQ) return;

    if (currentQ.key === "mobile") {
      const cleanNum = value.replace(/\D/g, "");
      if (cleanNum.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }
    }

    setMessages((m) => [...m, { from: "user", text: value }]);

    const updatedProfile = { ...profile, [currentQ.key]: value };
    setProfile(updatedProfile);
    setInput("");

    const nextStep = getNextStep(step, updatedProfile, activeQuestions);

    if (nextStep >= activeQuestions.length) {
      setTimeout(() => {
        setMessages((m) => [...m, { from: "bot", text: "✨ Analyzing your profile across 12+ Banks & NBFCs..." }]);
      }, 500);
      setTimeout(() => {
        setMessages((m) => [...m, { from: "bot", text: "Pre-eligibility check completed! Displaying your custom report..." }]);
        setDone(true);
      }, 1800);
    } else {
      setStep(nextStep);
    }
  }

  function reset() {
    setMessages([]);
    setStep(0);
    setInput("");
    setProfile(presetPurpose ? { purpose: presetPurpose } : {});
    setDone(false);
    setSubmittingLead(false);
    setSavedEnquiryId("");
    leadSubmittedRef.current = false;
  }

  async function submitLead() {
    setSubmittingLead(true);

    const extraDetails: string[] = [];
    if (profile.businessVintage) extraDetails.push(`Business vintage: ${profile.businessVintage}.`);
    if (profile.businessRegistered) extraDetails.push(`GST/Udyam registered: ${profile.businessRegistered}.`);
    if (profile.turnover) extraDetails.push(`Monthly turnover: ${profile.turnover}.`);
    if (profile.currentLoanOutstanding) extraDetails.push(`Current home loan outstanding: ${profile.currentLoanOutstanding}.`);
    if (profile.currentRate) extraDetails.push(`Current home loan rate: ${profile.currentRate}.`);
    if (profile.currentLender) extraDetails.push(`Current lender: ${profile.currentLender}.`);
    if (profile.propertyType) extraDetails.push(`Property type: ${profile.propertyType}.`);
    if (profile.propertyValue) extraDetails.push(`Property value: ${profile.propertyValue}.`);

    const message = `Chatbot lead. Age: ${profile.age || "N/A"}. City: ${profile.city || "N/A"}. Employment: ${profile.employment || "N/A"}, Company: ${profile.company || "N/A"}. Tenure requested: ${profile.tenure || "N/A"} months. Existing loans: ${profile.existingPL || "N/A"}. CC outstanding: ${profile.ccOutstanding || "N/A"}. App loans: ${profile.appLoans || "N/A"}. Current EMI: ${profile.currentEMI || "N/A"}. EMI bounce: ${profile.bounce || "N/A"}.${extraDetails.length ? " " + extraDetails.join(" ") : ""}`;

    const enquiry = {
      name: profile.name || "Anonymous",
      mobile: profile.mobile || "Not provided",
      city: profile.city || "Not provided",
      loanType: (profile.purpose && PURPOSE_TO_LABEL[profile.purpose]) || profile.purpose || "Chatbot Lead",
      amount: profile.amount || "0",
      income: profile.income || "0",
      emi: profile.currentEMI || "0",
      cibil: profile.cibil || "Don't know",
      message,
      source: "AI Chatbot",
    };

    let savedId = "";
    try {
      const saved = await saveEnquiry(enquiry);
      savedId = saved.id;
      setSavedEnquiryId(saved.id);
    } catch (err) {
      console.warn("Could not save chatbot enquiry to backend:", err);
    }

    submitToGoogleSheet({ ...enquiry, id: savedId }).catch((err) =>
      console.warn("Google Sheet submission failed:", err)
    );

    const rec = generateRecommendation(profile);
    fetch("https://formsubmit.co/ajax/info@fundxguru.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `AI Pre-Eligibility Lead — ${profile.name || "Anonymous"} (${rec.statusLabel})`,
        "Enquiry ID": savedId || "N/A",
        Name: profile.name || "Anonymous",
        Mobile: profile.mobile || "Not provided",
        Status: rec.statusLabel,
        "Best Category": rec.category,
        "Estimated Loan Range": rec.estimatedAmountRange,
        "Estimated EMI Range": rec.estimatedEMIRange,
        "Suggested Lenders": rec.topLenders.join(", "),
        Details: message,
      }),
    })
      .then((res) => res.json())
      .then(() => setSubmittingLead(false))
      .catch((err) => {
        console.error("Error submitting lead:", err);
        setSubmittingLead(false);
      });
  }

  function handleWhatsAppClick() {
    const rec = generateRecommendation(profile);
    const waMsg = `Hi FundXGuru, I just checked my loan pre-eligibility. My name is ${profile.name || ""} and my estimate range is ${rec.estimatedAmountRange} under ${rec.category}.${savedEnquiryId ? ` Reference ID: ${savedEnquiryId}.` : ""} I would like to proceed with my loan application.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto flex h-[640px] max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white card-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-[#0D47A1] to-[#1976D2] p-4 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">🤖</div>
        <div className="flex-1">
          <div className="font-bold">FundXGuru AI Advisor</div>
          <div className="flex items-center gap-1.5 text-xs text-blue-100">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Online · Pre-eligibility Check
          </div>
        </div>
        {done && (
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-lg bg-white/20 px-3 py-1.5 text-xs hover:bg-white/30"
          >
            🔄 Start Over
          </button>
        )}
      </div>

      {/* Progress */}
      {!done && (
        <div className="px-4 pt-3">
          <div className="mb-1 flex justify-between text-[10px] text-slate-500">
            <span>
              Question {Math.min(step + 1, activeQuestions.length)} of {activeQuestions.length}
            </span>
            <span>{Math.round((step / activeQuestions.length) * 100)}% complete</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] transition-all duration-500"
              style={{ width: `${(step / activeQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Body */}
      {done ? (
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 text-slate-800 sm:space-y-5 sm:p-5">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
            {submittingLead ? (
              <>⏳ Saving your details…</>
            ) : savedEnquiryId ? (
              <>
                ✅ Your details are saved. Reference ID:{" "}
                <span className="font-semibold text-slate-700">{savedEnquiryId}</span>
              </>
            ) : null}
          </div>

          {(() => {
            const rec = generateRecommendation(profile);
            const isEligible = rec.status === "eligible";
            const isReview = rec.status === "maybe";
            const badgeColor = isEligible
              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
              : isReview
                ? "bg-amber-100 text-amber-800 border-amber-200"
                : "bg-rose-100 text-rose-800 border-rose-200";
            const statusIcon = isEligible ? "✅" : isReview ? "⚠️" : "❌";
            return (
              <div className={`flex items-center gap-3.5 rounded-xl border p-4 shadow-sm ${badgeColor}`}>
                <div className="text-3xl">{statusIcon}</div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pre-Eligibility Status</div>
                  <div className="text-base font-extrabold sm:text-lg">{rec.statusLabel}</div>
                </div>
              </div>
            );
          })()}

          {(() => {
            const rec = generateRecommendation(profile);
            return (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Loan Range</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900 sm:text-base">{rec.estimatedAmountRange}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated EMI Range</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900 sm:text-base">{rec.estimatedEMIRange}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Approx Interest Rate</div>
                  <div className="mt-1 text-sm font-extrabold text-[#0D47A1] sm:text-base">
                    {rec.status === "not-eligible" ? "N/A" : `${rec.estimatedRate}% p.a.`}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Suggested Tenure</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900 sm:text-base">{rec.suggestedTenure} Months</div>
                </div>
              </div>
            );
          })()}

          {(() => {
            const rec = generateRecommendation(profile);
            return (
              <div className="space-y-3 sm:space-y-4">
                {rec.topLenders.length > 0 && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended Lenders</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.topLenders.map((l) => (
                        <span
                          key={l}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-800"
                        >
                          🏛️ {l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Why this recommendation</h4>
                  <ul className="space-y-1.5">
                    {rec.reasoning.map((r, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-600">
                        <span className="font-bold text-emerald-500">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}

          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">What Happens Next?</h4>
            <div className="relative ml-2 space-y-4 border-l-2 border-slate-100 pl-6">
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                  ✓
                </span>
                <h5 className="text-xs font-bold text-slate-900">Step 1: AI Profile Analysis Completed</h5>
                <p className="mt-0.5 text-[10px] text-slate-500">Your profile matches with optimal Bank & NBFC lenders.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-[#0D47A1] text-[9px] font-bold text-white">
                  ●
                </span>
                <h5 className="text-xs font-bold text-slate-900">Step 2: Advisor Assigned</h5>
                <p className="mt-0.5 text-[10px] text-slate-500">Our advisor will call you shortly, usually within 15 minutes during business hours.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[9px] font-bold text-slate-500">
                  3
                </span>
                <h5 className="text-xs font-bold text-slate-400">Step 3: Document Verification & Lender Approval</h5>
                <p className="mt-0.5 text-[10px] text-slate-400">We help you package documents for final bank/NBFC approval.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-[10px] italic leading-relaxed text-slate-400">
            ⚠️ Disclaimer: Final approval depends on document verification, CIBIL bureau check, lender policy, and bank/NBFC approval.
          </p>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex animate-fade-up ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              {m.from === "bot" && (
                <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm text-[#0D47A1]">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${
                  m.from === "user"
                    ? "rounded-br-sm bg-gradient-to-br from-[#0D47A1] to-[#0B3C89] text-white"
                    : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                }`}
              >
                {m.text}
              </div>
              {m.from === "user" && (
                <div className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-700">
                  👤
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex animate-fade-in justify-start">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm text-[#0D47A1]">🤖</div>
              <div className="animate-typing rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input / Action Area */}
      {!done && currentQ && !typing && (
        <div className="border-t border-slate-200 bg-white p-3">
          {currentQ.type === "choice" ? (
            <div className="flex flex-wrap gap-2">
              {currentQ.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => submitAnswer(opt)}
                  className="rounded-full border border-[#0D47A1]/25 px-3 py-2 text-xs font-medium text-[#0D47A1] transition-all hover:border-[#0D47A1] hover:bg-[#0D47A1] hover:text-white"
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitAnswer(input);
              }}
              className="flex gap-2"
            >
              <input
                type={currentQ.type === "number" || currentQ.type === "amount" ? "number" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={currentQ.placeholder}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-blue-100"
                autoFocus
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-[#0D47A1] to-[#0B3C89] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg"
              >
                Send →
              </button>
            </form>
          )}
        </div>
      )}

      {done && (
        <div className="flex flex-col gap-2 border-t border-slate-200 bg-white p-3 sm:flex-row">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-sm hover:bg-emerald-600 sm:text-sm"
          >
            💬 Talk to Advisor on WhatsApp
          </button>
          <a
            href={PHONE_TEL}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0D47A1] px-4 py-2.5 text-center text-xs font-semibold text-white shadow-sm hover:bg-[#0B3C89] sm:text-sm"
          >
            📞 Direct Call Now ({PHONE_DISPLAY})
          </a>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-xs font-semibold text-slate-600 hover:bg-slate-100 sm:text-sm"
          >
            🔄 Check Again
          </button>
        </div>
      )}
    </div>
  );
}
