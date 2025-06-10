"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bus, Clock, MapPin, Bell } from "lucide-react"
import Link from "next/link"

export function BusStatusCard() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Mock data for the current bus
  const busData = {
    routeNumber: "42",
    routeName: "Morning Route - Lincoln Elementary",
    status: "on-time",
    currentLocation: "Oak Street & Maple Avenue",
    nextStop: "Pine Road & Cedar Lane",
    eta: "5 min",
    driverName: "Michael Johnson",
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-primary/10 p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-full">
            <Bus className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{busData.routeName}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/20 text-primary">
                Route {busData.routeNumber}
              </Badge>
              <Badge className={busData.status === "on-time" ? "status-on-time" : "status-delayed"}>
                {busData.status === "on-time" ? "On Time" : "Delayed"}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant={isSubscribed ? "outline" : "default"} size="sm" onClick={() => setIsSubscribed(!isSubscribed)}>
          <Bell className="h-4 w-4 mr-2" />
          {isSubscribed ? "Subscribed" : "Get Alerts"}
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current Location</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{busData.currentLocation}</span>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Next Stop</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{busData.nextStop}</span>
                <Badge variant="outline" className="ml-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {busData.eta}
                </Badge>
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Driver</div>
              <div className="font-medium">{busData.driverName}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <Link href="/my-bus">
              <Button className="w-full">
                <Bus className="mr-2 h-4 w-4" />
                Track Live
              </Button>
            </Link>
            <Link href="/my-bus/schedule">
              <Button variant="outline" className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
