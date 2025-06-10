import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Fetch on-time performance
    const performanceResult = await query(`
      SELECT 
        ROUND(AVG(CASE WHEN status = 'on_time' THEN 100 ELSE 0 END), 1) as performance
      FROM route_status
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);

    // Fetch daily ridership
    const ridershipResult = await query(`
      SELECT 
        ROUND(AVG(daily_count), 0) as average_ridership
      FROM (
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as daily_count
        FROM route_status
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
      ) daily_counts
    `);

    // Fetch active routes count
    const routesResult = await query(`
      SELECT COUNT(*) as active_routes
      FROM routes
      WHERE status = 'active'
    `);

    // Fetch active alerts count
    const alertsResult = await query(`
      SELECT COUNT(*) as active_alerts
      FROM alerts
      WHERE status = 'active'
    `);

    // Fetch monthly trends
    const trendsResult = await query(`
      SELECT 
        TO_CHAR(date_trunc('month', created_at), 'Mon YYYY') as month,
        COUNT(*) as ridership,
        ROUND(AVG(CASE WHEN status = 'on_time' THEN 100 ELSE 0 END), 1) as performance
      FROM route_status
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY date_trunc('month', created_at)
      ORDER BY date_trunc('month', created_at) DESC
    `);

    return NextResponse.json({
      onTimePerformance: performanceResult.rows[0]?.performance || 0,
      dailyRidership: ridershipResult.rows[0]?.average_ridership || 0,
      activeRoutes: routesResult.rows[0]?.active_routes || 0,
      activeAlerts: alertsResult.rows[0]?.active_alerts || 0,
      monthlyTrend: trendsResult.rows.map((row) => ({
        month: row.month,
        ridership: parseInt(row.ridership),
        performance: parseFloat(row.performance),
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
