"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Filter, RotateCcw } from "lucide-react"

interface RouteFilterProps {
  onApplyFilters: (filters: {
    searchTerm: string
    routeType: string
    features: {
      accessible: boolean
      express: boolean
      nightService: boolean
      lowFloor: boolean
    }
  }) => void
}

export function RouteFilter({ onApplyFilters }: RouteFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [routeType, setRouteType] = useState("all")
  const [features, setFeatures] = useState({
    accessible: false,
    express: false,
    nightService: false,
    lowFloor: false,
  })

  const handleFeatureChange = (key: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const resetFilters = () => {
    setSearchTerm("")
    setRouteType("all")
    setFeatures({
      accessible: false,
      express: false,
      nightService: false,
      lowFloor: false,
    })
  }

  const applyFilters = () => {
    onApplyFilters({
      searchTerm,
      routeType,
      features,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter Routes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search-routes">Search</Label>
          <Input
            id="search-routes"
            placeholder="Route number or name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Route Type</Label>
          <RadioGroup value={routeType} onValueChange={setRouteType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="cursor-pointer">
                All Routes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express" className="cursor-pointer">
                Express Only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="local" id="local" />
              <Label htmlFor="local" className="cursor-pointer">
                Local Only
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Features</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accessible"
                checked={features.accessible}
                onCheckedChange={() => handleFeatureChange("accessible")}
              />
              <Label htmlFor="accessible" className="cursor-pointer">
                Wheelchair Accessible
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="express"
                checked={features.express}
                onCheckedChange={() => handleFeatureChange("express")}
              />
              <Label htmlFor="express" className="cursor-pointer">
                Express Service
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="night-service"
                checked={features.nightService}
                onCheckedChange={() => handleFeatureChange("nightService")}
              />
              <Label htmlFor="night-service" className="cursor-pointer">
                Night Service
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="low-floor"
                checked={features.lowFloor}
                onCheckedChange={() => handleFeatureChange("lowFloor")}
              />
              <Label htmlFor="low-floor" className="cursor-pointer">
                Low Floor Buses
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
