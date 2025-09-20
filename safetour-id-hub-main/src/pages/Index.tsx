import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TouristRegistration from "@/components/TouristRegistration";
import SafetyDashboard from "@/components/SafetyDashboard";
import FeaturesSection from "@/components/FeaturesSection";
import AuthorityPanel from "@/components/AuthorityPanel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TouristRegistration />
      <SafetyDashboard />
      <FeaturesSection />
      <AuthorityPanel />
      <Footer />
    </div>
  );
};

export default Index;
