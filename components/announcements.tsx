import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, Megaphone } from "lucide-react"

export function Announcements() {
  const announcements = [
    {
      id: 1,
      type: "alert",
      title: "Route 42 Detour",
      description: "Due to road construction, Route 42 is currently on detour via Main St.",
      time: "10 min ago",
    },
    {
      id: 2,
      type: "info",
      title: "Holiday Schedule",
      description: "All buses will operate on a Sunday schedule for the upcoming holiday.",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "announcement",
      title: "New Express Route",
      description: "A new express route to the airport will begin service next week.",
      time: "1 day ago",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "info":
        return <Info className="h-4 w-4 text-primary" />
      case "announcement":
        return <Megaphone className="h-4 w-4 text-muted-foreground" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "alert":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning">
            Alert
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
            Info
          </Badge>
        )
      case "announcement":
        return <Badge variant="outline">Announcement</Badge>
      default:
        return <Badge variant="outline">Notice</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary" />
          Announcements
        </CardTitle>
        <CardDescription>Latest updates and alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {getIcon(announcement.type)}
                  <span className="font-medium">{announcement.title}</span>
                </div>
                {getTypeBadge(announcement.type)}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{announcement.description}</p>
              <p className="text-xs text-muted-foreground">{announcement.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
