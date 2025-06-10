"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, AlertTriangle, Calendar, Users, Clock, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRoutes, useAlerts, useSchedules } from "@/lib/store"

// Import admin section components
import { AdminRoutes } from "./admin-routes"
import { AdminAlerts } from "./admin-alerts"
import { AdminSchedules } from "./admin-schedules"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  // Access store data
  const { routes } = useRoutes()
  const { alerts } = useAlerts()
  const { schedules } = useSchedules()

  // Stats for the overview dashboard
  const stats = [
    {
      title: "Active Routes",
      value: routes.filter((route) => route.status === "active").length.toString(),
      total: routes.length,
      icon: Bus,
      color: "text-blue-600",
    },
    {
      title: "Active Alerts",
      value: alerts.filter((alert) => alert.severity === "high").length.toString(),
      total: alerts.length,
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Scheduled Trips",
      value: schedules.filter((schedule) => schedule.status === "on-time").length.toString(),
      total: schedules.length,
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Total Passengers",
      value: "1,247",
      total: 1500,
      icon: Users,
      color: "text-purple-600",
    },
  ]

  // Handle navigation to a specific section
  const navigateTo = (tab: string) => {
    setActiveTab(tab)
    toast({
      title: `${tab.charAt(0).toUpperCase() + tab.slice(1)} Section`,
      description: `Switched to ${tab} management`,
      duration: 2000,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex gap-2">
          <Button onClick={() => navigateTo("routes")} className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
            Manage Routes
          </Button>
          <Button onClick={() => navigateTo("alerts")} variant="outline" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Manage Alerts
          </Button>
          <Button onClick={() => navigateTo("schedules")} variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Manage Schedules
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">out of {stat.total}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Routes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Routes</CardTitle>
                  <CardDescription>Latest route activity</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigateTo("routes")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {routes.slice(0, 3).map((route) => (
                  <div key={route.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{route.name}</p>
                      <p className="text-xs text-muted-foreground">Route {route.number}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={route.status === "active" ? "default" : "secondary"}
                        className={route.status === "active" ? "bg-green-500" : ""}
                      >
                        {route.status === "active" ? "Active" : "Limited"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Alerts</CardTitle>
                  <CardDescription>Latest system alerts</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigateTo("alerts")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {alert.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Schedules */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Upcoming Schedules</CardTitle>
                  <CardDescription>Next departures</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigateTo("schedules")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedules.slice(0, 3).map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{schedule.destination}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {schedule.time}
                      </p>
                    </div>
                    <Badge
                      variant={schedule.status === "on-time" ? "default" : "destructive"}
                      className={schedule.status === "on-time" ? "bg-green-500" : ""}
                    >
                      {schedule.status === "on-time" ? "On Time" : "Delayed"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">System Status</CardTitle>
                <CardDescription>Current system health</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigateTo("settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>All systems operational</span>
                </div>
                <span className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <AdminRoutes />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <AdminAlerts />
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <AdminSchedules />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure application settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">System configuration options</p>
                    <Button size="sm">Configure</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">Manage alert preferences</p>
                    <Button size="sm">Configure</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">User Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                    <Button size="sm">Manage Users</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">System Backup</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">Backup and restore system data</p>
                    <Button size="sm">Backup Now</Button>
                  </CardContent>
                </Card>
              </div>

              <Button
                className="mt-4"
                onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: "Your settings have been updated successfully",
                  })
                }}
              >
                Save All Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
