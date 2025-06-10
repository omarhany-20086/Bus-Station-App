"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Clock, MapPin, School, Bus, Pencil, Trash2, Bell } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SchoolRoutesListProps {
  isAdmin?: boolean
}

export function SchoolRoutesList({ isAdmin = false }: SchoolRoutesListProps) {
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null)
  const [filterSchool, setFilterSchool] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [routeToDelete, setRouteToDelete] = useState<string | null>(null)

  // Mock data for school bus routes
  const schoolRoutes = [
    {
      id: "A12",
      name: "مدرسة النور الدولية - المسار الصباحي",
      schools: ["مدرسة النور الدولية"],
      startTime: "7:00 AM",
      endTime: "8:00 AM",
      returnStartTime: "3:15 PM",
      returnEndTime: "4:15 PM",
      stops: [
        { name: "حي الياسمين", time: "7:15 AM", returnTime: "3:45 PM" },
        { name: "حي الورود", time: "7:20 AM", returnTime: "3:35 PM" },
        { name: "حي النزهة", time: "7:30 AM", returnTime: "3:30 PM" },
      ],
      status: "active",
    },
    {
      id: "B23",
      name: "مدرسة الأندلس - المسار الصباحي",
      schools: ["مدرسة الأندلس"],
      startTime: "7:15 AM",
      endTime: "8:15 AM",
      returnStartTime: "3:30 PM",
      returnEndTime: "4:30 PM",
      stops: [
        { name: "حي الفيصلية", time: "7:45 AM", returnTime: "4:00 PM" },
        { name: "حي العزيزية", time: "7:25 AM", returnTime: "3:45 PM" },
        { name: "حي الملز", time: "7:35 AM", returnTime: "3:40 PM" },
      ],
      status: "active",
    },
    {
      id: "C34",
      name: "مدرسة الفلاح - المسار الصباحي",
      schools: ["مدرسة الفلاح"],
      startTime: "6:45 AM",
      endTime: "7:45 AM",
      returnStartTime: "4:00 PM",
      returnEndTime: "5:00 PM",
      stops: [
        { name: "حي الخالدية", time: "7:30 AM", returnTime: "4:15 PM" },
        { name: "حي السلامة", time: "7:35 AM", returnTime: "4:20 PM" },
        { name: "حي الربوة", time: "7:15 AM", returnTime: "4:30 PM" },
      ],
      status: "active",
    },
    {
      id: "D45",
      name: "مدرسة المعرفة - المسار الصباحي",
      schools: ["مدرسة المعرفة"],
      startTime: "N/A",
      endTime: "N/A",
      returnStartTime: "5:30 PM",
      returnEndTime: "6:30 PM",
      stops: [
        { name: "المجمع المدرسي الرئيسي", time: "N/A", returnTime: "5:30 PM" },
        { name: "المركز الثقافي", time: "N/A", returnTime: "5:45 PM" },
        { name: "المجمع الرياضي", time: "N/A", returnTime: "6:00 PM" },
      ],
      status: "limited",
    },
  ]

  const toggleRouteExpand = (routeId: string) => {
    if (expandedRoute === routeId) {
      setExpandedRoute(null)
    } else {
      setExpandedRoute(routeId)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success">
            Active
          </Badge>
        )
      case "limited":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning">
            Limited
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">
            Suspended
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Filter routes based on school and search query
  const filteredRoutes = schoolRoutes.filter((route) => {
    // Filter by school
    if (filterSchool !== "all") {
      const schoolType = filterSchool.toLowerCase()
      const matchesSchool = route.schools.some((school) => school.toLowerCase().includes(schoolType))
      if (!matchesSchool) return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesRoute =
        route.id.toLowerCase().includes(query) ||
        route.name.toLowerCase().includes(query) ||
        route.schools.some((school) => school.toLowerCase().includes(query)) ||
        route.stops.some((stop) => stop.name.toLowerCase().includes(query))

      if (!matchesRoute) return false
    }

    return true
  })

  const handleDeleteClick = (routeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRouteToDelete(routeId)
    setShowDeleteDialog(true)
  }

  const handleDeleteRoute = () => {
    // In a real app, this would delete the route
    console.log("Deleting route:", routeToDelete)
    setShowDeleteDialog(false)
    setRouteToDelete(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Label htmlFor="search-routes" className="mb-2 block">
                Search Routes
              </Label>
              <Input
                id="search-routes"
                placeholder="Search by route number, name, school, or stop"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="filter-school" className="mb-2 block">
                Filter by School
              </Label>
              <Select value={filterSchool} onValueChange={setFilterSchool}>
                <SelectTrigger id="filter-school">
                  <SelectValue placeholder="Select school type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  <SelectItem value="مدرسة النور الدولية">مدرسة النور الدولية</SelectItem>
                  <SelectItem value="مدرسة الأندلس">مدرسة الأندلس</SelectItem>
                  <SelectItem value="مدرسة الفلاح">مدرسة الفلاح</SelectItem>
                  <SelectItem value="مدرسة المعرفة">مدرسة المعرفة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route) => (
            <Card key={route.id} className="overflow-hidden card-hover">
              <div
                className="p-4 cursor-pointer hover:bg-accent transition-colors flex justify-between items-center"
                onClick={() => toggleRouteExpand(route.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                    {route.id}
                  </div>
                  <div>
                    <h3 className="font-medium">{route.name}</h3>
                    <p className="text-sm text-muted-foreground">{route.schools.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(route.status)}
                  {isAdmin && (
                    <div className="flex items-center gap-1 mr-2">
                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={(e) => handleDeleteClick(route.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {expandedRoute === route.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedRoute === route.id && (
                <CardContent className="pt-4 pb-4 border-t">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <School className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Schools Served</p>
                        </div>
                        <p className="text-sm">{route.schools.join(", ")}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Schedule</p>
                        </div>
                        <p className="text-sm">
                          Morning: {route.startTime} - {route.endTime}
                        </p>
                        <p className="text-sm">
                          Afternoon: {route.returnStartTime} - {route.returnEndTime}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Bus Stops</p>
                      </div>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                                Stop Location
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                                Morning Pickup
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                                Afternoon Dropoff
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {route.stops.map((stop, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                                <td className="px-4 py-2 text-sm">{stop.name}</td>
                                <td className="px-4 py-2 text-sm">{stop.time}</td>
                                <td className="px-4 py-2 text-sm">{stop.returnTime}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Bus className="h-4 w-4 mr-2" />
                        Track Bus
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        View Route Map
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Bell className="h-4 w-4 mr-2" />
                        Get Notifications
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No routes found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Route</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this route? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRoute}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
