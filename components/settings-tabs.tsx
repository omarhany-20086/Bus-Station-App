"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLogin } from "./admin-login"
import { AdminRoutes } from "./admin-routes"
import { AdminAlerts } from "./admin-alerts"
import { AdminSchedules } from "./admin-schedules"
import { AppSettings } from "./app-settings"

export function SettingsTabs() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Tabs defaultValue="app">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="app">App Settings</TabsTrigger>
        <TabsTrigger value="routes">Routes</TabsTrigger>
        <TabsTrigger value="schedules">Schedules</TabsTrigger>
        <TabsTrigger value="alerts">Alerts</TabsTrigger>
      </TabsList>

      <TabsContent value="app">
        <AppSettings />
      </TabsContent>

      <TabsContent value="routes">
        {isAuthenticated ? (
          <AdminRoutes />
        ) : (
          <AdminLogin
            title="Route Management"
            description="Add, edit, or remove bus routes"
            onAuthenticated={() => setIsAuthenticated(true)}
          />
        )}
      </TabsContent>

      <TabsContent value="schedules">
        {isAuthenticated ? (
          <AdminSchedules />
        ) : (
          <AdminLogin
            title="Schedule Management"
            description="Manage bus schedules and timetables"
            onAuthenticated={() => setIsAuthenticated(true)}
          />
        )}
      </TabsContent>

      <TabsContent value="alerts">
        {isAuthenticated ? (
          <AdminAlerts />
        ) : (
          <AdminLogin
            title="Alert Management"
            description="Create and manage service alerts"
            onAuthenticated={() => setIsAuthenticated(true)}
          />
        )}
      </TabsContent>
    </Tabs>
  )
}
