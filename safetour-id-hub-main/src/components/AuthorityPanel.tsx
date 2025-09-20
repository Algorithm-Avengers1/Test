import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertTriangle, 
  Users, 
  FileText,
  Map,
  Clock,
  CheckCircle
} from "lucide-react";

const AuthorityPanel = () => {
  const recentCases = [
    {
      id: "FIR-2024-001",
      tourist: "Sarah Johnson",
      type: "Missing Person",
      location: "Manali, HP",
      status: "Active",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: "FIR-2024-002",
      tourist: "Kumar Patel",
      type: "Emergency Alert",
      location: "Goa Beach",
      status: "Resolved",
      time: "6 hours ago",
      priority: "medium"
    },
    {
      id: "FIR-2024-003",
      tourist: "Anna Schmidt",
      type: "Zone Violation",
      location: "Restricted Area-7",
      status: "Under Review",
      time: "1 day ago",
      priority: "low"
    }
  ];

  const quickStats = [
    { label: "Total Tourists", value: "2,847", icon: Users, color: "text-secondary" },
    { label: "Active Cases", value: "12", icon: FileText, color: "text-accent" },
    { label: "High Risk Zones", value: "7", icon: Map, color: "text-destructive" },
    { label: "Avg Response", value: "2.3m", icon: Clock, color: "text-primary" }
  ];

  return (
    <section className="py-20 bg-background" id="authority">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Authority Control Center</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive monitoring and management system for tourism departments and police
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center shadow-primary">
              <CardContent className="p-6">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search and Filters */}
          <Card className="lg:col-span-2 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Tourist Search & Management
              </CardTitle>
              <CardDescription>
                Search tourist records, track locations, and manage cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Tourist ID, Name, or Passport..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>

                {/* Recent Cases Table */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Recent Cases & Alerts</h4>
                  {recentCases.map((case_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={
                            case_.priority === 'high' ? 'destructive' : 
                            case_.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {case_.id}
                          </Badge>
                          <Badge variant={case_.status === 'Resolved' ? 'secondary' : 'outline'}>
                            {case_.status === 'Resolved' ? (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            ) : (
                              <AlertTriangle className="mr-1 h-3 w-3" />
                            )}
                            {case_.status}
                          </Badge>
                        </div>
                        <p className="font-medium">{case_.tourist}</p>
                        <p className="text-sm text-muted-foreground">{case_.type} • {case_.location}</p>
                        <p className="text-xs text-muted-foreground">{case_.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="hero" className="flex-1">
                    Generate E-FIR
                  </Button>
                  <Button variant="safety" className="flex-1">
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="shadow-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Emergency Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="alert" className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Issue Safety Alert
                </Button>
                <Button variant="destructive" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Emergency FIR
                </Button>
                <Button variant="outline" className="w-full">
                  <Map className="mr-2 h-4 w-4" />
                  Update Risk Zones
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-primary">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Monitoring</span>
                    <Badge variant="secondary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Blockchain Network</span>
                    <Badge variant="secondary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Operational
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">IoT Devices</span>
                    <Badge variant="secondary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Services</span>
                    <Badge variant="secondary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Ready
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-accent">
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Tourist Registry
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Map className="mr-2 h-4 w-4" />
                  Zone Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Reports & Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorityPanel;