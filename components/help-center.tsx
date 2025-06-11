"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Shield, Bus, Users, MessageSquare, Phone, Mail } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface HelpCenterProps {
  faqs: {
    general: FAQ[]
    tracking: FAQ[]
  }
}

export function HelpCenter({ faqs }: HelpCenterProps) {
  const [activeCategory, setActiveCategory] = useState<"general" | "tracking">("general")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs[activeCategory].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="font-semibold tracking-tight flex items-center justify-center gap-2 text-2xl">
            <svg
              className="lucide lucide-circle-help h-6 w-6 text-primary"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            مركز المساعدة
          </div>
          <div className="text-sm text-muted-foreground">
            نحن هنا لمساعدتك. ابحث عن إجابات لأسئلتك أو تواصل معنا مباشرة
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10"
              placeholder="ابحث عن سؤالك هنا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:bg-accent transition-colors"
          onClick={() => setActiveCategory("general")}
        >
          <div className="flex items-center gap-3 p-4">
            <svg
              className="lucide lucide-phone h-8 w-8 text-primary"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div>
              <h3 className="font-semibold">اتصل بنا</h3>
              <p className="text-sm text-muted-foreground">+20 123 456 7890</p>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:bg-accent transition-colors"
          onClick={() => setActiveCategory("tracking")}
        >
          <div className="flex items-center gap-3 p-4">
            <svg
              className="lucide lucide-mail h-8 w-8 text-primary"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="16" rx="2" width="20" x="2" y="4" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <div>
              <h3 className="font-semibold">تتبع الحافلات</h3>
              <p className="text-sm text-muted-foreground">help@busstation.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <h3 className="font-semibold mb-2">{faq.question}</h3>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
