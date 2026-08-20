import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SVGProps } from "react";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
  X,
  Zap,
} from "lucide-react";

const FacebookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.3H8.6V14H11v7h2.5Z" />
  </svg>
);
const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true" {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.3 4h2.5l-5.6 6.5L20.8 20h-5.2l-4-5.3L6.9 20H4.4l6-7L4 4h5.3l3.7 4.9L17.3 4Zm-.9 14.4h1.4L8.4 5.5H6.9l9.5 12.9Z" />
  </svg>
);
const LinkedinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M6.4 8.9H4V20h2.4V8.9ZM5.2 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm4 12.5h2.4v-5.6c0-.3 0-.6.1-.8.3-.6.8-1.2 1.8-1.2 1.3 0 1.8.9 1.8 2.3V20h2.4v-5.9c0-2.6-1.4-3.8-3.3-3.8-1.5 0-2.2.9-2.6 1.5V8.9H9.4V20Z" />
  </svg>
);
const YoutubeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M20.6 7.2a2.4 2.4 0 0 0-1.7-1.7C17.4 5 12 5 12 5s-5.4 0-6.9.5A2.4 2.4 0 0 0 3.4 7.2 25 25 0 0 0 3 12a25 25 0 0 0 .4 4.8 2.4 2.4 0 0 0 1.7 1.7c1.5.5 6.9.5 6.9.5s5.4 0 6.9-.5a2.4 2.4 0 0 0 1.7-1.7A25 25 0 0 0 21 12a25 25 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);
import { ADDRESS, EASE, EMAIL, Logo, PHONE_DISPLAY, PHONE_TEL, Reveal, SectionHeader, WA_LINK } from "./ui";
import { NAV_LINKS } from "./Navbar";

/* ================= CTA Band ================= */
export function CTABand() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#0D47A1] via-[#1260CE] to-[#081B3F] px-6 py-14 text-center shadow-[0_36px_80px_-30px_rgb(13_71_161/0.6)] sm:px-12 sm:py-16">
            <div className="bg-dots-white absolute inset-0 opacity-35" />
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#F57C00]/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Your Best Personal Loan Offer is{" "}
                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                  2 Minutes Away
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-blue-100/80">
                Join 10,000+ smart borrowers who compared first and saved thousands. Free service · No impact on credit
                score · No obligation.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="/?apply=1"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-7 py-4 text-[15px] font-extrabold text-white shadow-[0_16px_40px_-10px_rgb(245_124_0/0.65)] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Apply Now <Zap className="h-4.5 w-4.5" />
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 text-[15px] font-extrabold text-white shadow-lg shadow-green-900/30 transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  <MessageCircle className="h-4.5 w-4.5" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Contact + Map ================= */
const CONTACT_CARDS = [
  {
    icon: PhoneCall,
    title: "Call Us",
    value: PHONE_DISPLAY,
    sub: "Mon–Sat · 9:30 AM – 6:30 PM",
    href: PHONE_TEL,
    action: "Call now",
    c: "#0D47A1",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: PHONE_DISPLAY,
    sub: "Fastest response · usually < 5 min",
    href: WA_LINK,
    action: "Chat now",
    c: "#2E7D32",
  },
  {
    icon: Mail,
    title: "Email",
    value: EMAIL,
    sub: "We reply within 1 business day",
    href: `mailto:${EMAIL}`,
    action: "Write to us",
    c: "#F57C00",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Singasandra, Bangalore",
    sub: "Karnataka 560068 · India",
    href: "#map",
    action: "View on map",
    c: "#0D47A1",
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-slate-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact Us"
          title={
            <>
              Let's Find Your <span className="text-[#F57C00]">Perfect Loan</span> Together
            </>
          }
          sub="Reach out on any channel — a FundXGuru expert will take it from there."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <a
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-18px_rgb(13_71_161/0.28)]"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${c.c}, ${c.c}CC)` }}
                >
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{c.title}</p>
                <p className="mt-1 text-[15px] font-extrabold text-slate-900">{c.value}</p>
                <p className="mt-1 flex-1 text-[12px] font-semibold text-slate-400">{c.sub}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#E65100]">
                  {c.action} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <div id="map" className="h-full min-h-[340px] overflow-hidden rounded-[1.6rem] border border-slate-200 shadow-lg">
              <iframe
                title="FundXGuru office location — Singasandra, Bangalore"
                src="https://maps.google.com/maps?q=No.12%2C%20Vedantachari%20Layout%2C%20Revenue%20Layouts%2C%20Singasandra%2C%208th%20Cross%2C%20Begur%20Hobli%2C%20Bangalore%2C%20Karnataka%20560068&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-full min-h-[340px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[1.6rem] bg-gradient-to-br from-[#0D47A1] to-[#081B3F] p-7 text-white shadow-xl sm:p-8">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <MapPin className="h-5 w-5 text-amber-300" />
                </span>
                <h3 className="mt-4 text-xl font-extrabold">Visit Our Office</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-blue-100/80">{ADDRESS}</p>
              </div>
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 rounded-xl bg-white/8 p-4 ring-1 ring-white/10">
                  <Clock className="h-5 w-5 shrink-0 text-amber-300" />
                  <div>
                    <p className="text-[13px] font-extrabold">Mon – Sat · 9:30 AM – 6:30 PM</p>
                    <p className="text-[11.5px] font-semibold text-blue-200/70">Sunday closed · WhatsApp 24×7</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/8 p-4 ring-1 ring-white/10">
                  <Send className="h-5 w-5 shrink-0 text-amber-300" />
                  <div>
                    <p className="text-[13px] font-extrabold">PAN-India Service</p>
                    <p className="text-[11.5px] font-semibold text-blue-200/70">Serving 500+ cities digitally</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Legal modal content ================= */
const LEGAL_DOCS: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "FundXGuru, a sole proprietorship registered under Udyam (UDYAM-KR-03-0062569), respects your privacy. We collect only the information you voluntarily share through our enquiry forms, calculators, calls and WhatsApp — typically your name, contact details, employment and income details, and loan requirements.",
      "This information is used solely to assess your loan eligibility, match you with suitable banks/NBFCs, and communicate offers to you. Data is shared with lending partners strictly on a need basis for processing your enquiry. We do not sell your personal data to third parties.",
      "All transmissions are protected with 256-bit SSL encryption. You may request access, correction or deletion of your data anytime by writing to info@fundxguru.com.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "FundXGuru is a loan facilitation and advisory platform — not a bank, NBFC or lender. We connect borrowers with lending partners and assist with comparison, documentation and application processing.",
      "All loan approvals, interest rates, fees, tenures and disbursals are at the sole discretion of the respective lending partner. Any eligibility estimates, EMI figures or comparisons shown on this website are indicative and do not constitute an offer of credit.",
      "Our advisory service is free for borrowers; FundXGuru may receive a facilitation fee from lending partners. By submitting an enquiry, you consent to be contacted via call, SMS, email and WhatsApp regarding your request, overriding DND preferences.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    body: [
      "Bank policies, interest rates and charges are subject to change. Final terms depend on customer eligibility and lender policy. Figures, comparisons, eligibility estimates and timelines displayed on FundXGuru are illustrative for salaried profiles and may differ from your personalised offer.",
      "FundXGuru does not guarantee loan approval or any specific rate. Credit decisions rest entirely with the lending institutions. Borrowers should read the lender's sanction letter and most-important-terms carefully before acceptance.",
      "All bank and NBFC names, marks and logos belong to their respective owners and are used for identification and comparison purposes only — their use does not imply endorsement.",
    ],
  },
};

/* ================= Footer ================= */
export default function Footer() {
  const [doc, setDoc] = useState<string | null>(null);

  const legalBtn =
    "block w-full text-left rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white";

  return (
    <footer className="bg-[#081B3F] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr]">
          {/* Brand */}
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-slate-400">
              India's trusted personal loan advisory. We compare live offers from 12+ leading banks &amp; NBFCs and
              negotiate the sharpest rate for your profile — at zero cost to you.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: XIcon, label: "X (Twitter)" },
                { icon: LinkedinIcon, label: "LinkedIn" },
                { icon: YoutubeIcon, label: "YouTube" },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  aria-label={s.label}
                  disabled
                  className="flex h-9 w-9 cursor-default items-center justify-center rounded-xl bg-white/8 text-slate-300 ring-1 ring-white/10"
                >
                  <s.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-1 gap-0.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/#faq" className="block rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">Legal</h4>
            <div className="mt-4 space-y-0.5">
              <button onClick={() => setDoc("privacy")} className={legalBtn}>Privacy Policy</button>
              <button onClick={() => setDoc("terms")} className={legalBtn}>Terms &amp; Conditions</button>
              <button onClick={() => setDoc("disclaimer")} className={legalBtn}>Disclaimer</button>
            </div>
            <h4 className="mt-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">Tools</h4>
            <div className="mt-4 space-y-0.5">
              <a href="/#eligibility" className={legalBtn}>Eligibility Checker</a>
              <a href="/#emi-calculator" className={legalBtn}>EMI Calculator</a>
              <a href="/#bank-comparison" className={legalBtn}>Bank Comparison</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">Contact</h4>
            <div className="mt-4 space-y-3.5 text-[13px] font-semibold text-slate-400">
              <a href={PHONE_TEL} className="flex items-center gap-2.5 transition hover:text-white">
                <PhoneCall className="h-4 w-4 shrink-0 text-amber-400" /> {PHONE_DISPLAY}
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-white">
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" /> WhatsApp Us
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 transition hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-sky-400" /> {EMAIL}
              </a>
              <p className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /> {ADDRESS}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7">
          <p className="text-center text-[11px] font-medium text-slate-500">
            Sasmita Sahoo (Proprietor), trading as FundXGuru · GSTIN: 29DCNPS6738F3ZS
          </p>
          <div className="mt-3 flex flex-col items-center justify-between gap-3 text-[12px] font-semibold text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} FundXGuru. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Smart Loans. Trusted Guidance.
              <span className="h-1.5 w-1.5 rounded-full bg-[#F57C00]" />
              Made in India
            </p>
          </div>
        </div>
      </div>

      {/* Legal modal */}
      <AnimatePresence>
        {doc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setDoc(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">{LEGAL_DOCS[doc].title}</h3>
                <button
                  onClick={() => setDoc(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {LEGAL_DOCS[doc].body.map((p, i) => (
                  <p key={i} className="text-[13.5px] leading-relaxed text-slate-500">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-[11px] font-semibold text-slate-400">Last updated: January 2026 · info@fundxguru.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
