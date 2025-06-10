import type React from "react"
// Performance optimization utilities

// Debounce function for search and input optimization
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll and resize events
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  })
}

// Image optimization
export function optimizeImage(src: string, width?: number, height?: number): string {
  if (src.includes("placeholder.svg")) {
    return `${src}${width ? `&width=${width}` : ""}${height ? `&height=${height}` : ""}`
  }
  return src
}

// Local storage with error handling
export const storage = {
  get: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn("Failed to save to localStorage:", error)
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error)
    }
  },
}

// Network status detection
export function useNetworkStatus() {
  if (typeof window === "undefined") return true

  return navigator.onLine
}

// Battery optimization for GPS tracking
export function optimizeGPSTracking() {
  const options: PositionOptions = {
    enableHighAccuracy: false, // Use less battery
    timeout: 10000, // 10 seconds timeout
    maximumAge: 60000, // Cache position for 1 minute
  }

  return options
}

// Memory cleanup for components
export function useCleanup(cleanup: () => void) {
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", cleanup)
    return () => window.removeEventListener("beforeunload", cleanup)
  }
  return () => {}
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === "undefined") return

  // Preload fonts
  const fontLink = document.createElement("link")
  fontLink.rel = "preload"
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
  fontLink.as = "style"
  document.head.appendChild(fontLink)

  // Preload critical API endpoints
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(console.error)
  }
}

// Error boundary utility
export function withErrorBoundary<T extends Record<string, any>>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T) {
    try {
      return <Component {...props} />
    } catch (error) {
      console.error("Component error:", error)
      return (
        <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
          <h3 className="font-semibold text-destructive">حدث خطأ</h3>
          <p className="text-sm text-muted-foreground mt-1">
            عذراً، حدث خطأ في تحميل هذا المكون. يرجى إعادة تحميل الصفحة.
          </p>
        </div>
      )
    }
  }
}
