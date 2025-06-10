"use client"

import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { Header } from "@/components/header"

export default function AdminPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <AdminDashboard />
      </div>
    </>
  )
}
