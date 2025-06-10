"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import LoginPage from "./login/page"
import HomePage from "./home/page"

export default function Page() {
  const { isAuthenticated, loading, checkAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <HomePage />
}
