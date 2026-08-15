import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer, { Contact } from "../components/Footer";
import { CTAButton, Reveal, WA_LINK } from "../components/ui";
import { articles, getArticleBySlug } from "../data/articles";

export default function ArticlePage({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);

  useEffect(() => {
    if (!article) return;
    const prevTitle = document.title;
    document.title = `${article.title} | FundXGuru`;
    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    if (meta) meta.setAttribute("content", article.excerpt);
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-40 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold text-slate-900">Article not found</h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            This article may have been moved or removed.
          </p>
          <a
            href="/?blog=1"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#0D47A1]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const Icon = article.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="relative overflow-hidden bg-gradient-to-b from-[#EFF5FF] via-white to-white pb-16 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#F57C00]/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#0D47A1]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <a
            href="/?blog=1"
            className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-[#0D47A1] transition hover:gap-2.5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white"
              style={{ background: `linear-gradient(135deg, ${article.color}, ${article.color}CC)` }}
            >
              <Icon className="h-3.5 w-3.5" /> {article.category}
            </span>
            <h1 className="mt-4 text-[1.9rem] font-extrabold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[12.5px] font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {article.readTime}
              </span>
            </div>
          </motion.div>

          <Reveal className="prose-fx mt-10 space-y-5">
            {article.blocks.map((b, i) => {
              if (b.type === "h2") {
                return (
                  <h2 key={i} className="!mt-9 text-[19px] font-extrabold text-slate-900 sm:text-[21px]">
                    {b.text}
                  </h2>
                );
              }
              if (b.type === "ul") {
                return (
                  <ul key={i} className="ml-1 space-y-2.5">
                    {b.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F57C00]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[15px] leading-relaxed text-slate-600">
                  {b.text}
                </p>
              );
            })}
          </Reveal>

          <Reveal className="mt-12 rounded-2xl bg-gradient-to-r from-[#0D47A1] to-[#0B3C89] p-6 text-center shadow-[0_24px_60px_-24px_rgb(13_71_161/0.5)]">
            <h3 className="text-lg font-extrabold text-white">Ready to see your actual loan offers?</h3>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-blue-100/85">
              Check your eligibility across 12+ banks &amp; NBFCs in 2 minutes — free, and it never impacts your
              credit score.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <CTAButton href="/#eligibility" variant="orange">
                Check Eligibility <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton href={WA_LINK} external variant="white">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </CTAButton>
            </div>
          </Reveal>

          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                Read Next
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <a
                      key={r.slug}
                      href={`/?article=${r.slug}`}
                      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_-14px_rgb(15_23_42/0.14)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgb(13_71_161/0.28)]"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                        style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}CC)` }}
                      >
                        <RIcon className="h-4 w-4" />
                      </span>
                      <span className="mt-3 text-[13.5px] font-extrabold leading-snug text-slate-900 group-hover:text-[#0D47A1]">
                        {r.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      <Contact />
      <Footer />
    </div>
  );
}
