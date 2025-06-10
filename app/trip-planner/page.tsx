import { redirect } from "next/navigation"

export default function TripPlannerPage() {
  redirect("/routes?tab=plan")
  return null
}
