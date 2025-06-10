"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Filter, RotateCcw } from "lucide-react"

export function AlertsFilter() {
  const [alertType, setAlertType] = useState("all")
  const [severity, setSeverity] = useState("all")
  const [routes, setRoutes] = useState({
    route42: true,
    route15: true,
    route37: true,
    route8: true,
    route53: true,
  })

  // State to track applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    alertType: "all",
    severity: "all",
    routes: {
      route42: true,
      route15: true,
      route37: true,
      route8: true,
      route53: true,
    },
  })

  const handleRouteChange = (key: keyof typeof routes) => {
    setRoutes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const resetFilters = () => {
    setAlertType("all")
    setSeverity("all")
    setRoutes({
      route42: true,
      route15: true,
      route37: true,
      route8: true,
      route53: true,
    })
  }

  const applyFilters = () => {
    setAppliedFilters({
      alertType,
      severity,
      routes: { ...routes },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="alert-type">Alert Type</Label>
          <Select value={alertType} onValueChange={setAlertType}>
            <SelectTrigger id="alert-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="detour">Detours</SelectItem>
              <SelectItem value="delay">Delays</SelectItem>
              <SelectItem value="schedule">Schedule Changes</SelectItem>
              <SelectItem value="station">Station Alerts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="severity">Severity</Label>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger id="severity">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Affected Routes</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="route42" checked={routes.route42} onCheckedChange={() => handleRouteChange("route42")} />
              <Label htmlFor="route42" className="cursor-pointer">
                Route 42
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="route15" checked={routes.route15} onCheckedChange={() => handleRouteChange("route15")} />
              <Label htmlFor="route15" className="cursor-pointer">
                Route 15
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="route37" checked={routes.route37} onCheckedChange={() => handleRouteChange("route37")} />
              <Label htmlFor="route37" className="cursor-pointer">
                Route 37
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="route8" checked={routes.route8} onCheckedChange={() => handleRouteChange("route8")} />
              <Label htmlFor="route8" className="cursor-pointer">
                Route 8
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="route53" checked={routes.route53} onCheckedChange={() => handleRouteChange("route53")} />
              <Label htmlFor="route53" className="cursor-pointer">
                Route 53
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2" onClick={resetFilters}>
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
        <Button size="sm" className="flex-1" onClick={applyFilters}>
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  )
}
