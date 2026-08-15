import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  CalendarDays,
  Download,
  FileCheck2,
  FileText,
  LogOut,
  Pencil,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "document_verification", label: "Document Verification" },
  { value: "approved", label: "Approved" },
  { value: "disbursed", label: "Disbursed" },
  { value: "rejected", label: "Rejected" },
];

interface EnquiryRow {
  id: string;
  created_at: string;
  name: string;
  mobile: string;
  city: string;
  loan_type: string;
  amount: string;
  income: string;
  emi: string;
  cibil: string;
  message: string;
  status: string;
  source: string | null;
}

interface DocRow {
  id: string;
  enquiry_id: string;
  document_type: string;
  file_name: string;
  storage_path: string;
}

const SOURCE_STYLES: Record<string, string> = {
  "AI Chatbot": "bg-violet-50 text-violet-700",
  "Enquiry Form": "bg-blue-50 text-[#0D47A1]",
  "Popup Offer": "bg-orange-50 text-[#E65100]",
  "Apply Now": "bg-emerald-50 text-emerald-700",
};
const sourceStyle = (s: string) => SOURCE_STYLES[s] || "bg-slate-100 text-slate-600";

const STATUS_STYLES: Record<string, string> = {
  submitted: "bg-blue-50 text-[#0D47A1]",
  under_review: "bg-amber-50 text-amber-700",
  document_verification: "bg-violet-50 text-violet-700",
  approved: "bg-emerald-50 text-emerald-700",
  disbursed: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-50 text-rose-700",
};
const statusLabel = (s: string) => STATUS_OPTIONS.find((o) => o.value === s?.toLowerCase())?.label || s || "Submitted";
const statusStyle = (s: string) => STATUS_STYLES[s?.toLowerCase()] || "bg-slate-100 text-slate-600";

function monthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(key: string) {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}
function matchesDateFilter(r: EnquiryRow, filter: string) {
  if (filter === "all") return true;
  const d = new Date(r.created_at);
  const now = new Date();
  if (filter === "today") return d.toDateString() === now.toDateString();
  if (filter === "7d") return d >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return monthKey(r.created_at) === filter;
}

export function Dashboard({ onSignOut, adminEmail }: { onSignOut: () => void; adminEmail: string }) {
  const [rows, setRows] = useState<EnquiryRow[] | null>(null);
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [error, setError] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [docsModalFor, setDocsModalFor] = useState<EnquiryRow | null>(null);
  const [editModalFor, setEditModalFor] = useState<EnquiryRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setError("");
    const [enquiriesRes, docsRes] = await Promise.all([
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("enquiry_documents").select("id, enquiry_id, document_type, file_name, storage_path"),
    ]);
    if (enquiriesRes.error) {
      setError(enquiriesRes.error.message);
      return;
    }
    setRows(enquiriesRes.data as EnquiryRow[]);
    setDocs((docsRes.data as DocRow[]) || []);
  };

  useEffect(() => {
    load();
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const docCountFor = (enquiryId: string) => docs.filter((d) => d.enquiry_id === enquiryId).length;

  const handleDelete = async (row: EnquiryRow) => {
    if (!window.confirm(`Delete the lead "${row.name}"? This permanently removes their enquiry and uploaded documents. This cannot be undone.`)) {
      return;
    }
    setDeletingId(row.id);
    try {
      const relatedDocs = docs.filter((d) => d.enquiry_id === row.id);
      if (relatedDocs.length > 0) {
        await supabase.storage.from("loan-documents").remove(relatedDocs.map((d) => d.storage_path));
        await supabase.from("enquiry_documents").delete().eq("enquiry_id", row.id);
      }
      const { error: delErr } = await supabase.from("enquiries").delete().eq("id", row.id);
      if (delErr) {
        setError(delErr.message);
        return;
      }
      setRows((prev) => (prev ? prev.filter((r) => r.id !== row.id) : prev));
      setDocs((prev) => prev.filter((d) => d.enquiry_id !== row.id));
    } finally {
      setDeletingId(null);
    }
  };

  const sources = ["All", ...Array.from(new Set((rows || []).map((r) => r.source || "Unknown")))];

  const monthOptions = useMemo(() => {
    const set = new Set<string>();
    (rows || []).forEach((r) => set.add(monthKey(r.created_at)));
    return Array.from(set).sort().reverse();
  }, [rows]);

  const filtered = (rows || []).filter((r) => {
    if (sourceFilter !== "All" && (r.source || "Unknown") !== sourceFilter) return false;
    if (!matchesDateFilter(r, dateFilter)) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      if (!(r.name?.toLowerCase().includes(q) || r.mobile?.includes(q) || r.city?.toLowerCase().includes(q))) {
        return false;
      }
    }
    return true;
  });

  const stats = useMemo(() => {
    const all = rows || [];
    const currentMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
    return {
      total: all.length,
      today: all.filter((r) => matchesDateFilter(r, "today")).length,
      thisMonth: all.filter((r) => monthKey(r.created_at) === currentMonth).length,
      withDocs: all.filter((r) => docCountFor(r.id) > 0).length,
    };
  }, [rows, docs]);

  const STAT_CARDS = [
    { label: "Total Leads", value: stats.total, icon: Users, color: "#0D47A1" },
    { label: "Today", value: stats.today, icon: CalendarDays, color: "#F57C00" },
    { label: "This Month", value: stats.thisMonth, icon: CalendarDays, color: "#2E7D32" },
    { label: "With Documents", value: stats.withDocs, icon: FileCheck2, color: "#6D28D9" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F57C00] to-[#0D47A1] text-white shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">FundXGuru Admin Dashboard</h1>
            <p className="text-[12px] font-semibold text-slate-400">Signed in as {adminEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </header>

      <main className="p-6">
        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {STAT_CARDS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}CC)` }}
                >
                  <s.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-xl font-extrabold text-slate-900">{s.value}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-1.5">
            {sources.map((s) => (
              <button
                key={s}
                onClick={() => setSourceFilter(s)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                  sourceFilter === s ? "bg-[#0D47A1] text-white" : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, mobile, city…"
                className="rounded-lg border border-slate-200 py-2 pl-8 pr-3 text-[12px] font-semibold text-slate-700 outline-none focus:border-[#0D47A1]"
              />
            </div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-bold text-slate-600 outline-none focus:border-[#0D47A1]"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              {monthOptions.map((m) => (
                <option key={m} value={m}>
                  {monthLabel(m)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {filtered.length} lead{filtered.length === 1 ? "" : "s"} shown
          </span>
        </div>

        {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}

        {rows === null && !error ? (
          <p className="text-sm font-semibold text-slate-400">Loading leads…</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead>
                <tr className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Loan Type</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Income</th>
                  <th className="px-4 py-3">CIBIL</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Documents</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const count = docCountFor(r.id);
                  return (
                    <tr
                      key={r.id}
                      className={`border-b border-slate-100 last:border-0 hover:bg-blue-50/40 ${
                        i % 2 === 1 ? "bg-slate-50/50" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-[12px] text-slate-500">
                        {new Date(r.created_at).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${sourceStyle(r.source || "Unknown")}`}>
                          {r.source || "Unknown"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{r.name}</td>
                      <td className="px-4 py-3">{r.mobile}</td>
                      <td className="px-4 py-3">{r.city}</td>
                      <td className="px-4 py-3">{r.loan_type}</td>
                      <td className="px-4 py-3">{r.amount}</td>
                      <td className="px-4 py-3">{r.income}</td>
                      <td className="px-4 py-3">{r.cibil}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyle(r.status)}`}>
                          {statusLabel(r.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setDocsModalFor(r)}
                          disabled={count === 0}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${
                            count > 0
                              ? "bg-[#0D47A1] text-white hover:bg-[#0B3C89]"
                              : "cursor-not-allowed bg-slate-100 text-slate-400"
                          }`}
                        >
                          <FileText className="h-3.5 w-3.5" /> {count > 0 ? `View (${count})` : "None"}
                        </button>
                      </td>
                      <td className="max-w-[220px] truncate px-4 py-3 text-[12px] text-slate-400" title={r.message}>
                        {r.message}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditModalFor(r)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-blue-50 hover:text-[#0D47A1]"
                            aria-label="Edit lead"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(r)}
                            disabled={deletingId === r.id}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                            aria-label="Delete lead"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={13} className="px-4 py-10 text-center text-sm font-semibold text-slate-400">
                      No leads match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {docsModalFor && (
        <DocumentsModal
          enquiry={docsModalFor}
          documents={docs.filter((d) => d.enquiry_id === docsModalFor.id)}
          onClose={() => setDocsModalFor(null)}
        />
      )}

      {editModalFor && (
        <EditLeadModal
          enquiry={editModalFor}
          onClose={() => setEditModalFor(null)}
          onSaved={(updated) => {
            setRows((prev) => (prev ? prev.map((r) => (r.id === updated.id ? updated : r)) : prev));
            setEditModalFor(null);
          }}
        />
      )}
    </div>
  );
}

async function downloadDocument(storagePath: string, fileName: string) {
  const { data, error } = await supabase.storage.from("loan-documents").createSignedUrl(storagePath, 300);
  if (error || !data?.signedUrl) {
    alert("Could not generate a download link. Please try again.");
    return;
  }
  const res = await fetch(data.signedUrl);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

function DocumentsModal({
  enquiry,
  documents,
  onClose,
}: {
  enquiry: EnquiryRow;
  documents: DocRow[];
  onClose: () => void;
}) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (doc: DocRow) => {
    setDownloading(doc.id);
    try {
      await downloadDocument(doc.storage_path, doc.file_name);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">{enquiry.name}'s Documents</h3>
            <p className="text-[12px] font-semibold text-slate-400">{enquiry.id}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-slate-800">{doc.document_type}</p>
                <p className="truncate text-[11px] font-semibold text-slate-400">{doc.file_name}</p>
              </div>
              <button
                onClick={() => handleDownload(doc)}
                disabled={downloading === doc.id}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0D47A1] px-3 py-2 text-[11px] font-bold text-white hover:bg-[#0B3C89] disabled:opacity-60"
              >
                <Download className="h-3.5 w-3.5" /> {downloading === doc.id ? "…" : "Download"}
              </button>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="py-4 text-center text-sm font-semibold text-slate-400">No documents uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function EditLeadModal({
  enquiry,
  onClose,
  onSaved,
}: {
  enquiry: EnquiryRow;
  onClose: () => void;
  onSaved: (updated: EnquiryRow) => void;
}) {
  const [form, setForm] = useState({
    name: enquiry.name || "",
    mobile: enquiry.mobile || "",
    city: enquiry.city || "",
    loan_type: enquiry.loan_type || "",
    amount: enquiry.amount || "",
    income: enquiry.income || "",
    cibil: enquiry.cibil || "",
    status: STATUS_OPTIONS.some((o) => o.value === enquiry.status?.toLowerCase())
      ? enquiry.status.toLowerCase()
      : "submitted",
    message: enquiry.message || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const { data, error: updErr } = await supabase
      .from("enquiries")
      .update(form)
      .eq("id", enquiry.id)
      .select()
      .single();
    setSaving(false);
    if (updErr) {
      setError(updErr.message);
      return;
    }
    onSaved(data as EnquiryRow);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Edit Lead</h3>
            <p className="text-[12px] font-semibold text-slate-400">{enquiry.id}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3.5">
          <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
            <label className="label">Application Status</label>
            <select className="input" value={form.status} onChange={set("status")}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[11px] font-semibold text-[#0D47A1]">
              This is what the customer sees on their "My Applications" tracking page.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Name</label>
              <input className="input" value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label className="label">Mobile</label>
              <input className="input" value={form.mobile} onChange={set("mobile")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">City</label>
              <input className="input" value={form.city} onChange={set("city")} />
            </div>
            <div>
              <label className="label">Loan Type</label>
              <input className="input" value={form.loan_type} onChange={set("loan_type")} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Amount</label>
              <input className="input" value={form.amount} onChange={set("amount")} />
            </div>
            <div>
              <label className="label">Income</label>
              <input className="input" value={form.income} onChange={set("income")} />
            </div>
            <div>
              <label className="label">CIBIL</label>
              <input className="input" value={form.cibil} onChange={set("cibil")} />
            </div>
          </div>

          <div>
            <label className="label">Notes / Message</label>
            <textarea className="input" rows={3} value={form.message} onChange={set("message")} />
          </div>

          {error && <p className="text-[12px] font-semibold text-rose-600">{error}</p>}

          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#0B3C89] py-3 text-sm font-extrabold text-white transition hover:brightness-105 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
