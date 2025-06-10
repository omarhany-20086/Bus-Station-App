"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Users, MapPin, School, Clock, Calendar } from "lucide-react"

export function CarpoolSearch() {
  const [location, setLocation] = useState("")
  const [school, setSchool] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Mock data for carpool groups
  const mockCarpoolGroups = [
    {
      id: "1",
      name: "Lincoln Elementary Morning Carpool",
      school: "Lincoln Elementary",
      area: "Oak Hills Neighborhood",
      schedule: "Weekday Mornings",
      members: 4,
      seats: 2,
      meetingPoint: "Oak Hills Community Center",
      departureTime: "7:30 AM",
      returnTime: "3:45 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    {
      id: "2",
      name: "Washington Middle School Afternoon Group",
      school: "Washington Middle School",
      area: "Pine Valley Estates",
      schedule: "Weekday Afternoons",
      members: 3,
      seats: 1,
      meetingPoint: "Pine Valley Park",
      departureTime: "N/A",
      returnTime: "4:00 PM",
      days: ["Monday", "Wednesday", "Friday"],
    },
    {
      id: "3",
      name: "Jefferson High School Sports Carpool",
      school: "Jefferson High School",
      area: "Maple Woods & Downtown",
      schedule: "Afternoons & Weekends",
      members: 5,
      seats: 0,
      meetingPoint: "Downtown Community Center",
      departureTime: "Varies",
      returnTime: "Varies",
      days: ["Monday", "Wednesday", "Friday", "Saturday"],
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)

    // Filter carpool groups based on location and school
    let results = [...mockCarpoolGroups]

    if (school) {
      results = results.filter((group) => group.school.toLowerCase().includes(school.toLowerCase()))
    }

    if (location) {
      results = results.filter(
        (group) =>
          group.area.toLowerCase().includes(location.toLowerCase()) ||
          group.meetingPoint.toLowerCase().includes(location.toLowerCase()),
      )
    }

    setSearchResults(results)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Find Carpools
        </CardTitle>
        <CardDescription>Search for existing carpool groups in your area</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Your Neighborhood/Area</Label>
            <Input
              id="location"
              placeholder="e.g. Oak Hills, Downtown"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Select value={school} onValueChange={setSchool}>
              <SelectTrigger id="school">
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any School</SelectItem>
                <SelectItem value="Lincoln Elementary">Lincoln Elementary</SelectItem>
                <SelectItem value="Washington Middle School">Washington Middle School</SelectItem>
                <SelectItem value="Jefferson High School">Jefferson High School</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Find Carpool Groups
          </Button>
        </form>

        {hasSearched && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-lg">Available Carpool Groups</h3>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <div className="p-4 border-b bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {group.members} members, {group.seats} seats available
                            </p>
                          </div>
                        </div>
                        <Badge variant={group.seats > 0 ? "outline" : "secondary"}>
                          {group.seats > 0 ? "Open" : "Full"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <School className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">School:</p>
                            <p className="text-sm">{group.school}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Area & Meeting Point:</p>
                            <p className="text-sm">{group.area}</p>
                            <p className="text-sm">{group.meetingPoint}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Schedule:</p>
                            <p className="text-sm">
                              {group.departureTime !== "N/A" && `Departure: ${group.departureTime}`}
                              {group.departureTime !== "N/A" && group.returnTime !== "N/A" && " | "}
                              {group.returnTime !== "N/A" && `Return: ${group.returnTime}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Days:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {group.days.map((day) => (
                                <Badge key={day} variant="outline" className="text-xs">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4 bg-muted/20">
                      <Button className="w-full" disabled={group.seats === 0}>
                        {group.seats > 0 ? "Request to Join" : "Join Waitlist"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No carpool groups found matching your criteria</p>
                <p className="text-sm text-muted-foreground mt-1">Try different search terms or create a new group</p>
                <Button variant="outline" className="mt-4">
                  Create New Carpool Group
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
