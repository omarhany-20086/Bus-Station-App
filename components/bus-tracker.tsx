"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bus, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for bus tracking
const busData = [
  {
    id: "1",
    routeNumber: "42",
    routeName: "Downtown Express",
    status: "on-time",
    currentStop: "Central Station",
    nextStop: "Market Square",
    eta: "2 min",
    occupancy: "medium",
  },
  {
    id: "2",
    routeNumber: "15",
    routeName: "Airport Shuttle",
    status: "delayed",
    currentStop: "Terminal 1",
    nextStop: "Business Park",
    eta: "7 min",
    occupancy: "low",
  },
  {
    id: "3",
    routeNumber: "37",
    routeName: "University Line",
    status: "on-time",
    currentStop: "Science Building",
    nextStop: "Student Center",
    eta: "4 min",
    occupancy: "high",
  },
  {
    id: "4",
    routeNumber: "8",
    routeName: "Coastal Route",
    status: "on-time",
    currentStop: "Beach Front",
    nextStop: "Lighthouse Point",
    eta: "1 min",
    occupancy: "medium",
  },
  {
    id: "5",
    routeNumber: "53",
    routeName: "Shopping Mall Express",
    status: "delayed",
    currentStop: "Food Court",
    nextStop: "Main Entrance",
    eta: "9 min",
    occupancy: "high",
  },
]

export function BusTracker() {
  const [activeTab, setActiveTab] = useState("nearby")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-success text-success-foreground"
      case "delayed":
        return "bg-warning text-warning-foreground"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getOccupancyIcon = (occupancy: string) => {
    switch (occupancy) {
      case "low":
        return "●"
      case "medium":
        return "●●"
      case "high":
        return "●●●"
      default:
        return "○"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-primary" />
          Real-Time Bus Tracker
        </CardTitle>
        <CardDescription>Track buses in real-time and see their current status</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nearby" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="all">All Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="space-y-4 pt-1 px-1">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg animate-pulse-opacity">
                      <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                      </div>
                    </div>
                  ))
              : busData.slice(0, 3).map((bus) => (
                  <div
                    key={bus.id}
                    className="p-4 border rounded-lg hover:bg-accent active:bg-accent/80 transition-colors card-hover"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{bus.routeNumber}</span>
                        <span>{bus.routeName}</span>
                      </div>
                      <Badge className={getStatusColor(bus.status)}>
                        {bus.status === "on-time" ? "On Time" : "Delayed"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Current: {bus.currentStop}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          ETA: <strong>{bus.eta}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Occupancy:</span>
                        <span
                          className={`font-mono ${
                            bus.occupancy === "low"
                              ? "text-success"
                              : bus.occupancy === "medium"
                                ? "text-warning"
                                : "text-destructive"
                          }`}
                        >
                          {getOccupancyIcon(bus.occupancy)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </TabsContent>

          <TabsContent value="favorites" className="py-4 px-1">
            <div className="text-center bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground mb-2">No favorite routes saved yet</p>
              <p className="text-sm">Save your frequently used routes for quick access</p>
              <Button variant="outline" size="sm" className="mt-4">
                <span className="mr-2">+</span> Add Favorites
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-3 pt-1 px-1">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg animate-pulse-opacity">
                      <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                      </div>
                    </div>
                  ))
              : busData.map((bus) => (
                  <div
                    key={bus.id}
                    className="p-4 border rounded-lg hover:bg-accent active:bg-accent/80 transition-colors card-hover"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{bus.routeNumber}</span>
                        <span>{bus.routeName}</span>
                      </div>
                      <Badge className={getStatusColor(bus.status)}>
                        {bus.status === "on-time" ? "On Time" : "Delayed"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Current: {bus.currentStop}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          ETA: <strong>{bus.eta}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Occupancy:</span>
                        <span
                          className={`font-mono ${
                            bus.occupancy === "low"
                              ? "text-success"
                              : bus.occupancy === "medium"
                                ? "text-warning"
                                : "text-destructive"
                          }`}
                        >
                          {getOccupancyIcon(bus.occupancy)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
