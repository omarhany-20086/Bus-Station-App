"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bus, Home, School, Users, Navigation, Zap } from "lucide-react"

interface MapLocation {
  id: string
  lat: number
  lng: number
  type: "bus" | "home" | "school" | "stop" | "carpool"
  name: string
  status?: string
  eta?: string
  occupancy?: number
}

interface InteractiveMapProps {
  locations: MapLocation[]
  selectedChild?: string
  onLocationSelect?: (location: MapLocation) => void
}

export function InteractiveMap({ locations, selectedChild, onLocationSelect }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Mock real-time updates
  useEffect(() => {
    if (!isTracking) return

    const interval = setInterval(() => {
      // Simulate bus movement
      // In a real app, this would come from WebSocket or API
      console.log("Updating bus locations...")
    }, 5000)

    return () => clearInterval(interval)
  }, [isTracking])

  // Google Maps implementation commented out until the real project
  /*
  useEffect(() => {
    if (!mapRef.current) return

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 30.0444, lng: 31.2357 },
      zoom: 12,
      styles: [], // Add custom styles here
    })

    // Add markers for each location
    locations.forEach((location) => {
      new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
        icon: getLocationIcon(location.type, location.status),
      })
    })
  }, [locations])
  */

  const getLocationIcon = (type: string, status?: string) => {
    switch (type) {
      case "bus":
        return <Bus className={`h-6 w-6 ${status === "delayed" ? "text-warning" : "text-success"}`} />
      case "home":
        return <Home className="h-6 w-6 text-primary" />
      case "school":
        return <School className="h-6 w-6 text-secondary-foreground" />
      case "carpool":
        return <Users className="h-6 w-6 text-accent-foreground" />
      default:
        return <MapPin className="h-6 w-6 text-muted-foreground" />
    }
  }

  const getStatusColor = (status?: string) => {
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            خريطة تفاعلية
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={isTracking ? "default" : "outline"}
              size="sm"
              onClick={() => setIsTracking(!isTracking)}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {isTracking ? "إيقاف التتبع" : "تتبع مباشر"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Map Container */}
        <div
          ref={mapRef}
          className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 map-container"
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Roads */}
              <path
                d="M0 150 L400 150 M200 0 L200 300 M100 75 L300 225 M100 225 L300 75"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              />
              {/* Buildings */}
              <rect x="50" y="50" width="30" height="40" fill="currentColor" className="text-muted-foreground/30" />
              <rect x="320" y="200" width="40" height="50" fill="currentColor" className="text-muted-foreground/30" />
              <rect x="150" y="80" width="35" height="30" fill="currentColor" className="text-muted-foreground/30" />
            </svg>
          </div>

          {/* Location Markers */}
          {locations.map((location) => (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 gpu-accelerated"
              style={{
                left: `${(location.lng + 180) * (100 / 360)}%`,
                top: `${(90 - location.lat) * (100 / 180)}%`,
              }}
              onClick={() => {
                setSelectedLocation(location)
                onLocationSelect?.(location)
              }}
            >
              <div className="relative">
                <div className="bg-background border-2 border-primary rounded-full p-2 shadow-lg">
                  {getLocationIcon(location.type, location.status)}
                </div>
                {location.type === "bus" && isTracking && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 80 120 Q 200 80 320 180"
              stroke="url(#routeGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Location Details Panel */}
        {selectedLocation && (
          <div className="border-t p-4 bg-muted/30">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {getLocationIcon(selectedLocation.type, selectedLocation.status)}
                <div>
                  <h4 className="font-semibold">{selectedLocation.name}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{selectedLocation.type}</p>
                </div>
              </div>
              {selectedLocation.status && (
                <Badge className={getStatusColor(selectedLocation.status)}>
                  {selectedLocation.status === "on-time" ? "في الموعد" : "متأخر"}
                </Badge>
              )}
            </div>

            {selectedLocation.eta && (
              <div className="flex items-center gap-2 text-sm mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>الوقت المتوقع للوصول: {selectedLocation.eta}</span>
              </div>
            )}

            {selectedLocation.occupancy !== undefined && (
              <div className="flex items-center gap-2 text-sm mb-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>الإشغال: {selectedLocation.occupancy}%</span>
                <div className="flex-1 bg-muted rounded-full h-2 ml-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${selectedLocation.occupancy}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                عرض التفاصيل
              </Button>
              {selectedLocation.type === "bus" && (
                <Button size="sm" className="flex-1">
                  تتبع الحافلة
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
          <h5 className="font-medium text-sm mb-2">المفتاح</h5>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <Bus className="h-3 w-3 text-success" />
              <span>حافلة (في الموعد)</span>
            </div>
            <div className="flex items-center gap-2">
              <Bus className="h-3 w-3 text-warning" />
              <span>حافلة (متأخرة)</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-3 w-3 text-primary" />
              <span>المنزل</span>
            </div>
            <div className="flex items-center gap-2">
              <School className="h-3 w-3 text-secondary-foreground" />
              <span>المدرسة</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 text-accent-foreground" />
              <span>مجموعة مشاركة</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
