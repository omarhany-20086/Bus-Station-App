"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Navigation } from "lucide-react"

// Mock data for routes
const routesData = [
  { id: "1", number: "42", name: "Downtown Express", stops: 18 },
  { id: "2", number: "15", name: "Airport Shuttle", stops: 12 },
  { id: "3", number: "37", name: "University Line", stops: 24 },
  { id: "4", number: "8", name: "Coastal Route", stops: 15 },
  { id: "5", number: "53", name: "Shopping Mall Express", stops: 9 },
  { id: "6", number: "22", name: "Hospital Route", stops: 14 },
  { id: "7", number: "67", name: "Industrial Park Line", stops: 11 },
  { id: "8", number: "31", name: "Suburban Connector", stops: 22 },
]

export function SearchRoutes() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof routesData>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = routesData.filter(
      (route) => route.number.toLowerCase().includes(query) || route.name.toLowerCase().includes(query),
    )

    setSearchResults(results)
    setHasSearched(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Find Routes
        </CardTitle>
        <CardDescription>Search for bus routes by number or name</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Route number or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {hasSearched && (
          <div className="space-y-2">
            {searchResults.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Found {searchResults.length} route{searchResults.length !== 1 ? "s" : ""}
                </p>
                {searchResults.map((route) => (
                  <div
                    key={route.id}
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{route.number}</span>
                        <span>{route.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{route.stops} stops</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No routes found matching "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Search for a route to see results</p>
            <p className="text-sm text-muted-foreground mt-1">Try searching by route number or destination</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
