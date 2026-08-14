import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { EASE, EMAIL, Logo, PHONE_DISPLAY, PHONE_TEL } from "./ui";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Personal Loan", href: "#personal-loan" },
  { label: "Loan Eligibility", href: "#eligibility" },
  { label: "EMI Calculator", href: "#emi-calculator" },
  { label: "Bank Comparison", href: "#bank-comparison" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-[#081B3F] text-blue-100">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-[11.5px] font-semibold sm:px-6 lg:px-8">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Facilitating loans from RBI-regulated Banks &amp; NBFCs</span>
            <span className="sm:hidden">RBI-regulated lending partners</span>
          </p>
          <div className="flex items-center gap-4">
            <a href={PHONE_TEL} className="flex items-center gap-1.5 transition hover:text-white">
              <Phone className="h-3.5 w-3.5 text-amber-400" /> {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="hidden transition hover:text-white md:inline">
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b bg-white/90 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "border-slate-200 shadow-[0_10px_36px_-18px_rgb(15_23_42/0.25)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-6 xl:px-8">
          <Logo />

          <nav className="hidden items-center gap-px lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="shrink-0 whitespace-nowrap rounded-lg px-2 py-2 text-[12px] font-bold text-slate-600 transition hover:bg-orange-50 hover:text-[#E65100] xl:px-3 xl:text-[13px]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#apply"
              className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-4 py-2.5 text-[13px] font-extrabold text-white shadow-[0_10px_24px_-8px_rgb(245_124_0/0.55)] transition hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex xl:px-5"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
            >
              <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-[#E65100]"
                  >
                    {l.label}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-slate-300" />
                  </motion.a>
                ))}
                <a
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] px-4 py-3.5 text-sm font-extrabold text-white sm:col-span-2"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
