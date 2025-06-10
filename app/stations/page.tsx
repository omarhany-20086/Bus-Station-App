import { StationsList } from "@/components/stations-list"
import { StationSearch } from "@/components/station-search"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function StationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Stations", href: "/stations", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Bus Stations</h1>

      <StationSearch className="mb-6" />

      <StationsList />
    </div>
  )
}
