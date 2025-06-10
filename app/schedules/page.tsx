import { ScheduleViewer } from "@/components/schedule-viewer"
import { ScheduleFilter } from "@/components/schedule-filter"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function SchedulesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Schedules", href: "/schedules", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Bus Schedules</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <ScheduleFilter />
        </div>
        <div className="md:col-span-3">
          <ScheduleViewer />
        </div>
      </div>
    </div>
  )
}
