import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Accessibility", href: "/accessibility", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Accessibility Features</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Station Accessibility</CardTitle>
            <CardDescription>Information about physical accessibility at stations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Wheelchair accessible entrances and platforms</li>
              <li>• Tactile paving and guidance systems</li>
              <li>• Accessible restrooms and facilities</li>
              <li>• Elevator and ramp locations</li>
              <li>• Priority seating areas</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Accessibility</CardTitle>
            <CardDescription>Features to make this app accessible to all users</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Screen reader compatibility</li>
              <li>• Keyboard navigation support</li>
              <li>• High contrast mode</li>
              <li>• Text size adjustment</li>
              <li>• Focus indicators</li>
              <li>• Alternative text for images</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assistance Services</CardTitle>
            <CardDescription>Available services for passengers needing assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Staff assistance at major stations</li>
              <li>• Accessible shuttle services</li>
              <li>• Service animal accommodations</li>
              <li>• Assistance request form</li>
              <li>• Priority boarding</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessible Routes</CardTitle>
            <CardDescription>Finding and planning accessible journeys</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Accessible route finder</li>
              <li>• Step-free journey planner</li>
              <li>• Accessible vehicle information</li>
              <li>• Real-time accessibility updates</li>
              <li>• Alternative route suggestions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
