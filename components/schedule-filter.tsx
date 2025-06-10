"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Filter, RotateCcw } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function ScheduleFilter() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [route, setRoute] = useState("all")
  const [direction, setDirection] = useState("all")

  const resetFilters = () => {
    setDate(new Date())
    setRoute("all")
    setDirection("all")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter Schedules
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Label htmlFor="route">Route</Label>
          <Select value={route} onValueChange={setRoute}>
            <SelectTrigger id="route">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Routes</SelectItem>
              <SelectItem value="42">Route 42 - Downtown Express</SelectItem>
              <SelectItem value="15">Route 15 - Airport Shuttle</SelectItem>
              <SelectItem value="37">Route 37 - University Line</SelectItem>
              <SelectItem value="8">Route 8 - Coastal Route</SelectItem>
              <SelectItem value="53">Route 53 - Shopping Mall Express</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="direction">Direction</Label>
          <Select value={direction} onValueChange={setDirection}>
            <SelectTrigger id="direction">
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Directions</SelectItem>
              <SelectItem value="inbound">Inbound</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-full flex items-center gap-2" onClick={resetFilters}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
