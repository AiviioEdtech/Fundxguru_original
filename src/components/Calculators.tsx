import { useMemo, useState } from "react";
import { Building2, HandCoins } from "lucide-react";
import { inr, Reveal, SectionHeader } from "./ui";
import { ChatbotEligibility } from "./ChatbotEligibility";

/* ============ shared slider ============ */
function FSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="text-sm font-extrabold text-slate-700">{label}</label>
        <span className="rounded-lg bg-gradient-to-r from-[#0D47A1] to-[#1976D2] px-3.5 py-1.5 text-[13px] font-extrabold text-white shadow-md shadow-blue-900/20">
          {display}
        </span>
      </div>
      <input
        type="range"
        aria-label={label}
        className="fx-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ background: `linear-gradient(90deg, #F57C00 ${pct}%, #E2E8F0 ${pct}%)` }}
      />
      <div className="mt-1.5 flex justify-between text-[11px] font-bold text-slate-400">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/* ================= Eligibility Checker ================= */
export function EligibilityChecker() {
  return (
    <section id="eligibility" className="relative overflow-hidden bg-gradient-to-b from-[#F4F8FF] to-white py-16 sm:py-20">
      <div className="bg-dots absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Eligibility Checker"
          title={
            <>
              Chat with Our <span className="text-[#F57C00]">AI Advisor</span> to Check{" "}
              <span className="text-[#0D47A1]">Eligibility</span>
            </>
          }
          sub="Answer a few quick questions in a live chat and get an instant, personalised loan eligibility report — no documents, no CIBIL impact."
        />

        <Reveal className="mt-12">
          <ChatbotEligibility />
        </Reveal>
      </div>
    </section>
  );
}

/* ================= EMI Calculator ================= */
export function EMICalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(11);
  const [tenure, setTenure] = useState(36);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const r = rate / 1200;
    const e = (amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
    const total = e * tenure;
    return { emi: e, totalPayment: total, totalInterest: total - amount };
  }, [amount, rate, tenure]);

  const interestFrac = totalPayment > 0 ? totalInterest / totalPayment : 0;
  const R = 78;
  const C = 2 * Math.PI * R;

  return (
    <section id="emi-calculator" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="EMI Calculator"
          title={
            <>
              Plan Your <span className="text-[#F57C00]">Monthly EMI</span> Before You Borrow
            </>
          }
          sub="Slide, adjust, and instantly see what your personal loan will really cost you."
        />

        <Reveal className="mt-12">
          <div className="grid gap-10 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_30px_70px_-26px_rgb(15_23_42/0.25)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Controls */}
            <div className="flex flex-col justify-center gap-8">
              <FSlider
                label="Loan Amount"
                value={amount}
                min={50000}
                max={4000000}
                step={10000}
                display={inr(amount)}
                minLabel="₹50K"
                maxLabel="₹40L"
                onChange={setAmount}
              />
              <FSlider
                label="Interest Rate (p.a.)"
                value={rate}
                min={10.5}
                max={24}
                step={0.05}
                display={`${rate.toFixed(2)}%`}
                minLabel="10.5%"
                maxLabel="24%"
                onChange={setRate}
              />
              <FSlider
                label="Tenure"
                value={tenure}
                min={6}
                max={72}
                step={6}
                display={`${tenure} months`}
                minLabel="6 mo"
                maxLabel="72 mo"
                onChange={setTenure}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Quick tenure:</span>
                {[12, 24, 36, 48, 60].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTenure(t)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-extrabold transition ${
                      tenure === t
                        ? "bg-[#0D47A1] text-white shadow-md"
                        : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-[#0D47A1]"
                    }`}
                  >
                    {t} mo
                  </button>
                ))}
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-orange-50 p-4 text-[12.5px] font-semibold leading-relaxed text-[#9A5410] ring-1 ring-orange-100">
                <HandCoins className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#F57C00]" />
                Tip: FundXGuru customers typically get 0.5–1.5% lower rates than direct applications, saving thousands
                in interest.
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center rounded-[1.6rem] bg-gradient-to-b from-slate-50 to-orange-50/50 p-6 ring-1 ring-slate-100 sm:p-8">
              {/* Donut */}
              <div className="relative">
                <svg width="220" height="220" viewBox="0 0 200 200" className="-rotate-90">
                  <circle cx="100" cy="100" r={R} fill="none" stroke="#E2E8F0" strokeWidth="18" />
                  <circle
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke="#0D47A1"
                    strokeWidth="18"
                    strokeLinecap="round"
                    className="donut-seg"
                    strokeDasharray={`${(1 - interestFrac) * C} ${C}`}
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke="#F57C00"
                    strokeWidth="18"
                    strokeLinecap="round"
                    className="donut-seg"
                    strokeDasharray={`${interestFrac * C} ${C}`}
                    strokeDashoffset={-(1 - interestFrac) * C}
                    opacity="0.92"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                    Monthly EMI
                  </span>
                  <span className="mt-1 text-[1.65rem] font-extrabold tracking-tight text-slate-900">{inr(emi)}</span>
                  <span className="text-[11px] font-bold text-slate-400">for {tenure} months</span>
                </div>
              </div>

              <div className="mt-7 grid w-full grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
                  <p className="flex items-center justify-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-[#0D47A1]" /> Principal
                  </p>
                  <p className="mt-1.5 text-[15px] font-extrabold text-slate-800">{inr(amount)}</p>
                </div>
                <div className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
                  <p className="flex items-center justify-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-[#F57C00]" /> Interest
                  </p>
                  <p className="mt-1.5 text-[15px] font-extrabold text-[#E65100]">{inr(totalInterest)}</p>
                </div>
                <div className="col-span-2 rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] p-4 text-center shadow-md">
                  <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-blue-100/80">
                    Total Payment
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-white">{inr(totalPayment)}</p>
                </div>
              </div>

              <a
                href="/?apply=1"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:brightness-105"
              >
                <Building2 className="h-4 w-4" /> Apply at a Lower Rate
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
