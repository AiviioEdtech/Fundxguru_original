import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Lock,
  MessageCircle,
  ShieldCheck,
  Timer,
  X,
  Zap,
} from "lucide-react";
import { EASE, WA_LINK } from "./ui";
import { saveEnquiry, submitToGoogleSheet } from "../utils/enquiry";

const HEIGHT = "h-14 w-14";

export default function FloatingWidgets() {
  const [showApply, setShowApply] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* floating apply visibility */
  useEffect(() => {
    const onScroll = () => setShowApply(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 20-second lead popup, once per session */
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setShowPopup(true), 20000);
    return () => clearTimeout(t);
  }, [dismissed]);

  const closePopup = () => {
    setShowPopup(false);
    setDismissed(true);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (id: string) => (form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | null)?.value || "";

    setSubmitting(true);
    const enquiry = {
      name: get("p-name"),
      mobile: get("p-mobile"),
      city: "Not provided",
      loanType: "Personal Loan",
      amount: get("p-amount"),
      income: "0",
      emi: "0",
      cibil: "Don't know",
      message: "Lead from the 20-second offer popup.",
      source: "Popup Offer",
    };

    try {
      const saved = await saveEnquiry(enquiry);
      submitToGoogleSheet({ ...enquiry, id: saved.id }).catch(() => {});
      fetch("https://formsubmit.co/ajax/info@fundxguru.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Popup Offer Lead — ${enquiry.name}`,
          "Enquiry ID": saved.id,
          Name: enquiry.name,
          Mobile: enquiry.mobile,
          "Loan Amount Needed": enquiry.amount,
        }),
      }).catch(() => {});
    } catch (err) {
      console.warn("Could not save popup lead:", err);
    }
    setSubmitting(false);
    setSent(true);
  };

  return (
    <>
      {/* Sticky WhatsApp */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: EASE }}
        className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3"
      >
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`wa-pulse flex ${HEIGHT} items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-8px_rgb(37_211_102/0.6)] transition-transform hover:scale-110`}
        >
          <MessageCircle className="h-7 w-7 fill-white/20" />
        </a>
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-[12.5px] font-extrabold text-slate-700 opacity-0 shadow-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 md:block">
          Chat with a loan expert
          <span className="block text-[10.5px] font-bold text-emerald-600">Online · replies in minutes</span>
        </span>
      </motion.div>

      {/* Floating Apply Now */}
      <AnimatePresence>
        {showApply && (
          <motion.a
            href="#apply"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_16px_40px_-8px_rgb(245_124_0/0.6)] transition-transform hover:-translate-y-1"
          >
            <Zap className="h-4.5 w-4.5" /> Apply Now
            <span className="hidden text-[10px] font-bold uppercase tracking-wider text-orange-100 sm:inline">
              2 min · free
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* 20s Lead Capture Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/55 p-4 backdrop-blur-sm sm:items-center"
            onClick={closePopup}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[1.8rem] bg-white shadow-2xl"
            >
              <button
                onClick={closePopup}
                aria-label="Close popup"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {sent ? (
                <div className="flex flex-col items-center px-7 py-12 text-center">
                  <span className="flex h-18 w-18 items-center justify-center rounded-full bg-green-50 p-4">
                    <BadgeCheck className="h-10 w-10 text-[#2E7D32]" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-900">You're on the list!</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-500">
                    A FundXGuru loan expert will call you within <span className="font-bold text-slate-700">30 minutes</span> (working
                    hours) with your best-matched offers.
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-white transition hover:brightness-105"
                  >
                    <MessageCircle className="h-4.5 w-4.5" /> Skip the wait — WhatsApp us
                  </a>
                </div>
              ) : (
                <>
                  <div className="relative bg-gradient-to-br from-[#0D47A1] to-[#081B3F] px-7 pb-7 pt-8 text-white">
                    <div className="bg-dots-white absolute inset-0 opacity-30" />
                    <div className="relative">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-amber-300 ring-1 ring-amber-300/30">
                        <Timer className="h-3.5 w-3.5" /> Limited: lower rates this week
                      </span>
                      <h3 className="mt-4 text-[1.45rem] font-extrabold leading-tight">
                        Get Your Best Loan Offer — Before Rates Change
                      </h3>
                      <p className="mt-2 text-[13px] font-medium leading-relaxed text-blue-100/80">
                        Compare ICICI, HDFC, Axis, Kotak, IDFC FIRST &amp; more in 2 minutes. Free &amp; no CIBIL
                        impact.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={onSubmit} className="space-y-3.5 px-7 py-6">
                    <div>
                      <label className="label" htmlFor="p-name">Full Name</label>
                      <input id="p-name" className="input" placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="label" htmlFor="p-mobile">Mobile Number</label>
                      <input
                        id="p-mobile"
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
                      <label className="label" htmlFor="p-amount">Loan Amount Needed</label>
                      <select id="p-amount" className="input" required defaultValue="₹3L – ₹5L">
                        <option>₹50K – ₹1L</option>
                        <option>₹1L – ₹3L</option>
                        <option>₹3L – ₹5L</option>
                        <option>₹5L – ₹10L</option>
                        <option>₹10L – ₹25L</option>
                        <option>₹25L+</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] py-4 text-[15px] font-extrabold text-white shadow-[0_14px_34px_-10px_rgb(245_124_0/0.6)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-70"
                    >
                      {submitting ? "Submitting…" : "Get Free Quotes"}
                      <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="flex items-center justify-center gap-4 pt-1 text-[10.5px] font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Lock className="h-3 w-3 text-[#2E7D32]" /> SSL Secure
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-[#2E7D32]" /> No Spam
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-[#2E7D32]" /> No CIBIL Impact
                      </span>
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
