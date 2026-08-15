import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Logo } from "../components/ui";
import { Dashboard } from "./Dashboard";

// Only this exact email can ever sign in — enforced two ways:
// 1. Client-side check here, for instant feedback without hitting the network.
// 2. `shouldCreateUser: false` on signInWithOtp, so Supabase refuses to even
//    send an OTP to any email that doesn't already have a pre-created account.
// You must pre-create exactly one user with this email in the Supabase
// dashboard (Authentication -> Users -> Add user) for login to work at all.
const ADMIN_EMAIL = "fundxguru5@gmail.com";

export default function Admin() {
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

  // Fail closed: even if a session exists, it must belong to the one allowed admin email.
  if (session && session.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return <Dashboard onSignOut={() => supabase.auth.signOut()} adminEmail={ADMIN_EMAIL} />;
  }

  return <Login adminEmail={ADMIN_EMAIL} loggedInAsWrongUser={!!session} />;
}

function Login({ adminEmail, loggedInAsWrongUser }: { adminEmail: string; loggedInAsWrongUser: boolean }) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim().toLowerCase();
    if (trimmed !== adminEmail.toLowerCase()) {
      setError("This email is not authorised for admin access.");
      return;
    }
    setLoading(true);
    const { error: otpErr } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { shouldCreateUser: false },
    });
    setLoading(false);
    if (otpErr) {
      setError(otpErr.message || "Could not send the code. Make sure this account exists in Supabase.");
      return;
    }
    setStep("otp");
  };

  const verifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: verifyErr } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: "email",
    });
    setLoading(false);
    if (verifyErr) {
      setError(verifyErr.message || "Invalid or expired code.");
      return;
    }
    // onAuthStateChange in the parent picks up the new session automatically.
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#EFF5FF] via-white to-white p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#F57C00]/10 blur-3xl" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#0D47A1]/10 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-[#2E7D32]/8 blur-3xl" />
        <div className="bg-dots absolute inset-x-0 top-0 h-full opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_30px_70px_-26px_rgb(13_71_161/0.25)]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0D47A1]">
              <ShieldCheck className="h-4.5 w-4.5" />
            </span>
            <h1 className="text-lg font-extrabold text-slate-900">Admin Access</h1>
          </div>
          <p className="mt-3 text-[13px] text-slate-400">
            {step === "email" ? "Sign in with your authorised email." : `Enter the code sent to ${email}.`}
          </p>

        {loggedInAsWrongUser && (
          <p className="mt-4 rounded-lg bg-rose-50 p-3 text-[12px] font-semibold text-rose-700">
            You're signed in with an account that isn't authorised for this dashboard. Sign in with the correct email
            below.
          </p>
        )}

        {step === "email" ? (
          <form onSubmit={requestOtp} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                className="input"
                placeholder="you@fundxguru.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-[12px] font-semibold text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#0B3C89] py-3 text-sm font-extrabold text-white transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send login code"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="admin-otp">
                Verification code
              </label>
              <input
                id="admin-otp"
                type="text"
                inputMode="numeric"
                required
                maxLength={12}
                className="input text-center tracking-[0.3em]"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                autoFocus
              />
            </div>
            {error && <p className="text-[12px] font-semibold text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#0B3C89] py-3 text-sm font-extrabold text-white transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify & sign in"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setError("");
              }}
              className="w-full text-center text-[12px] font-semibold text-slate-400 hover:text-slate-600"
            >
              Use a different email
            </button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
}
