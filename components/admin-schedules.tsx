"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Clock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for schedules
const initialSchedules = [
  { id: "1", time: "06:00", destination: "Downtown", route: "42", status: "on-time", day: "weekday" },
  { id: "2", time: "06:15", destination: "Airport", route: "15", status: "on-time", day: "weekday" },
  { id: "3", time: "06:30", destination: "University", route: "37", status: "on-time", day: "weekday" },
  { id: "4", time: "06:45", destination: "Downtown", route: "42", status: "on-time", day: "weekday" },
  { id: "5", time: "07:00", destination: "Beach Resort", route: "8", status: "on-time", day: "weekday" },
  { id: "6", time: "07:15", destination: "Airport", route: "15", status: "delayed", day: "weekday" },
  { id: "7", time: "07:30", destination: "University", route: "37", status: "on-time", day: "weekday" },
  { id: "8", time: "07:45", destination: "Downtown", route: "42", status: "on-time", day: "weekday" },
  { id: "9", time: "08:00", destination: "Metro Mall", route: "53", status: "on-time", day: "weekday" },
  { id: "10", time: "07:00", destination: "Downtown", route: "42", status: "on-time", day: "saturday" },
  { id: "11", time: "07:30", destination: "Airport", route: "15", status: "on-time", day: "saturday" },
  { id: "12", time: "08:00", destination: "University", route: "37", status: "on-time", day: "saturday" },
  { id: "13", time: "08:00", destination: "Downtown", route: "42", status: "on-time", day: "sunday" },
  { id: "14", time: "09:00", destination: "Airport", route: "15", status: "on-time", day: "sunday" },
  { id: "15", time: "10:00", destination: "University", route: "37", status: "on-time", day: "sunday" },
]

export function AdminSchedules() {
  const [schedules, setSchedules] = useState(initialSchedules)
  const [activeTab, setActiveTab] = useState("manage")
  const [editingSchedule, setEditingSchedule] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [filterDay, setFilterDay] = useState("weekday")

  // Form state for adding/editing schedules
  const [formData, setFormData] = useState({
    time: "",
    destination: "",
    route: "42",
    status: "on-time",
    day: "weekday",
  })

  const resetForm = () => {
    setFormData({
      time: "",
      destination: "",
      route: "42",
      status: "on-time",
      day: "weekday",
    })
    setEditingSchedule(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSchedule = (schedule: any) => {
    setEditingSchedule(schedule)
    setFormData({
      time: schedule.time,
      destination: schedule.destination,
      route: schedule.route,
      status: schedule.status,
      day: schedule.day,
    })
    setActiveTab("add")
  }

  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== scheduleId))
    setSuccessMessage("Schedule deleted successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingSchedule) {
      // Update existing schedule
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editingSchedule.id
            ? {
                ...schedule,
                time: formData.time,
                destination: formData.destination,
                route: formData.route,
                status: formData.status,
                day: formData.day,
              }
            : schedule,
        ),
      )
      setSuccessMessage("Schedule updated successfully")
    } else {
      // Add new schedule
      const newSchedule = {
        id: (schedules.length + 1).toString(),
        time: formData.time,
        destination: formData.destination,
        route: formData.route,
        status: formData.status,
        day: formData.day,
      }
      setSchedules((prev) => [...prev, newSchedule])
      setSuccessMessage("Schedule added successfully")
    }

    resetForm()
    setActiveTab("manage")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-success text-success-foreground">On Time</Badge>
      case "delayed":
        return <Badge className="bg-warning text-warning-foreground">Delayed</Badge>
      case "cancelled":
        return <Badge className="bg-destructive text-destructive-foreground">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredSchedules = schedules.filter((schedule) => schedule.day === filterDay)

  return (
    <div>
      {successMessage && (
        <Alert className="mb-4 bg-success/10 text-success border-success">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="manage">Manage Schedules</TabsTrigger>
          <TabsTrigger value="add">{editingSchedule ? "Edit Schedule" : "Add Schedule"}</TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Schedule Management</span>
                </div>
                <Button
                  onClick={() => {
                    resetForm()
                    setActiveTab("add")
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Schedule
                </Button>
              </CardTitle>
              <CardDescription>View, edit, and delete bus schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="filter-day">Filter by Day</Label>
                <Select value={filterDay} onValueChange={setFilterDay}>
                  <SelectTrigger id="filter-day" className="w-[180px]">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekday">Weekday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{schedule.route}</Badge>
                      </TableCell>
                      <TableCell>{schedule.destination}</TableCell>
                      <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditSchedule(schedule)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Schedule</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this schedule? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={() => handleDeleteSchedule(schedule.id)}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {editingSchedule ? "Edit Schedule" : "Add New Schedule"}
              </CardTitle>
              <CardDescription>
                {editingSchedule ? "Update schedule information" : "Create a new bus schedule"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time">Departure Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="day">Day</Label>
                    <Select value={formData.day} onValueChange={(value) => handleSelectChange("day", value)}>
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekday">Weekday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="route">Route</Label>
                    <Select value={formData.route} onValueChange={(value) => handleSelectChange("route", value)}>
                      <SelectTrigger id="route">
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="42">Route 42</SelectItem>
                        <SelectItem value="15">Route 15</SelectItem>
                        <SelectItem value="37">Route 37</SelectItem>
                        <SelectItem value="8">Route 8</SelectItem>
                        <SelectItem value="53">Route 53</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-time">On Time</SelectItem>
                        <SelectItem value="delayed">Delayed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="e.g. Downtown"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      resetForm()
                      setActiveTab("manage")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingSchedule ? "Update Schedule" : "Add Schedule"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
