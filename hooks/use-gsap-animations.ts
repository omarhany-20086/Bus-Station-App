"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function useGsapAnimations() {
  const animationsInitialized = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined" || animationsInitialized.current) return
    animationsInitialized.current = true

    // Use a single timeline for better performance
    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } })

    // Batch animations for better performance
    const fadeIns = document.querySelectorAll(".fade-in")
    const slideUps = document.querySelectorAll(".slide-up")
    const slideDowns = document.querySelectorAll(".slide-down")
    const slideLefts = document.querySelectorAll(".slide-left")
    const slideRights = document.querySelectorAll(".slide-right")
    const scaleIns = document.querySelectorAll(".scale-in")

    // Animate elements with minimal delay
    if (fadeIns.length) tl.fromTo(fadeIns, { opacity: 0 }, { opacity: 1 }, 0)
    if (slideUps.length) tl.fromTo(slideUps, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.1)
    if (slideDowns.length) tl.fromTo(slideDowns, { opacity: 0, y: -20 }, { opacity: 1, y: 0 }, 0.1)
    if (slideLefts.length) tl.fromTo(slideLefts, { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, 0.1)
    if (slideRights.length) tl.fromTo(slideRights, { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, 0.1)
    if (scaleIns.length) tl.fromTo(scaleIns, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, 0.1)

    // Simplified hover animations
    const addHoverEffect = (elements, scale = 1.05) => {
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale, duration: 0.2 })
        })
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, duration: 0.2 })
        })
      })
    }

    // Apply hover effects with a slight delay to avoid initial lag
    setTimeout(() => {
      addHoverEffect(document.querySelectorAll("button, .button-like"))
      addHoverEffect(document.querySelectorAll(".card-hover"), 1.02)
    }, 1000)
  }, [])

  return null
}
