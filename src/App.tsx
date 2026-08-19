import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero, { TrustStrip } from "./components/Hero";
import EnquiryForm from "./components/EnquiryForm";
import { AboutUs, Benefits, BlogTeasers, HowItWorks, LoanConsolidationSpotlight, LoanProducts, PartnerBanks, WhyChooseUs } from "./components/Sections";
import { EligibilityChecker, EMICalculator } from "./components/Calculators";
import BankComparison from "./components/BankComparison";
import { FAQ, Testimonials } from "./components/Social";
import Footer, { Contact, CTABand } from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div className="min-h-screen bg-white">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[75] h-[3px] origin-left bg-gradient-to-r from-[#F57C00] via-[#1976D2] to-[#2E7D32]"
      />

      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <LoanConsolidationSpotlight />
        <PartnerBanks />
        <LoanProducts />
        <EnquiryForm />
        <WhyChooseUs />
        <HowItWorks />
        <EligibilityChecker />
        <EMICalculator />
        <BankComparison />
        <Benefits />
        <AboutUs />
        <BlogTeasers />
        <Testimonials />
        <FAQ />
        <CTABand />
        <Contact />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
