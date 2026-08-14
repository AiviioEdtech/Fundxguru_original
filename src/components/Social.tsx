import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, PhoneCall, Quote, Star } from "lucide-react";
import { EASE, PHONE_DISPLAY, PHONE_TEL, Reveal, SectionHeader, WA_LINK } from "./ui";

/* ================= Testimonials ================= */
const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    role: "Software Engineer · Bengaluru",
    chip: "₹8.0L @ 10.9% · ICICI Bank",
    text: "I was getting 14% from my salary account bank. FundXGuru compared 5 lenders in one day and got me ICICI at 10.9%. Saved over ₹1.2 lakh in interest.",
    rating: 5,
  },
  {
    name: "Sneha Kulkarni",
    role: "HR Manager · Pune",
    chip: "₹5.5L @ 10.99% · Kotak",
    text: "The relationship manager handled everything — documents, follow-ups, even a processing fee waiver. The loan was disbursed in 26 hours. Genuinely premium service.",
    rating: 5,
  },
  {
    name: "Amit Singh",
    role: "Marketing Lead · Delhi NCR",
    chip: "₹12L @ 11.2% · HDFC Bank",
    text: "Consolidated 3 high-cost loans into one HDFC personal loan. My EMI dropped by ₹7,400/month. The comparison table they shared made the decision effortless.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Business Analyst · Chennai",
    chip: "₹3.5L @ 10.75% · IDFC FIRST",
    text: "Applied at 7 PM on WhatsApp, had two offers by next morning. The paperless journey with IDFC FIRST took less than 30 minutes. Highly recommend FundXGuru.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Customer Stories"
          title={
            <>
              Trusted by Borrowers <span className="text-[#0D47A1]">Across India</span>
            </>
          }
          sub="Real customers. Real savings. Here's what loan seekers say after comparing through FundXGuru."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_36px_-16px_rgb(15_23_42/0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgb(13_71_161/0.28)]">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-orange-100" />
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-slate-600">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0D47A1] to-[#1976D2] text-xs font-extrabold text-white">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-extrabold text-slate-900">{t.name}</p>
                    <p className="truncate text-[11px] font-semibold text-slate-400">{t.role}</p>
                  </div>
                </div>
                <span className="mt-3 inline-flex w-fit rounded-lg bg-green-50 px-2.5 py-1 text-[10.5px] font-extrabold text-[#2E7D32] ring-1 ring-green-100">
                  {t.chip}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */
const FAQS = [
  {
    q: "What is a Personal Loan?",
    a: "A personal loan is an unsecured loan — meaning no collateral or guarantor is required — that you can use for any legitimate purpose: weddings, travel, medical needs, education, home renovation or consolidating expensive debt. You repay it in fixed monthly instalments (EMIs) over a chosen tenure, typically 6–72 months, at a fixed interest rate.",
  },
  {
    q: "How much loan can I get?",
    a: "Our lending partners offer personal loans from ₹50,000 up to ₹40 lakh. Your approved amount depends on your net monthly income, existing EMIs (FOIR), credit score, employer category and city. As a thumb rule, salaried applicants can borrow roughly 10–27 times their net monthly salary. Use our Eligibility Checker above for an instant personal estimate.",
  },
  {
    q: "What is the minimum salary required?",
    a: "Most banks require a minimum net monthly salary of ₹25,000–₹30,000 (₹32,000+ in metro cities for some lenders). Employees of Cat A/listed companies, MNCs and government organisations qualify more easily and at better rates. Even if your salary is lower, certain NBFC partners have flexible programs — our experts can guide you.",
  },
  {
    q: "What documents are required?",
    a: "Typically just: (1) KYC — PAN card and Aadhaar/address proof; (2) Income proof — last 3 months' salary slips; (3) Last 6 months' bank statement; (4) Employment proof for some lenders. Many partners now run a fully digital journey where documents are fetched or uploaded from your phone in minutes.",
  },
  {
    q: "How long does approval take?",
    a: "With FundXGuru, in-principle approvals often arrive in minutes for well-matched profiles. Complete document verification to disbursal usually takes 24–48 working hours. Pre-approved offers from your existing bank can be near-instant. Timelines vary by lender, profile completeness and verification.",
  },
  {
    q: "Can I pre-close or part-pay my loan?",
    a: "Yes. Most lenders allow foreclosure after 6–12 EMIs with charges of roughly 2–4% of the outstanding principal (plus GST). Partial pre-payment is also offered by many banks — some allow up to 25% of the principal outstanding per year. We always highlight these charges in your comparison so there are no surprises later.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              center={false}
              eyebrow="FAQs"
              title={
                <>
                  Questions? <span className="text-[#F57C00]">Answered.</span>
                </>
              }
              sub="Everything you need to know before applying for a personal loan through FundXGuru."
            />
            <Reveal delay={0.12}>
              <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#0D47A1] to-[#081B3F] p-6 text-white shadow-xl">
                <p className="text-lg font-extrabold">Still have questions?</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-blue-100/80">
                  Talk to a real loan expert — free, no obligation.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={PHONE_TEL}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-[13px] font-extrabold ring-1 ring-white/15 transition hover:bg-white/20"
                  >
                    <PhoneCall className="h-4 w-4 text-amber-300" /> {PHONE_DISPLAY}
                  </a>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-[13px] font-extrabold transition hover:brightness-105"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={Math.min(i * 0.05, 0.25)}>
                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                      isOpen ? "border-orange-200 shadow-[0_16px_40px_-18px_rgb(245_124_0/0.3)]" : "border-slate-100 shadow-sm hover:border-slate-200"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14.5px] font-extrabold text-slate-800">
                        {f.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? "rotate-180 bg-gradient-to-br from-[#FB8C00] to-[#EF6C00] text-white" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-slate-500 sm:px-6">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
