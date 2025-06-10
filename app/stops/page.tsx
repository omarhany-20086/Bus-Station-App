"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Bus, Clock, ArrowLeft } from "lucide-react"

export default function StopsPage() {
  const [address, setAddress] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Mock data for bus stops
  const mockStops = [
    {
      id: "1",
      name: "Oak Street & Maple Avenue",
      distance: "0.3 miles",
      routes: ["42", "15"],
      morningTimes: ["7:15 AM", "7:45 AM"],
      afternoonTimes: ["3:30 PM", "4:00 PM"],
    },
    {
      id: "2",
      name: "Pine Road & Cedar Lane",
      distance: "0.5 miles",
      routes: ["42", "37"],
      morningTimes: ["7:20 AM", "7:30 AM"],
      afternoonTimes: ["3:35 PM", "4:15 PM"],
    },
    {
      id: "3",
      name: "Elm Street & Birch Avenue",
      distance: "0.7 miles",
      routes: ["15", "37"],
      morningTimes: ["7:25 AM", "7:35 AM"],
      afternoonTimes: ["3:45 PM", "4:20 PM"],
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)
    setSearchResults(mockStops)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-4">
      <div className="flex items-center mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium">Find Bus Stops</h1>
      </div>

      <Card className="mb-4 p-3">
        <form onSubmit={handleSearch} className="space-y-3">
          <div>
            <Input
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-sm"
              required
            />
          </div>

          <Button type="submit" size="sm" className="w-full">
            <Search className="h-3 w-3 mr-1" />
            Find Nearby Stops
          </Button>
        </form>
      </Card>

      {hasSearched && (
        <div>
          <h2 className="text-sm font-medium mb-2">Nearby Bus Stops</h2>

          <div className="space-y-3">
            {searchResults.map((stop) => (
              <Card key={stop.id} className="p-3">
                <div className="mb-2">
                  <h3 className="text-sm font-medium">{stop.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{stop.distance} from your location</span>
                  </div>
                </div>

                <div className="space-y-2 mb-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Routes</div>
                    <div className="flex flex-wrap gap-1">
                      {stop.routes.map((route: string) => (
                        <Badge key={route} variant="outline" className="text-xs">
                          <Bus className="h-2.5 w-2.5 mr-0.5" />
                          {route}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Morning</div>
                      {stop.morningTimes.map((time: string, index: number) => (
                        <div key={`morning-${index}`} className="flex items-center gap-1 text-xs">
                          <Clock className="h-2.5 w-2.5 text-primary" />
                          <span>{time}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Afternoon</div>
                      {stop.afternoonTimes.map((time: string, index: number) => (
                        <div key={`afternoon-${index}`} className="flex items-center gap-1 text-xs">
                          <Clock className="h-2.5 w-2.5 text-primary" />
                          <span>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button size="sm" className="w-full text-xs">
                  Set as My Stop
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
