"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, AlertTriangle, AlertCircle, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for alerts
const initialAlerts = [
  {
    id: "1",
    title: "Route 42 Detour",
    description:
      "Due to road construction on Main Street, Route 42 is currently on detour via Oak Avenue and Pine Street. Expect delays of 5-10 minutes.",
    type: "detour",
    severity: "medium",
    affectedRoutes: ["42"],
    timestamp: "2023-06-15T08:30:00Z",
  },
  {
    id: "2",
    title: "Service Disruption on Route 15",
    description:
      "Due to a traffic accident, Route 15 is experiencing significant delays. Buses may be delayed by up to 20 minutes.",
    type: "delay",
    severity: "high",
    affectedRoutes: ["15"],
    timestamp: "2023-06-15T09:15:00Z",
  },
  {
    id: "3",
    title: "Schedule Change for Route 37",
    description:
      "Starting next week, Route 37 will operate on a new schedule with increased frequency during peak hours.",
    type: "schedule",
    severity: "low",
    affectedRoutes: ["37"],
    timestamp: "2023-06-14T14:00:00Z",
  },
  {
    id: "4",
    title: "Central Station Maintenance",
    description:
      "The north entrance of Central Station will be closed for maintenance from 10 PM to 5 AM tonight. Please use the south entrance during this time.",
    type: "station",
    severity: "medium",
    affectedRoutes: ["42", "15", "37", "53"],
    timestamp: "2023-06-15T07:00:00Z",
  },
  {
    id: "5",
    title: "Holiday Schedule",
    description: "All buses will operate on a Sunday schedule for the upcoming holiday on June 19th.",
    type: "schedule",
    severity: "low",
    affectedRoutes: ["all"],
    timestamp: "2023-06-12T10:30:00Z",
  },
]

export function AdminAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [activeTab, setActiveTab] = useState("manage")
  const [editingAlert, setEditingAlert] = useState<any>(null)
  const [successMessage, setSuccessMessage] = useState("")

  // Form state for adding/editing alerts
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "delay",
    severity: "medium",
    affectedRoutes: {
      route42: false,
      route15: false,
      route37: false,
      route8: false,
      route53: false,
      all: false,
    },
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "delay",
      severity: "medium",
      affectedRoutes: {
        route42: false,
        route15: false,
        route37: false,
        route8: false,
        route53: false,
        all: false,
      },
    })
    setEditingAlert(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRouteCheckboxChange = (route: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      affectedRoutes: {
        ...prev.affectedRoutes,
        [route]: checked,
      },
    }))
  }

  const handleEditAlert = (alert: any) => {
    setEditingAlert(alert)

    // Convert affected routes array to checkbox state
    const routeCheckboxes = {
      route42: alert.affectedRoutes.includes("42"),
      route15: alert.affectedRoutes.includes("15"),
      route37: alert.affectedRoutes.includes("37"),
      route8: alert.affectedRoutes.includes("8"),
      route53: alert.affectedRoutes.includes("53"),
      all: alert.affectedRoutes.includes("all"),
    }

    setFormData({
      title: alert.title,
      description: alert.description,
      type: alert.type,
      severity: alert.severity,
      affectedRoutes: routeCheckboxes,
    })

    setActiveTab("add")
  }

  const handleDeleteAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
    setSuccessMessage("Alert deleted successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert checkbox state to affected routes array
    const affectedRoutes = Object.entries(formData.affectedRoutes)
      .filter(([_, isSelected]) => isSelected)
      .map(([route]) => (route === "all" ? "all" : route.replace("route", "")))

    if (editingAlert) {
      // Update existing alert
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === editingAlert.id
            ? {
                ...alert,
                title: formData.title,
                description: formData.description,
                type: formData.type,
                severity: formData.severity,
                affectedRoutes,
                timestamp: new Date().toISOString(), // Update timestamp
              }
            : alert,
        ),
      )
      setSuccessMessage("Alert updated successfully")
    } else {
      // Add new alert
      const newAlert = {
        id: (alerts.length + 1).toString(),
        title: formData.title,
        description: formData.description,
        type: formData.type,
        severity: formData.severity,
        affectedRoutes,
        timestamp: new Date().toISOString(),
      }
      setAlerts((prev) => [...prev, newAlert])
      setSuccessMessage("Alert added successfully")
    }

    resetForm()
    setActiveTab("manage")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "detour":
      case "delay":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "schedule":
      case "station":
      default:
        return <AlertCircle className="h-4 w-4 text-primary" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-destructive text-destructive-foreground">High</Badge>
      case "medium":
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>
      case "low":
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

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
          <TabsTrigger value="manage">Manage Alerts</TabsTrigger>
          <TabsTrigger value="add">{editingAlert ? "Edit Alert" : "Add Alert"}</TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span>Alert Management</span>
                </div>
                <Button
                  onClick={() => {
                    resetForm()
                    setActiveTab("add")
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Alert
                </Button>
              </CardTitle>
              <CardDescription>View, edit, and delete service alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getAlertIcon(alert.type)}
                          <span>{alert.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{alert.type}</TableCell>
                      <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formatDate(alert.timestamp)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditAlert(alert)}>
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
                                <DialogTitle>Delete Alert</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this alert? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={() => handleDeleteAlert(alert.id)}>
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
                <AlertTriangle className="h-5 w-5 text-primary" />
                {editingAlert ? "Edit Alert" : "Add New Alert"}
              </CardTitle>
              <CardDescription>
                {editingAlert ? "Update alert information" : "Create a new service alert"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Alert Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Route 42 Detour"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide details about the alert..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Alert Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delay">Delay</SelectItem>
                        <SelectItem value="detour">Detour</SelectItem>
                        <SelectItem value="schedule">Schedule Change</SelectItem>
                        <SelectItem value="station">Station Alert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select value={formData.severity} onValueChange={(value) => handleSelectChange("severity", value)}>
                      <SelectTrigger id="severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Affected Routes</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="route42"
                        checked={formData.affectedRoutes.route42}
                        onCheckedChange={(checked) => handleRouteCheckboxChange("route42", checked as boolean)}
                      />
                      <Label htmlFor="route42" className="cursor-pointer">
                        Route 42
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="route15"
                        checked={formData.affectedRoutes.route15}
                        onCheckedChange={(checked) => handleRouteCheckboxChange("route15", checked as boolean)}
                      />
                      <Label htmlFor="route15" className="cursor-pointer">
                        Route 15
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="route37"
                        checked={formData.affectedRoutes.route37}
                        onCheckedChange={(checked) => handleRouteCheckboxChange("route37", checked as boolean)}
                      />
                      <Label htmlFor="route37" className="cursor-pointer">
                        Route 37
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="route8"
                        checked={formData.affectedRoutes.route8}
                        onCheckedChange={(checked) => handleRouteCheckboxChange("route8", checked as boolean)}
                      />
                      <Label htmlFor="route8" className="cursor-pointer">
                        Route 8
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="route53"
                        checked={formData.affectedRoutes.route53}
                        onCheckedChange={(checked) => handleRouteCheckboxChange("route53", checked as boolean)}
                      />
                      <Label htmlFor="route53" className="cursor-pointer">
                        Route 53
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="all"
                        checked={formData.affectedRoutes.all}
                        onCheckedChange={(checked) => handleRouteCheckboxChange("all", checked as boolean)}
                      />
                      <Label htmlFor="all" className="cursor-pointer">
                        All Routes
                      </Label>
                    </div>
                  </div>
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
                    {editingAlert ? "Update Alert" : "Add Alert"}
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
