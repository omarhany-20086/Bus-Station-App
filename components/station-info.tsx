import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Wifi, Coffee, ShipWheelIcon as Wheelchair, ParkingMeterIcon as Parking } from "lucide-react"

export function StationInfo() {
  const facilities = [
    { icon: Wifi, label: "Free Wi-Fi" },
    { icon: Coffee, label: "Café" },
    { icon: Wheelchair, label: "Accessible" },
    { icon: Parking, label: "Parking" },
  ]

  const upcomingDepartures = [
    { time: "10:15", route: "42", destination: "Downtown" },
    { time: "10:22", route: "15", destination: "Airport" },
    { time: "10:30", route: "37", destination: "University" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Central Station
        </CardTitle>
        <CardDescription>Main transit hub with connections to all routes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {facilities.map((facility) => (
                <Badge key={facility.label} variant="outline" className="flex items-center gap-1">
                  <facility.icon className="h-3 w-3" />
                  <span>{facility.label}</span>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Upcoming Departures</h3>
            <div className="space-y-2">
              {upcomingDepartures.map((departure, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{departure.time}</span>
                    <Badge variant="secondary">{departure.route}</Badge>
                  </div>
                  <span className="text-sm">{departure.destination}</span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View Station Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
