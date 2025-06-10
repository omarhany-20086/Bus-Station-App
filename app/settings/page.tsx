"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Settings, Bell, Eye, Smartphone } from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [textSize, setTextSize] = useState(["100"])
  const [screenReader, setScreenReader] = useState(false)
  const [dataUsage, setDataUsage] = useState("balanced")
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  // Apply large text mode
  useEffect(() => {
    if (largeText) {
      document.documentElement.classList.add("large-text")
    } else {
      document.documentElement.classList.remove("large-text")
    }
  }, [largeText])

  // Apply text size
  useEffect(() => {
    document.documentElement.style.fontSize = `${Number.parseInt(textSize[0]) / 100}rem`
  }, [textSize])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-4">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              General Settings
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme Mode</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-usage">Data Usage</Label>
                <Select value={dataUsage} onValueChange={setDataUsage}>
                  <SelectTrigger id="data-usage">
                    <SelectValue placeholder="Select data usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Reduced Updates)</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="high">High (Frequent Updates)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Cache Cleared",
                    description: "Application cache has been cleared successfully.",
                    variant: "default",
                  })
                }}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card className="p-4">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Accessibility Settings
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-contrast" className="text-base">
                    High Contrast Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="large-text" className="text-base">
                    Large Text Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Increase text size throughout the app</p>
                </div>
                <Switch id="large-text" checked={largeText} onCheckedChange={setLargeText} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="text-size" className="text-base">
                    Text Size
                  </Label>
                  <span className="text-sm text-muted-foreground">{textSize[0]}%</span>
                </div>
                <Slider
                  id="text-size"
                  min={75}
                  max={150}
                  step={5}
                  value={textSize.map(Number)}
                  onValueChange={(value) => setTextSize(value.map(String))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="screen-reader" className="text-base">
                    Screen Reader Support
                  </Label>
                  <p className="text-sm text-muted-foreground">Optimize for screen readers</p>
                </div>
                <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reduce-motion" className="text-base">
                    Reduce Motion
                  </Label>
                  <p className="text-sm text-muted-foreground">Minimize animations</p>
                </div>
                <Switch
                  id="reduce-motion"
                  onCheckedChange={(checked) => {
                    toast({
                      title: checked ? "Reduced Motion Enabled" : "Reduced Motion Disabled",
                      description: checked
                        ? "Animations have been minimized."
                        : "Standard animations have been restored.",
                      variant: "default",
                    })
                  }}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-4">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-notifications" className="text-base">
                    Enable Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive important updates</p>
                </div>
                <Switch id="enable-notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>

              {notifications && (
                <>
                  <div className="space-y-3 border-l-2 pl-4 ml-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bus-arrival" className="text-base">
                        Bus Arrival
                      </Label>
                      <Switch id="bus-arrival" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="bus-delays" className="text-base">
                        Bus Delays
                      </Label>
                      <Switch id="bus-delays" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="schedule-changes" className="text-base">
                        Schedule Changes
                      </Label>
                      <Switch id="schedule-changes" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="child-location" className="text-base">
                        Child Location Updates
                      </Label>
                      <Switch id="child-location" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="messages" className="text-base">
                        New Messages
                      </Label>
                      <Switch id="messages" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-time" className="text-base">
                      Notification Time
                    </Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="notification-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute before</SelectItem>
                        <SelectItem value="5">5 minutes before</SelectItem>
                        <SelectItem value="10">10 minutes before</SelectItem>
                        <SelectItem value="15">15 minutes before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
