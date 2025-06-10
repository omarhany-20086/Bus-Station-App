import { FeedbackForm } from "@/components/feedback-form"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Feedback", href: "/feedback", active: true },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6 text-center">We Value Your Feedback</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Your feedback helps us improve our services. Please take a moment to share your thoughts, report issues, or
        suggest new features.
      </p>

      <FeedbackForm />
    </div>
  )
}
