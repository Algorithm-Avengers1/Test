import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  AlertTriangle, 
  Shield, 
  Users, 
  Activity,
  Bell,
  Eye,
  Phone
} from "lucide-react";
import dashboardImage from "@/assets/dashboard-map.jpg";

const SafetyDashboard = () => {
  const alerts = [
    { type: "warning", message: "Tourist entered restricted zone - Sector 7", time: "2 min ago", severity: "high" },
    { type: "info", message: "New tourist registration - Delhi Airport", time: "5 min ago", severity: "low" },
    { type: "alert", message: "Panic button activated - Location sent", time: "12 min ago", severity: "critical" },
  ];

  const touristStats = [
    { label: "Active Tourists", value: "2,847", change: "+12%", color: "text-secondary" },
    { label: "Safety Alerts", value: "3", change: "-25%", color: "text-accent" },
    { label: "High Risk Zones", value: "7", change: "0%", color: "text-destructive" },
    { label: "Response Time", value: "2.3m", change: "-15%", color: "text-secondary" },
  ];

  return (
    <section className="py-20" id="dashboard">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Real-time Safety Dashboard</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered monitoring and emergency response system for tourist safety
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Map */}
          <Card className="lg:col-span-2 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Live Tourist Tracking
              </CardTitle>
              <CardDescription>
                Real-time location monitoring with geo-fencing alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={dashboardImage} 
                  alt="Interactive Safety Dashboard Map" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                {/* Map overlay elements */}
                <div className="absolute top-4 left-4 space-y-2">
                  <Badge variant="secondary" className="bg-secondary/90 backdrop-blur-sm">
                    <Activity className="mr-1 h-3 w-3" />
                    2,847 Active
                  </Badge>
                  <Badge variant="destructive" className="bg-destructive/90 backdrop-blur-sm">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    3 Alerts
                  </Badge>
                </div>

                <div className="absolute bottom-4 right-4 space-x-2">
                  <Button variant="glass" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    View Details
                  </Button>
                  <Button variant="alert" size="sm">
                    <Bell className="mr-1 h-3 w-3" />
                    Alerts
                  </Button>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {touristStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-xs ${stat.color} font-medium`}>{stat.change}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts Panel */}
          <div className="space-y-6">
            <Card className="shadow-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Live Alerts
                </CardTitle>
                <CardDescription>
                  Real-time notifications and emergency alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'critical' ? 'border-destructive bg-destructive/10' :
                      alert.severity === 'high' ? 'border-accent bg-accent/10' :
                      'border-secondary bg-secondary/10'
                    }`}>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'} className="mt-2">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  Safety Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Overall Safety Score</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Response Coverage</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">System Reliability</span>
                    <span className="text-sm font-medium">99%</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>

                <Button variant="safety" className="w-full mt-4">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency Response
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyDashboard;