import { AlertsList } from "@/components/alerts-list"
import { AlertsFilter } from "@/components/alerts-filter"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Service Alerts", href: "/alerts", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Service Alerts</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <AlertsFilter />
        </div>
        <div className="md:col-span-3">
          <AlertsList />
        </div>
      </div>
    </div>
  )
}
