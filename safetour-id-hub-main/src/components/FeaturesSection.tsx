import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Brain, 
  Globe, 
  Wifi, 
  Shield, 
  Lock,
  Zap,
  Languages,
  Database,
  Mic
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      category: "Digital Identity",
      icon: Shield,
      color: "text-primary",
      items: [
        "Blockchain-based secure IDs",
        "KYC with Aadhaar/Passport integration",
        "Trip duration validity",
        "Emergency contact storage"
      ]
    },
    {
      category: "Mobile Application",
      icon: Smartphone,
      color: "text-secondary",
      items: [
        "Auto-assigned Safety Score",
        "Geo-fencing alerts",
        "Panic button with live location",
        "Optional real-time tracking"
      ]
    },
    {
      category: "AI Monitoring",
      icon: Brain,
      color: "text-accent",
      items: [
        "Anomaly detection algorithms",
        "Route deviation alerts",
        "Prolonged inactivity detection",
        "Predictive risk assessment"
      ]
    },
    {
      category: "Authority Dashboard",
      icon: Database,
      color: "text-primary-glow",
      items: [
        "Real-time tourist clusters",
        "Heat maps of risk zones",
        "Digital ID record access",
        "Automated E-FIR generation"
      ]
    },
    {
      category: "IoT Integration",
      icon: Wifi,
      color: "text-secondary-glow",
      items: [
        "Smart bands for high-risk areas",
        "Continuous health monitoring",
        "Location signal tracking",
        "Manual SOS features"
      ]
    },
    {
      category: "Multilingual Support",
      icon: Languages,
      color: "text-accent-glow",
      items: [
        "10+ Indian languages + English",
        "Voice emergency access",
        "Text-based communication",
        "Accessibility for disabled travelers"
      ]
    }
  ];

  const securityFeatures = [
    { icon: Lock, title: "End-to-End Encryption", description: "Military-grade encryption for all data transmission" },
    { icon: Shield, title: "Data Protection Compliance", description: "Full compliance with Indian data protection laws" },
    { icon: Zap, title: "Tamper-Proof Records", description: "Blockchain ensures immutable identity records" },
    { icon: Globe, title: "Global Standards", description: "International security protocols and standards" }
  ];

  return (
    <section className="py-20 bg-muted/30" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Safety Ecosystem</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced technology stack ensuring tourist safety through digital innovation and AI-powered monitoring
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-primary transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  {feature.category}
                </CardTitle>
                <CardDescription>
                  Core functionality and capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full ${feature.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Features */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Data Privacy & Security</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security ensuring complete privacy and protection of tourist data
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((security, index) => (
            <Card key={index} className="text-center p-6 bg-gradient-to-br from-background to-muted/50 border-border/50 hover:shadow-elegant transition-all duration-300">
              <security.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">{security.title}</h4>
              <p className="text-sm text-muted-foreground">{security.description}</p>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Powered by Advanced Technology</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Blockchain",
              "AI/ML",
              "IoT",
              "Real-time Analytics",
              "Cloud Computing",
              "Mobile First",
              "APIs",
              "Geo-fencing"
            ].map((tech, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;