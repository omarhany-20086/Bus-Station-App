"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Bus, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const success = await login(username, password)

    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to SchoolBus!",
        variant: "default",
      })
      router.push("/")
    } else {
      setError("Invalid username or password")
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-primary rounded-md p-2 text-primary-foreground">
              <Bus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SchoolBus</h1>
              <p className="text-sm text-muted-foreground">Safe Transit for Students</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          {error && <div className="text-destructive text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/30 rounded-md">
          <h3 className="text-sm font-medium mb-3">Demo Credentials:</h3>
          <div className="text-xs space-y-2 text-muted-foreground">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <strong>Admin:</strong>
                <br />
                admin / 123
              </div>
              <div>
                <strong>Parent:</strong>
                <br />
                parent / parent123
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <strong>Parent 2:</strong>
                <br />
                parent2 / parent123
              </div>
              <div>
                <strong>Child:</strong>
                <br />
                child1 / child123
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
