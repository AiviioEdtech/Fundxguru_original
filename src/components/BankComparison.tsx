import { ArrowRight, Info } from "lucide-react";
import { BankLogo, Reveal, SectionHeader } from "./ui";

type Row = { label: string; a: string; b: string };
type Pair = {
  a: { name: string; short: string; color: string; logoUrl?: string };
  b: { name: string; short: string; color: string; logoUrl?: string };
  rows: Row[];
};

const HDFC = { name: "HDFC Bank", short: "HD", color: "#004C8F", logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/HDFC-Bank-Logo.svg" };
const ICICI = { name: "ICICI Bank", short: "IC", color: "#F58220", logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/ICICI%20Bank%20Logo.svg" };
const AXIS = { name: "Axis Bank", short: "AX", color: "#97144D", logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/AXISBank%20Logo.svg" };
const KOTAK = { name: "Kotak Mahindra", short: "KM", color: "#EE3124", logoUrl: "https://en.wikipedia.org/wiki/Special:FilePath/Kotak%20Mahindra%20Bank%20logo.svg" };
const IDFC_FIRST = { name: "IDFC FIRST Bank", short: "ID", color: "#9A1D27", logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo%20of%20IDFC%20First%20Bank.svg" };
const TATA_CAPITAL = { name: "Tata Capital", short: "TC", color: "#1B4F9C", logoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Tata_Capital_Logo-01.jpg" };

const PAIRS: Pair[] = [
  {
    a: HDFC,
    b: ICICI,
    rows: [
      { label: "Interest Rate", a: "10.90% p.a. onwards", b: "10.85% p.a. onwards" },
      { label: "Processing Fee", a: "Up to ₹6,500 + GST", b: "Up to 2% of amount + GST" },
      { label: "Maximum Tenure", a: "72 months", b: "72 months" },
      { label: "Part Payment", a: "After 12 EMIs · up to 25% p.a.", b: "Allowed after 12 EMIs" },
      { label: "Foreclosure", a: "After 12 EMIs · up to 4%", b: "Up to 3% + GST of POS" },
      { label: "Approval Speed", a: "10 sec* in-principle (pre-approved)", b: "Instant for select customers" },
      { label: "Documentation", a: "Minimal · KYC + income proof", b: "Minimal · digital for select profiles" },
    ],
  },
  {
    a: ICICI,
    b: AXIS,
    rows: [
      { label: "Interest Rate", a: "10.85% p.a. onwards", b: "11.25% p.a. onwards" },
      { label: "Processing Fee", a: "Up to 2% of amount + GST", b: "Up to 2% + GST" },
      { label: "Maximum Tenure", a: "72 months", b: "60 months" },
      { label: "Part Payment", a: "Allowed after 12 EMIs", b: "Allowed · nominal charges" },
      { label: "Foreclosure", a: "Up to 3% + GST of POS", b: "Up to 3% of POS" },
      { label: "Approval Speed", a: "Instant for select customers", b: "24–48 hrs typical" },
      { label: "Documentation", a: "Minimal · digital journey", b: "KYC + salary slips + statements" },
    ],
  },
  {
    a: AXIS,
    b: KOTAK,
    rows: [
      { label: "Interest Rate", a: "11.25% p.a. onwards", b: "10.99% p.a. onwards" },
      { label: "Processing Fee", a: "Up to 2% + GST", b: "Up to 3% + GST" },
      { label: "Maximum Tenure", a: "60 months", b: "60 months" },
      { label: "Part Payment", a: "Allowed · nominal charges", b: "After 12 months · charges apply" },
      { label: "Foreclosure", a: "Up to 3% of POS", b: "Up to 4% of POS" },
      { label: "Approval Speed", a: "24–48 hrs typical", b: "Same-day for select profiles" },
      { label: "Documentation", a: "KYC + income + bank statements", b: "Minimal · digital KYC" },
    ],
  },
  {
    a: KOTAK,
    b: IDFC_FIRST,
    rows: [
      { label: "Interest Rate", a: "10.99% p.a. onwards", b: "10.75% p.a. onwards" },
      { label: "Processing Fee", a: "Up to 3% + GST", b: "Up to 3.5% + GST" },
      { label: "Maximum Tenure", a: "60 months", b: "60 months" },
      { label: "Part Payment", a: "After 12 months · charges apply", b: "After 6 EMIs · charges may apply" },
      { label: "Foreclosure", a: "Up to 4% of POS", b: "Up to 4% + GST" },
      { label: "Approval Speed", a: "Same-day for select profiles", b: "Digital · as fast as 30 min*" },
      { label: "Documentation", a: "Minimal · digital KYC", b: "100% paperless for most profiles" },
    ],
  },
  {
    a: HDFC,
    b: TATA_CAPITAL,
    rows: [
      { label: "Interest Rate", a: "10.90% p.a. onwards", b: "10.99% p.a. onwards" },
      { label: "Processing Fee", a: "Up to ₹6,500 + GST", b: "Up to 2.75% + GST" },
      { label: "Maximum Tenure", a: "72 months", b: "72 months" },
      { label: "Part Payment", a: "After 12 EMIs · up to 25% p.a.", b: "Up to 25% once a year" },
      { label: "Foreclosure", a: "After 12 EMIs · up to 4%", b: "Approx. 4.5% of POS" },
      { label: "Approval Speed", a: "10 sec* in-principle (pre-approved)", b: "24–72 hrs typical" },
      { label: "Documentation", a: "Minimal · KYC + income proof", b: "Flexible · alt. proofs considered" },
    ],
  },
];

export default function BankComparison() {
  return (
    <section id="bank-comparison" className="bg-slate-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Bank Comparison"
          title={
            <>
              Head-to-Head: <span className="text-[#0D47A1]">Top Lenders</span>{" "}
              <span className="text-[#F57C00]">Compared</span>
            </>
          }
          sub="A transparent side-by-side view of the most popular personal loan pairs our customers compare."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PAIRS.map((p, idx) => (
            <Reveal key={idx} delay={Math.min(idx * 0.05, 0.2)} className={idx === PAIRS.length - 1 ? "lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-[calc(50%-0.75rem)]" : ""}>
              <div className="h-full overflow-hidden rounded-[1.6rem] border border-slate-200/70 bg-white shadow-[0_16px_44px_-20px_rgb(15_23_42/0.22)] transition hover:shadow-[0_24px_56px_-22px_rgb(13_71_161/0.3)]">
                {/* header */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <BankLogo short={p.a.short} color={p.a.color} logoUrl={p.a.logoUrl} alt={`${p.a.name} logo`} size="sm" />
                    <span className="text-[13px] font-extrabold leading-tight text-slate-800">{p.a.name}</span>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FB8C00] to-[#EF6C00] text-[11px] font-extrabold text-white shadow-md shadow-orange-500/30">
                    VS
                  </span>
                  <div className="flex items-center justify-end gap-2.5 text-right">
                    <span className="text-[13px] font-extrabold leading-tight text-slate-800">{p.b.name}</span>
                    <BankLogo short={p.b.short} color={p.b.color} logoUrl={p.b.logoUrl} alt={`${p.b.name} logo`} size="sm" />
                  </div>
                </div>
                {/* rows */}
                <div>
                  {p.rows.map((r, i) => (
                    <div key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <p className="px-4 pt-2.5 text-center text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        {r.label}
                      </p>
                      <div className="grid grid-cols-2 divide-x divide-slate-100 px-2 pb-3 pt-1">
                        <p className="px-3 text-center text-[12.5px] font-bold leading-snug text-slate-700">{r.a}</p>
                        <p className="px-3 text-center text-[12.5px] font-bold leading-snug text-slate-700">{r.b}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#apply"
                  className="group flex items-center justify-center gap-2 border-t border-slate-100 py-3.5 text-[13px] font-extrabold text-[#E65100] transition hover:bg-orange-50"
                >
                  Get personalised quotes from both
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex items-start gap-3.5 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Info className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-amber-900">Important Note</p>
              <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-amber-800/90">
                Bank policies, interest rates and charges are subject to change. Final terms depend on customer
                eligibility and lender policy. The figures above are indicative starting terms for salaried profiles
                and may differ from the personalised offer you receive.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
