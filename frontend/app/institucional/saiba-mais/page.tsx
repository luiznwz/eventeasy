
import React from "react";
import FAQSection from "@/components/general/FAQSection";
import Pricing from "@/components/general/Pricing";
import Testimonials from "@/components/general/Testimonials";
import HowWorks from "@/components/general/HowWorks";

const SaibaMais = () => {
  return (
    <div className="min-h-screen">
      <HowWorks />
      <Testimonials />
      <Pricing />
      <FAQSection />
    </div>
  );
};

export default SaibaMais;
