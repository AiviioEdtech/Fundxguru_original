import { useEffect } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Reveal, SectionHeader } from "../components/ui";
import { articles } from "../data/articles";

export default function BlogIndex() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Loan Guides & Articles | FundXGuru Resources";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF5FF] via-white to-white pb-16 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#F57C00]/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#0D47A1]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FundXGuru Resources"
            title={
              <>
                Loan Guides That Help You{" "}
                <span className="text-[#F57C00]">Borrow Smarter</span>
              </>
            }
            sub="Plain-English explainers on credit scores, documentation and choosing the right loan product — written by our advisory team."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles
              .slice()
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((a, i) => {
                const Icon = a.icon;
                return (
                  <Reveal key={a.slug} delay={Math.min(i * 0.06, 0.3)}>
                    <a
                      href={`/?article=${a.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-14px_rgb(15_23_42/0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-18px_rgb(13_71_161/0.28)]"
                    >
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md"
                        style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}CC)` }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="mt-4 text-[11px] font-extrabold uppercase tracking-wider text-[#0D47A1]">
                        {a.category}
                      </span>
                      <h3 className="mt-2 text-[16px] font-extrabold leading-snug text-slate-900">{a.title}</h3>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">{a.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="flex items-center gap-3 text-[11.5px] font-semibold text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {a.readTime}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-[12px] font-extrabold text-[#F57C00] transition group-hover:gap-2">
                          Read <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
