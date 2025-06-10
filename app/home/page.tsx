"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, MapPin, MessageSquare, Bell, Clock, ArrowRight, User, Navigation } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useRef } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { ParentDashboard } from "@/components/dashboards/parent-dashboard"
import { ChildDashboard } from "@/components/dashboards/child-dashboard"

export default function HomePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [busEta, setBusEta] = useState(0)
  const [busStatus, setBusStatus] = useState("delayed")
  const [childLocation, setChildLocation] = useState("On Route 42 Bus")
  const [lastUpdated, setLastUpdated] = useState("Just now")

  // Use refs to track previous values for comparison
  const prevBusStatusRef = useRef(busStatus)
  const prevChildLocationRef = useRef(childLocation)
  const prevBusEtaRef = useRef(busEta)

  // State to track toast notifications
  const [notification, setNotification] = useState<{
    title: string
    description: string
    variant: "default" | "destructive" | "success" | "warning" | "info"
  } | null>(null)

  // Handle showing toast based on notification state
  useEffect(() => {
    if (notification) {
      toast({
        title: notification.title,
        description: notification.description,
        variant: notification.variant,
      })
      setNotification(null)
    }
  }, [notification, toast])

  const handleSetReminder = () => {
    setNotification({
      title: "Reminder Set",
      description: "You will be notified 10 minutes before your bus arrives.",
      variant: "success",
    })
  }

  const handleTrackBus = () => {
    setNotification({
      title: "Live Tracking",
      description: "Opening live bus tracking map...",
      variant: "info",
    })
  }

  const renderDashboard = () => {
    if (!user) return null

    switch (user.role) {
      case "admin":
        return <AdminDashboard />
      case "parent":
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Main bus status */}
                <Card className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-medium">Morning Bus</h2>
                      <div className="flex items-center gap-1 text-sm">
                        <Bus className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Route 42</span>
                      </div>
                    </div>
                    <Badge className="badge-delayed">Delayed</Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Current: Oak Street & Maple Avenue</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>ETA: {busEta} minutes</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full" onClick={handleTrackBus}>
                      Track Bus
                    </Button>
                    <Link href="/my-bus/schedule">
                      <Button variant="outline" className="w-full">
                        Schedule
                      </Button>
                    </Link>
                  </div>
                </Card>

                {/* Child location tracking */}
                <Card className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-medium">Child Location</h2>
                      <div className="flex items-center gap-1 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Ahmed Mohamed</span>
                      </div>
                    </div>
                    <Badge className="badge-on-bus">On Bus</Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <Navigation className="h-4 w-4 text-primary" />
                    <span>Current: {childLocation}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Last updated: {lastUpdated}</span>
                  </div>

                  <div className="bg-muted/30 rounded-md p-3 mb-3 text-center">
                    <div className="text-sm mb-1">Location Map</div>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Map would be displayed here</p>
                    </div>
                  </div>

                  <Link href="/child-location">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Quick actions grid */}
                <Card className="p-4">
                  <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <Link href="/my-bus">
                      <div className="flex flex-col items-center p-3 border rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
                        <Bus className="h-6 w-6 text-primary mb-2" />
                        <span className="text-sm">My Bus</span>
                      </div>
                    </Link>
                    <Link href="/stops">
                      <div className="flex flex-col items-center p-3 border rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
                        <MapPin className="h-6 w-6 text-primary mb-2" />
                        <span className="text-sm">Stops</span>
                      </div>
                    </Link>
                    <Link href="/messages">
                      <div className="flex flex-col items-center p-3 border rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
                        <MessageSquare className="h-6 w-6 text-primary mb-2" />
                        <span className="text-sm">Messages</span>
                      </div>
                    </Link>
                  </div>
                </Card>

                {/* Recent Alerts */}
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Recent Alerts</h2>
                    <Link href="/notifications" className="text-sm text-primary flex items-center">
                      View All
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    <div className="border rounded-md p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-2">
                        <Bell className="h-4 w-4 text-amber-500 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium">10-minute delay on Route 42</h3>
                          <p className="text-sm text-muted-foreground">Due to road construction on Main Street</p>
                          <div className="text-xs text-muted-foreground mt-1">15 minutes ago</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-2">
                        <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium">Early dismissal on Friday</h3>
                          <p className="text-sm text-muted-foreground">School will dismiss at 1:30 PM</p>
                          <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-2">
                        <Bell className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium">New bus driver announcement</h3>
                          <p className="text-sm text-muted-foreground">
                            Michael Johnson will be the new driver for Route 42
                          </p>
                          <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )
      case "child":
        return <ChildDashboard />
      default:
        return <ParentDashboard />
    }
  }

  return <ProtectedRoute>{renderDashboard()}</ProtectedRoute>
}
