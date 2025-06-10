"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, MapPin, School, Bus, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SchoolRouteFinder() {
  const [address, setAddress] = useState("")
  const [schoolLevel, setSchoolLevel] = useState("all")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Mock data for school bus stops
  const mockStops = [
    {
      id: "1",
      stopName: "Oak Street & Maple Avenue",
      schools: ["Lincoln Elementary", "Washington Middle School"],
      routes: ["E1", "M2"],
      pickupTimes: ["7:15 AM", "7:45 AM"],
      dropoffTimes: ["3:30 PM", "4:00 PM"],
      distance: "0.3 miles",
    },
    {
      id: "2",
      stopName: "Pine Road & Cedar Lane",
      schools: ["Lincoln Elementary", "Jefferson High School"],
      routes: ["E1", "H3"],
      pickupTimes: ["7:20 AM", "7:30 AM"],
      dropoffTimes: ["3:35 PM", "4:15 PM"],
      distance: "0.5 miles",
    },
    {
      id: "3",
      stopName: "Birch Street & Willow Drive",
      schools: ["Washington Middle School", "Jefferson High School"],
      routes: ["M2", "H3"],
      pickupTimes: ["7:25 AM", "7:35 AM"],
      dropoffTimes: ["3:45 PM", "4:20 PM"],
      distance: "0.7 miles",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)

    // Filter stops based on school level
    let results = [...mockStops]

    if (schoolLevel !== "all") {
      results = results.filter((stop) => {
        if (schoolLevel === "elementary") {
          return stop.schools.some((school) => school.toLowerCase().includes("elementary"))
        } else if (schoolLevel === "middle") {
          return stop.schools.some((school) => school.toLowerCase().includes("middle"))
        } else if (schoolLevel === "high") {
          return stop.schools.some((school) => school.toLowerCase().includes("high"))
        }
        return true
      })
    }

    // Sort by distance (in a real app, this would be calculated based on the address)
    results.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))

    setSearchResults(results)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Find Nearby School Bus Stops
        </CardTitle>
        <CardDescription>Enter your address to find the closest school bus stops</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Label htmlFor="address">Your Address</Label>
              <Input
                id="address"
                placeholder="Enter your home address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="school-level">School Level</Label>
              <Select value={schoolLevel} onValueChange={setSchoolLevel}>
                <SelectTrigger id="school-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Find Bus Stops
          </Button>
        </form>

        {hasSearched && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-lg">Nearby Bus Stops</h3>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((stop) => (
                  <Card key={stop.id} className="overflow-hidden">
                    <div className="p-4 border-b bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{stop.stopName}</h4>
                          <p className="text-sm text-muted-foreground">{stop.distance} from your location</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View on Map
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <School className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Schools Served:</p>
                            <p className="text-sm">{stop.schools.join(", ")}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Bus className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Routes:</p>
                            <p className="text-sm">{stop.routes.join(", ")}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-sm font-medium">Pickup Times:</p>
                                <p className="text-sm">{stop.pickupTimes.join(", ")}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Dropoff Times:</p>
                                <p className="text-sm">{stop.dropoffTimes.join(", ")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  No bus stops found near your address. Please try a different address or contact your school district
                  for assistance.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
