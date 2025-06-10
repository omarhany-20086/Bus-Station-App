"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Bus, Clock, School, ArrowRight } from "lucide-react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function FindStopsPage() {
  const [address, setAddress] = useState("")
  const [schoolType, setSchoolType] = useState("all")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Mock data for bus stops
  const mockStops = [
    {
      id: "1",
      name: "Oak Street & Maple Avenue",
      distance: "0.3 miles",
      schools: ["Lincoln Elementary", "Washington Middle School"],
      routes: ["42", "15"],
      morningTimes: ["7:15 AM", "7:45 AM"],
      afternoonTimes: ["3:30 PM", "4:00 PM"],
    },
    {
      id: "2",
      name: "Pine Road & Cedar Lane",
      distance: "0.5 miles",
      schools: ["Lincoln Elementary", "Jefferson High School"],
      routes: ["42", "37"],
      morningTimes: ["7:20 AM", "7:30 AM"],
      afternoonTimes: ["3:35 PM", "4:15 PM"],
    },
    {
      id: "3",
      name: "Elm Street & Birch Avenue",
      distance: "0.7 miles",
      schools: ["Washington Middle School", "Jefferson High School"],
      routes: ["15", "37"],
      morningTimes: ["7:25 AM", "7:35 AM"],
      afternoonTimes: ["3:45 PM", "4:20 PM"],
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)

    // In a real app, this would filter based on the address and school type
    setSearchResults(mockStops)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Find Stops", href: "/find-stops", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Find Bus Stops</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Search for Nearby Bus Stops
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-base mb-2 block">
                  Your Address
                </Label>
                <Input
                  id="address"
                  placeholder="Enter your home address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <Label htmlFor="school-type" className="text-base mb-2 block">
                  School Type
                </Label>
                <Select value={schoolType} onValueChange={setSchoolType}>
                  <SelectTrigger id="school-type" className="form-input">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    <SelectItem value="elementary">Elementary School</SelectItem>
                    <SelectItem value="middle">Middle School</SelectItem>
                    <SelectItem value="high">High School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto btn-large">
              <Search className="mr-2 h-5 w-5" />
              Find Nearby Stops
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nearby Bus Stops</h2>

          <div className="space-y-4">
            {searchResults.map((stop) => (
              <Card key={stop.id} className="overflow-hidden card-interactive">
                <CardContent className="p-0">
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{stop.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{stop.distance} from your location</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        View on Map
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <School className="h-4 w-4 text-primary" />
                            <span className="font-medium">Schools Served</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {stop.schools.map((school: string) => (
                              <Badge key={school} variant="outline">
                                {school}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Bus className="h-4 w-4 text-primary" />
                            <span className="font-medium">Routes</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {stop.routes.map((route: string) => (
                              <Badge key={route} className="bg-primary/20 text-primary">
                                Route {route}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">Morning Pickup Times</span>
                          </div>
                          <div className="space-y-1">
                            {stop.morningTimes.map((time: string, index: number) => (
                              <div key={`morning-${index}`} className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{time}</span>
                                <Badge variant="outline" className="ml-1">
                                  Route {stop.routes[index]}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">Afternoon Dropoff Times</span>
                          </div>
                          <div className="space-y-1">
                            {stop.afternoonTimes.map((time: string, index: number) => (
                              <div key={`afternoon-${index}`} className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{time}</span>
                                <Badge variant="outline" className="ml-1">
                                  Route {stop.routes[index]}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button size="sm">
                        Set as My Stop
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
