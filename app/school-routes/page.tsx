"use client"

import { useState } from "react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { SchoolRouteFinder } from "@/components/school-route-finder"
import { SchoolRoutesList } from "@/components/school-routes-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, Search, Users, MessageSquare, Shield } from "lucide-react"
import { CarpoolSearch } from "@/components/carpool-search"
import { CarpoolCreate } from "@/components/carpool-create"
import { ParentChatGroups } from "@/components/parent-chat-groups"
import { AdminPanel } from "@/components/admin-panel"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SchoolRoutesPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminDialog, setShowAdminDialog] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const handleAdminLogin = () => {
    if (adminPassword === "123") {
      setIsAdmin(true)
      setShowAdminDialog(false)
      setAdminPassword("")
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "School Bus Routes", href: "/school-routes", active: true },
          ]}
        />

        {isAdmin ? (
          <Button variant="default" onClick={() => setIsAdmin(false)} className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Exit Admin Mode
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setShowAdminDialog(true)} className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Admin Mode
          </Button>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">School Bus Routes & Carpooling</h1>

      <Tabs defaultValue="routes" className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="routes" className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
            <span>School Routes</span>
          </TabsTrigger>
          <TabsTrigger value="finder" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Stop Finder</span>
          </TabsTrigger>
          <TabsTrigger value="carpool" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Carpooling</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Parent Chat</span>
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="routes">
          <SchoolRoutesList isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="finder">
          <SchoolRouteFinder />
        </TabsContent>

        <TabsContent value="carpool">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-1">
              <CarpoolSearch />
            </div>
            <div className="md:col-span-1">
              <CarpoolCreate />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <ParentChatGroups />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="admin">
            <AdminPanel />
          </TabsContent>
        )}
      </Tabs>

      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>Enter the admin password to access administrative features.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value)
                  setPasswordError(false)
                }}
                className={passwordError ? "border-destructive" : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAdminLogin()
                  }
                }}
              />
              {passwordError && <p className="text-sm text-destructive">Incorrect password. Try again.</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdminDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdminLogin}>Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
