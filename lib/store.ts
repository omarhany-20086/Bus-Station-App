"use client"

import { useState, useEffect } from "react"

// Types for our data models
export interface Route {
  id: string
  number: string
  name: string
  frequency: string
  startPoint: string
  endPoint: string
  stops: number
  status: string
  isAccessible?: boolean
  isExpress?: boolean
}

export interface Alert {
  id: string
  title: string
  description: string
  type: string
  severity: string
  affectedRoutes: string[]
  status?: string
  timestamp: string
}

export interface Schedule {
  id: string
  time: string
  destination: string
  route: string
  status: string
  day: string
}

// API functions
async function fetchRoutes(): Promise<Route[]> {
  try {
    const response = await fetch("/api/routes")
    if (!response.ok) {
      throw new Error("Failed to fetch routes")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching routes:", error)
    return []
  }
}

async function fetchAlerts(): Promise<Alert[]> {
  try {
    const response = await fetch("/api/alerts")
    if (!response.ok) {
      throw new Error("Failed to fetch alerts")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return []
  }
}

async function fetchSchedules(): Promise<Schedule[]> {
  try {
    const response = await fetch("/api/schedules")
    if (!response.ok) {
      throw new Error("Failed to fetch schedules")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching schedules:", error)
    return []
  }
}

// Custom hooks for accessing and updating data
export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        setLoading(true)
        const data = await fetchRoutes()
        setRoutes(data)
        setError(null)
      } catch (err) {
        setError("Failed to load routes")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadRoutes()
  }, [])

  const updateRoutes = async (newRoutes: Route[]) => {
    setRoutes(newRoutes)
    // In a real app, you would update the backend here
  }

  const addRoute = async (route: Omit<Route, "id">) => {
    try {
      const response = await fetch("/api/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      })

      if (!response.ok) {
        throw new Error("Failed to add route")
      }

      const newRoute = await response.json()
      setRoutes([...routes, newRoute])
      return newRoute
    } catch (error) {
      console.error("Error adding route:", error)
      throw error
    }
  }

  const updateRoute = async (id: string, route: Partial<Route>) => {
    try {
      const response = await fetch(`/api/routes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      })

      if (!response.ok) {
        throw new Error("Failed to update route")
      }

      const updatedRoute = await response.json()
      setRoutes(routes.map((r) => (r.id === id ? updatedRoute : r)))
      return updatedRoute
    } catch (error) {
      console.error("Error updating route:", error)
      throw error
    }
  }

  const deleteRoute = async (id: string) => {
    try {
      const response = await fetch(`/api/routes/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete route")
      }

      setRoutes(routes.filter((r) => r.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting route:", error)
      throw error
    }
  }

  return { routes, loading, error, updateRoutes, addRoute, updateRoute, deleteRoute }
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true)
        const data = await fetchAlerts()
        setAlerts(data)
        setError(null)
      } catch (err) {
        setError("Failed to load alerts")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [])

  const updateAlerts = async (newAlerts: Alert[]) => {
    setAlerts(newAlerts)
    // In a real app, you would update the backend here
  }

  const addAlert = async (alert: Omit<Alert, "id" | "timestamp">) => {
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alert),
      })

      if (!response.ok) {
        throw new Error("Failed to add alert")
      }

      const newAlert = await response.json()
      setAlerts([newAlert, ...alerts])
      return newAlert
    } catch (error) {
      console.error("Error adding alert:", error)
      throw error
    }
  }

  const updateAlert = async (id: string, alert: Partial<Alert>) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alert),
      })

      if (!response.ok) {
        throw new Error("Failed to update alert")
      }

      const updatedAlert = await response.json()
      setAlerts(alerts.map((a) => (a.id === id ? updatedAlert : a)))
      return updatedAlert
    } catch (error) {
      console.error("Error updating alert:", error)
      throw error
    }
  }

  const deleteAlert = async (id: string) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete alert")
      }

      setAlerts(alerts.filter((a) => a.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting alert:", error)
      throw error
    }
  }

  return { alerts, loading, error, updateAlerts, addAlert, updateAlert, deleteAlert }
}

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true)
        const data = await fetchSchedules()
        setSchedules(data)
        setError(null)
      } catch (err) {
        setError("Failed to load schedules")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadSchedules()
  }, [])

  const updateSchedules = async (newSchedules: Schedule[]) => {
    setSchedules(newSchedules)
    // In a real app, you would update the backend here
  }

  const addSchedule = async (schedule: Omit<Schedule, "id">) => {
    try {
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
      })

      if (!response.ok) {
        throw new Error("Failed to add schedule")
      }

      const newSchedule = await response.json()
      setSchedules([...schedules, newSchedule])
      return newSchedule
    } catch (error) {
      console.error("Error adding schedule:", error)
      throw error
    }
  }

  const updateSchedule = async (id: string, schedule: Partial<Schedule>) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
      })

      if (!response.ok) {
        throw new Error("Failed to update schedule")
      }

      const updatedSchedule = await response.json()
      setSchedules(schedules.map((s) => (s.id === id ? updatedSchedule : s)))
      return updatedSchedule
    } catch (error) {
      console.error("Error updating schedule:", error)
      throw error
    }
  }

  const deleteSchedule = async (id: string) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete schedule")
      }

      setSchedules(schedules.filter((s) => s.id !== id))
      return true
    } catch (error) {
      console.error("Error deleting schedule:", error)
      throw error
    }
  }

  return { schedules, loading, error, updateSchedules, addSchedule, updateSchedule, deleteSchedule }
}
