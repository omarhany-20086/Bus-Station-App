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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Navigation, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRoutes } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export function AdminRoutes() {
  const { routes, loading, error, addRoute, updateRoute, deleteRoute } = useRoutes()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("manage")
  const [editingRoute, setEditingRoute] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [routeToDelete, setRouteToDelete] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state for adding/editing routes
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    frequency: "",
    startPoint: "",
    endPoint: "",
    stops: "",
    status: "active",
    isAccessible: false,
    isExpress: false,
  })

  const resetForm = () => {
    setFormData({
      number: "",
      name: "",
      frequency: "",
      startPoint: "",
      endPoint: "",
      stops: "",
      status: "active",
      isAccessible: false,
      isExpress: false,
    })
    setEditingRoute(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleEditRoute = (route: any) => {
    setEditingRoute(route)
    setFormData({
      number: route.number,
      name: route.name,
      frequency: route.frequency,
      startPoint: route.startPoint,
      endPoint: route.endPoint,
      stops: route.stops.toString(),
      status: route.status,
      isAccessible: route.isAccessible || false,
      isExpress: route.isExpress || false,
    })
    setActiveTab("add")
  }

  const handleDeleteRoute = async (routeId: string) => {
    try {
      await deleteRoute(routeId)
      setSuccessMessage("Route deleted successfully")
      toast({
        title: "Success",
        description: "Route deleted successfully",
        variant: "success",
      })
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete route",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const routeData = {
        number: formData.number,
        name: formData.name,
        frequency: formData.frequency,
        startPoint: formData.startPoint,
        endPoint: formData.endPoint,
        stops: Number.parseInt(formData.stops),
        status: formData.status,
        isAccessible: formData.isAccessible,
        isExpress: formData.isExpress,
      }

      if (editingRoute) {
        // Update existing route
        await updateRoute(editingRoute.id, routeData)
        setSuccessMessage("Route updated successfully")
        toast({
          title: "Success",
          description: "Route updated successfully",
          variant: "success",
        })
      } else {
        // Add new route
        await addRoute(routeData)
        setSuccessMessage("Route added successfully")
        toast({
          title: "Success",
          description: "Route added successfully",
          variant: "success",
        })
      }

      resetForm()
      setActiveTab("manage")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: editingRoute ? "Failed to update route" : "Failed to add route",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading routes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
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
          <TabsTrigger value="manage">Manage Routes</TabsTrigger>
          <TabsTrigger value="add">{editingRoute ? "Edit Route" : "Add Route"}</TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-primary" />
                  <span>Route Management</span>
                </div>
                <Button
                  onClick={() => {
                    resetForm()
                    setActiveTab("add")
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Route
                </Button>
              </CardTitle>
              <CardDescription>View, edit, and delete bus routes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.number}</TableCell>
                      <TableCell>{route.name}</TableCell>
                      <TableCell>{route.frequency}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            route.status === "active"
                              ? "bg-success/10 text-success border-success"
                              : "bg-warning/10 text-warning-foreground border-warning"
                          }
                        >
                          {route.status === "active" ? "Active" : "Limited"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditRoute(route)}>
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
                                <DialogTitle>Delete Route</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete Route {route.number} - {route.name}? This action
                                  cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={() => handleDeleteRoute(route.id)}>
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
                <Navigation className="h-5 w-5 text-primary" />
                {editingRoute ? `Edit Route ${editingRoute.number}` : "Add New Route"}
              </CardTitle>
              <CardDescription>{editingRoute ? "Update route information" : "Create a new bus route"}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Route Number</Label>
                    <Input
                      id="number"
                      name="number"
                      placeholder="e.g. 42"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Route Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Downtown Express"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startPoint">Start Point</Label>
                    <Input
                      id="startPoint"
                      name="startPoint"
                      placeholder="e.g. Central Station"
                      value={formData.startPoint}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endPoint">End Point</Label>
                    <Input
                      id="endPoint"
                      name="endPoint"
                      placeholder="e.g. Business District"
                      value={formData.endPoint}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      name="frequency"
                      placeholder="e.g. Every 10 min"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stops">Number of Stops</Label>
                    <Input
                      id="stops"
                      name="stops"
                      type="number"
                      min="1"
                      placeholder="e.g. 18"
                      value={formData.stops}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="limited">Limited Service</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isAccessible"
                        checked={formData.isAccessible}
                        onCheckedChange={(checked) => handleCheckboxChange("isAccessible", checked as boolean)}
                      />
                      <Label htmlFor="isAccessible" className="cursor-pointer">
                        Wheelchair Accessible
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isExpress"
                        checked={formData.isExpress}
                        onCheckedChange={(checked) => handleCheckboxChange("isExpress", checked as boolean)}
                      />
                      <Label htmlFor="isExpress" className="cursor-pointer">
                        Express Service
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
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingRoute ? "Updating..." : "Adding..."}
                      </>
                    ) : (
                      <>{editingRoute ? "Update Route" : "Add Route"}</>
                    )}
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
