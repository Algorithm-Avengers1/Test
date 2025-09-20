import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, MapPin, Users, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-security.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Digital Security Platform" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-secondary-glow/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
            Digital Tourist
            <span className="bg-gradient-secondary bg-clip-text text-transparent"> Safety</span>
            <br />Platform
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Secure blockchain-based digital IDs, real-time safety monitoring, and AI-powered protection for tourists across India
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Shield className="mr-2 h-5 w-5" />
              Register as Tourist
            </Button>
            <Button variant="safety" size="lg" className="text-lg px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Authority Dashboard
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-background/10 backdrop-blur-sm border-border/20 p-6 hover:bg-background/20 transition-all duration-300 transform hover:-translate-y-2">
              <Shield className="h-12 w-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">Blockchain Security</h3>
              <p className="text-primary-foreground/80">Tamper-proof digital IDs with end-to-end encryption and secure KYC verification</p>
            </Card>
            
            <Card className="bg-background/10 backdrop-blur-sm border-border/20 p-6 hover:bg-background/20 transition-all duration-300 transform hover:-translate-y-2">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">Real-time Tracking</h3>
              <p className="text-primary-foreground/80">AI-powered geo-fencing and anomaly detection for comprehensive safety monitoring</p>
            </Card>
            
            <Card className="bg-background/10 backdrop-blur-sm border-border/20 p-6 hover:bg-background/20 transition-all duration-300 transform hover:-translate-y-2">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <h3 className="text-xl font-semibold mb-3 text-primary-foreground">Emergency Response</h3>
              <p className="text-primary-foreground/80">Instant panic button with live location sharing to nearest authorities and contacts</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;