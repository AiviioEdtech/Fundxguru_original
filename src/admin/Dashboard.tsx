import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

export function Dashboard({ onSignOut, adminEmail }: { onSignOut: () => void; adminEmail: string }) {
  const [rows, setRows] = useState<EnquiryRow[] | null>(null);
  const [error, setError] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");

  const load = async () => {
    setError("");
    const { data, error: err } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      setError(err.message);
      return;
    }
    setRows(data as EnquiryRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const sources = ["All", ...Array.from(new Set((rows || []).map((r) => r.source || "Unknown")))];
  const filtered = rows?.filter((r) => sourceFilter === "All" || (r.source || "Unknown") === sourceFilter) ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900">FundXGuru Admin Dashboard</h1>
          <p className="text-[12px] font-semibold text-slate-400">Signed in as {adminEmail}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Refresh
          </button>
          <button
            onClick={onSignOut}
            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {filtered.length} lead{filtered.length === 1 ? "" : "s"}
          </span>
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
        </div>

        {error && <p className="mb-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}

        {rows === null && !error ? (
          <p className="text-sm font-semibold text-slate-400">Loading leads…</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
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
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 text-[12px] text-slate-500">
                      {new Date(r.created_at).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#0D47A1]">
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
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                        {r.status}
                      </span>
                    </td>
                    <td className="max-w-[280px] truncate px-4 py-3 text-[12px] text-slate-400" title={r.message}>
                      {r.message}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-sm font-semibold text-slate-400">
                      No leads yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
