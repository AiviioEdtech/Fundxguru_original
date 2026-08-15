import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Star,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { CTAButton, EASE, Reveal, WA_LINK } from "./ui";

const chips = ["100% Free Service", "No CIBIL Impact", "Offers in 2 Minutes"];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#EFF5FF] via-white to-white">
      {/* decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#F57C00]/10 blur-3xl" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#0D47A1]/10 blur-3xl" />
        <div className="bg-dots absolute inset-x-0 top-0 h-64 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 shadow-sm"
            >
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="text-xs font-extrabold text-slate-700">Rated 4.8/5 by 10,000+ loan seekers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
              className="mt-6 text-[2.15rem] font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]"
            >
              Get{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] bg-clip-text text-transparent">
                  Instant
                </span>
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 120 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7.5C30 2 70 1.5 118 6.5"
                    stroke="#F57C00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>{" "}
              Personal Loans from{" "}
              <span className="bg-gradient-to-r from-[#0D47A1] to-[#1E88E5] bg-clip-text text-transparent">
                India's Leading Banks
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-500 sm:text-lg"
            >
              Compare offers from top banks and NBFCs. Check your eligibility for{" "}
              <span className="font-bold text-slate-700">
                Personal Loan, Balance Transfer, Loan Consolidation, Home Loan, Business Loan and Loan Against
                Property
              </span>{" "}
              — all in one place, at zero cost.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {["Personal Loan", "Balance Transfer", "Loan Consolidation", "Home Loan", "Business Loan", "Loan Against Property"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11.5px] font-bold text-slate-500"
                  >
                    {t}
                  </span>
                )
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <CTAButton href="/#eligibility" variant="blue">
                Check Eligibility <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton href="/?apply=1" variant="orange">
                Apply Now <Zap className="h-4 w-4" />
              </CTAButton>
              <CTAButton href={WA_LINK} external variant="green">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-7 flex flex-wrap gap-x-5 gap-y-2"
            >
              {chips.map((c) => (
                <span key={c} className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" /> {c}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative mx-auto w-full max-w-[430px]"
          >
            <div className="absolute -inset-4 rotate-2 rounded-[2.4rem] bg-gradient-to-tr from-[#0D47A1]/12 via-transparent to-[#F57C00]/15" />
            <div className="bg-dots absolute -bottom-8 -right-8 h-40 w-40 opacity-80" />
            <img
              src="/images/hero.png"
              alt="Salaried professional checking instant personal loan approval on phone"
              className="relative w-full rounded-[2.2rem] border border-white object-cover shadow-[0_40px_80px_-30px_rgb(13_71_161/0.4)]"
              loading="eager"
            />

            {/* floating: approved */}
            <div className="animate-floaty absolute -right-3 top-8 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/95 p-3 pr-4 shadow-[0_18px_40px_-14px_rgb(15_23_42/0.3)] backdrop-blur sm:-right-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#2E7D32]">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[13px] font-extrabold text-slate-900">₹5,00,000 Approved</span>
                <span className="block text-[11px] font-semibold text-slate-500">HDFC Bank · 10.9% p.a.</span>
              </span>
            </div>

            {/* floating: EMI */}
            <div className="animate-floaty-slow absolute -left-3 bottom-10 flex items-center gap-3 rounded-2xl border border-blue-100 bg-white/95 p-3 pr-4 shadow-[0_18px_40px_-14px_rgb(15_23_42/0.3)] backdrop-blur sm:-left-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0D47A1]">
                <Landmark className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[13px] font-extrabold text-slate-900">EMI from ₹2,149/mo</span>
                <span className="block text-[11px] font-semibold text-slate-500">12+ lenders compared</span>
              </span>
            </div>

            {/* floating: speed chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -top-4 left-6 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-4 py-2 text-xs font-extrabold text-white shadow-lg shadow-orange-500/30"
            >
              <Timer className="h-3.5 w-3.5" /> Approval in 5 minutes*
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust badges strip ---------- */
const TRUST = [
  { icon: Users, title: "10,000+ Customers", sub: "Assisted across India", color: "text-[#F57C00] bg-orange-50" },
  { icon: Zap, title: "Quick Processing", sub: "Approval in 24–48 hrs", color: "text-[#0D47A1] bg-blue-50" },
  { icon: ShieldCheck, title: "100% Secure", sub: "Encrypted documentation", color: "text-[#2E7D32] bg-green-50" },
  { icon: Landmark, title: "40+ Partners", sub: "Top banks & NBFCs", color: "text-[#0D47A1] bg-blue-50" },
  { icon: Banknote, title: "Fast Disbursal", sub: "Money in 24 hrs*", color: "text-[#F57C00] bg-orange-50" },
];

export function TrustStrip() {
  return (
    <section className="relative z-10 mx-auto -mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grid grid-cols-2 gap-3 rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-[0_24px_70px_-28px_rgb(13_71_161/0.35)] sm:grid-cols-3 lg:grid-cols-5 lg:gap-4 lg:p-5">
          {TRUST.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-slate-50"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${t.color}`}>
                <t.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-extrabold text-slate-900">{t.title}</span>
                <span className="block text-[11.5px] font-semibold text-slate-400">{t.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

