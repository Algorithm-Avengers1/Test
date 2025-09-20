import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTourist } from "@/hooks/useTourist";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Shield,
  QrCode,
  Download
} from "lucide-react";

const TouristRegistration = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { registerTourist, loading } = useTourist();
  const navigate = useNavigate();
  const [isGenerated, setIsGenerated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for a digital tourist ID.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const registrationData = {
      fullName: formData.get('fullName') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      nationality: formData.get('nationality') as string,
      passportNumber: formData.get('passportNumber') as string,
      idNumber: formData.get('idNumber') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      emergencyContactName: formData.get('emergencyContactName') as string,
      emergencyContactPhone: formData.get('emergencyContactPhone') as string,
      travelStartDate: formData.get('travelStartDate') as string,
      travelEndDate: formData.get('travelEndDate') as string,
    };

    try {
      await registerTourist(registrationData);
      setIsGenerated(true);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <section className="py-20 bg-muted/50" id="register">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Generate Your Digital Tourist ID</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure, blockchain-verified digital identity for safe tourism across India
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Tourist Registration
                </CardTitle>
                <CardDescription>
                  Complete your KYC and travel details for digital ID generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                        <SelectItem value="visa">Visa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input id="idNumber" placeholder="Enter ID number" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input id="nationality" placeholder="Enter nationality" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+91 XXXXXXXXXX" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entryDate">Entry Date</Label>
                      <Input id="entryDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exitDate">Exit Date</Label>
                      <Input id="exitDate" type="date" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itinerary">Travel Itinerary</Label>
                    <Textarea 
                      id="itinerary" 
                      placeholder="Enter planned destinations and activities"
                      rows={3}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input id="emergency" placeholder="Emergency contact name and number" required />
                  </div>

                  <Button type="submit" variant="hero" className="w-full" size="lg">
                    <Shield className="mr-2 h-5 w-5" />
                    Generate Digital ID
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Digital ID Preview */}
            <Card className={`shadow-elegant transition-all duration-500 ${isGenerated ? 'border-secondary shadow-secondary' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Digital Tourist ID
                </CardTitle>
                <CardDescription>
                  {isGenerated ? "Your blockchain-verified digital identity" : "Preview will appear after registration"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerated ? (
                  <div className="space-y-6">
                    {/* ID Card */}
                    <div className="bg-gradient-primary p-6 rounded-lg text-primary-foreground">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">John Doe</h3>
                          <p className="opacity-90">USA Citizen</p>
                        </div>
                        <Badge variant="secondary" className="bg-secondary-glow">
                          VERIFIED
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-70">Tourist ID</p>
                          <p className="font-mono">TID-2024-001234</p>
                        </div>
                        <div>
                          <p className="opacity-70">Valid Until</p>
                          <p>Dec 31, 2024</p>
                        </div>
                        <div>
                          <p className="opacity-70">Safety Score</p>
                          <p className="text-secondary-glow font-bold">85/100</p>
                        </div>
                        <div>
                          <p className="opacity-70">Entry Point</p>
                          <p>Delhi Airport</p>
                        </div>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="bg-background p-6 border-2 border-dashed border-border rounded-lg text-center">
                      <div className="w-32 h-32 bg-foreground/10 rounded mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-foreground/30" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Blockchain Hash: 0x7f8b...c3d2
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button variant="safety" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Digital ID
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        Add to Mobile Wallet
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="h-24 w-24 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Complete the registration form to generate your secure digital tourist ID
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouristRegistration;