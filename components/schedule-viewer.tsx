import type React from "react";
import type { Schedule } from "../types/schedule";

interface ScheduleViewerProps {
  scheduleData: Schedule | null;
}

export function ScheduleViewer({ scheduleData }: ScheduleViewerProps) {
  if (!scheduleData) {
    return <div>No schedule data available.</div>;
  }

  return (
    <div>
      <h2>Schedule</h2>
      {Object.entries(scheduleData).map(([day, activities]) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                {activity.time}: {activity.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
