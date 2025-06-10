import { Inter } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  variable: "--font-inter",
})

// For Arabic text support, we'll use system fonts
export const arabicFontClass = "font-arabic"

// CSS class for Arabic fonts (will be defined in globals.css)
export const fontConfig = {
  inter: inter.variable,
  arabic: "font-arabic",
}
