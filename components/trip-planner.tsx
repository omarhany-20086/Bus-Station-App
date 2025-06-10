"use client"

import { Checkbox } from "@/components/ui/checkbox"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock, RotateCcw, Search, ShipWheelIcon as Wheelchair, MapPin, Bus } from "lucide-react"

export function TripPlanner() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("now")
  const [preferenceType, setPreferenceType] = useState("fastest")
  const [accessibility, setAccessibility] = useState(false)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }

  const resetForm = () => {
    setDate(new Date())
    setTime("now")
    setPreferenceType("fastest")
    setAccessibility(false)
    setOrigin("")
    setDestination("")
    setShowResults(false)
  }

  // Mock trip results
  const tripResults = [
    {
      id: "1",
      duration: "35 min",
      departure: "10:15 AM",
      arrival: "10:50 AM",
      transfers: 1,
      routes: ["42", "15"],
      steps: [
        {
          type: "walk",
          description: "Walk to Central Station",
          duration: "5 min",
          distance: "0.3 miles",
        },
        {
          type: "bus",
          route: "42",
          description: "Take Route 42 to Downtown",
          duration: "15 min",
          stops: 6,
        },
        {
          type: "transfer",
          description: "Transfer at Downtown Station",
          duration: "3 min",
        },
        {
          type: "bus",
          route: "15",
          description: "Take Route 15 to Airport",
          duration: "10 min",
          stops: 4,
        },
        {
          type: "walk",
          description: "Walk to Terminal 1",
          duration: "2 min",
          distance: "0.1 miles",
        },
      ],
      accessible: true,
    },
    {
      id: "2",
      duration: "28 min",
      departure: "10:22 AM",
      arrival: "10:50 AM",
      transfers: 0,
      routes: ["15"],
      steps: [
        {
          type: "walk",
          description: "Walk to Downtown Station",
          duration: "8 min",
          distance: "0.5 miles",
        },
        {
          type: "bus",
          route: "15",
          description: "Take Route 15 to Airport",
          duration: "20 min",
          stops: 8,
        },
      ],
      accessible: true,
    },
    {
      id: "3",
      duration: "45 min",
      departure: "10:05 AM",
      arrival: "10:50 AM",
      transfers: 2,
      routes: ["37", "42", "15"],
      steps: [
        {
          type: "walk",
          description: "Walk to University Station",
          duration: "3 min",
          distance: "0.2 miles",
        },
        {
          type: "bus",
          route: "37",
          description: "Take Route 37 to Science Center",
          duration: "12 min",
          stops: 5,
        },
        {
          type: "transfer",
          description: "Transfer at Science Center",
          duration: "5 min",
        },
        {
          type: "bus",
          route: "42",
          description: "Take Route 42 to Downtown",
          duration: "10 min",
          stops: 4,
        },
        {
          type: "transfer",
          description: "Transfer at Downtown Station",
          duration: "3 min",
        },
        {
          type: "bus",
          route: "15",
          description: "Take Route 15 to Airport",
          duration: "10 min",
          stops: 4,
        },
        {
          type: "walk",
          description: "Walk to Terminal 1",
          duration: "2 min",
          distance: "0.1 miles",
        },
      ],
      accessible: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Trip Planner
        </CardTitle>
        <CardDescription>Plan your journey from origin to destination</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plan">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="plan">Plan Trip</TabsTrigger>
            <TabsTrigger value="results" disabled={!showResults}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    placeholder="Enter starting point"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Depart Now</SelectItem>
                      <SelectItem value="morning">Morning (6AM - 9AM)</SelectItem>
                      <SelectItem value="midday">Midday (9AM - 3PM)</SelectItem>
                      <SelectItem value="evening">Evening (3PM - 7PM)</SelectItem>
                      <SelectItem value="night">Night (7PM - 12AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferences</Label>
                <RadioGroup
                  value={preferenceType}
                  onValueChange={setPreferenceType}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fastest" id="fastest" />
                    <Label htmlFor="fastest" className="cursor-pointer">
                      Fastest Route
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fewest-transfers" id="fewest-transfers" />
                    <Label htmlFor="fewest-transfers" className="cursor-pointer">
                      Fewest Transfers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="least-walking" id="least-walking" />
                    <Label htmlFor="least-walking" className="cursor-pointer">
                      Least Walking
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessibility"
                  checked={accessibility}
                  onCheckedChange={() => setAccessibility(!accessibility)}
                />
                <Label htmlFor="accessibility" className="cursor-pointer flex items-center gap-1">
                  <Wheelchair className="h-4 w-4" />
                  <span>Accessible routes only</span>
                </Label>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1 flex items-center gap-1" onClick={resetForm}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
                <Button type="submit" className="flex-1 flex items-center gap-1">
                  <Search className="h-3.5 w-3.5" />
                  Find Routes
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="results">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Trip Results</h3>
                  <p className="text-sm text-muted-foreground">
                    {origin} to {destination}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowResults(false)}>
                  Modify Search
                </Button>
              </div>

              {tripResults.map((trip) => (
                <Card key={trip.id} className="overflow-hidden border-2 hover:border-primary transition-colors">
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{trip.duration}</div>
                          <div className="text-sm">
                            {trip.departure} - {trip.arrival}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {trip.accessible && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-success/10 text-success border-success"
                          >
                            <Wheelchair className="h-3 w-3" />
                            <span>Accessible</span>
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          {trip.transfers} {trip.transfers === 1 ? "transfer" : "transfers"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="text-sm font-medium mr-2">Routes:</div>
                      {trip.routes.map((route, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary">
                          {route}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-0">
                    <div className="p-4 space-y-4">
                      <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">
                        Trip Details
                      </h3>
                      {trip.steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step.type === "bus"
                                  ? "bg-primary text-primary-foreground"
                                  : step.type === "walk"
                                    ? "bg-secondary text-secondary-foreground"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {step.type === "bus" && step.route}
                              {step.type === "walk" && "🚶"}
                              {step.type === "transfer" && "↔️"}
                            </div>
                            {index < trip.steps.length - 1 && <div className="w-0.5 h-full bg-border mt-1"></div>}
                          </div>

                          <div className="flex-1 pb-3">
                            <p className="font-medium text-base">{step.description}</p>
                            <div className="flex flex-wrap items-center gap-4 mt-1">
                              <span className="bg-muted px-2 py-0.5 rounded text-sm font-medium">{step.duration}</span>
                              {step.distance && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" /> {step.distance}
                                </span>
                              )}
                              {step.stops && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Bus className="h-3.5 w-3.5" /> {step.stops} stops
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t bg-muted/30 flex justify-end">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Select This Route
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
