import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

const GENERIC_SEND_FAILURE = "Unable to send verification code right now. Please try again shortly.";
const GENERIC_VERIFY_FAILURE = "Invalid or expired code. Please request a new one and try again.";

export type SendOtpResult = { ok: true } | { ok: false; message: string };

/**
 * Sends a real OTP via Supabase to the customer's own email. Unlike the admin
 * login, `shouldCreateUser` is left true (default) — any customer should be
 * able to sign up, not just one pre-approved account.
 */
export async function sendCustomerOtp(email: string): Promise<SendOtpResult> {
  try {
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim().toLowerCase() });
    if (error) {
      console.error("signInWithOtp failed:", error);
      return { ok: false, message: GENERIC_SEND_FAILURE };
    }
    return { ok: true };
  } catch (err) {
    console.error("signInWithOtp threw:", err);
    return { ok: false, message: GENERIC_SEND_FAILURE };
  }
}

export type VerifyOtpResult = { ok: true; session: Session } | { ok: false; message: string };

export async function verifyCustomerOtp(email: string, code: string): Promise<VerifyOtpResult> {
  if (!code) return { ok: false, message: GENERIC_VERIFY_FAILURE };

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: "email",
    });
    if (error || !data.session) {
      if (error) console.error("verifyOtp failed:", error);
      return { ok: false, message: GENERIC_VERIFY_FAILURE };
    }
    return { ok: true, session: data.session };
  } catch (err) {
    console.error("verifyOtp threw:", err);
    return { ok: false, message: GENERIC_VERIFY_FAILURE };
  }
}
