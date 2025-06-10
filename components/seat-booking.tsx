"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { AlertCircle, Bus, CalendarIcon, CreditCard, MapPin, User } from "lucide-react"
import { useRoutes } from "@/lib/store"
import { SeatSelector } from "./seat-selector"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/lib/i18n/language-context"
import { validateEmail } from "@/lib/email-validation"

export function SeatBooking() {
  const { routes } = useRoutes()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("select-route")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedRoute, setSelectedRoute] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [emailError, setEmailError] = useState("")
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  // Available times for the selected route
  const availableTimes = [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ]

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassengerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear email error when user types
    if (name === "email") {
      setEmailError("")
    }
  }

  const handleContinue = () => {
    if (activeTab === "select-route" && selectedRoute && selectedTime) {
      setActiveTab("select-seats")
    } else if (activeTab === "select-seats" && selectedSeats.length > 0) {
      setActiveTab("passenger-info")
    } else if (activeTab === "passenger-info" && passengerInfo.name && passengerInfo.email) {
      // Validate email before proceeding
      if (!validateEmail(passengerInfo.email)) {
        setEmailError(t("invalidEmail") || "Please enter a valid email address")
        return
      }

      // Generate a random booking reference
      const reference = `BK${Math.floor(100000 + Math.random() * 900000)}`
      setBookingReference(reference)
      setBookingComplete(true)
      setActiveTab("confirmation")

      // In a real app, this is where we would send the email
      console.log("Sending confirmation email to:", passengerInfo.email)
    }
  }

  const getSelectedRouteName = () => {
    const route = routes.find((r) => r.id === selectedRoute)
    return route ? `${route.number} - ${route.name}` : ""
  }

  const getTotalPrice = () => {
    return selectedSeats.length * 5.99
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-5 w-5 text-primary" />
          {t("bookASeat")}
        </CardTitle>
        <CardDescription>{t("bookSeatDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="select-route">{t("routeAndTime")}</TabsTrigger>
            <TabsTrigger value="select-seats" disabled={!selectedRoute || !selectedTime}>
              {t("seatSelection")}
            </TabsTrigger>
            <TabsTrigger value="passenger-info" disabled={selectedSeats.length === 0}>
              {t("passengerInfo")}
            </TabsTrigger>
            <TabsTrigger value="confirmation" disabled={!bookingComplete}>
              {t("confirmation")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select-route">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">{t("travelDate")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{t("pickDate")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="route">{t("selectRoute")}</Label>
                <Select value={selectedRoute} onValueChange={handleRouteSelect}>
                  <SelectTrigger id="route">
                    <SelectValue placeholder={t("selectRoute")} />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.id}>
                        {route.number} - {route.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRoute && (
                <div className="space-y-2">
                  <Label htmlFor="time">{t("selectDepartureTime")}</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className="text-center"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button className="w-full" disabled={!selectedRoute || !selectedTime} onClick={handleContinue}>
                  {t("continueToSeatSelection")}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="select-seats">
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{getSelectedRouteName()}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>{date ? format(date, "PPP") : ""}</span>
                      <span>•</span>
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("select-route")}>
                    {t("change")}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">{t("selectYourSeats")}</h3>
                <SeatSelector onSeatSelection={handleSeatSelection} />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {t("selectedSeats")}: {selectedSeats.length > 0 ? selectedSeats.join(", ") : t("none")}
                  {selectedSeats.length > 0 && ` (${selectedSeats.length} × $5.99 = $${getTotalPrice().toFixed(2)})`}
                </AlertDescription>
              </Alert>

              <div className="pt-4">
                <Button className="w-full" disabled={selectedSeats.length === 0} onClick={handleContinue}>
                  {t("continueToPassengerInfo")}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="passenger-info">
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{getSelectedRouteName()}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>{date ? format(date, "PPP") : ""}</span>
                      <span>•</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="text-sm mt-1">
                      {t("seatNumbers")}: {selectedSeats.join(", ")}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("select-seats")}>
                    {t("change")}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">{t("passengerInformation")}</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("enterFullName")}
                    value={passengerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("emailAddress")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("enterEmail")}
                    value={passengerInfo.email}
                    onChange={handleInputChange}
                    required
                    className={emailError ? "border-destructive" : ""}
                  />
                  {emailError && <p className="text-sm text-destructive">{emailError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phoneNumber")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder={t("enterPhone")}
                    value={passengerInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">{t("paymentSummary")}</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>
                      {t("seatPrice")} × {selectedSeats.length}
                    </span>
                    <span>${(5.99 * selectedSeats.length).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("bookingFee")}</span>
                    <span>$1.50</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t mt-2">
                    <span>{t("total")}</span>
                    <span>${(5.99 * selectedSeats.length + 1.5).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full"
                  disabled={!passengerInfo.name || !passengerInfo.email}
                  onClick={handleContinue}
                >
                  {t("completeBooking")}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="confirmation">
            <div className="space-y-6">
              <div className="bg-success/10 border border-success rounded-md p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">{t("bookingConfirmed")}</h2>
                <p className="text-muted-foreground mb-4">{t("bookingSuccess")}</p>
                <div className="bg-background p-3 rounded-md inline-block">
                  <p className="text-sm text-muted-foreground">{t("bookingReference")}</p>
                  <p className="text-xl font-mono font-bold">{bookingReference}</p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-3">{t("bookingDetails")}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Bus className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{getSelectedRouteName()}</p>
                      <p className="text-sm text-muted-foreground">
                        {date ? format(date, "PPP") : ""} • {selectedTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{t("seatNumbers")}</p>
                      <p className="text-sm text-muted-foreground">{selectedSeats.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{t("passengerInformation")}</p>
                      <p className="text-sm text-muted-foreground">{passengerInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{passengerInfo.email}</p>
                      {passengerInfo.phone && <p className="text-sm text-muted-foreground">{passengerInfo.phone}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{t("payment")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("total")}: ${(5.99 * selectedSeats.length + 1.5).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // Reset the form
                    setSelectedRoute("")
                    setSelectedTime("")
                    setSelectedSeats([])
                    setPassengerInfo({
                      name: "",
                      email: "",
                      phone: "",
                    })
                    setBookingComplete(false)
                    setActiveTab("select-route")
                  }}
                >
                  {t("bookAnotherSeat")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    // In a real app, this would download or print the ticket
                    alert(t("ticketSent"))
                  }}
                >
                  {t("downloadTicket")}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
