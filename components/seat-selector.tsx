"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"

interface SeatSelectorProps {
  onSeatSelection: (seats: string[]) => void
}

export function SeatSelector({ onSeatSelection }: SeatSelectorProps) {
  const { t } = useLanguage()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  // Mock data for seat availability
  const unavailableSeats = ["A1", "A2", "B3", "C4", "D2", "D3", "E1"]

  // Create a 5x8 grid of seats (A-E rows, 1-8 columns)
  const rows = ["A", "B", "C", "D", "E"]
  const columns = [1, 2, 3, 4, 5, 6, 7, 8]

  const toggleSeat = (seat: string) => {
    if (unavailableSeats.includes(seat)) return

    setSelectedSeats((prev) => {
      const newSelection = prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
      return newSelection
    })
  }

  // Use useEffect to notify parent component when selectedSeats changes
  useEffect(() => {
    onSeatSelection(selectedSeats)
  }, [selectedSeats, onSeatSelection])

  const getSeatStatus = (seat: string) => {
    if (unavailableSeats.includes(seat)) return "unavailable"
    if (selectedSeats.includes(seat)) return "selected"
    return "available"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-muted p-4 rounded-md mb-6 text-center">
        <div className="w-3/4 h-8 bg-primary/20 rounded-t-xl mx-auto mb-8 flex items-center justify-center text-sm font-medium">
          {t("frontOfBus")}
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 mb-6">
        {/* Column numbers */}
        <div className="col-span-8 grid grid-cols-8 gap-2 mb-2">
          {columns.map((col) => (
            <div key={col} className="flex justify-center text-sm text-muted-foreground">
              {col}
            </div>
          ))}
        </div>

        {/* Seats */}
        {rows.map((row) => (
          <div key={row} className="col-span-8 grid grid-cols-8 gap-2 mb-2">
            <div className="flex items-center text-sm text-muted-foreground">{row}</div>

            {/* Seats in this row */}
            {columns.map((col) => {
              const seat = `${row}${col}`
              const status = getSeatStatus(seat)

              return (
                <Button
                  key={seat}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 p-0 font-normal",
                    status === "unavailable" && "bg-muted text-muted-foreground cursor-not-allowed",
                    status === "selected" && "bg-primary text-primary-foreground",
                  )}
                  onClick={() => toggleSeat(seat)}
                  disabled={status === "unavailable"}
                >
                  {seat}
                </Button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm border bg-background"></div>
          <span>{t("available")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-primary"></div>
          <span>{t("selected")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-muted"></div>
          <span>{t("unavailable")}</span>
        </div>
      </div>
    </div>
  )
}
