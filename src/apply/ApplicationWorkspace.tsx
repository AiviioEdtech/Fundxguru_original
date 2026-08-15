import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { CheckCircle2, FileText, UploadCloud } from "lucide-react";
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
  created_at: string;
}

interface DocRow {
  id: string;
  document_type: string;
  file_name: string;
  storage_path: string;
  status: string;
}

const CORE_DOCS = ["Aadhaar", "PAN", "Salary Slip", "Bank Statement"];
const DOC_LABELS: Record<string, string> = {
  Aadhaar: "Aadhaar Card",
  PAN: "PAN Card",
  "Salary Slip": "Last 3 Months' Payslips",
  "Bank Statement": "Last 6 Months' Bank Statement",
};
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
      .select("id, name, mobile, city, loan_type, amount, income, emi, cibil, status, created_at")
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
        loanType: "Personal Loan",
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

  const stage = STATUS_TO_STAGE[enquiry.status?.toLowerCase()] || "Submitted";
  const stageIndex = STAGES.indexOf(stage);
  const isRejected = stage === "Rejected";

  const handleUpload = async (docType: string, file: File) => {
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

    setUploading(docType);
    try {
      const slug = docType.toLowerCase().replace(/\s+/g, "-");
      const storagePath = `${enquiry.id}/${slug}.${ext}`;

      const { error: storeErr } = await supabase.storage
        .from("loan-documents")
        .upload(storagePath, file, { upsert: true, contentType: file.type });
      if (storeErr) throw storeErr;

      const { error: dbErr } = await supabase.from("enquiry_documents").upsert(
        {
          enquiry_id: enquiry.id,
          document_type: docType,
          file_name: file.name,
          storage_path: storagePath,
          file_size: file.size,
          mime_type: file.type,
          status: "Uploaded",
        },
        { onConflict: "enquiry_id,document_type" }
      );
      if (dbErr) throw dbErr;

      onUploaded();
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(null);
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
        {uploadError && <p className="mt-2 text-[12px] font-semibold text-rose-600">{uploadError}</p>}
        <div className="mt-4 space-y-3">
          {CORE_DOCS.map((docType) => {
            const rec = documents.find((d) => d.document_type === docType);
            return (
              <div
                key={docType}
                className="flex flex-col items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-2.5">
                  {rec ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                  ) : (
                    <FileText className="h-4.5 w-4.5 text-slate-300" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-800">{DOC_LABELS[docType] || docType}</p>
                    <p className="text-[11px] font-semibold text-slate-400">{rec ? rec.file_name : "Not uploaded"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {rec && (
                    <button
                      onClick={() => preview(rec.storage_path)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                    >
                      View
                    </button>
                  )}
                  <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0D47A1] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#0B3C89]">
                    <UploadCloud className="h-3.5 w-3.5" />
                    {uploading === docType ? "Uploading…" : rec ? "Replace" : "Upload"}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      disabled={uploading !== null}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(docType, file);
                      }}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
