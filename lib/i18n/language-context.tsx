"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
  fontClass: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const isRTL = language === "ar"
  const fontClass = language === "ar" ? "font-arabic" : ""

  const t = (key: string): string => {
    // Simple translation function - in a real app, you'd load from translation files
    const translations: Record<Language, Record<string, string>> = {
      en: {
        welcome: "Welcome",
        bus_tracker: "Bus Tracker",
        my_routes: "My Routes",
        alerts: "Alerts",
        settings: "Settings",
        // Add more translations as needed
      },
      ar: {
        welcome: "مرحباً",
        bus_tracker: "تتبع الحافلة",
        my_routes: "طرقي",
        alerts: "التنبيهات",
        settings: "الإعدادات",
        // Add more translations as needed
      },
    }

    return translations[language][key] || key
  }

  useEffect(() => {
    // Set document direction
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language, isRTL])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, fontClass }}>
      <div className={fontClass}>{children}</div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
