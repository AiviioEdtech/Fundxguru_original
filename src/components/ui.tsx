import { motion } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";

/* ---------- Shared constants ---------- */
export const PHONE_DISPLAY = "+91 74111 11164";
export const PHONE_TEL = "tel:+917411111164";
export const EMAIL = "info@fundxguru.com";
export const WHATSAPP_NUMBER = "919916191789";
export const WA_LINK =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Hi FundXGuru, I want to check my personal loan eligibility.");
export const ADDRESS =
  "No.12, Vedantachari Layout, Revenue Layouts, Singasandra, 8th Cross, Begur Hobli, Bangalore, Karnataka 560068";

export const inr = (n: number) => "\u20B9" + Math.round(n).toLocaleString("en-IN");

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Logo ---------- */
export function Logo({ onClick, dark: _dark = false }: { dark?: boolean; onClick?: () => void }) {
  return (
    <a href="#home" onClick={onClick} className="group flex items-center leading-none">
      <img
        src="/images/fundxguru-logo-cropped.png"
        alt="FundXGuru - Smart Loans. Trusted Guidance."
        className="h-16 w-auto object-contain sm:h-20 lg:h-[76px] xl:h-[84px]"
      />
    </a>
  );
}

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section header ---------- */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  dark = false,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] ring-1 ${
          dark
            ? "bg-white/10 text-amber-300 ring-white/15"
            : "bg-orange-50 text-[#E65100] ring-orange-200"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-[1.7rem] font-extrabold leading-[1.15] tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-[15px] leading-relaxed sm:text-base ${dark ? "text-blue-100/75" : "text-slate-500"}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- CTA buttons ---------- */
export function CTAButton({
  children,
  href,
  variant = "orange",
  className = "",
  external = false,
  onClick,
}: {
  children: ReactNode;
  href: string;
  variant?: "orange" | "blue" | "green" | "white";
  className?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const styles: Record<string, string> = {
    orange:
      "bg-gradient-to-r from-[#FB8C00] to-[#EF6C00] text-white shadow-[0_12px_30px_-8px_rgb(245_124_0/0.55)] hover:shadow-[0_16px_36px_-8px_rgb(245_124_0/0.65)] hover:brightness-[1.03]",
    blue: "bg-gradient-to-r from-[#0D47A1] to-[#1976D2] text-white shadow-[0_12px_30px_-8px_rgb(13_71_161/0.5)] hover:brightness-110",
    green:
      "bg-white text-[#1E7B34] ring-2 ring-[#2E7D32]/30 hover:bg-green-50 hover:ring-[#2E7D32]/60 shadow-[0_10px_26px_-12px_rgb(46_125_50/0.5)]",
    white: "bg-white text-[#0D47A1] shadow-xl hover:bg-blue-50",
  };
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/* ---------- Bank monogram tile ---------- */
export function Monogram({ short, color, size = "md" }: { short: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-9 w-9 text-[11px] rounded-lg",
    md: "h-11 w-11 text-xs rounded-xl",
    lg: "h-12 w-12 text-[13px] rounded-xl",
  };
  return (
    <span
      className={`flex shrink-0 items-center justify-center font-extrabold tracking-tight text-white shadow-sm ${sizes[size]}`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}
    >
      {short}
    </span>
  );
}

/* ---------- Bank logo tile (real logo image, falls back to monogram) ---------- */
export function BankLogo({
  short,
  color,
  logoUrl,
  alt,
  size = "md",
}: {
  short: string;
  color: string;
  logoUrl?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  if (!logoUrl || failed) return <Monogram short={short} color={color} size={size} />;

  const sizes = {
    sm: "h-9 w-9 rounded-lg p-1.5",
    md: "h-11 w-11 rounded-xl p-1.5",
    lg: "h-12 w-12 rounded-xl p-2",
  };
  return (
    <span className={`flex shrink-0 items-center justify-center border border-slate-100 bg-white shadow-sm ${sizes[size]}`}>
      <img
        src={logoUrl}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-contain"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
