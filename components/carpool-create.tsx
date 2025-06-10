"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Users, Plus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CarpoolCreate() {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    area: "",
    meetingPoint: "",
    departureTime: "",
    returnTime: "",
    seats: "",
    description: "",
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    console.log("Carpool group data:", formData)
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Carpool Group Created
          </CardTitle>
          <CardDescription>Your carpool group has been created successfully</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-success/10 border-success text-success">
            <AlertDescription>
              Your carpool group "{formData.name}" has been created. Other parents and students in your area can now
              find and request to join your group.
            </AlertDescription>
          </Alert>

          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Group Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Group Name</p>
                <p className="text-sm">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">School</p>
                <p className="text-sm">{formData.school}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Area</p>
                <p className="text-sm">{formData.area}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Meeting Point</p>
                <p className="text-sm">{formData.meetingPoint}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Available Seats</p>
                <p className="text-sm">{formData.seats}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Schedule</p>
                <p className="text-sm">
                  {formData.departureTime && `Departure: ${formData.departureTime}`}
                  {formData.departureTime && formData.returnTime && " | "}
                  {formData.returnTime && `Return: ${formData.returnTime}`}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Days</p>
              <p className="text-sm">
                {Object.entries(formData.days)
                  .filter(([_, isSelected]) => isSelected)
                  .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                  .join(", ")}
              </p>
            </div>

            {formData.description && (
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm">{formData.description}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t">
          <Button variant="outline" className="flex-1" onClick={() => setFormSubmitted(false)}>
            Create Another Group
          </Button>
          <Button className="flex-1">Manage Your Group</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Create Carpool Group
        </CardTitle>
        <CardDescription>Start a new carpool group for your school commute</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Lincoln Elementary Morning Carpool"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Select value={formData.school} onValueChange={(value) => handleSelectChange("school", value)} required>
              <SelectTrigger id="school">
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lincoln Elementary">Lincoln Elementary</SelectItem>
                <SelectItem value="Washington Middle School">Washington Middle School</SelectItem>
                <SelectItem value="Jefferson High School">Jefferson High School</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Neighborhood/Area</Label>
              <Input
                id="area"
                name="area"
                placeholder="e.g. Oak Hills"
                value={formData.area}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingPoint">Meeting Point</Label>
              <Input
                id="meetingPoint"
                name="meetingPoint"
                placeholder="e.g. Community Center"
                value={formData.meetingPoint}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureTime">Morning Departure Time</Label>
              <Input
                id="departureTime"
                name="departureTime"
                type="time"
                value={formData.departureTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="returnTime">Afternoon Return Time</Label>
              <Input
                id="returnTime"
                name="returnTime"
                type="time"
                value={formData.returnTime}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats">Available Seats</Label>
            <Input
              id="seats"
              name="seats"
              type="number"
              min="1"
              max="10"
              placeholder="Number of available seats"
              value={formData.seats}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Days of Operation</Label>
            <div className="grid grid-cols-4 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="monday"
                  checked={formData.days.monday}
                  onCheckedChange={(checked) => handleDayChange("monday", checked as boolean)}
                />
                <Label htmlFor="monday" className="text-sm">
                  Monday
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tuesday"
                  checked={formData.days.tuesday}
                  onCheckedChange={(checked) => handleDayChange("tuesday", checked as boolean)}
                />
                <Label htmlFor="tuesday" className="text-sm">
                  Tuesday
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wednesday"
                  checked={formData.days.wednesday}
                  onCheckedChange={(checked) => handleDayChange("wednesday", checked as boolean)}
                />
                <Label htmlFor="wednesday" className="text-sm">
                  Wednesday
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="thursday"
                  checked={formData.days.thursday}
                  onCheckedChange={(checked) => handleDayChange("thursday", checked as boolean)}
                />
                <Label htmlFor="thursday" className="text-sm">
                  Thursday
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="friday"
                  checked={formData.days.friday}
                  onCheckedChange={(checked) => handleDayChange("friday", checked as boolean)}
                />
                <Label htmlFor="friday" className="text-sm">
                  Friday
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saturday"
                  checked={formData.days.saturday}
                  onCheckedChange={(checked) => handleDayChange("saturday", checked as boolean)}
                />
                <Label htmlFor="saturday" className="text-sm">
                  Saturday
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sunday"
                  checked={formData.days.sunday}
                  onCheckedChange={(checked) => handleDayChange("sunday", checked as boolean)}
                />
                <Label htmlFor="sunday" className="text-sm">
                  Sunday
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Additional information about your carpool group..."
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Carpool Group
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
