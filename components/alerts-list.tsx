import type React from "react";
import type { Alert } from "@/types/alert";

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <div>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id}>
              <strong>{alert.title}</strong>: {alert.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts to display.</p>
      )}
    </div>
  );
}
