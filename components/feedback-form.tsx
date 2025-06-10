"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Star, ThumbsUp } from "lucide-react"

export function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState("general")
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
        variant: "success",
      })

      // Reset form after 2 seconds
      setTimeout(() => {
        setFeedbackType("general")
        setRating(null)
        setComment("")
        setEmail("")
        setIsSubmitted(false)
      }, 2000)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Feedback
        </CardTitle>
        <CardDescription>We value your feedback. Please let us know how we can improve.</CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-8">
            <ThumbsUp className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              Your feedback has been submitted successfully. We appreciate your input!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Feedback Type</Label>
                <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">General Feedback</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug">Report a Bug</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature">Feature Request</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Rate Your Experience</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`h-10 w-10 ${rating && star <= rating ? "text-yellow-500" : "text-muted-foreground"}`}
                      onClick={() => setRating(star)}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comments</Label>
                <Textarea
                  id="comment"
                  placeholder="Please share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We'll only use this to follow up on your feedback if needed.
                </p>
              </div>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter>
        {!isSubmitted && (
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting || !comment}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
