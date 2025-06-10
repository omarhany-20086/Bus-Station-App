"use client"

import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import { Bell, Check, X, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  timestamp: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Route 42 Delayed",
      message: "Route 42 is currently delayed by 10 minutes due to traffic.",
      type: "warning",
      read: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      title: "New Message",
      message: "You have a new message from the school administrator.",
      type: "info",
      read: false,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "3",
      title: "Booking Confirmed",
      message: "Your seat booking has been confirmed for tomorrow.",
      type: "success",
      read: true,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const unreadCount = notifications.filter((n) => !n.read).length

  // State to track toast notifications
  const [toastNotification, setToastNotification] = useState<{
    title: string
    description?: string
    variant?: "default" | "destructive" | "success" | "warning"
  } | null>(null)

  // Handle showing toast based on notification state
  useEffect(() => {
    if (toastNotification) {
      toast({
        title: toastNotification.title,
        description: toastNotification.description,
        variant: toastNotification.variant,
      })
      setToastNotification(null)
    }
  }, [toastNotification, toast])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setToastNotification({
      title: "All notifications marked as read",
      variant: "success",
    })
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
    setToastNotification({
      title: "All notifications cleared",
      variant: "success",
    })
  }

  // Demo: Add a new notification every 30 seconds
  // Use a ref to track if we've already set up the interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const types = ["info", "warning", "success", "error"] as const
    const titles = ["Bus Arrival Update", "Schedule Change", "New Message", "Route Alert", "System Maintenance"]
    const messages = [
      "Your bus will arrive in 5 minutes.",
      "Tomorrow's schedule has been updated.",
      "You have a new message from the driver.",
      "Route 15 is experiencing delays.",
      "System maintenance scheduled for tonight.",
    ]

    intervalRef.current = setInterval(() => {
      const type = types[Math.floor(Math.random() * types.length)]
      const titleIndex = Math.floor(Math.random() * titles.length)

      const newNotification: Notification = {
        id: Date.now().toString(),
        title: titles[titleIndex],
        message: messages[titleIndex],
        type,
        read: false,
        timestamp: new Date().toISOString(),
      }

      setNotifications((prev) => [newNotification, ...prev])

      // Set the toast notification state instead of calling toast directly
      setToastNotification({
        title: newNotification.title,
        description: newNotification.message,
        variant:
          type === "error"
            ? "destructive"
            : type === "warning"
              ? "warning"
              : type === "success"
                ? "success"
                : "default",
      })
    }, 30000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, []) // Empty dependency array so this only runs once on mount

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={clearAll}
              disabled={notifications.length === 0}
            >
              Clear all
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="text-xs text-muted-foreground mt-1">{formatTime(notification.timestamp)}</div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        markAsRead(notification.id)
                      }}
                      disabled={notification.read}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" asChild>
          <Link href="/notifications" className="w-full text-center">
            View All Notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
