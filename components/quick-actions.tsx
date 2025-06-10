import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, Bell, School, Users, MessageSquare, Bus } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      icon: School,
      label: "School Routes",
      href: "/school-routes",
      color: "text-indigo-500",
    },
    {
      icon: Users,
      label: "Carpooling",
      href: "/school-routes?tab=carpool",
      color: "text-purple-500",
    },
    {
      icon: MessageSquare,
      label: "Parent Chat",
      href: "/parent-chat",
      color: "text-green-500",
    },
    {
      icon: Bus,
      label: "Track Bus",
      href: "/school-routes?tab=finder",
      color: "text-blue-500",
    },
    {
      icon: Map,
      label: "Find Stops",
      href: "/school-routes?tab=finder",
      color: "text-amber-500",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/alerts",
      color: "text-red-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className="w-full h-auto flex flex-col items-center justify-center gap-1 py-4 button-like active:scale-95 transition-transform"
              >
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <span className="text-xs">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
