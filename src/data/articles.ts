import type { LucideIcon } from "lucide-react";
import { Building2, CreditCard, FileCheck2, RefreshCcw, TrendingUp } from "lucide-react";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  icon: LucideIcon;
  color: string;
  blocks: ArticleBlock[];
}

export const articles: Article[] = [
  {
    slug: "improve-cibil-score-before-loan",
    title: "How to Improve Your CIBIL Score Before Applying for a Loan",
    excerpt:
      "Your CIBIL score decides your interest rate as much as your income does. Here's what actually moves the number — and what doesn't.",
    category: "Credit Score",
    readTime: "5 min read",
    date: "2026-06-02",
    icon: TrendingUp,
    color: "#2E7D32",
    blocks: [
      {
        type: "p",
        text: "Lenders in India rely heavily on your CIBIL score (or an equivalent bureau score from Experian, Equifax or CRIF High Mark) to decide whether to approve your loan and at what interest rate. A score of 750+ typically unlocks the best rates; anything below 650 makes most banks reject the application outright, pushing you toward costlier NBFC options. The good news is that the score responds to a handful of specific, controllable habits.",
      },
      { type: "h2", text: "1. Pay every EMI and credit card bill on time" },
      {
        type: "p",
        text: "Payment history is the single largest factor in your score. Even one payment more than 30 days late can pull your score down noticeably and stays on your report for years. If you tend to forget due dates, set up auto-debit (NACH) on every loan and credit card so a missed payment becomes structurally hard.",
      },
      { type: "h2", text: "2. Keep credit card usage below 30% of your limit" },
      {
        type: "p",
        text: "Using ₹27,000 of a ₹30,000 credit limit every month signals financial stress to the bureau, even if you pay it off in full. Try to keep your running utilisation under 30%, and if you clear a large expense on the card, pay it down before the statement date rather than waiting for the due date.",
      },
      { type: "h2", text: "3. Don't apply to multiple lenders in a short window" },
      {
        type: "p",
        text: "Every loan or credit card application triggers a 'hard enquiry' on your report. Three or four hard enquiries within a few months make you look credit-hungry and can shave points off your score — separate from whether those applications were approved or rejected. This is exactly why FundXGuru runs one soft-pull eligibility check across 12+ lenders instead of you applying to each bank individually.",
      },
      { type: "h2", text: "4. Maintain a healthy mix and don't close your oldest accounts" },
      {
        type: "ul",
        items: [
          "A mix of secured (home/auto/LAP) and unsecured (personal loan/credit card) credit is viewed more favourably than only one type.",
          "Closing your oldest credit card shortens your average credit history age — keep it open and use it lightly instead.",
          "Check your report every few months on the official CIBIL, Experian or CRIF site for errors — incorrect 'settled' or 'written-off' tags from an old account are more common than most people expect, and disputing them can recover 30–50+ points.",
        ],
      },
      { type: "h2", text: "5. Reduce your overall EMI-to-income ratio before applying" },
      {
        type: "p",
        text: "Even with a good score, most lenders cap total EMI obligations (existing + new) at 50–60% of monthly income. If you're close to that ceiling, closing a small existing loan or a buy-now-pay-later balance a month or two before applying can materially improve both your approval odds and the rate you're offered.",
      },
      {
        type: "p",
        text: "None of these changes are instant — meaningful score movement usually takes 2–3 credit cycles (2–3 months) to reflect. If you need funds sooner, a FundXGuru advisor can tell you upfront which lenders are realistic for your current score band, so you're not rejected and hard-enquiry-penalised by a bank that was never going to approve you.",
      },
    ],
  },
  {
    slug: "personal-loan-vs-credit-card",
    title: "Personal Loan vs Credit Card: Which Should You Choose?",
    excerpt:
      "Both give you money fast. They're priced and structured very differently — picking the wrong one for the wrong expense can cost you tens of thousands.",
    category: "Comparison",
    readTime: "4 min read",
    date: "2026-06-18",
    icon: CreditCard,
    color: "#F57C00",
    blocks: [
      {
        type: "p",
        text: "A personal loan and a credit card can both fund the same expense — a wedding, a medical bill, a large purchase — but the way you pay for that convenience is fundamentally different, and picking the wrong tool is one of the most common ways people overpay on interest.",
      },
      { type: "h2", text: "Interest rates: not close" },
      {
        type: "p",
        text: "Personal loans in India typically run 10.5%–18% per annum depending on your profile. Credit cards charge 3–3.5% per month on revolved balances — that's 36–42% annualised. Carrying ₹2 lakh on a credit card for a year at 42% costs roughly ₹84,000 in interest alone; the same amount as a personal loan at 12% costs about ₹24,000 over the same tenure. For any amount you can't clear within one billing cycle, a personal loan is almost always cheaper.",
      },
      { type: "h2", text: "When a credit card genuinely wins" },
      {
        type: "ul",
        items: [
          "You can pay the full statement within the interest-free grace period (typically 20–50 days) — then the card is effectively a free short-term loan.",
          "You want reward points, cashback or airline miles on a purchase you were making anyway.",
          "The amount is small and one-off, where a loan's processing fee and paperwork aren't worth it.",
        ],
      },
      { type: "h2", text: "When a personal loan wins" },
      {
        type: "ul",
        items: [
          "The expense is large (typically ₹1 lakh+) and you need more than a couple of months to repay it.",
          "You want a fixed EMI and a fixed end date, rather than an open-ended revolving balance that's easy to let grow.",
          "You're already carrying a credit card balance — consolidating it into a personal loan (debt consolidation) usually cuts the effective interest rate by more than half.",
        ],
      },
      {
        type: "p",
        text: "If you're currently juggling a high-interest credit card balance, that's specifically what our 'Balance Transfer / Loan Consolidation' option in the eligibility checker is built for — most customers cut their effective monthly outgo noticeably by moving from card interest to a personal loan EMI.",
      },
    ],
  },
  {
    slug: "personal-loan-documents-checklist",
    title: "Documents Required for a Personal Loan in India — 2026 Checklist",
    excerpt:
      "Missing or mismatched documents is the #1 reason personal loan applications get delayed. Here's the exact list, by employment type.",
    category: "Application Guide",
    readTime: "3 min read",
    date: "2026-07-05",
    icon: FileCheck2,
    color: "#0D47A1",
    blocks: [
      {
        type: "p",
        text: "Documentation requirements vary slightly by lender, but nearly every bank and NBFC in India asks for proof across the same four categories: identity, address, income and photograph. Having these ready before you apply — and making sure the name and address match exactly across all of them — is the single biggest lever for a fast approval.",
      },
      { type: "h2", text: "Identity & address proof (any one, all applicants)" },
      {
        type: "ul",
        items: [
          "PAN card (mandatory for all loan applications, regardless of amount)",
          "Aadhaar card",
          "Passport, Voter ID, or Driving Licence (accepted as secondary ID/address proof by most lenders)",
        ],
      },
      { type: "h2", text: "For salaried applicants" },
      {
        type: "ul",
        items: [
          "Last 3 months' salary slips",
          "Last 6 months' bank statement (the account where salary is credited)",
          "Form 16 or latest ITR (some lenders require this above a certain loan amount)",
          "Employment ID card / offer letter (for applicants with less than 1 year at current employer)",
        ],
      },
      { type: "h2", text: "For self-employed applicants" },
      {
        type: "ul",
        items: [
          "Last 2 years' ITR with computation of income",
          "Last 12 months' bank statement (current/savings, business account)",
          "Business proof — GST registration, Udyam/MSME certificate, shop & establishment licence, or partnership deed, depending on business structure",
          "Audited financials (P&L and balance sheet) for higher loan amounts",
        ],
      },
      { type: "h2", text: "One photograph and a cancelled cheque" },
      {
        type: "p",
        text: "Almost every lender also asks for a recent passport-size photograph and a cancelled cheque or bank passbook copy for the account where the disbursed amount will be credited.",
      },
      {
        type: "p",
        text: "Digital KYC (Aadhaar-based e-KYC) has made physical paperwork optional for most salaried profiles with mainstream lenders — in many cases the entire process, from document upload to e-sign, can be completed from your phone in under 20 minutes. When you apply through FundXGuru, your relationship manager tells you upfront exactly which documents your specific matched lenders need, so you upload once instead of chasing paperwork separately for each bank.",
      },
    ],
  },
  {
    slug: "home-loan-balance-transfer-explained",
    title: "Home Loan Balance Transfer: When Does It Actually Save You Money?",
    excerpt:
      "Moving your home loan to a new lender for a lower rate sounds like free money — but transfer costs and remaining tenure change the math completely.",
    category: "Home Loan",
    readTime: "5 min read",
    date: "2026-07-22",
    icon: RefreshCcw,
    color: "#6D28D9",
    blocks: [
      {
        type: "p",
        text: "A home loan balance transfer (BT) moves your outstanding loan from your current lender to a new one offering a lower interest rate. On paper, even a 0.5–1% rate cut sounds like an easy win on a 15–20 year loan. In practice, whether it's worth doing depends on three numbers most borrowers never check before switching.",
      },
      { type: "h2", text: "1. How much tenure is actually left" },
      {
        type: "p",
        text: "Home loan EMIs are front-loaded with interest — you pay mostly interest in the early years and mostly principal in the later years. A balance transfer resets that curve on the new loan. If you're already 10+ years into a 15-year loan, you're past the interest-heavy phase, and a BT can actually cost you more in total interest even at a lower rate, because you restart the amortisation schedule. BT makes the most sense in the first third to half of your loan tenure.",
      },
      { type: "h2", text: "2. The real cost of switching" },
      {
        type: "ul",
        items: [
          "Processing fee on the new loan (typically 0.5%–1% of the outstanding amount)",
          "Legal, technical and property valuation charges at the new lender",
          "MODT / mortgage re-registration and stamp duty in some states",
          "Foreclosure charges on the old loan — RBI has banned these on floating-rate home loans, so this is usually zero, but always confirm your loan type",
        ],
      },
      {
        type: "p",
        text: "As a rule of thumb, the total switching cost needs to be recovered within 12–18 months of interest savings for the transfer to be clearly worthwhile — beyond that, run the actual numbers rather than assuming.",
      },
      { type: "h2", text: "3. Whether you can also do a 'top-up'" },
      {
        type: "p",
        text: "Many lenders let you combine a balance transfer with a top-up loan at the same (lower) home loan rate — useful if you also need funds for renovation, a child's education or another large expense. Since a top-up rides on the home loan rate, it's typically far cheaper than taking a separate personal loan for the same purpose.",
      },
      {
        type: "p",
        text: "The quickest way to know if a transfer actually pays off for your specific loan is to run the exact numbers rather than compare headline rates — that's what a FundXGuru advisor does before recommending a switch, factoring in your remaining tenure, outstanding principal and the new lender's total fees.",
      },
    ],
  },
  {
    slug: "business-loan-vs-loan-against-property",
    title: "Business Loan vs Loan Against Property: Which Funding Fits You?",
    excerpt:
      "Need funds for your business? An unsecured business loan and a property-backed LAP solve the same problem very differently — here's how to choose.",
    category: "Business Funding",
    readTime: "4 min read",
    date: "2026-08-04",
    icon: Building2,
    color: "#0D47A1",
    blocks: [
      {
        type: "p",
        text: "Self-employed professionals and business owners raising funds usually choose between an unsecured business loan and a Loan Against Property (LAP). Both can fund working capital or expansion, but they differ sharply on speed, cost, amount and risk.",
      },
      { type: "h2", text: "Business loan: faster, smaller, costlier" },
      {
        type: "p",
        text: "An unsecured business loan needs no collateral, is typically disbursed within a few days, and is sized against your business's cash flow and ITR-declared income — usually up to ₹40–75 lakh depending on turnover and profile. Because the lender is taking pure credit risk with no asset backing, rates run higher, roughly 13%–18% per annum, and tenures are shorter (up to 5 years).",
      },
      { type: "h2", text: "Loan Against Property: cheaper, bigger, slower" },
      {
        type: "p",
        text: "A LAP is secured against residential or commercial property you own, which lets lenders offer significantly lower rates (roughly 9%–12% per annum), larger amounts (up to 60–70% of the property's market value, often running into crores), and much longer tenures (up to 15–20 years, which keeps EMIs manageable). The trade-off is a slower process — property valuation and legal title checks typically add 1–3 weeks — and the property itself is at risk if you default.",
      },
      { type: "h2", text: "A simple way to decide" },
      {
        type: "ul",
        items: [
          "Need funds urgently and the amount is moderate → business loan.",
          "Need a large amount and can wait a couple of weeks → LAP, at a meaningfully lower rate.",
          "Uncomfortable putting property on the line for working capital → business loan, even at the higher rate.",
          "Already have an existing LAP or mortgage → check whether a top-up on it is cheaper than a fresh loan of either type.",
        ],
      },
      {
        type: "p",
        text: "Because the right answer depends on your specific turnover, existing obligations and how much time-pressure you're under, our eligibility checker asks about all of this upfront and matches you to whichever product — and lender — actually fits, rather than pushing one product by default.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
