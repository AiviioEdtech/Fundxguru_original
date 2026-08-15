export function calculateEMI(principal: number, annualRate: number, months: number): number {
  if (!principal || !annualRate || !months) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export function formatINR(n: number): string {
  if (!n && n !== 0) return "₹0";
  return "₹" + n.toLocaleString("en-IN");
}

export interface UserProfile {
  name?: string;
  mobile?: string;
  amount?: string;
  purpose?: string;
  employment?: string;
  age?: string;
  income?: string;
  company?: string;
  city?: string;
  existingPL?: string;
  ccOutstanding?: string;
  appLoans?: string;
  currentEMI?: string;
  cibil?: string;
  bounce?: string;
  tenure?: string;
  // Business Loan specific
  businessVintage?: string;
  businessRegistered?: string;
  turnover?: string;
  // Home Loan Balance Transfer specific
  currentLoanOutstanding?: string;
  currentRate?: string;
  currentLender?: string;
  // Loan Against Property specific
  propertyType?: string;
  propertyValue?: string;
}

const AMOUNT_RANGES: Record<string, number> = {
  "Under ₹1 Lakh": 75000,
  "₹1 - 3 Lakh": 200000,
  "₹3 - 5 Lakh": 400000,
  "₹5 - 10 Lakh": 750000,
  "₹10 - 25 Lakh": 1750000,
  "Above ₹25 Lakh": 3000000,
};

const INCOME_RANGES: Record<string, number> = {
  "Under ₹15,000": 12000,
  "₹15,000 - 25,000": 20000,
  "₹25,000 - 40,000": 32000,
  "₹40,000 - 75,000": 55000,
  "Above ₹75,000": 100000,
};

const CC_OUTSTANDING_RANGES: Record<string, number> = {
  "None": 0,
  "Under ₹50,000": 25000,
  "₹50,000 - 1,00,000": 75000,
  "Above ₹1,00,000": 150000,
};

const EMI_RANGES: Record<string, number> = {
  "None": 0,
  "Under ₹10,000": 6000,
  "₹10,000 - 25,000": 17000,
  "Above ₹25,000": 35000,
};

function rangeToNumber(value: string | undefined, table: Record<string, number>): number {
  if (!value) return 0;
  if (value in table) return table[value];
  return parseInt(value) || 0;
}

export interface Recommendation {
  status: "eligible" | "maybe" | "not-eligible";
  statusLabel: string;
  score: number;
  topLenders: string[];
  category: string;
  estimatedAmount: number;
  estimatedEMI: number;
  estimatedAmountRange: string;
  estimatedEMIRange: string;
  estimatedRate: number;
  suggestedTenure: number;
  reasoning: string[];
  documents: string[];
  nextStep: string;
}

export function generateRecommendation(profile: UserProfile): Recommendation {
  const amount = rangeToNumber(profile.amount, AMOUNT_RANGES);
  const income = rangeToNumber(profile.income, INCOME_RANGES);
  const currentEMI = rangeToNumber(profile.currentEMI, EMI_RANGES);
  const ccOut = rangeToNumber(profile.ccOutstanding, CC_OUTSTANDING_RANGES);
  const tenure = parseInt(profile.tenure || "36") || 36;
  const cibil = profile.cibil || "700-749";
  const bounce = profile.bounce || "No";
  const employment = profile.employment || "Salaried";
  const appLoans = profile.appLoans || "No";
  const existingPL = profile.existingPL || "No";
  const purpose = profile.purpose || "Fresh Loan";
  const age = profile.age || "21 - 58";

  const reasoning: string[] = [];
  let status: Recommendation["status"] = "eligible";
  let category = "Personal Loan";
  let rate = 11.5;
  let score = 80;
  let topLenders: string[] = [];

  // 1. Check Age (Hard Rejection)
  if (age === "Under 21") {
    status = "not-eligible";
    score = Math.min(score, 30);
    reasoning.push("Minimum age requirement is 21 years.");
  } else if (age === "Above 58") {
    status = "not-eligible";
    score = Math.min(score, 30);
    reasoning.push("Maximum age limit is 58 years for standard personal/business loans.");
  }

  // 2. Check EMI Bounces (Critical rejection/review rule)
  if (status !== "not-eligible") {
    if (bounce === "Yes - multiple bounces") {
      status = "not-eligible";
      score = Math.min(score, 20);
      reasoning.push("Multiple EMI bounces in last 6 months. Clean repayment history required.");
    } else if (bounce === "Yes - 1 bounce") {
      status = "maybe";
      score = Math.min(score, 50);
      reasoning.push("1 EMI bounce in last 6 months. High risk for top banks; NBFCs may consider.");
    }
  }

  // 3. Check Income level
  if (status !== "not-eligible") {
    if (income < 15000) {
      status = "not-eligible";
      score = Math.min(score, 30);
      reasoning.push("Monthly income is below ₹15,000. Minimum threshold is ₹15K.");
    } else if (income < 25000) {
      if (status === "eligible") status = "maybe";
      score = Math.min(score, 60);
      reasoning.push("Income is below ₹25,000. Routing via specialized NBFCs or digital lenders.");
    }
  }

  // 4. Check CIBIL Score
  if (status !== "not-eligible") {
    if (cibil === "Below 650") {
      if (purpose === "Loan Against Property") {
        status = "maybe";
        score = Math.min(score, 45);
        reasoning.push("CIBIL below 650. Unsecured loans not possible, but LAP (collateral) may be considered.");
      } else {
        status = "not-eligible";
        score = Math.min(score, 30);
        reasoning.push("CIBIL score is below 650. Unsecured loans are rejected. CIBIL improvement advised.");
      }
    } else if (cibil === "650-699") {
      if (status === "eligible") status = "maybe";
      score = Math.min(score, 55);
      reasoning.push("Moderate CIBIL score (650-699). Traditional banks will reject; NBFC options recommended.");
    } else if (cibil === "700-749") {
      reasoning.push("Good CIBIL score (700-749). Eligible for leading NBFCs & select private banks.");
    } else if (cibil === "750+") {
      reasoning.push("Excellent CIBIL score (750+). You may qualify for premium bank/NBFC offers subject to verification.");
    }
  }

  // 5. Check EMI burden / FOIR
  if (status !== "not-eligible") {
    const foir = (currentEMI / income) * 100;
    if (foir >= 60) {
      if (purpose === "Loan Consolidation" || purpose === "App Loan Closure" || purpose === "Credit Card Payment") {
        if (status === "eligible") status = "maybe";
        score = Math.min(score, 50);
        category = "LAP / Balance Transfer";
        reasoning.push("High EMI burden (>60%). Debt consolidation / balance transfer is recommended.");
      } else if (purpose === "Loan Against Property") {
        if (status === "eligible") status = "maybe";
        score = Math.min(score, 55);
        category = "Loan Against Property";
        reasoning.push("High EMI burden. LAP allows longer tenure to lower EMIs.");
      } else {
        status = "not-eligible";
        score = Math.min(score, 35);
        reasoning.push("High existing EMI burden (>60% of income). Rejected for fresh unsecured loan.");
      }
    } else if (foir >= 45) {
      reasoning.push("Moderate to high existing EMIs (45-60% of income). Debt consolidation is advised.");
    }
  }

  // 6. Multiple App Loans / Credit Cards / Existing Loans
  if (status !== "not-eligible") {
    if (appLoans === "3-5 app loans" || appLoans === "5+ app loans") {
      category = "App Loan Consolidation";
      status = "maybe";
      score = Math.min(score, 45);
      reasoning.push("Multiple active app loans indicate credit hunger. Specialized NBFC consolidation required.");
    }
    if (ccOut >= 100000) {
      if (status === "eligible") status = "maybe";
      if (category === "Personal Loan") category = "Credit Card Loan / BT";
      reasoning.push("High credit card outstanding (₹1L+). Term loan recommended to save interest.");
    }
    if (existingPL === "2 loans" || existingPL === "3+ loans") {
      if (status === "eligible") status = "maybe";
      if (category === "Personal Loan") category = "LAP / Balance Transfer";
      reasoning.push("Multiple active personal loans. Balance transfer is recommended.");
    }
  }

  // 7. Choose rate and lenders based on CIBIL and Category/Purpose
  if (status === "not-eligible") {
    category = "None";
    rate = 0;
    topLenders = ["Advisor will guide improvement options"];
  } else {
    if (purpose === "Home Loan") {
      category = "Home Loan";
      rate = cibil === "750+" ? 8.5 : cibil === "700-749" ? 8.9 : 9.5;
      topLenders = ["HDFC Bank", "ICICI Bank", "Axis Bank", "IDFC FIRST Bank"];
    } else if (purpose === "Loan Against Property") {
      category = "Loan Against Property";
      rate = cibil === "750+" ? 9.25 : cibil === "700-749" ? 9.8 : 11.5;
      topLenders = ["HDFC Bank", "Bajaj Finance", "Aditya Birla Finance", "Tata Capital"];
    } else if (purpose === "Business" || (employment === "Self-employed" && profile.company === "Business Owner")) {
      category = "Business Loan";
      rate = cibil === "750+" ? 13.0 : cibil === "700-749" ? 14.5 : 16.5;
      topLenders = ["Bajaj Finance", "Tata Capital", "Aditya Birla Finance", "Kotak Mahindra Bank"];
    } else {
      if (cibil === "750+" && income >= 40000) {
        rate = 10.49;
        topLenders = ["HDFC Bank", "ICICI Bank", "Kotak Mahindra Bank", "Axis Bank"];
      } else if (cibil === "700-749" || (cibil === "750+" && income < 40000)) {
        rate = 11.75;
        topLenders = ["Axis Bank", "IDFC First Bank", "Bajaj Finance", "Tata Capital"];
      } else if (cibil === "650-699") {
        rate = 13.5;
        topLenders = ["Bajaj Finance", "Aditya Birla Finance", "Yes Bank", "IndusInd Bank"];
      } else {
        rate = 16.5;
        topLenders = ["Poonawalla Fincorp", "Federal Bank", "Bajaj Finance", "Tata Capital"];
      }
    }
  }

  // Calculate estimated loan amount
  let estimatedAmount = 0;
  if (status !== "not-eligible") {
    if (category.includes("Consolidation") || category.includes("Transfer") || category.includes("BT")) {
      estimatedAmount = amount;
    } else {
      const maxEMIAllowed = Math.max(0, income * 0.5 - currentEMI);
      if (maxEMIAllowed > 0) {
        const r = rate / 12 / 100;
        estimatedAmount = Math.round((maxEMIAllowed * (Math.pow(1 + r, tenure) - 1)) / (r * Math.pow(1 + r, tenure)));
        estimatedAmount = Math.round(estimatedAmount / 5000) * 5000;
        if (amount && estimatedAmount > amount) {
          estimatedAmount = amount;
        }
      }
    }
  }

  if (estimatedAmount < 0) estimatedAmount = 0;

  // Calculate estimated ranges
  const estimatedAmountMax = estimatedAmount;
  let estimatedAmountMin = 0;
  if (estimatedAmountMax > 0) {
    estimatedAmountMin = Math.round((estimatedAmountMax * 0.7) / 10000) * 10000;
    if (estimatedAmountMin < 10000) estimatedAmountMin = 10000;
  }

  const estimatedEMIMin = estimatedAmountMin > 0 ? calculateEMI(estimatedAmountMin, rate, tenure) : 0;
  const estimatedEMIMax = estimatedAmountMax > 0 ? calculateEMI(estimatedAmountMax, rate, tenure) : 0;
  const estimatedEMI = estimatedEMIMax;

  const estimatedAmountRange =
    estimatedAmountMax > 0 ? `${formatINR(estimatedAmountMin)} - ${formatINR(estimatedAmountMax)}` : "N/A";

  const estimatedEMIRange =
    estimatedAmountMax > 0 ? `${formatINR(estimatedEMIMin)} - ${formatINR(estimatedEMIMax)} / month` : "N/A";

  const statusLabel =
    status === "eligible" ? "Pre-Eligible" : status === "maybe" ? "Advisor Review Required" : "Currently Not Eligible";

  const nextStep =
    status === "not-eligible"
      ? "Contact a FundXGuru Advisor to improve CIBIL score or discuss collateral options."
      : "Contact a FundXGuru Advisor to lock the best offer in 24 hours.";

  const documents = ["PAN Card", "Aadhaar Card", "Last 3 months Salary Slips / ITR", "Last 6 months Bank Statement"];

  return {
    status,
    statusLabel,
    score,
    topLenders,
    category,
    estimatedAmount,
    estimatedEMI,
    estimatedAmountRange,
    estimatedEMIRange,
    estimatedRate: rate,
    suggestedTenure: tenure,
    reasoning: reasoning.length > 0 ? reasoning : ["Profile meets standard lending criteria."],
    documents,
    nextStep,
  };
}
