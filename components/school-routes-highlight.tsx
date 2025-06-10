import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bus, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SchoolRoutesHighlight() {
  // Featured routes
  const featuredRoutes = [
    {
      id: "A12",
      name: "مدرسة النور الدولية - المسار الصباحي",
      school: "مدرسة النور الدولية",
      stops: 8,
      status: "active",
    },
    {
      id: "B23",
      name: "مدرسة الأندلس - المسار الصباحي",
      school: "مدرسة الأندلس",
      stops: 6,
      status: "active",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-primary" />
          School Bus Routes
        </CardTitle>
        <CardDescription>Find and track school bus routes and stops</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featuredRoutes.map((route) => (
            <div key={route.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                      {route.id}
                    </Badge>
                    <h3 className="font-medium">{route.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{route.school}</p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success">
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{route.stops} stops</span>
              </div>
            </div>
          ))}

          <Link href="/school-routes">
            <Button className="w-full mt-2">
              View All Routes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
