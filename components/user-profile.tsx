"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { User, Bell, Shield, LogOut, Save, Upload, Clock, MapPin, Bus, Calendar, Plus } from "lucide-react"

export function UserProfile() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Ahmed Mohamed",
    email: "ahmed.mohamed@example.com",
    phone: "+20 123 456 7890",
    address: "123 El Tahrir St, Cairo, Egypt",
    children: [
      { id: "1", name: "Fatima Mohamed", school: "Al-Azhar School", grade: "Grade 5" },
      { id: "2", name: "Omar Mohamed", school: "Al-Azhar School", grade: "Grade 3" },
    ],
  })

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    routeAlerts: true,
    scheduleChanges: true,
    systemAnnouncements: true,
    chatMessages: true,
    dailyUpdates: false,
  })

  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareLocation: true,
    shareContactInfo: false,
    allowChatRequests: true,
    showInCarpoolSearch: true,
    allowDataCollection: true,
  })

  // Mock recent trips
  const recentTrips = [
    {
      id: "1",
      date: "Today",
      route: "Route 42",
      from: "Home",
      to: "Al-Azhar School",
      time: "7:30 AM",
      status: "Completed",
    },
    {
      id: "2",
      date: "Yesterday",
      route: "Route 42",
      from: "Al-Azhar School",
      to: "Home",
      time: "3:15 PM",
      status: "Completed",
    },
    {
      id: "3",
      date: "2023-06-14",
      route: "Route 42",
      from: "Home",
      to: "Al-Azhar School",
      time: "7:30 AM",
      status: "Completed",
    },
  ]

  // Mock upcoming trips
  const upcomingTrips = [
    {
      id: "1",
      date: "Tomorrow",
      route: "Route 42",
      from: "Home",
      to: "Al-Azhar School",
      time: "7:30 AM",
      status: "Scheduled",
    },
    {
      id: "2",
      date: "Tomorrow",
      route: "Route 42",
      from: "Al-Azhar School",
      to: "Home",
      time: "3:15 PM",
      status: "Scheduled",
    },
  ]

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      variant: "success",
    })
  }

  const handleNotificationSettingsUpdate = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
      variant: "success",
    })
  }

  const handlePrivacySettingsUpdate = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
      variant: "success",
    })
  }

  const handleAddChild = () => {
    toast({
      title: "Add Child",
      description: "This feature will be available soon.",
      variant: "default",
    })
  }

  const handleEditChild = (id: string) => {
    toast({
      title: "Edit Child",
      description: `Editing child with ID: ${id}`,
      variant: "default",
    })
  }

  const handleCancelTrip = (id: string) => {
    toast({
      title: "Trip Cancelled",
      description: `Trip with ID: ${id} has been cancelled.`,
      variant: "success",
    })
  }

  const handleViewTripDetails = (id: string) => {
    toast({
      title: "Trip Details",
      description: `Viewing details for trip with ID: ${id}`,
      variant: "default",
    })
  }

  const handleReportIssue = (id: string) => {
    toast({
      title: "Report Issue",
      description: `Reporting issue for trip with ID: ${id}`,
      variant: "default",
    })
  }

  const handleChangePhoto = () => {
    toast({
      title: "Change Photo",
      description: "This feature will be available soon.",
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={handleChangePhoto}>
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex flex-col items-stretch gap-2">
              <Button variant="outline" className="justify-start" onClick={() => setActiveTab("profile")}>
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => setActiveTab("notifications")}>
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => setActiveTab("privacy")}>
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => setActiveTab("trips")}>
                <Bus className="h-4 w-4 mr-2" />
                Trips
              </Button>
              <Button
                variant="outline"
                className="justify-start text-destructive"
                onClick={() => {
                  toast({
                    title: "Signed Out",
                    description: "You have been signed out successfully.",
                    variant: "default",
                  })
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="trips">Trips</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={userData.address}
                          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                      </div>

                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-2">Children</h4>
                        {userData.children.map((child) => (
                          <div key={child.id} className="flex items-center justify-between border p-3 rounded-md mb-2">
                            <div>
                              <p className="font-medium">{child.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {child.school} - {child.grade}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleEditChild(child.id)}>
                              Edit
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="mt-2" onClick={handleAddChild}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Child
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="mt-6">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Notification Channels</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Notification Types</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="route-alerts">Route Alerts</Label>
                          <p className="text-sm text-muted-foreground">Delays, detours, and other route changes</p>
                        </div>
                        <Switch
                          id="route-alerts"
                          checked={notificationSettings.routeAlerts}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, routeAlerts: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="schedule-changes">Schedule Changes</Label>
                          <p className="text-sm text-muted-foreground">Updates to bus schedules</p>
                        </div>
                        <Switch
                          id="schedule-changes"
                          checked={notificationSettings.scheduleChanges}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, scheduleChanges: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-announcements">System Announcements</Label>
                          <p className="text-sm text-muted-foreground">Important system-wide announcements</p>
                        </div>
                        <Switch
                          id="system-announcements"
                          checked={notificationSettings.systemAnnouncements}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, systemAnnouncements: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="chat-messages">Chat Messages</Label>
                          <p className="text-sm text-muted-foreground">New messages in chat groups</p>
                        </div>
                        <Switch
                          id="chat-messages"
                          checked={notificationSettings.chatMessages}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, chatMessages: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="daily-updates">Daily Updates</Label>
                          <p className="text-sm text-muted-foreground">Daily summary of your child's bus activity</p>
                        </div>
                        <Switch
                          id="daily-updates"
                          checked={notificationSettings.dailyUpdates}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({ ...notificationSettings, dailyUpdates: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6" onClick={handleNotificationSettingsUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your privacy preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="share-location">Share Location</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow the app to track your location for bus tracking
                        </p>
                      </div>
                      <Switch
                        id="share-location"
                        checked={privacySettings.shareLocation}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, shareLocation: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="share-contact-info">Share Contact Info</Label>
                        <p className="text-sm text-muted-foreground">
                          Share your contact information with other parents
                        </p>
                      </div>
                      <Switch
                        id="share-contact-info"
                        checked={privacySettings.shareContactInfo}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, shareContactInfo: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-chat-requests">Allow Chat Requests</Label>
                        <p className="text-sm text-muted-foreground">Allow other parents to send you chat requests</p>
                      </div>
                      <Switch
                        id="allow-chat-requests"
                        checked={privacySettings.allowChatRequests}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, allowChatRequests: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-in-carpool-search">Show in Carpool Search</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow other parents to find you in carpool searches
                        </p>
                      </div>
                      <Switch
                        id="show-in-carpool-search"
                        checked={privacySettings.showInCarpoolSearch}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, showInCarpoolSearch: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-data-collection">Allow Data Collection</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow the app to collect usage data to improve services
                        </p>
                      </div>
                      <Switch
                        id="allow-data-collection"
                        checked={privacySettings.allowDataCollection}
                        onCheckedChange={(checked) =>
                          setPrivacySettings({ ...privacySettings, allowDataCollection: checked })
                        }
                      />
                    </div>
                  </div>

                  <Button className="mt-6" onClick={handlePrivacySettingsUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trips" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Trips</CardTitle>
                  <CardDescription>View your recent and upcoming trips</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="mt-4 space-y-4">
                      {upcomingTrips.map((trip) => (
                        <div key={trip.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="font-medium">{trip.date}</span>
                            </div>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                              {trip.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">From</div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm">{trip.from}</span>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-muted-foreground mb-1">To</div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm">{trip.to}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Bus className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{trip.route}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{trip.time}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleViewTripDetails(trip.id)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-destructive border-destructive"
                              onClick={() => handleCancelTrip(trip.id)}
                            >
                              Cancel Trip
                            </Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="recent" className="mt-4 space-y-4">
                      {recentTrips.map((trip) => (
                        <div key={trip.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="font-medium">{trip.date}</span>
                            </div>
                            <Badge variant="outline" className="bg-success/10 text-success border-success">
                              {trip.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">From</div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm">{trip.from}</span>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-muted-foreground mb-1">To</div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm">{trip.to}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Bus className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{trip.route}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{trip.time}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleViewTripDetails(trip.id)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleReportIssue(trip.id)}
                            >
                              Report Issue
                            </Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
