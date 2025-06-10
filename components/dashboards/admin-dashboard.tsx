"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Bus,
  AlertTriangle,
  Calendar,
  BarChart3,
  Settings,
  MapPin,
  MessageSquare,
  Bell,
  Activity,
  Shield,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()

  const handleQuickAction = (action: string) => {
    toast({
      title: "Admin Action",
      description: `${action} functionality would be implemented here.`,
      variant: "default",
    })
  }

  const stats = [
    { label: "Total Routes", value: "42", icon: Bus, color: "text-blue-600" },
    { label: "Active Buses", value: "38", icon: Activity, color: "text-green-600" },
    { label: "Total Students", value: "1,247", icon: Users, color: "text-purple-600" },
    { label: "Active Alerts", value: "3", icon: AlertTriangle, color: "text-orange-600" },
  ]

  const recentAlerts = [
    { id: 1, type: "delay", message: "Route 42 delayed by 15 minutes", time: "5 min ago", severity: "warning" },
    { id: 2, type: "maintenance", message: "Bus #23 scheduled for maintenance", time: "1 hour ago", severity: "info" },
    { id: 3, type: "emergency", message: "Emergency stop on Route 15", time: "2 hours ago", severity: "error" },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
          <Shield className="h-4 w-4 mr-1" />
          Administrator
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="routes" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="schedules">Schedules</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="routes" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Route Management</h3>
                  <Button onClick={() => handleQuickAction("Add New Route")}>Add Route</Button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((route) => (
                    <div key={route} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Bus className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Route {route * 14}</p>
                          <p className="text-sm text-muted-foreground">
                            {route === 1
                              ? "Downtown - School District"
                              : route === 2
                                ? "Suburbs - High School"
                                : "City Center - Elementary"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={route === 1 ? "default" : route === 2 ? "secondary" : "outline"}>
                          {route === 1 ? "Active" : route === 2 ? "Delayed" : "Scheduled"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleQuickAction(`Edit Route ${route * 14}`)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">System Alerts</h3>
                  <Button onClick={() => handleQuickAction("Create Alert")}>New Alert</Button>
                </div>
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-md">
                      <AlertTriangle
                        className={`h-5 w-5 mt-0.5 ${
                          alert.severity === "error"
                            ? "text-red-500"
                            : alert.severity === "warning"
                              ? "text-orange-500"
                              : "text-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleQuickAction("Resolve Alert")}>
                        Resolve
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="schedules" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Schedule Management</h3>
                  <Button onClick={() => handleQuickAction("Create Schedule")}>New Schedule</Button>
                </div>
                <div className="space-y-3">
                  {["Morning Routes", "Afternoon Routes", "Weekend Special"].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{schedule}</p>
                          <p className="text-sm text-muted-foreground">
                            {index === 0
                              ? "6:30 AM - 8:30 AM"
                              : index === 1
                                ? "2:30 PM - 4:30 PM"
                                : "9:00 AM - 12:00 PM"}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleQuickAction(`Edit ${schedule}`)}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">System Analytics</h3>
                  <Button variant="outline" onClick={() => handleQuickAction("Export Report")}>
                    Export Report
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span className="font-medium">On-Time Performance</span>
                    </div>
                    <p className="text-2xl font-bold">94.2%</p>
                    <p className="text-sm text-muted-foreground">+2.1% from last month</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Daily Ridership</span>
                    </div>
                    <p className="text-2xl font-bold">1,186</p>
                    <p className="text-sm text-muted-foreground">Average per day</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("Send System Alert")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("View Live Map")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Live Map
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("Message Center")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("System Settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">GPS Tracking</span>
                <Badge variant="default" className="bg-green-500">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Communication</span>
                <Badge variant="default" className="bg-green-500">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-green-500">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Badge variant="secondary" className="bg-orange-500 text-white">
                  Delayed
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
