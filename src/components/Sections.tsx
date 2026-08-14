import {
  ArrowLeftRight,
  Banknote,
  Eye,
  FileCheck2,
  FileText,
  Gauge,
  Headset,
  Landmark,
  Percent,
  RefreshCcw,
  Scale,
  SearchCheck,
  Send,
  Shuffle,
  TrendingDown,
  UserCheck,
  Users,
  Zap,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { BankLogo, Reveal, SectionHeader, CTAButton } from "./ui";

/* ================= Partner Banks ================= */
const BANKS = [
  {
    name: "ICICI Bank",
    short: "IC",
    color: "#F58220",
    type: "Private Bank",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/ICICI%20Bank%20Logo.svg",
  },
  {
    name: "HDFC Bank",
    short: "HD",
    color: "#004C8F",
    type: "Private Bank",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/HDFC-Bank-Logo.svg",
  },
  {
    name: "Axis Bank",
    short: "AX",
    color: "#97144D",
    type: "Private Bank",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/AXISBank%20Logo.svg",
  },
  {
    name: "Kotak Mahindra Bank",
    short: "KM",
    color: "#EE3124",
    type: "Private Bank",
    logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Kotak%20Mahindra%20Bank%20logo.svg",
  },
  {
    name: "IDFC FIRST Bank",
    short: "ID",
    color: "#9A1D27",
    type: "Private Bank",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo%20of%20IDFC%20First%20Bank.svg",
  },
  {
    name: "Yes Bank",
    short: "YB",
    color: "#00518F",
    type: "Private Bank",
    logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Yes%20Bank%20logo.svg",
  },
  {
    name: "IndusInd Bank",
    short: "IN",
    color: "#9E2B25",
    type: "Private Bank",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/IndusInd%20Bank%20SVG%20Logo.svg",
  },
  {
    name: "Federal Bank",
    short: "FB",
    color: "#B8860B",
    type: "Private Bank",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Federal%20bank.logo.svg",
  },
  {
    name: "Bajaj Finance",
    short: "BF",
    color: "#0072BB",
    type: "NBFC",
    logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Bajaj_Finance_Logo_2025.svg",
  },
  {
    name: "Tata Capital",
    short: "TC",
    color: "#1B4F9C",
    type: "NBFC",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Tata_Capital_Logo-01.jpg",
  },
  {
    name: "Poonawalla Fincorp",
    short: "PF",
    color: "#1C2B4A",
    type: "NBFC",
    logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Poonawalla-Fincorp-Logo.jpg",
  },
  {
    name: "Aditya Birla Finance",
    short: "AB",
    color: "#C7002B",
    type: "NBFC",
    logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Aditya%20Birla%20Group%20Logo.svg",
  },
];

export function PartnerBanks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Lending Partners"
          title={
            <>
              Compare Offers from <span className="text-[#0D47A1]">12+ Leading</span>{" "}
              <span className="text-[#F57C00]">Banks &amp; NBFCs</span>
            </>
          }
          sub="We take your single application to multiple top lenders and negotiate the sharpest rate for your profile."
        />
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {BANKS.map((b, i) => (
            <Reveal key={b.name} delay={Math.min(i * 0.045, 0.4)}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-[0_8px_30px_-14px_rgb(15_23_42/0.15)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-[0_20px_44px_-16px_rgb(245_124_0/0.28)]">
                <BankLogo short={b.short} color={b.color} logoUrl={b.logoUrl} alt={`${b.name} logo`} size="lg" />
                <div>
                  <p className="text-[13px] font-extrabold leading-tight text-slate-800">{b.name}</p>
                  <p className="mt-1 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">{b.type}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/60 px-5 py-2.5 text-[13px] font-bold text-[#0D47A1]">
            <Landmark className="h-4 w-4" /> + 30 more banks &amp; NBFCs in our lending network
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Why Choose FundXGuru ================= */
const WHY = [
  { icon: Scale, title: "Compare Multiple Banks", desc: "One application matched against 12+ top lenders so you never overpay.", c: "#F57C00" },
  { icon: UserCheck, title: "Expert Loan Guidance", desc: "Seasoned advisors decode fine print, charges and eligibility for you.", c: "#0D47A1" },
  { icon: TrendingDown, title: "Lower EMI Options", desc: "We hunt for longer tenures and better rates to shrink your monthly EMI.", c: "#2E7D32" },
  { icon: Zap, title: "Quick Approval Assistance", desc: "In-principle approvals in minutes with pre-matched lender offers.", c: "#F57C00" },
  { icon: FileText, title: "Minimal Documentation", desc: "Digital KYC and income proof — most cases need zero physical paperwork.", c: "#0D47A1" },
  { icon: SearchCheck, title: "Transparent Process", desc: "Every rate, fee and charge disclosed upfront. No surprises, ever.", c: "#2E7D32" },
  { icon: Headset, title: "Dedicated Relationship Manager", desc: "A single expert owns your file from enquiry to disbursal.", c: "#0D47A1" },
  { icon: Banknote, title: "Fast Loan Disbursal", desc: "Money reaches your account in as little as 24 hours post approval.", c: "#F57C00" },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
      <div className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Choose FundXGuru"
          title={
            <>
              India's Smarter Way to Get a <span className="text-[#F57C00]">Personal Loan</span>
            </>
          }
          sub="We don't lend you money — we fight to get you the best deal from those who do."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={Math.min(i * 0.05, 0.35)}>
              <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-14px_rgb(15_23_42/0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-18px_rgb(13_71_161/0.28)]">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `linear-gradient(135deg, ${w.c}, ${w.c}CC)` }}
                >
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-extrabold text-slate-900">{w.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= How It Works ================= */
const STEPS = [
  { icon: Send, title: "Submit Loan Request", desc: "Fill our 2-minute form or ping us on WhatsApp.", c: "#F57C00" },
  { icon: Gauge, title: "Eligibility Check", desc: "We instantly assess your income, CIBIL & obligations.", c: "#0D47A1" },
  { icon: Shuffle, title: "Compare Bank Offers", desc: "See live, personalised quotes from multiple lenders.", c: "#2E7D32" },
  { icon: FileCheck2, title: "Document Verification", desc: "Share docs digitally — we verify & package your file.", c: "#0D47A1" },
  { icon: BadgeCheck, title: "Loan Approval", desc: "Lender issues sanction — often the same day.", c: "#F57C00" },
  { icon: Banknote, title: "Disbursement", desc: "Amount credited straight to your bank account.", c: "#2E7D32" },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How It Works"
          title={
            <>
              Application to Money in Your Account —{" "}
              <span className="text-[#0D47A1]">in 6 Simple Steps</span>
            </>
          }
          sub="Most FundXGuru customers go from enquiry to disbursal within 24–48 working hours."
        />
        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          <div className="absolute left-0 right-0 top-9 hidden border-t-2 border-dashed border-slate-200 lg:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <span
                    className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl text-white shadow-[0_14px_30px_-10px_rgb(15_23_42/0.35)] ring-4 ring-white"
                    style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}CC)` }}
                  >
                    <s.icon className="h-7 w-7" />
                  </span>
                  <span className="absolute -right-2 -top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-extrabold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-[13.5px] font-extrabold text-slate-900">{s.title}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <CTAButton href="#apply" variant="orange">
            Start Step 1 — It's Free <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Benefits ================= */
const BENEFITS = [
  { icon: Percent, title: "Low Interest Rates", desc: "Rates starting 10.75% p.a. for strong profiles — we negotiate on your behalf.", c: "#F57C00" },
  { icon: Zap, title: "Instant Eligibility Check", desc: "Know how much you can borrow in under 60 seconds — no CIBIL impact.", c: "#0D47A1" },
  { icon: Landmark, title: "Multiple Bank Offers", desc: "ICICI, HDFC, Axis, Kotak, IDFC FIRST & more compete for your loan.", c: "#2E7D32" },
  { icon: FileCheck2, title: "Quick Documentation", desc: "Digital-first process — upload from your phone in minutes.", c: "#0D47A1" },
  { icon: Eye, title: "No Hidden Guidance Charges", desc: "Our advisory is 100% free for you. We're compensated by lenders.", c: "#2E7D32" },
  { icon: RefreshCcw, title: "Flexible EMI Options", desc: "Tenures from 6 to 72 months — align repayment with your cash flow.", c: "#F57C00" },
  { icon: Users, title: "Professional Support", desc: "Human experts on call, chat & WhatsApp — not bots.", c: "#0D47A1" },
];

export function Benefits() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50/70 via-white to-blue-50/70" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Benefits"
          title={
            <>
              Everything You Expect from a{" "}
              <span className="text-[#F57C00]">Premium Loan Partner</span>
            </>
          }
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={Math.min(i * 0.05, 0.35)}>
              <div className="h-full rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-[0_8px_30px_-14px_rgb(15_23_42/0.14)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-18px_rgb(245_124_0/0.3)]">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: `linear-gradient(135deg, ${b.c}, ${b.c}CC)` }}
                  >
                    <b.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="text-[14.5px] font-extrabold leading-tight text-slate-900">{b.title}</h3>
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">{b.desc}</p>
              </div>
            </Reveal>
          ))}
          {/* CTA tile completes the grid */}
          <Reveal delay={0.36}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-[#0D47A1] to-[#081B3F] p-6 text-white shadow-[0_22px_48px_-18px_rgb(13_71_161/0.5)]">
              <div>
                <ArrowLeftRight className="h-6 w-6 text-amber-300" />
                <h3 className="mt-3 text-lg font-extrabold leading-snug">Ready to compare your live offers?</h3>
              </div>
              <a
                href="#apply"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-4 py-3 text-[13px] font-extrabold text-white transition hover:brightness-110"
              >
                Check Now — Free <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= About Us ================= */
const STATS = [
  { value: "10,000+", label: "Customers Assisted" },
  { value: "₹650 Cr+", label: "Disbursals Facilitated" },
  { value: "12+", label: "Lending Partners" },
  { value: "4.8/5", label: "Customer Rating" },
];

export function AboutUs() {
  return (
    <section id="about" className="bg-slate-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 -rotate-1 rounded-[2.2rem] bg-gradient-to-tr from-[#F57C00]/15 to-[#0D47A1]/15" />
              <img
                src="/images/about.jpg"
                alt="FundXGuru loan advisors helping customers compare bank offers"
                className="relative w-full rounded-[2rem] border border-white object-cover shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 shadow-[0_20px_50px_-18px_rgb(15_23_42/0.35)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FB8C00] to-[#EF6C00] text-white">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[15px] font-extrabold text-slate-900">35+ Years Combined</p>
                  <p className="text-[11.5px] font-semibold text-slate-400">Banking &amp; lending expertise</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeader
              center={false}
              eyebrow="About FundXGuru"
              title={
                <>
                  Your Trusted <span className="text-[#0D47A1]">Personal Loan</span>{" "}
                  <span className="text-[#F57C00]">Advisory Partner</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-500">
                FundXGuru is a Bengaluru-based loan facilitation and advisory platform built by ex-bankers. We are not a
                lender — we are your advocate. Our team compares live offers from India's top banks and NBFCs,
                structures your application for the highest approval odds, and negotiates rates most borrowers never
                see on their own.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
                Whether it's a wedding, medical need, debt consolidation or a big purchase, one FundXGuru enquiry puts
                multiple lenders to work — so you always borrow at your best possible rate.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3.5">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.12 + i * 0.06}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <p className="bg-gradient-to-r from-[#0D47A1] to-[#1976D2] bg-clip-text text-2xl font-extrabold text-transparent">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[12px] font-bold text-slate-500">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
