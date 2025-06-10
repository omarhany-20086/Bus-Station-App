"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

type ColorTheme = "default" | "green" | "purple" | "orange" | "teal" | "egyptian"

type ThemeProviderContextProps = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  fontSize: "small" | "medium" | "large"
  setFontSize: (size: "small" | "medium" | "large") => void
  highContrast: boolean
  setHighContrast: (enabled: boolean) => void
}

const ThemeProviderContext = createContext<ThemeProviderContextProps>({
  colorTheme: "egyptian",
  setColorTheme: () => null,
  fontSize: "medium",
  setFontSize: () => null,
  highContrast: false,
  setHighContrast: () => null,
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("egyptian")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme | null
    const savedFontSize = localStorage.getItem("fontSize") as "small" | "medium" | "large" | null
    const savedHighContrast = localStorage.getItem("highContrast") === "true"

    if (savedColorTheme) setColorTheme(savedColorTheme)
    if (savedFontSize) setFontSize(savedFontSize)
    setHighContrast(savedHighContrast)
  }, [])

  useEffect(() => {
    const htmlElement = document.documentElement

    // Remove all theme classes
    htmlElement.classList.remove("theme-green", "theme-purple", "theme-orange", "theme-teal", "theme-egyptian")

    // Add the selected theme class
    if (colorTheme !== "default") {
      htmlElement.classList.add(`theme-${colorTheme}`)
    }

    // Apply font size
    htmlElement.classList.remove("text-small", "text-medium", "text-large")
    htmlElement.classList.add(`text-${fontSize}`)

    // Apply high contrast
    if (highContrast) {
      htmlElement.classList.add("high-contrast")
    } else {
      htmlElement.classList.remove("high-contrast")
    }

    // Save to localStorage
    localStorage.setItem("colorTheme", colorTheme)
    localStorage.setItem("fontSize", fontSize)
    localStorage.setItem("highContrast", highContrast.toString())
  }, [colorTheme, fontSize, highContrast])

  return (
    <ThemeProviderContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
      }}
    >
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeProviderContext.Provider>
  )
}

export const useColorTheme = () => useContext(ThemeProviderContext)
