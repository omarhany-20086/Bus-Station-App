import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, ArrowLeft, ArrowRight } from "lucide-react"

export default function RoutesPage() {
  // Mock data for routes
  const routes = [
    {
      id: "1",
      number: "42",
      name: "Morning Route",
      school: "Al-Azhar School",
      stops: 5,
      status: "active",
    },
    {
      id: "2",
      number: "15",
      name: "Airport Shuttle",
      school: "Cairo American School",
      stops: 8,
      status: "active",
    },
    {
      id: "3",
      number: "37",
      name: "University Line",
      school: "Misr International School",
      stops: 6,
      status: "limited",
    },
  ]

  return (
    <div className="container max-w-md mx-auto px-4 py-4">
      <div className="flex items-center mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium">School Routes</h1>
      </div>

      <div className="flex mb-4">
        <Input placeholder="Search routes" className="text-sm" />
        <Button size="sm" className="ml-2">
          <Search className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        {routes.map((route) => (
          <Card key={route.id} className="p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                    {route.number}
                  </Badge>
                  <h3 className="text-sm font-medium">{route.name}</h3>
                </div>
                <div className="text-xs text-muted-foreground">{route.school}</div>
              </div>
              <Badge className={route.status === "active" ? "status-on-time text-xs" : "status-delayed text-xs"}>
                {route.status === "active" ? "Active" : "Limited"}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-xs mb-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span>{route.stops} stops</span>
            </div>

            <Link href={`/routes/${route.id}`}>
              <Button size="sm" variant="outline" className="w-full text-xs">
                View Details
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
