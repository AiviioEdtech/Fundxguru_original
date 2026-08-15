import { supabase } from "../lib/supabase";

export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  city: string;
  loanType: string;
  amount: string;
  income: string;
  emi: string;
  cibil: string;
  message: string;
  source: string;
  email?: string;
  pan?: string;
  employmentType?: string;
  companyName?: string;
  userId?: string;
}

/**
 * Saves a lead straight into the same Supabase `enquiries` table used by the
 * FundXGuru CRM, so it shows up in the admin dashboard alongside every other
 * lead source. No `.select()` on the insert — an anonymous submitter has no
 * read access to their own just-inserted row (RLS grants read only to the
 * admin), so we build the returned object from what we already know.
 */
export async function saveEnquiry(e: Omit<Enquiry, "id">): Promise<Enquiry> {
  const id = "ENQ-" + Date.now().toString(36).toUpperCase();

  const { error } = await supabase.from("enquiries").insert({
    id,
    created_at: new Date().toISOString(),
    name: e.name,
    mobile: e.mobile,
    city: e.city,
    loan_type: e.loanType,
    amount: e.amount,
    income: e.income,
    emi: e.emi,
    cibil: e.cibil,
    message: e.message,
    source: e.source,
    status: "submitted",
    user_id: e.userId ?? null,
    email: e.email ?? null,
    pan: e.pan ?? null,
    employment_type: e.employmentType ?? null,
    company_name: e.companyName ?? null,
  });

  if (error) throw error;

  return { ...e, id };
}

export async function submitToGoogleSheet(e: Enquiry): Promise<boolean> {
  const url = import.meta.env.VITE_GOOGLE_SHEET_URL;
  if (!url) {
    console.warn("Google Sheets URL is not configured in .env file.");
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        id: e.id,
        name: e.name,
        mobile: e.mobile,
        city: e.city,
        loanType: e.loanType,
        amount: e.amount,
        income: e.income,
        emi: e.emi,
        cibil: e.cibil,
        message: e.message || "",
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.status === "success";
  } catch (err) {
    console.error("Failed to submit to Google Sheet:", err);
    return false;
  }
}
