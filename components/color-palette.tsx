"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

interface ColorSwatch {
  name: string
  variable: string
  lightHex: string
  darkHex: string
  lightHsl: string
  darkHsl: string
  usage: string
}

const colorSwatches: ColorSwatch[] = [
  {
    name: "Background",
    variable: "--background",
    lightHex: "#FFFFFF",
    darkHex: "#1A1F2E",
    lightHsl: "0 0% 100%",
    darkHsl: "222 47% 11%",
    usage: "Main background color for pages",
  },
  {
    name: "Foreground",
    variable: "--foreground",
    lightHex: "#1A1F2E",
    darkHex: "#F2F2F2",
    lightHsl: "222 47% 11%",
    darkHsl: "0 0% 95%",
    usage: "Primary text color",
  },
  {
    name: "Card",
    variable: "--card",
    lightHex: "#FFFFFF",
    darkHex: "#1A1F2E",
    lightHsl: "0 0% 100%",
    darkHsl: "222 47% 11%",
    usage: "Card background color",
  },
  {
    name: "Card Foreground",
    variable: "--card-foreground",
    lightHex: "#1A1F2E",
    darkHex: "#F2F2F2",
    lightHsl: "222 47% 11%",
    darkHsl: "0 0% 95%",
    usage: "Text color on cards",
  },
  {
    name: "Primary",
    variable: "--primary",
    lightHex: "#3B82F6",
    darkHex: "#3B82F6",
    lightHsl: "217 91% 60%",
    darkHsl: "217 91% 60%",
    usage: "Primary action color (buttons, links)",
  },
  {
    name: "Primary Foreground",
    variable: "--primary-foreground",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    lightHsl: "0 0% 100%",
    darkHsl: "0 0% 100%",
    usage: "Text color on primary elements",
  },
  {
    name: "Secondary",
    variable: "--secondary",
    lightHex: "#F1F5F9",
    darkHex: "#232A3F",
    lightHsl: "210 40% 96%",
    darkHsl: "222 47% 15%",
    usage: "Secondary UI elements",
  },
  {
    name: "Secondary Foreground",
    variable: "--secondary-foreground",
    lightHex: "#1A1F2E",
    darkHex: "#F2F2F2",
    lightHsl: "222 47% 11%",
    darkHsl: "0 0% 95%",
    usage: "Text on secondary elements",
  },
  {
    name: "Muted",
    variable: "--muted",
    lightHex: "#F1F5F9",
    darkHex: "#232A3F",
    lightHsl: "210 40% 96%",
    darkHsl: "222 47% 15%",
    usage: "Muted backgrounds",
  },
  {
    name: "Muted Foreground",
    variable: "--muted-foreground",
    lightHex: "#64748B",
    darkHex: "#A6A6A6",
    lightHsl: "215 16% 47%",
    darkHsl: "0 0% 65%",
    usage: "Muted text",
  },
  {
    name: "Accent",
    variable: "--accent",
    lightHex: "#F1F5F9",
    darkHex: "#232A3F",
    lightHsl: "210 40% 96%",
    darkHsl: "222 47% 15%",
    usage: "Accent UI elements",
  },
  {
    name: "Accent Foreground",
    variable: "--accent-foreground",
    lightHex: "#1A1F2E",
    darkHex: "#F2F2F2",
    lightHsl: "222 47% 11%",
    darkHsl: "0 0% 95%",
    usage: "Text on accent elements",
  },
  {
    name: "Destructive",
    variable: "--destructive",
    lightHex: "#EF4444",
    darkHex: "#EF4444",
    lightHsl: "0 84% 60%",
    darkHsl: "0 84% 60%",
    usage: "Destructive actions (delete, remove)",
  },
  {
    name: "Destructive Foreground",
    variable: "--destructive-foreground",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    lightHsl: "0 0% 100%",
    darkHsl: "0 0% 100%",
    usage: "Text on destructive elements",
  },
  {
    name: "Border",
    variable: "--border",
    lightHex: "#E2E8F0",
    darkHex: "#2D3653",
    lightHsl: "214 32% 91%",
    darkHsl: "222 47% 20%",
    usage: "Border color",
  },
  {
    name: "Input",
    variable: "--input",
    lightHex: "#E2E8F0",
    darkHex: "#2D3653",
    lightHsl: "214 32% 91%",
    darkHsl: "222 47% 20%",
    usage: "Input borders",
  },
  {
    name: "Ring",
    variable: "--ring",
    lightHex: "#3B82F6",
    darkHex: "#3B82F6",
    lightHsl: "217 91% 60%",
    darkHsl: "217 91% 60%",
    usage: "Focus ring color",
  },
  {
    name: "Success",
    variable: "--success",
    lightHex: "#10B981",
    darkHex: "#10B981",
    lightHsl: "142 76% 36%",
    darkHsl: "142 76% 36%",
    usage: "Success states and indicators",
  },
  {
    name: "Success Foreground",
    variable: "--success-foreground",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    lightHsl: "0 0% 100%",
    darkHsl: "0 0% 100%",
    usage: "Text on success elements",
  },
  {
    name: "Warning",
    variable: "--warning",
    lightHex: "#F59E0B",
    darkHex: "#F59E0B",
    lightHsl: "38 92% 50%",
    darkHsl: "38 92% 50%",
    usage: "Warning states and indicators",
  },
  {
    name: "Warning Foreground",
    variable: "--warning-foreground",
    lightHex: "#FFFFFF",
    darkHex: "#FFFFFF",
    lightHsl: "0 0% 100%",
    darkHsl: "0 0% 100%",
    usage: "Text on warning elements",
  },
]

export function ColorPalette() {
  const { theme } = useTheme()
  const currentTheme = theme || "dark"

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">SchoolBus Color Palette</h1>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Colors</TabsTrigger>
          <TabsTrigger value="primary">Primary</TabsTrigger>
          <TabsTrigger value="ui">UI Elements</TabsTrigger>
          <TabsTrigger value="status">Status Colors</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorSwatches.map((swatch) => (
              <Card key={swatch.variable} className="p-4">
                <div className="flex flex-col space-y-2">
                  <div
                    className="h-16 rounded-md mb-2"
                    style={{
                      backgroundColor: currentTheme === "dark" ? swatch.darkHex : swatch.lightHex,
                      border: "1px solid var(--border)",
                    }}
                  />
                  <div>
                    <h3 className="font-medium">{swatch.name}</h3>
                    <p className="text-sm text-muted-foreground">{swatch.usage}</p>
                  </div>
                  <div className="text-xs space-y-1">
                    <div>
                      <span className="font-mono">CSS:</span> {swatch.variable}
                    </div>
                    <div>
                      <span className="font-mono">HEX:</span>{" "}
                      {currentTheme === "dark" ? swatch.darkHex : swatch.lightHex}
                    </div>
                    <div>
                      <span className="font-mono">HSL:</span>{" "}
                      {currentTheme === "dark" ? swatch.darkHsl : swatch.lightHsl}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="primary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorSwatches
              .filter(
                (s) =>
                  s.name === "Primary" ||
                  s.name === "Primary Foreground" ||
                  s.name === "Background" ||
                  s.name === "Foreground",
              )
              .map((swatch) => (
                <Card key={swatch.variable} className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div
                      className="h-16 rounded-md mb-2"
                      style={{
                        backgroundColor: currentTheme === "dark" ? swatch.darkHex : swatch.lightHex,
                        border: "1px solid var(--border)",
                      }}
                    />
                    <div>
                      <h3 className="font-medium">{swatch.name}</h3>
                      <p className="text-sm text-muted-foreground">{swatch.usage}</p>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>
                        <span className="font-mono">CSS:</span> {swatch.variable}
                      </div>
                      <div>
                        <span className="font-mono">HEX:</span>{" "}
                        {currentTheme === "dark" ? swatch.darkHex : swatch.lightHex}
                      </div>
                      <div>
                        <span className="font-mono">HSL:</span>{" "}
                        {currentTheme === "dark" ? swatch.darkHsl : swatch.lightHsl}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ui" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorSwatches
              .filter(
                (s) =>
                  s.name === "Card" ||
                  s.name === "Card Foreground" ||
                  s.name === "Secondary" ||
                  s.name === "Secondary Foreground" ||
                  s.name === "Muted" ||
                  s.name === "Muted Foreground" ||
                  s.name === "Accent" ||
                  s.name === "Accent Foreground" ||
                  s.name === "Border" ||
                  s.name === "Input" ||
                  s.name === "Ring",
              )
              .map((swatch) => (
                <Card key={swatch.variable} className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div
                      className="h-16 rounded-md mb-2"
                      style={{
                        backgroundColor: currentTheme === "dark" ? swatch.darkHex : swatch.lightHex,
                        border: "1px solid var(--border)",
                      }}
                    />
                    <div>
                      <h3 className="font-medium">{swatch.name}</h3>
                      <p className="text-sm text-muted-foreground">{swatch.usage}</p>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>
                        <span className="font-mono">CSS:</span> {swatch.variable}
                      </div>
                      <div>
                        <span className="font-mono">HEX:</span>{" "}
                        {currentTheme === "dark" ? swatch.darkHex : swatch.lightHex}
                      </div>
                      <div>
                        <span className="font-mono">HSL:</span>{" "}
                        {currentTheme === "dark" ? swatch.darkHsl : swatch.lightHsl}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorSwatches
              .filter(
                (s) =>
                  s.name === "Success" ||
                  s.name === "Success Foreground" ||
                  s.name === "Warning" ||
                  s.name === "Warning Foreground" ||
                  s.name === "Destructive" ||
                  s.name === "Destructive Foreground",
              )
              .map((swatch) => (
                <Card key={swatch.variable} className="p-4">
                  <div className="flex flex-col space-y-2">
                    <div
                      className="h-16 rounded-md mb-2"
                      style={{
                        backgroundColor: currentTheme === "dark" ? swatch.darkHex : swatch.lightHex,
                        border: "1px solid var(--border)",
                      }}
                    />
                    <div>
                      <h3 className="font-medium">{swatch.name}</h3>
                      <p className="text-sm text-muted-foreground">{swatch.usage}</p>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>
                        <span className="font-mono">CSS:</span> {swatch.variable}
                      </div>
                      <div>
                        <span className="font-mono">HEX:</span>{" "}
                        {currentTheme === "dark" ? swatch.darkHex : swatch.lightHex}
                      </div>
                      <div>
                        <span className="font-mono">HSL:</span>{" "}
                        {currentTheme === "dark" ? swatch.darkHsl : swatch.lightHsl}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
