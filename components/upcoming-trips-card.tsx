"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function UpcomingTripsCard() {
  // Mock data for upcoming trips
  const trips = [
    {
      id: "1",
      date: "Today",
      pickupTime: "7:30 AM",
      dropoffTime: "3:15 PM",
      pickupLocation: "Oak Street & Maple Avenue",
      dropoffLocation: "Lincoln Elementary School",
      status: "scheduled",
    },
    {
      id: "2",
      date: "Tomorrow",
      pickupTime: "7:30 AM",
      dropoffTime: "3:15 PM",
      pickupLocation: "Oak Street & Maple Avenue",
      dropoffLocation: "Lincoln Elementary School",
      status: "scheduled",
    },
    {
      id: "3",
      date: "Wed, May 8",
      pickupTime: "7:30 AM",
      dropoffTime: "3:15 PM",
      pickupLocation: "Oak Street & Maple Avenue",
      dropoffLocation: "Lincoln Elementary School",
      status: "scheduled",
    },
  ]

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {trips.map((trip, index) => (
            <div key={trip.id} className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">{trip.date}</span>
                </div>
                <Badge variant="outline" className="bg-info/10 text-info">
                  {trip.status === "scheduled" ? "Scheduled" : "Cancelled"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Pickup</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{trip.pickupTime}</span>
                  </div>
                  <div className="flex items-start gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{trip.pickupLocation}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">Dropoff</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{trip.dropoffTime}</span>
                  </div>
                  <div className="flex items-start gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{trip.dropoffLocation}</span>
                  </div>
                </div>
              </div>

              {index === 0 && (
                <Button variant="outline" size="sm" className="w-full">
                  <Clock className="mr-2 h-3 w-3" />
                  Set Reminder
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 bg-muted/50 border-t">
          <Link href="/calendar">
            <Button variant="ghost" size="sm" className="w-full">
              View All Trips
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
