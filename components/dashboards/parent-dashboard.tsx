"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Bus,
  MapPin,
  Clock,
  Bell,
  MessageSquare,
  Calendar,
  Users,
  Navigation,
  Phone,
  AlertCircle,
  Shield,
  Heart,
  Star,
  BookOpen,
  Home,
  School,
  Wallet,
  FileText,
  Download,
  Camera,
  Mic,
  Video,
  Settings,
} from "lucide-react";
import { useAuth, getChildrenByParentId } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ParentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const children = user ? getChildrenByParentId(user.id) : [];
  const currentChild = selectedChild
    ? children.find((c) => c.id === selectedChild)
    : children[0];

  const handleQuickAction = (action: string) => {
    toast({
      title: "Parent Action",
      description: `${action} functionality activated.`,
      variant: "default",
    });
  };

  const busInfo = {
    route: "Route 42",
    currentLocation: "Oak Street & Maple Avenue",
    eta: "5 minutes",
    status: "on-time",
    driver: "Michael Johnson",
    driverPhone: "+20 123 456 7890",
    busNumber: "BUS-042",
    capacity: "45/50 students",
  };

  const todaySchedule = [
    {
      time: "7:15 AM",
      event: "Bus Pickup",
      location: "Home Stop",
      status: "completed",
      icon: Bus,
    },
    {
      time: "7:45 AM",
      event: "Arrive at School",
      location: "Al-Azhar School",
      status: "completed",
      icon: School,
    },
    {
      time: "3:15 PM",
      event: "School Dismissal",
      location: "Al-Azhar School",
      status: "upcoming",
      icon: BookOpen,
    },
    {
      time: "3:45 PM",
      event: "Bus Pickup",
      location: "School",
      status: "upcoming",
      icon: Bus,
    },
    {
      time: "4:15 PM",
      event: "Arrive Home",
      location: "Home Stop",
      status: "upcoming",
      icon: Home,
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      message: "Bus delayed by 10 minutes due to traffic",
      time: "5 min ago",
      type: "warning",
    },
    {
      id: 2,
      message: `${currentChild?.name} safely boarded the bus`,
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 3,
      message: "Early dismissal tomorrow at 1:30 PM",
      time: "1 day ago",
      type: "info",
    },
  ];

  const childStats = {
    attendanceRate: "98%",
    onTimeRate: "95%",
    behaviorScore: "4.8/5",
    friendsOnBus: 3,
  };

  const paymentInfo = {
    monthlyFee: "$45",
    nextPayment: "Dec 1, 2024",
    status: "paid",
    balance: "$0",
  };

  const emergencyContacts = [
    { name: "School Office", phone: "+20 123 456 7890", type: "school" },
    { name: "Bus Supervisor", phone: "+20 123 456 7891", type: "transport" },
    { name: "Emergency Services", phone: "911", type: "emergency" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Parent Control Center</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          <User className="h-4 w-4 mr-1" />
          Parent Account
        </Badge>
      </div>

      {/* Child Selector */}
      {children.length > 1 && (
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="font-medium">Select Child:</span>
            <div className="flex gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={
                    selectedChild === child.id ||
                    (!selectedChild && child === children[0])
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedChild(child.id)}
                >
                  {child.name}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="communication">Messages</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Bus Status */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Bus Status</h3>
                  <Badge className="bg-green-500">On Time</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Bus className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {busInfo.route} - {busInfo.busNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-sm">{busInfo.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-sm">ETA: {busInfo.eta}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm">
                        Capacity: {busInfo.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <span className="text-sm">Driver: {busInfo.driver}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-sm">{busInfo.driverPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm">Safety Rating: 5/5</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleQuickAction("Track Bus Live")}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction("Call Driver")}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction("View Bus Camera")}
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Camera
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction("Emergency Alert")}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Emergency
                  </Button>
                </div>
              </Card>

              {/* Child Performance */}
              {currentChild && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Child Performance & Analytics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-md">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold text-green-600">
                        {childStats.attendanceRate}
                      </p>
                      <p className="text-sm text-green-700">Attendance</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-md">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold text-blue-600">
                        {childStats.onTimeRate}
                      </p>
                      <p className="text-sm text-blue-700">On Time</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-md">
                      <Star className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                      <p className="text-2xl font-bold text-purple-600">
                        {childStats.behaviorScore}
                      </p>
                      <p className="text-sm text-purple-700">Behavior</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-md">
                      <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                      <p className="text-2xl font-bold text-orange-600">
                        {childStats.friendsOnBus}
                      </p>
                      <p className="text-sm text-orange-700">Friends</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {item.time}
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "completed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm">{item.event}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Advanced Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Advanced Controls
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("Set Geofence Alerts")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Geofence Alerts
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("Schedule Pickup Change")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Change
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      handleQuickAction("Request Special Assistance")
                    }
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Special Assistance
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("Parent Settings")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Advanced Live Tracking
            </h3>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
              {/* Google Maps implementation commented out until the real project */}
              <p className="text-muted-foreground">
                Interactive map with real-time bus location
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button onClick={() => handleQuickAction("Enable Notifications")}>
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction("Share Location")}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction("Trip History")}
              >
                <Clock className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction("Route Optimization")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Optimize
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Communication Center
              </h3>
              <div className="space-y-3 mb-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-2 p-3 border rounded-md"
                  >
                    <Bell
                      className={`h-4 w-4 mt-0.5 ${
                        alert.type === "warning"
                          ? "text-orange-500"
                          : alert.type === "success"
                          ? "text-green-500"
                          : "text-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleQuickAction("Send Message")}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction("Voice Call")}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Call
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction("Video Call")}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video Call
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction("Group Chat")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Group Chat
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.phone}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleQuickAction(`Call ${contact.name}`)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Management</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Monthly Fee:</span>
                  <span className="font-bold">{paymentInfo.monthlyFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Next Payment:</span>
                  <span>{paymentInfo.nextPayment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <Badge className="bg-green-500">Paid</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Balance:</span>
                  <span className="font-bold">{paymentInfo.balance}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button onClick={() => handleQuickAction("Make Payment")}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction("Auto Pay Setup")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Auto Pay
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction("Download Receipt")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Receipt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction("Payment History")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  History
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment History</h3>
              <div className="space-y-3">
                {["November 2024", "October 2024", "September 2024"].map(
                  (month, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{month}</p>
                        <p className="text-sm text-muted-foreground">$45.00</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Advanced Safety Features
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickAction("Enable GPS Tracking")}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  GPS Tracking: Enabled
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickAction("Set Safe Zones")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Safe Zone Alerts
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickAction("Emergency Button")}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Emergency Button
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickAction("Driver Background Check")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Driver Verification
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickAction("Live Camera Feed")}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Live Camera Feed
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Safety Reports</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Safety Score: 98%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent safety record this month
                  </p>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Health Check: Complete</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bus sanitized and health protocols followed
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Detailed Reports & Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleQuickAction("Child Progress Report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Progress Report
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction("Attendance Report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Attendance Report
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction("Safety Incident Report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Safety Report
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickAction("Transportation Analytics")}
              >
                <Download className="h-4 w-4 mr-2" />
                Transport Analytics
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
