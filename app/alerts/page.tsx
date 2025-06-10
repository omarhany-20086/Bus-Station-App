import { AlertsList } from "@/components/alerts-list";
import { AlertsFilter } from "@/components/alerts-filter";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { query } from "@/lib/db";

async function getAlerts() {
  try {
    const result = await query(`
      SELECT 
        id,
        title,
        description,
        type,
        severity,
        affected_routes as "affectedRoutes",
        status,
        timestamp,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM alerts 
      ORDER BY timestamp DESC
    `);
    return result.rows || [];
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
}

export default async function AlertsPage() {
  const alerts = await getAlerts();

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
          <AlertsList alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
