"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Settings, Bell, Eye, Smartphone, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { useColorTheme } from "./theme-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/lib/i18n/language-context"

// Extend the Window interface to include textSizeTimeout
declare global {
  interface Window {
    textSizeTimeout: any
  }
}

export function AppSettings() {
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState(true)
  const [textSize, setTextSize] = useState(["100"])
  const [highContrast, setHighContrast] = useState(false)
  const [dataUsage, setDataUsage] = useState("balanced")
  const [mounted, setMounted] = useState(false)

  // Apply text size to the document
  const applyTextSize = (size: string) => {
    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
      document.documentElement.style.fontSize = `${Number.parseInt(size) / 100}rem`
      localStorage.setItem("textSize", size)
    })
  }

  // Handle text size change
  const handleTextSizeChange = (value: string[]) => {
    setTextSize(value)

    // Clear any existing timeout
    if (window.textSizeTimeout) {
      clearTimeout(window.textSizeTimeout)
    }

    // Debounce the actual DOM update
    window.textSizeTimeout = setTimeout(() => {
      applyTextSize(value[0])
    }, 100)
  }

  // Apply high contrast mode
  const applyHighContrast = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
    localStorage.setItem("highContrast", enabled.toString())
  }

  // Handle high contrast toggle
  const handleHighContrastChange = (enabled: boolean) => {
    setHighContrast(enabled)
    applyHighContrast(enabled)
  }

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Load saved settings from localStorage
    const savedTextSize = localStorage.getItem("textSize")
    if (savedTextSize) setTextSize([savedTextSize])

    const savedHighContrast = localStorage.getItem("highContrast") === "true"
    setHighContrast(savedHighContrast)

    // Apply saved settings
    applyTextSize(savedTextSize || "100")
    applyHighContrast(savedHighContrast)

    // Cleanup function
    return () => {
      if (window.textSizeTimeout) {
        clearTimeout(window.textSizeTimeout)
      }
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            {t("generalSettings")}
          </CardTitle>
          <CardDescription>{t("customizeApp")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">{t("themeMode")}</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder={t("themeMode")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              {t("colorPalette")}
            </Label>
            <RadioGroup value={colorTheme} onValueChange={(value) => setColorTheme(value as any)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="default" id="color-default" />
                  <Label htmlFor="color-default" className="cursor-pointer flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[hsl(201,96%,32%)]"></div>
                    <span>Blue (Default)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="green" id="color-green" />
                  <Label htmlFor="color-green" className="cursor-pointer flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[hsl(142,72%,29%)]"></div>
                    <span>Green</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="purple" id="color-purple" />
                  <Label htmlFor="color-purple" className="cursor-pointer flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[hsl(270,76%,40%)]"></div>
                    <span>Purple</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="orange" id="color-orange" />
                  <Label htmlFor="color-orange" className="cursor-pointer flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[hsl(24,95%,40%)]"></div>
                    <span>Orange</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="teal" id="color-teal" />
                  <Label htmlFor="color-teal" className="cursor-pointer flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[hsl(180,70%,35%)]"></div>
                    <span>Teal</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">{t("language")}</Label>
            <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
              <SelectTrigger id="language">
                <SelectValue placeholder={t("language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="text-size">{t("textSize")}</Label>
              <span className="text-sm text-muted-foreground">{textSize[0]}%</span>
            </div>
            <Slider
              id="text-size"
              min={75}
              max={150}
              step={5}
              value={textSize.map(Number)}
              onValueChange={(value) => handleTextSizeChange(value.map(String))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="high-contrast">{t("highContrastMode")}</Label>
            </div>
            <Switch id="high-contrast" checked={highContrast} onCheckedChange={handleHighContrastChange} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            {t("notifications")}
          </CardTitle>
          <CardDescription>{t("manageNotifications")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">{t("enableNotifications")}</Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>

          {notifications && (
            <>
              <div className="ml-6 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-delays" defaultChecked />
                  <Label htmlFor="notify-delays">{t("serviceDelays")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-schedule" defaultChecked />
                  <Label htmlFor="notify-schedule">{t("scheduleChanges")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-arrivals" defaultChecked />
                  <Label htmlFor="notify-arrivals">{t("busArrivals")}</Label>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            {t("dataUsage")}
          </CardTitle>
          <CardDescription>{t("controlData")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="data-usage">{t("dataUsageMode")}</Label>
            <Select value={dataUsage} onValueChange={setDataUsage}>
              <SelectTrigger id="data-usage">
                <SelectValue placeholder={t("dataUsageMode")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Reduced Updates)</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="high">High (Frequent Updates)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              {t("clearCache")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
