import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export function CarpoolHighlight() {
  // Featured carpool groups
  const featuredGroups = [
    {
      id: "1",
      name: "مجموعة مدرسة النور الدولية",
      area: "حي الياسمين",
      seats: 2,
      time: "7:30 AM",
    },
    {
      id: "2",
      name: "مجموعة مدرسة الأندلس",
      area: "حي الفيصلية",
      seats: 1,
      time: "7:15 AM",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Carpool Groups
        </CardTitle>
        <CardDescription>Join or create carpool groups with other parents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featuredGroups.map((group) => (
            <div key={group.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{group.area}</p>
                  </div>
                </div>
                <Badge variant={group.seats > 0 ? "outline" : "secondary"}>
                  {group.seats} {group.seats === 1 ? "seat" : "seats"} available
                </Badge>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Departure: {group.time}</span>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-2 mt-2">
            <Link href="/school-routes?tab=carpool">
              <Button variant="outline" className="w-full">
                Find Groups
              </Button>
            </Link>
            <Link href="/school-routes?tab=carpool">
              <Button className="w-full">
                Create Group
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
