import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Info, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function RecentAlertsCard() {
  // Mock data for alerts
  const alerts = [
    {
      id: "1",
      title: "10-minute delay on Route 42",
      description:
        "Due to road construction on Main Street, Route 42 is currently delayed by approximately 10 minutes.",
      time: "15 minutes ago",
      type: "delay",
      severity: "medium",
    },
    {
      id: "2",
      title: "Early dismissal on Friday",
      description: "School will dismiss at 1:30 PM on Friday due to teacher in-service day.",
      time: "2 hours ago",
      type: "info",
      severity: "low",
    },
    {
      id: "3",
      title: "Bus route change next week",
      description: "Starting Monday, Route 15 will use an alternate path due to bridge repairs.",
      time: "Yesterday",
      type: "change",
      severity: "medium",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "delay":
      case "cancellation":
        return <AlertTriangle className="h-5 w-5 text-warning" />
      case "info":
      case "change":
      default:
        return <Info className="h-5 w-5 text-info" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-destructive/20 text-destructive">High</Badge>
      case "medium":
        return <Badge className="bg-warning/20 text-warning-foreground">Medium</Badge>
      case "low":
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
                <div className="ml-2">{getSeverityBadge(alert.severity)}</div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {alert.time}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-muted/50 border-t">
          <Link href="/notifications">
            <Button variant="ghost" size="sm" className="w-full">
              View All Alerts
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
