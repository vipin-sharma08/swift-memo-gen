import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesStrip from "@/components/FeaturesStrip";
import SampleOutput from "@/components/SampleOutput";
import SocialProof from "@/components/SocialProof";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesStrip />
      <SampleOutput />
      <SocialProof />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
