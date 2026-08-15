import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { BadgeCheck, Landmark, ShieldCheck, Timer, Wallet } from "lucide-react";
import { supabase } from "../lib/supabase";
import { sendCustomerOtp, verifyCustomerOtp } from "../utils/customerAuth";
import { Logo } from "../components/ui";
import { ApplicationWorkspace } from "./ApplicationWorkspace";

export interface PendingProfile {
  name: string;
  employmentStatus: "Salaried" | "Self Employed";
  salary: string;
  email: string;
  companyName: string;
  phone: string;
  pan: string;
  cibil: string;
}

export default function Apply() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm font-semibold text-slate-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF5FF] via-white to-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#F57C00]/10 blur-3xl" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#0D47A1]/10 blur-3xl" />
        <div className="bg-dots absolute inset-x-0 top-0 h-64 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <header className="relative border-b border-slate-100 bg-white/80 px-4 py-4 backdrop-blur sm:px-8">
        <Logo />
      </header>

      <div className="relative">
        {session ? (
          <ApplicationWorkspace session={session} onSignOut={() => supabase.auth.signOut()} />
        ) : (
          <LoginAndApplyForm />
        )}
      </div>
    </div>
  );
}

function LoginAndApplyForm() {
  const initialSignIn = new URLSearchParams(window.location.search).get("signin") === "1";
  const [mode, setMode] = useState<"apply" | "signin">(initialSignIn ? "signin" : "apply");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [profile, setProfile] = useState<PendingProfile>({
    name: "",
    employmentStatus: "Salaried",
    salary: "",
    email: "",
    companyName: "",
    phone: "",
    pan: "",
    cibil: "Don't know",
  });
  const [consent, setConsent] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignIn = mode === "signin";
  const isSelfEmployed = profile.employmentStatus === "Self Employed";

  const set = <K extends keyof PendingProfile>(key: K, value: PendingProfile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const sendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isSignIn) {
      if (!consent) {
        setError("Please accept the Terms and Privacy Policy to continue.");
        return;
      }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(profile.pan.trim())) {
        setError("Please enter a valid PAN number (e.g. ABCDE1234F).");
        return;
      }
    }
    setLoading(true);
    const result = await sendCustomerOtp(profile.email);
    setLoading(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    // Remember the collected profile for the next step (details + docs) once verified.
    // In sign-in mode this is mostly empty — fine, since a returning customer
    // already has an application and never reaches the "create application" form.
    sessionStorage.setItem("fx_pending_profile", JSON.stringify(profile));
    setStep("otp");
  };

  const verifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await verifyCustomerOtp(profile.email, code);
    setLoading(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    // onAuthStateChange in the parent picks up the session automatically.
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-16">
      {/* Left: benefits */}
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-orange-500/30">
          <Wallet className="h-3.5 w-3.5" /> Loans up to ₹2 Crores
        </span>
        <p className="mt-5 text-sm font-bold uppercase tracking-wider text-[#F57C00]">Start Your</p>
        <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Personal Loan <span className="text-[#0D47A1]">Application</span>
        </h1>

        {/* Hero visual with floating perk badges, matching the homepage hero */}
        <div className="relative mx-auto mt-10 w-full max-w-[380px] lg:mx-0">
          <div className="absolute -inset-4 rotate-2 rounded-[2.4rem] bg-gradient-to-tr from-[#0D47A1]/12 via-transparent to-[#F57C00]/15" />
          <div className="bg-dots absolute -bottom-8 -right-8 h-36 w-36 opacity-80" />
          <img
            src="/images/hero.png"
            alt="Salaried professional checking instant personal loan approval on phone"
            className="relative w-full rounded-[2.2rem] border border-white object-cover shadow-[0_40px_80px_-30px_rgb(13_71_161/0.4)]"
            loading="eager"
          />

          <div className="animate-floaty absolute -right-3 top-6 flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white/95 p-2.5 pr-3.5 shadow-[0_18px_40px_-14px_rgb(15_23_42/0.3)] backdrop-blur sm:-right-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#2E7D32]">
              <BadgeCheck className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[12px] font-extrabold text-slate-900">Instant Approval</span>
              <span className="block text-[10px] font-semibold text-slate-500">No long waits</span>
            </span>
          </div>

          <div className="animate-floaty-slow absolute -left-3 bottom-8 flex items-center gap-2.5 rounded-2xl border border-blue-100 bg-white/95 p-2.5 pr-3.5 shadow-[0_18px_40px_-14px_rgb(15_23_42/0.3)] backdrop-blur sm:-left-7">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0D47A1]">
              <Landmark className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[12px] font-extrabold text-slate-900">Low Interest Rates</span>
              <span className="block text-[10px] font-semibold text-slate-500">Best lender offers</span>
            </span>
          </div>

          <div className="absolute -top-3 left-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-lg shadow-orange-500/30">
            <Timer className="h-3 w-3" /> Flexible Repayment
          </div>
        </div>
      </div>

      {/* Right: form card */}
      <div className="mx-auto w-full max-w-md rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-[0_30px_70px_-26px_rgb(13_71_161/0.25)] sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0D47A1] text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h2 className="mt-4 text-center text-lg font-extrabold text-slate-900">
          {step === "otp"
            ? "Verify your email"
            : isSignIn
              ? "Sign in to track your application"
              : "Get started with your loan application"}
        </h2>
        <p className="mt-1 text-center text-[12.5px] font-medium text-slate-400">
          {step === "otp"
            ? `Enter the code sent to ${profile.email}.`
            : isSignIn
              ? "Enter your email to check your application status."
              : "Get started in minutes — it only takes a few simple steps."}
        </p>

        {step === "form" ? (
          <form onSubmit={sendOtp} className="mt-6 space-y-4">
            {!isSignIn && (
              <div>
                <label className="label">Full Name</label>
                <input
                  required
                  className="input"
                  placeholder="e.g. Rahul Sharma"
                  value={profile.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>
            )}
            {!isSignIn && (
              <div>
                <label className="label">Employment Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Salaried", "Self Employed"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("employmentStatus", opt)}
                      className={`rounded-xl py-2.5 text-sm font-bold transition ${
                        profile.employmentStatus === opt
                          ? "bg-[#0D47A1] text-white"
                          : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {!isSignIn && (
              <div>
                <label className="label">{isSelfEmployed ? "Annual Turnover" : "Monthly Salary"}</label>
                <input
                  type="number"
                  required
                  min={0}
                  className="input"
                  placeholder="₹ 0"
                  value={profile.salary}
                  onChange={(e) => set("salary", e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                required
                className="input"
                placeholder="example@email.com"
                value={profile.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            {!isSignIn && (
              <div>
                <label className="label">{isSelfEmployed ? "Business Name" : "Company Name"}</label>
                <input
                  required
                  className="input"
                  placeholder={isSelfEmployed ? "e.g. My Shop / ABC Traders" : "e.g. Infosys Ltd."}
                  value={profile.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                />
              </div>
            )}
            {!isSignIn && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Phone</label>
                  <input
                    required
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    className="input"
                    placeholder="+91 XXXXXXXXXX"
                    value={profile.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  />
                </div>
                <div>
                  <label className="label">PAN Card</label>
                  <input
                    required
                    maxLength={10}
                    className="input uppercase"
                    placeholder="ABCDE1234F"
                    value={profile.pan}
                    onChange={(e) => set("pan", e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            )}
            {!isSignIn && (
              <div>
                <label className="label">CIBIL Score</label>
                <select className="input" value={profile.cibil} onChange={(e) => set("cibil", e.target.value)}>
                  <option>Don't know</option>
                  <option>750+</option>
                  <option>700-749</option>
                  <option>650-699</option>
                  <option>Below 650</option>
                </select>
              </div>
            )}
            {!isSignIn && (
            <div className="flex items-start gap-2.5">
              <input
                id="apply-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-[#F57C00]"
              />
              <label htmlFor="apply-consent" className="text-[11.5px] font-medium leading-relaxed text-slate-400">
                I accept the <span className="font-bold text-[#0D47A1]">Terms</span> and{" "}
                <span className="font-bold text-[#0D47A1]">Privacy Policy</span>
              </label>
            </div>
            )}
            {error && <p className="text-[12px] font-semibold text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#0B3C89] py-3.5 text-sm font-extrabold text-white transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send OTP →"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(isSignIn ? "apply" : "signin");
                setError("");
              }}
              className="w-full text-center text-[12px] font-semibold text-[#0D47A1] hover:underline"
            >
              {isSignIn ? "New here? Apply for a loan" : "Already have an account? Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-6 space-y-4">
            <div>
              <label className="label">Enter code</label>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={12}
                autoFocus
                className="input text-center tracking-[0.3em]"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {error && <p className="text-[12px] font-semibold text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#0B3C89] py-3.5 text-sm font-extrabold text-white transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setCode("");
                setError("");
              }}
              className="w-full text-center text-[12px] font-semibold text-slate-400 hover:text-slate-600"
            >
              Resend OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
