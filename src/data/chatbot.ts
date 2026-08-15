export type QuestionType = "amount" | "choice" | "number" | "text";

export interface ChatQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  key: string;
}

export const chatQuestions: ChatQuestion[] = [
  {
    id: "q1",
    key: "amount",
    question: "Hi! 👋 I'm the FundXGuru AI Advisor. Let's find your best loan option. How much loan amount do you need?",
    type: "choice",
    options: ["Under ₹1 Lakh", "₹1 - 3 Lakh", "₹3 - 5 Lakh", "₹5 - 10 Lakh", "₹10 - 25 Lakh", "Above ₹25 Lakh"],
  },
  {
    id: "q2",
    key: "purpose",
    question: "What is the purpose of this loan?",
    type: "choice",
    options: [
      "Fresh Loan",
      "Balance Transfer",
      "Loan Consolidation",
      "Credit Card Payment",
      "App Loan Closure",
      "Business",
      "Home Loan",
      "Loan Against Property",
    ],
  },
  { id: "q3", key: "employment", question: "Are you salaried or self-employed?", type: "choice", options: ["Salaried", "Self-employed"] },
  { id: "q3_age", key: "age", question: "What is your age range?", type: "choice", options: ["Under 21", "21 - 58", "Above 58"] },
  {
    id: "q4",
    key: "income",
    question: "What is your monthly salary / business income?",
    type: "choice",
    options: ["Under ₹15,000", "₹15,000 - 25,000", "₹25,000 - 40,000", "₹40,000 - 75,000", "Above ₹75,000"],
  },
  {
    id: "q5",
    key: "company",
    question: "What is your company / business type?",
    type: "choice",
    options: ["MNC", "Private Limited", "Government / PSU", "Self-employed Professional", "Business Owner"],
  },
  { id: "q6", key: "city", question: "What type of city do you live in?", type: "choice", options: ["Metro City", "Tier-2 City", "Tier-3 City / Town"] },
  {
    id: "q12",
    key: "cibil",
    question: "What is your CIBIL score range?",
    type: "choice",
    options: ["750+", "700-749", "650-699", "Below 650", "Don't know"],
  },
  { id: "q14", key: "tenure", question: "Required tenure (in months)?", type: "choice", options: ["12", "24", "36", "48", "60", "72", "84"] },
  { id: "q7", key: "existingPL", question: "Do you have any existing personal loans?", type: "choice", options: ["No", "1 loan", "2 loans", "3+ loans"] },
  {
    id: "q8",
    key: "ccOutstanding",
    question: "What is your total credit card outstanding?",
    type: "choice",
    options: ["None", "Under ₹50,000", "₹50,000 - 1,00,000", "Above ₹1,00,000"],
  },
  {
    id: "q9",
    key: "appLoans",
    question: "Do you have any app loans (KreditBee, MoneyTap, etc.)?",
    type: "choice",
    options: ["No", "1-2 app loans", "3-5 app loans", "5+ app loans"],
  },
  {
    id: "q10",
    key: "currentEMI",
    question: "What is your current total EMI per month?",
    type: "choice",
    options: ["None", "Under ₹10,000", "₹10,000 - 25,000", "Above ₹25,000"],
  },
  { id: "q13", key: "bounce", question: "Any EMI bounce in last 6 months?", type: "choice", options: ["No", "Yes - 1 bounce", "Yes - multiple bounces"] },
  {
    id: "q17",
    key: "name",
    question: "Almost done! 📈 To generate your eligibility report, please enter your Full Name:",
    type: "text",
    placeholder: "e.g. Rahul Sharma",
  },
  {
    id: "q18",
    key: "mobile",
    question: "Lastly, please enter your 10-digit Mobile Number to secure your results and connect with our advisor:",
    type: "number",
    placeholder: "e.g. 9876543210",
  },
];

export const debtDetailKeys = ["existingPL", "ccOutstanding", "appLoans", "currentEMI", "bounce"];
export const debtDetailPurposes = ["Balance Transfer", "Loan Consolidation", "Credit Card Payment", "App Loan Closure"];

// Extra, loan-type-specific questions inserted right after the "purpose" question.
export const loanTypeQuestions: Record<string, ChatQuestion[]> = {
  Business: [
    {
      id: "biz1",
      key: "businessVintage",
      question: "How many years has your business been operational?",
      type: "choice",
      options: ["Under 1 year", "1 - 3 years", "3 - 5 years", "5+ years"],
    },
    {
      id: "biz2",
      key: "businessRegistered",
      question: "Is your business GST or Udyam / MSME registered?",
      type: "choice",
      options: ["Yes, both", "GST only", "Udyam only", "Not yet registered"],
    },
    {
      id: "biz3",
      key: "turnover",
      question: "What is your average monthly business turnover?",
      type: "choice",
      options: ["Under ₹2 Lakh", "₹2 - 5 Lakh", "₹5 - 10 Lakh", "₹10 - 25 Lakh", "Above ₹25 Lakh"],
    },
  ],
  "Home Loan": [
    {
      id: "hl1",
      key: "currentLoanOutstanding",
      question: "What is your current outstanding home loan amount?",
      type: "choice",
      options: ["Under ₹10 Lakh", "₹10 - 25 Lakh", "₹25 - 50 Lakh", "₹50 Lakh - 1 Crore", "Above ₹1 Crore"],
    },
    {
      id: "hl2",
      key: "currentRate",
      question: "What interest rate are you currently paying on this home loan?",
      type: "choice",
      options: ["Below 8%", "8% - 9%", "9% - 10%", "Above 10%", "Don't know"],
    },
    {
      id: "hl3",
      key: "currentLender",
      question: "Which bank or NBFC is your current home loan with?",
      type: "text",
      placeholder: "e.g. SBI, HDFC, LIC Housing Finance",
    },
  ],
  "Loan Against Property": [
    {
      id: "lap1",
      key: "propertyType",
      question: "What type of property will you pledge?",
      type: "choice",
      options: ["Residential", "Commercial", "Industrial / Land"],
    },
    {
      id: "lap2",
      key: "propertyValue",
      question: "What is the approximate current market value of the property?",
      type: "choice",
      options: ["Under ₹25 Lakh", "₹25 - 50 Lakh", "₹50 Lakh - 1 Crore", "₹1 - 2 Crore", "Above ₹2 Crore"],
    },
  ],
};

// URL slug (?loan=<slug>) -> the exact "purpose" value the recommendation engine understands.
export const LOAN_SLUG_TO_PURPOSE: Record<string, string> = {
  personal: "Fresh Loan",
  business: "Business",
  home: "Home Loan",
  "balance-transfer": "Balance Transfer",
  lap: "Loan Against Property",
};

export const PURPOSE_TO_LABEL: Record<string, string> = {
  "Fresh Loan": "Personal Loan",
  Business: "Business Loan",
  "Home Loan": "Home Loan",
  "Balance Transfer": "Balance Transfer",
  "Loan Against Property": "Loan Against Property",
};
