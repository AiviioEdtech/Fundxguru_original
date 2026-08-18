import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!RESEND_API_KEY) {
    res.status(500).json({ error: "RESEND_API_KEY is not configured" });
    return;
  }

  const { to, name } = req.body || {};
  if (!to || typeof to !== "string") {
    res.status(400).json({ error: "Missing 'to' email address" });
    return;
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FundXGuru <info@fundxguru.com>",
        to,
        subject: "Your documents were uploaded successfully — FundXGuru",
        html: `
          <p>Hi ${name || "there"},</p>
          <p>Your documents were uploaded successfully and your loan application has moved to review.</p>
          <p>A loan advisor expert will call you within 30 minutes to assist you further.</p>
          <p>Thank you for choosing FundXGuru.</p>
        `,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      res.status(502).json({ error: "Resend request failed", detail });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Unknown error" });
  }
}
