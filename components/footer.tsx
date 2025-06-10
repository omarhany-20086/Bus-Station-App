import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Bus Station App. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/feedback">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </Button>
          </Link>
          <Link href="/terms">
            <Button variant="ghost" size="sm">
              Terms
            </Button>
          </Link>
          <Link href="/privacy">
            <Button variant="ghost" size="sm">
              Privacy
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
