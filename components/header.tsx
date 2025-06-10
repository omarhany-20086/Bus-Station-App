"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bus, Menu, X, Bell, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="bg-primary rounded-md p-1 text-primary-foreground">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-lg">SchoolBus</span>
              <span className="sr-only">Safe Transit for Students</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground/80"
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/my-bus"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/my-bus") ? "text-primary" : "text-foreground/80"
            }`}
            onClick={closeMenu}
          >
            My Bus
          </Link>
          <Link
            href="/stops"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/stops") ? "text-primary" : "text-foreground/80"
            }`}
            onClick={closeMenu}
          >
            Stops
          </Link>
          <Link
            href="/messages"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/messages") ? "text-primary" : "text-foreground/80"
            }`}
            onClick={closeMenu}
          >
            Messages
          </Link>
          <Link
            href="/school-routes"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/school-routes") ? "text-primary" : "text-foreground/80"
            }`}
            onClick={closeMenu}
          >
            School
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            <Link
              href="/"
              className={`block py-2 text-base font-medium ${isActive("/") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/my-bus"
              className={`block py-2 text-base font-medium ${isActive("/my-bus") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              My Bus
            </Link>
            <Link
              href="/stops"
              className={`block py-2 text-base font-medium ${isActive("/stops") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              Stops
            </Link>
            <Link
              href="/messages"
              className={`block py-2 text-base font-medium ${isActive("/messages") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              Messages
            </Link>
            <Link
              href="/school-routes"
              className={`block py-2 text-base font-medium ${isActive("/school-routes") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              School
            </Link>
            <Link
              href="/profile"
              className={`block py-2 text-base font-medium ${isActive("/profile") ? "text-primary" : ""}`}
              onClick={closeMenu}
            >
              Profile
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start px-2"
              onClick={() => {
                logout()
                closeMenu()
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
