import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { CheckCircle2, FileText, Plus, Send, UploadCloud, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { saveEnquiry } from "../utils/enquiry";
import type { PendingProfile } from "./Apply";

interface EnquiryRow {
  id: string;
  name: string;
  mobile: string;
  city: string;
  loan_type: string;
  amount: string;
  income: string;
  emi: string;
  cibil: string;
  status: string;
  email: string | null;
  created_at: string;
}

interface DocRow {
  id: string;
  document_type: string;
  file_name: string;
  storage_path: string;
  status: string;
}

interface DocConfig {
  key: string;
  label: string;
  multiple: boolean;
}

const LOAN_TYPES = ["Personal Loan", "Business Loan", "Home Loan", "Balance Transfer", "Loan Against Property"];

const DOC_CONFIGS: Record<string, DocConfig[]> = {
  "Personal Loan": [
    { key: "Aadhaar", label: "Aadhaar Card", multiple: false },
    { key: "PAN", label: "PAN Card", multiple: false },
    { key: "Salary Slip", label: "Salary Slips (add each month)", multiple: true },
    { key: "Bank Statement", label: "Bank Statements (add each month)", multiple: true },
  ],
  "Balance Transfer": [
    { key: "Aadhaar", label: "Aadhaar Card", multiple: false },
    { key: "PAN", label: "PAN Card", multiple: false },
    { key: "Salary Slip", label: "Salary Slips (add each month)", multiple: true },
    { key: "Bank Statement", label: "Bank Statements (add each month)", multiple: true },
    { key: "Existing Loan Statement", label: "Existing Loan Statement", multiple: true },
  ],
  "Business Loan": [
    { key: "Aadhaar", label: "Aadhaar Card", multiple: false },
    { key: "PAN", label: "PAN Card", multiple: false },
    { key: "Bank Statement", label: "Business Bank Statements (add each month)", multiple: true },
    { key: "GST Certificate", label: "GST Registration Certificate", multiple: false },
    { key: "Udyam Certificate", label: "Udyam / MSME Registration", multiple: false },
    { key: "ITR", label: "Income Tax Returns (add each year)", multiple: true },
  ],
  "Home Loan": [
    { key: "Aadhaar", label: "Aadhaar Card", multiple: false },
    { key: "PAN", label: "PAN Card", multiple: false },
    { key: "Salary Slip", label: "Salary Slips (add each month)", multiple: true },
    { key: "Bank Statement", label: "Bank Statements (add each month)", multiple: true },
    { key: "Property Documents", label: "Property Papers", multiple: true },
  ],
  "Loan Against Property": [
    { key: "Aadhaar", label: "Aadhaar Card", multiple: false },
    { key: "PAN", label: "PAN Card", multiple: false },
    { key: "Bank Statement", label: "Bank Statements (add each month)", multiple: true },
    { key: "Property Documents", label: "Property Papers / Valuation", multiple: true },
  ],
};
const OTHER_DOC_TYPE = "Other";
const STAGES = ["Submitted", "Under Review", "Document Verification", "Approved", "Disbursed"];
const STATUS_TO_STAGE: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  document_verification: "Document Verification",
  approved: "Approved",
  disbursed: "Disbursed",
  rejected: "Rejected",
};

export function ApplicationWorkspace({ session, onSignOut }: { session: Session; onSignOut: () => void }) {
  const [loading, setLoading] = useState(true);
  const [enquiry, setEnquiry] = useState<EnquiryRow | null>(null);
  const [documents, setDocuments] = useState<DocRow[]>([]);

  const load = async () => {
    setLoading(true);
    const { data: enq } = await supabase
      .from("enquiries")
      .select("id, name, mobile, city, loan_type, amount, income, emi, cibil, status, email, created_at")
      .eq("user_id", session.user.id)
      .limit(1)
      .maybeSingle();

    setEnquiry(enq as EnquiryRow | null);

    if (enq) {
      const { data: docs } = await supabase
        .from("enquiry_documents")
        .select("id, document_type, file_name, storage_path, status")
        .eq("enquiry_id", enq.id);
      setDocuments((docs as DocRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.user.id]);

  if (loading) {
    return <p className="p-10 text-center text-sm font-semibold text-slate-400">Loading your application…</p>;
  }

  return (
    <div className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-gradient-to-b from-[#E4EEFF] via-[#F4F8FF] to-[#FFF6EC]">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-100" />
      <div className="pointer-events-none absolute -right-16 top-32 h-96 w-96 rounded-full bg-[#0D47A1]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-96 w-96 rounded-full bg-[#F57C00]/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2E7D32]/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-slate-900">My Applications</h1>
          <button
            onClick={onSignOut}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Sign out
          </button>
        </div>

        {!enquiry ? (
          <CreateApplicationForm session={session} onCreated={load} />
        ) : (
          <TrackingView enquiry={enquiry} documents={documents} onUploaded={load} />
        )}
      </div>
    </div>
  );
}

function CreateApplicationForm({ session, onCreated }: { session: Session; onCreated: () => void }) {
  const pending: Partial<PendingProfile> = JSON.parse(sessionStorage.getItem("fx_pending_profile") || "{}");

  const [city, setCity] = useState("");
  const [loanType, setLoanType] = useState("Personal Loan");
  const [amount, setAmount] = useState("");
  const [emi, setEmi] = useState("0");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await saveEnquiry({
        name: pending.name || "Applicant",
        mobile: pending.phone || "",
        city,
        loanType,
        amount,
        income: pending.salary || "0",
        emi,
        cibil: pending.cibil || "Don't know",
        message: `Apply Now application. Employment: ${pending.employmentStatus || "N/A"}.`,
        source: "Apply Now",
        email: pending.email,
        pan: pending.pan,
        employmentType: pending.employmentStatus,
        companyName: pending.companyName,
        userId: session.user.id,
      });
      sessionStorage.removeItem("fx_pending_profile");
      onCreated();
    } catch (err: any) {
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-extrabold text-slate-900">A few more details</h2>
      <p className="mt-1 text-[12.5px] font-medium text-slate-400">Almost there — just the loan specifics.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="label">City</label>
          <input required className="input" placeholder="e.g. Bangalore" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label className="label">Loan Type</label>
          <select className="input" value={loanType} onChange={(e) => setLoanType(e.target.value)}>
            {LOAN_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Loan Amount Required (₹)</label>
          <input
            type="number"
            required
            min={10000}
            className="input"
            placeholder="e.g. 500000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Existing EMI (₹/month)</label>
          <input type="number" min={0} className="input" value={emi} onChange={(e) => setEmi(e.target.value)} />
        </div>
        {error && <p className="text-[12px] font-semibold text-rose-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] py-3.5 text-sm font-extrabold text-white transition hover:brightness-105 disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

function TrackingView({
  enquiry,
  documents,
  onUploaded,
}: {
  enquiry: EnquiryRow;
  documents: DocRow[];
  onUploaded: () => void;
}) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [submittingDocs, setSubmittingDocs] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const stage = STATUS_TO_STAGE[enquiry.status?.toLowerCase()] || "Submitted";
  const stageIndex = STAGES.indexOf(stage);
  const isRejected = stage === "Rejected";
  const docVerificationIndex = STAGES.indexOf("Document Verification");
  const docConfig = DOC_CONFIGS[enquiry.loan_type] || DOC_CONFIGS["Personal Loan"];
  const allDocsUploaded = docConfig.every((c) => documents.some((d) => d.document_type === c.key));
  const alreadySubmittedForReview = stageIndex >= docVerificationIndex;
  const otherDocs = documents.filter((d) => d.document_type === OTHER_DOC_TYPE);

  const handleSubmitForReview = async () => {
    setSubmitError("");
    setSubmittingDocs(true);
    try {
      const { error: updErr } = await supabase
        .from("enquiries")
        .update({ status: "document_verification" })
        .eq("id", enquiry.id)
        .select()
        .single();
      if (updErr) throw updErr;

      fetch("https://formsubmit.co/ajax/info@fundxguru.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Documents submitted for review — ${enquiry.name} (${enquiry.id})`,
          "Enquiry ID": enquiry.id,
          Name: enquiry.name,
          Mobile: enquiry.mobile,
          "Loan Type": enquiry.loan_type,
          Amount: enquiry.amount,
          Message: "Customer has uploaded all required documents and submitted the application for review.",
        }),
      }).catch(() => {});

      if (enquiry.email) {
        fetch("/api/notify-customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: enquiry.email, name: enquiry.name }),
        }).catch(() => {});
      }

      onUploaded();
    } catch (err: any) {
      setSubmitError(err.message || "Could not submit. Please try again.");
    } finally {
      setSubmittingDocs(false);
    }
  };

  const handleUpload = async (docType: string, file: File, multiple: boolean) => {
    setUploadError("");
    const maxSize = 5 * 1024 * 1024;
    const allowedExt = ["pdf", "jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (file.size > maxSize) {
      setUploadError("File exceeds 5MB limit.");
      return;
    }
    if (!allowedExt.includes(ext)) {
      setUploadError("Only PDF, JPG, and PNG files are allowed.");
      return;
    }

    const uploadKey = multiple ? `${docType}-new` : docType;
    setUploading(uploadKey);
    try {
      const slug = docType.toLowerCase().replace(/\s+/g, "-");
      const suffix = `-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
      const storagePath = `${enquiry.id}/${slug}${suffix}.${ext}`;

      const { error: storeErr } = await supabase.storage
        .from("loan-documents")
        .upload(storagePath, file, { contentType: file.type });
      if (storeErr) throw storeErr;

      if (!multiple) {
        // Single-slot doc: remove any previous file(s) of this type so only one remains.
        const existing = documents.filter((d) => d.document_type === docType);
        if (existing.length > 0) {
          await supabase.storage.from("loan-documents").remove(existing.map((d) => d.storage_path));
          await supabase.from("enquiry_documents").delete().eq("enquiry_id", enquiry.id).eq("document_type", docType);
        }
      }

      const { error: dbErr } = await supabase.from("enquiry_documents").insert({
        enquiry_id: enquiry.id,
        document_type: docType,
        file_name: file.name,
        storage_path: storagePath,
        file_size: file.size,
        mime_type: file.type,
        status: "Uploaded",
      });
      if (dbErr) throw dbErr;

      onUploaded();
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  const handleRemove = async (doc: DocRow) => {
    setUploadError("");
    try {
      await supabase.storage.from("loan-documents").remove([doc.storage_path]);
      const { error: delErr } = await supabase.from("enquiry_documents").delete().eq("id", doc.id);
      if (delErr) throw delErr;
      onUploaded();
    } catch (err: any) {
      setUploadError(err.message || "Could not remove file. Please try again.");
    }
  };

  const preview = async (storagePath: string) => {
    const { data } = await supabase.storage.from("loan-documents").createSignedUrl(storagePath, 600);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Application ID: {enquiry.id}</p>
        <h2 className="mt-1 text-xl font-extrabold text-slate-900">{enquiry.loan_type}</h2>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Amount: <span className="text-slate-800">₹{Number(enquiry.amount).toLocaleString("en-IN")}</span> · Applied on{" "}
          {new Date(enquiry.created_at).toLocaleDateString("en-IN")}
        </p>
      </div>

      {/* Status stepper */}
      <div className="rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Application Status</h3>
        {isRejected ? (
          <p className="mt-4 rounded-xl bg-rose-50 p-4 text-sm font-bold text-rose-700">
            This application was not approved. Contact our advisor to discuss next steps.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {STAGES.slice(0, 5).map((s, i) => {
              const done = i < stageIndex;
              const active = i === stageIndex;
              return (
                <div
                  key={s}
                  className={`rounded-xl border p-3 text-center text-[11px] font-bold ${
                    active
                      ? "border-[#0D47A1] bg-blue-50 text-[#0D47A1]"
                      : done
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-100 text-slate-400"
                  }`}
                >
                  {done ? "✓ " : active ? "● " : ""}
                  {s}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="rounded-[1.6rem] border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Documents</h3>
        <p className="mt-1 text-[11.5px] font-semibold text-slate-400">Required for {enquiry.loan_type}</p>
        {uploadError && <p className="mt-2 text-[12px] font-semibold text-rose-600">{uploadError}</p>}
        <div className="mt-4 space-y-3">
          {docConfig.map((c) => {
            const recs = documents.filter((d) => d.document_type === c.key);
            const uploadKey = c.multiple ? `${c.key}-new` : c.key;
            return (
              <div key={c.key} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2.5">
                    {recs.length > 0 ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                    ) : (
                      <FileText className="h-4.5 w-4.5 text-slate-300" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-800">{c.label}</p>
                      <p className="text-[11px] font-semibold text-slate-400">
                        {recs.length === 0
                          ? "Not uploaded"
                          : c.multiple
                            ? `${recs.length} file${recs.length === 1 ? "" : "s"} uploaded`
                            : recs[0].file_name}
                      </p>
                    </div>
                  </div>
                  {!c.multiple && (
                    <div className="flex items-center gap-2">
                      {recs[0] && (
                        <button
                          onClick={() => preview(recs[0].storage_path)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                        >
                          View
                        </button>
                      )}
                      <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0D47A1] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#0B3C89]">
                        <UploadCloud className="h-3.5 w-3.5" />
                        {uploading === c.key ? "Uploading…" : recs[0] ? "Replace" : "Upload"}
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          disabled={uploading !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(c.key, file, false);
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {c.multiple && (
                  <div className="mt-3 space-y-2">
                    {recs.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-100"
                      >
                        <p className="truncate text-[11.5px] font-semibold text-slate-600">{rec.file_name}</p>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            onClick={() => preview(rec.storage_path)}
                            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[10.5px] font-bold text-slate-600 hover:bg-slate-100"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleRemove(rec)}
                            className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            aria-label="Remove file"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-[#0D47A1]/40 px-3 py-1.5 text-[11px] font-bold text-[#0D47A1] hover:bg-blue-50">
                      <Plus className="h-3.5 w-3.5" />
                      {uploading === uploadKey ? "Uploading…" : "Add Another"}
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        disabled={uploading !== null}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(c.key, file, true);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Other documents — anything not covered by the required list above */}
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4">
          <p className="text-sm font-bold text-slate-800">Other Documents</p>
          <p className="text-[11px] font-semibold text-slate-400">
            Anything else your advisor asked for — optional
          </p>
          <div className="mt-3 space-y-2">
            {otherDocs.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-100"
              >
                <p className="truncate text-[11.5px] font-semibold text-slate-600">{rec.file_name}</p>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => preview(rec.storage_path)}
                    className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[10.5px] font-bold text-slate-600 hover:bg-slate-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleRemove(rec)}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Remove file"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-[#0D47A1]/40 px-3 py-1.5 text-[11px] font-bold text-[#0D47A1] hover:bg-blue-50">
              <Plus className="h-3.5 w-3.5" />
              {uploading === `${OTHER_DOC_TYPE}-new` ? "Uploading…" : "Add Document"}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                disabled={uploading !== null}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(OTHER_DOC_TYPE, file, true);
                }}
              />
            </label>
          </div>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          {alreadySubmittedForReview ? (
            <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3.5 text-sm font-bold text-emerald-700">
              <CheckCircle2 className="h-4.5 w-4.5" /> Documents submitted — your application is under review.
            </p>
          ) : allDocsUploaded ? (
            <>
              {submitError && <p className="mb-2 text-[12px] font-semibold text-rose-600">{submitError}</p>}
              <button
                onClick={handleSubmitForReview}
                disabled={submittingDocs}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] py-3.5 text-sm font-extrabold text-white transition hover:brightness-105 disabled:opacity-60"
              >
                <Send className="h-4 w-4" /> {submittingDocs ? "Submitting…" : "Submit Documents for Review"}
              </button>
            </>
          ) : (
            <p className="text-center text-[12.5px] font-semibold text-slate-400">
              Upload all {docConfig.length} required documents above to submit your application for review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
