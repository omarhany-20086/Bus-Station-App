"use client"

import type React from "react"
import { useGsapAnimations } from "@/hooks/use-gsap-animations"

export function GsapAnimationProvider({ children }: { children: React.ReactNode }) {
  // Initialize animations
  useGsapAnimations()

  return <>{children}</>
}
