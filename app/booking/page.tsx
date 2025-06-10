import { redirect } from "next/navigation"

export default function BookingPage() {
  redirect("/routes?tab=book")
  return null
}
