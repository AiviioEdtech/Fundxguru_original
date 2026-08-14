import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Headset,
  Lock,
  PartyPopper,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, Reveal, WA_LINK } from "./ui";
import { saveEnquiry, submitToGoogleSheet } from "../utils/enquiry";

const perks = [
  { icon: FileCheck2, text: "Minimal documentation — digital sharing accepted" },
  { icon: ShieldCheck, text: "256-bit encrypted & never shared with third parties" },
  { icon: Headset, text: "Free expert callback within 30 minutes (working hours)" },
];

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | null)?.value || "";

    setSubmitting(true);
    const enquiry = {
      name: name || get("f-name"),
      mobile: get("f-mobile"),
      city: get("f-city"),
      loanType: "Personal Loan",
      amount: get("f-amount"),
      income: get("f-salary"),
      emi: get("f-emi") || "0",
      cibil: "Don't know",
      message: `Enquiry form lead. Company: ${get("f-company")}. Employment: ${get("f-emp")}.`,
      source: "Enquiry Form",
    };

    try {
      const saved = await saveEnquiry(enquiry);
      submitToGoogleSheet({ ...enquiry, id: saved.id }).catch(() => {});
    } catch (err) {
      console.warn("Could not save enquiry form lead:", err);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="apply" className="relative scroll-mt-24 py-16 sm:py-20">
      <span id="personal-loan" className="absolute -top-8" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#0D47A1] via-[#0B3C89] to-[#081B3F] shadow-[0_36px_80px_-30px_rgb(13_71_161/0.55)]">
            <div className="bg-dots-white absolute inset-0 opacity-40 [mask-image:linear-gradient(120deg,black,transparent_65%)]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F57C00]/25 blur-3xl" />

            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:p-14">
              {/* Left content */}
              <div className="flex flex-col justify-center">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-300 ring-1 ring-white/15">
                  <Sparkles className="h-3.5 w-3.5" /> Loan Enquiry
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Apply for a Personal Loan in{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                    2 Minutes
                  </span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-blue-100/80">
                  One simple form. We check your profile across 12+ banks &amp; NBFCs and get you the lowest rate you
                  qualify for — with zero impact on your credit score.
                </p>

                <ul className="mt-7 space-y-3.5">
                  {perks.map((p) => (
                    <li key={p.text} className="flex items-start gap-3 text-sm font-semibold text-blue-50">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-amber-300">
                        <p.icon className="h-4 w-4" />
                      </span>
                      {p.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FB8C00] to-[#EF6C00] text-white">
                    <PhoneCall className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200/70">
                      Prefer to talk first?
                    </p>
                    <a href={PHONE_TEL} className="text-lg font-extrabold text-white transition hover:text-amber-300">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-extrabold text-white transition hover:brightness-105"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Form card */}
              <div className="rounded-[1.6rem] bg-white p-6 shadow-2xl sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex h-full min-h-[480px] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                      <PartyPopper className="h-9 w-9 text-[#2E7D32]" />
                    </span>
                    <h3 className="mt-6 text-2xl font-extrabold text-slate-900">
                      Thank you{name ? `, ${name.split(" ")[0]}` : ""}!
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
                      Your eligibility check request is received. A dedicated FundXGuru loan expert will call you
                      within <span className="font-bold text-slate-700">30 minutes</span> (9:30 AM – 6:30 PM, Mon–Sat)
                      with personalised offers.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-105"
                      >
                        Get instant reply on WhatsApp
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-extrabold text-slate-600 transition hover:bg-slate-50"
                      >
                        Submit another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-extrabold text-slate-900">Check My Eligibility — Free</h3>
                    <p className="mt-1.5 text-[13px] font-medium text-slate-400">
                      Takes 2 minutes · No documents needed now · No spam calls
                    </p>
                    <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label" htmlFor="f-name">Full Name</label>
                        <input
                          id="f-name"
                          className="input"
                          placeholder="e.g. Rahul Verma"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="label" htmlFor="f-mobile">Mobile Number</label>
                        <input
                          id="f-mobile"
                          className="input"
                          placeholder="10-digit mobile"
                          required
                          inputMode="numeric"
                          pattern="[6-9][0-9]{9}"
                          title="Enter a valid 10-digit Indian mobile number"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <label className="label" htmlFor="f-city">City</label>
                        <input id="f-city" className="input" placeholder="e.g. Bengaluru" required />
                      </div>
                      <div>
                        <label className="label" htmlFor="f-company">Company Name</label>
                        <input id="f-company" className="input" placeholder="Current employer" required />
                      </div>
                      <div>
                        <label className="label" htmlFor="f-salary">Monthly Salary (₹)</label>
                        <input id="f-salary" type="number" min={10000} className="input" placeholder="e.g. 60000" required />
                      </div>
                      <div>
                        <label className="label" htmlFor="f-amount">Loan Amount Required (₹)</label>
                        <input id="f-amount" type="number" min={50000} className="input" placeholder="e.g. 500000" required />
                      </div>
                      <div>
                        <label className="label" htmlFor="f-emi">Existing EMI (₹/month)</label>
                        <input id="f-emi" type="number" min={0} className="input" placeholder="0 if none" defaultValue={0} />
                      </div>
                      <div>
                        <label className="label" htmlFor="f-emp">Employment Type</label>
                        <select id="f-emp" className="input" defaultValue="Salaried" required>
                          <option>Salaried</option>
                          <option>Self-Employed Professional</option>
                          <option>Self-Employed Business</option>
                        </select>
                      </div>
                      <div className="flex items-start gap-2.5 sm:col-span-2">
                        <input id="f-consent" type="checkbox" required className="mt-0.5 h-4 w-4 rounded accent-[#F57C00]" />
                        <label htmlFor="f-consent" className="text-[11.5px] font-medium leading-relaxed text-slate-400">
                          I authorise FundXGuru &amp; its lending partners to contact me via call/SMS/WhatsApp regarding
                          my loan enquiry. This overrides DND preferences.
                        </label>
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] py-4 text-[15px] font-extrabold text-white shadow-[0_14px_34px_-10px_rgb(245_124_0/0.6)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-70 sm:col-span-2"
                      >
                        {submitting ? "Checking…" : "Check My Eligibility"}
                        <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                      </button>
                      <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400 sm:col-span-2">
                        <Lock className="h-3.5 w-3.5 text-[#2E7D32]" />
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#2E7D32]" />
                        Your data is SSL encrypted &amp; used only to fetch loan offers
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
