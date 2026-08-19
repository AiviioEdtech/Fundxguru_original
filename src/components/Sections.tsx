import {
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  CreditCard,
  Eye,
  FileCheck2,
  FileText,
  Gauge,
  Headset,
  Home,
  Landmark,
  MessageCircle,
  Percent,
  RefreshCcw,
  Scale,
  SearchCheck,
  Send,
  Shuffle,
  Smartphone,
  TrendingDown,
  UserCheck,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { BankLogo, Reveal, SectionHeader, CTAButton, WA_LINK } from "./ui";
import { articles } from "../data/articles";

/* ================= Loan Products ================= */
export const LOAN_PRODUCTS = [
  {
    slug: "personal",
    anchor: "loan-product-personal",
    icon: Wallet,
    title: "Personal Loan",
    desc: "Unsecured funds for any need — wedding, medical, travel or debt consolidation. No collateral required.",
    rate: "10.49% p.a. onwards",
    c: "#F57C00",
  },
  {
    slug: "business",
    anchor: "loan-product-business",
    icon: Briefcase,
    title: "Business Loan",
    desc: "Working capital or expansion funding for self-employed professionals & business owners.",
    rate: "13.00% p.a. onwards",
    c: "#0D47A1",
  },
  {
    slug: "home",
    anchor: "loan-product-home",
    icon: Home,
    title: "Home Loan",
    desc: "Move your existing home loan to a lower rate and cut years off your repayment.",
    rate: "8.50% p.a. onwards",
    c: "#2E7D32",
  },
  {
    slug: "balance-transfer",
    anchor: "loan-product-balance-transfer",
    icon: ArrowLeftRight,
    title: "Balance Transfer",
    desc: "Move high-interest existing loans or credit card dues into one lower-rate personal loan.",
    rate: "10.49% p.a. onwards",
    c: "#0097A7",
  },
  {
    slug: "lap",
    anchor: "loan-product-lap",
    icon: Building2,
    title: "Loan Against Property",
    desc: "Unlock funds against residential or commercial property at secured-loan rates.",
    rate: "9.25% p.a. onwards",
    c: "#6D28D9",
  },
];

export function LoanProducts() {
  return (
    <section id="loan-products" className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loan Products"
          title={
            <>
              More Than Personal Loans —{" "}
              <span className="text-[#0D47A1]">One Partner for Every Loan Need</span>
            </>
          }
          sub="From everyday expenses to business growth and property-backed funding, we compare offers across loan types so you always get the sharpest rate."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {LOAN_PRODUCTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                id={p.anchor}
                className="group flex h-full scroll-mt-28 flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-14px_rgb(15_23_42/0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-18px_rgb(13_71_161/0.28)]"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `linear-gradient(135deg, ${p.c}, ${p.c}CC)` }}
                >
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-extrabold text-slate-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
                <p className="mt-4 text-[12.5px] font-extrabold text-[#0D47A1]">{p.rate}</p>
                <a
                  href={`/?loan=${p.slug}#eligibility`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#F57C00] transition group-hover:gap-2.5"
                >
                  Check Eligibility <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
          <CTAButton href="/?apply=1" variant="orange">
            Start Step 1 <ArrowRight className="h-4 w-4" />
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
                href="/?apply=1"
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

/* ================= Blog / Resources teaser ================= */
export function BlogTeasers() {
  const latest = articles.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  return (
    <section id="resources" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Resources"
          title={
            <>
              Loan Guides That Help You{" "}
              <span className="text-[#F57C00]">Borrow Smarter</span>
            </>
          }
          sub="Plain-English explainers on credit scores, documentation and choosing the right loan product."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {latest.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={a.slug} delay={i * 0.08}>
                <a
                  href={`/?article=${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-14px_rgb(15_23_42/0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-18px_rgb(13_71_161/0.28)]"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md"
                    style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}CC)` }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-extrabold leading-snug text-slate-900">{a.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">{a.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <span className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {a.readTime}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-extrabold text-[#F57C00] transition group-hover:gap-2">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 text-center">
          <a
            href="/?blog=1"
            className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-[#0D47A1] transition hover:gap-2.5"
          >
            View All Articles <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Loan Consolidation Spotlight ================= */
const CONSOLIDATION_STRATEGIES = [
  {
    icon: ArrowLeftRight,
    title: "Personal Loan Balance Transfer",
    desc: "Move your existing personal loan(s) to a lower-rate lender and save on EMI.",
    tag: "Save up to 4–6% interest p.a.",
    c: "#F57C00",
  },
  {
    icon: CreditCard,
    title: "Credit Card Outstanding to EMI",
    desc: "Convert high-interest (36–42%) credit card dues into a low-EMI personal loan (11–14%).",
    tag: "Save up to 28% interest",
    c: "#0D47A1",
  },
  {
    icon: Smartphone,
    title: "App Loan Closure",
    desc: "Close all your app loans (KreditBee, MoneyTap, etc.) with one consolidated loan.",
    tag: "Improve CIBIL score",
    c: "#2E7D32",
  },
  {
    icon: Shuffle,
    title: "Multiple EMI Consolidation",
    desc: "Convert 3–5 different EMIs into one single, manageable EMI.",
    tag: "Reduce EMI by up to 35%",
    c: "#6D28D9",
  },
];

const CONSOLIDATION_BENEFITS = [
  { icon: Banknote, label: "Lower EMI", sub: "Reduce monthly burden by up to 35%" },
  { icon: Clock, label: "Better Tenure", sub: "Stretch up to 84 months for comfort" },
  { icon: BadgeCheck, label: "Single EMI", sub: "One date, one bank, one EMI" },
  { icon: TrendingDown, label: "Better CIBIL", sub: "Closing multiple loans improves score" },
];

export function LoanConsolidationSpotlight() {
  return (
    <section className="relative z-10 mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0D47A1] to-[#0B3C89] p-6 text-white shadow-[0_24px_60px_-24px_rgb(13_71_161/0.5)] sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-amber-300">
                Loan Consolidation
              </span>
              <h2 className="mt-3.5 text-[1.7rem] font-extrabold leading-[1.2] sm:text-4xl">
                Combine Multiple Loans into <span className="text-[#FFA733]">One Better EMI</span>
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-blue-100/80">
                FundXGuru helps you combine personal loans, credit cards, app loans and multiple EMIs into one
                simple, lower-EMI option — from India's top banks &amp; NBFCs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href="/?loan=balance-transfer#eligibility" variant="white">
                  Check Consolidation Eligibility <ArrowRight className="h-4 w-4" />
                </CTAButton>
                <CTAButton href={WA_LINK} external variant="green">
                  <MessageCircle className="h-4 w-4" /> Talk to Advisor
                </CTAButton>
              </div>
            </div>

            <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/15">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">Real Example</p>
              <div className="mt-3 space-y-2 text-[12.5px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-blue-100/80">3 Personal Loans (avg 18%)</span>
                  <span className="font-bold">₹42,000 EMI</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-blue-100/80">Credit Card Outstanding (38%)</span>
                  <span className="font-bold">₹15,000 EMI</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-blue-100/80">2 App Loans (32%)</span>
                  <span className="font-bold">₹8,000 EMI</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-amber-300">
                  <span className="font-bold">Total Old EMI</span>
                  <span className="font-extrabold">₹65,000</span>
                </div>
                <div className="mt-2 rounded-xl bg-emerald-500/15 p-3 text-emerald-300 ring-1 ring-emerald-400/25">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">After Consolidation (~12%)</span>
                    <span className="font-extrabold">₹38,000</span>
                  </div>
                  <p className="mt-1 text-center text-[13px] font-extrabold">You Save ₹27,000/month!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-wider text-[#0D47A1]">
          Consolidation Types
        </p>
        <h3 className="mt-1 text-center text-[1.4rem] font-extrabold text-slate-900 sm:text-2xl">
          Choose the Right Strategy
        </h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONSOLIDATION_STRATEGIES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_-14px_rgb(15_23_42/0.14)]"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}CC)` }}
              >
                <s.icon className="h-4.5 w-4.5" />
              </span>
              <h4 className="mt-3.5 text-[13.5px] font-extrabold text-slate-900">{s.title}</h4>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{s.desc}</p>
              <span className="mt-3 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-bold text-emerald-700">
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 rounded-2xl bg-slate-50 p-6 sm:p-7">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-wider text-[#2E7D32]">
          Why Consolidate
        </p>
        <h3 className="mt-1 text-center text-[1.2rem] font-extrabold text-slate-900">Benefits at a Glance</h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONSOLIDATION_BENEFITS.map((b) => (
            <div key={b.label} className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0D47A1]">
                <b.icon className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block text-[12.5px] font-extrabold text-slate-900">{b.label}</span>
                <span className="block text-[11px] font-semibold text-slate-500">{b.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
