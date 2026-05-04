import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesStrip from "@/components/FeaturesStrip";
import SampleOutput from "@/components/SampleOutput";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--bg))" }}>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesStrip />
      <SampleOutput />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
