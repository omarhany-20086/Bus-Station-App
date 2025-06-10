"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bus, Clock, MapPin, School, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for school bus tracking
const busData = [
  {
    id: "1",
    routeNumber: "A12",
    routeName: "مدرسة الأزهر - المسار الصباحي",
    school: "مدرسة الأزهر",
    status: "on-time",
    currentStop: "حي المعادي",
    nextStop: "حي مدينة نصر",
    eta: "2 دقيقة",
    occupancy: "medium",
  },
  {
    id: "2",
    routeNumber: "B23",
    routeName: "المدرسة الأمريكية بالقاهرة - المسار الصباحي",
    school: "المدرسة الأمريكية بالقاهرة",
    status: "delayed",
    currentStop: "حي الزمالك",
    nextStop: "حي المهندسين",
    eta: "7 دقائق",
    occupancy: "low",
  },
  {
    id: "3",
    routeNumber: "C34",
    routeName: "مدرسة مصر الدولية - المسار الصباحي",
    school: "مدرسة مصر الدولية",
    status: "on-time",
    currentStop: "حي الدقي",
    nextStop: "حي العجوزة",
    eta: "4 دقائق",
    occupancy: "high",
  },
  {
    id: "4",
    routeNumber: "D45",
    routeName: "مدرسة المعادي الدولية - المسار الصباحي",
    school: "مدرسة المعادي الدولية",
    status: "on-time",
    currentStop: "حي المعادي",
    nextStop: "حي المقطم",
    eta: "1 دقيقة",
    occupancy: "medium",
  },
  {
    id: "5",
    routeNumber: "E56",
    routeName: "مدرسة القاهرة الجديدة - المسار الصباحي",
    school: "مدرسة القاهرة الجديدة",
    status: "delayed",
    currentStop: "حي التجمع الخامس",
    nextStop: "حي الرحاب",
    eta: "9 دقائق",
    occupancy: "high",
  },
]

interface SchoolBusTrackerProps {
  selectedChildId?: string
}

export function SchoolBusTracker({ selectedChildId }: SchoolBusTrackerProps) {
  const [activeTab, setActiveTab] = useState("myBuses")
  const [loading, setLoading] = useState(true)
  const [selectedSchool, setSelectedSchool] = useState("all")
  const [filteredBuses, setFilteredBuses] = useState(busData)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (selectedSchool === "all") {
      setFilteredBuses(busData)
    } else {
      setFilteredBuses(busData.filter((bus) => bus.school === selectedSchool))
    }
  }, [selectedSchool])

  // Filter bus data based on selected child
  useEffect(() => {
    if (selectedChildId) {
      console.log(`Filtering bus data for child ID: ${selectedChildId}`)
      // In a real app, you would fetch data specific to this child
      // For now, we'll just log it
    }
  }, [selectedChildId])

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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              School Bus Tracker
            </CardTitle>
            <CardDescription>Track school buses in real-time and see their current status</CardDescription>
          </div>
          <Select value={selectedSchool} onValueChange={setSelectedSchool}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select school" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              <SelectItem value="مدرسة الأزهر">مدرسة الأزهر</SelectItem>
              <SelectItem value="المدرسة الأمريكية بالقاهرة">المدرسة الأمريكية بالقاهرة</SelectItem>
              <SelectItem value="مدرسة مصر الدولية">مدرسة مصر الدولية</SelectItem>
              <SelectItem value="مدرسة المعادي الدولية">مدرسة المعادي الدولية</SelectItem>
              <SelectItem value="مدرسة القاهرة الجديدة">مدرسة القاهرة الجديدة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="myBuses" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="myBuses">My Buses</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="all">All Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="myBuses" className="space-y-4 pt-1 px-1">
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
              : filteredBuses.slice(0, 3).map((bus) => (
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
                      <School className="h-3.5 w-3.5" />
                      <span>{bus.school}</span>
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

                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        View on Map
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Bell className="h-3.5 w-3.5 mr-1" />
                        Get Notifications
                      </Button>
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
              : filteredBuses.map((bus) => (
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
                      <School className="h-3.5 w-3.5" />
                      <span>{bus.school}</span>
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

                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        View on Map
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Bell className="h-3.5 w-3.5 mr-1" />
                        Get Notifications
                      </Button>
                    </div>
                  </div>
                ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
