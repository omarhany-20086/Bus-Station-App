import { render, screen, fireEvent } from "@testing-library/react"
import { InteractiveMap } from "@/components/interactive-map"
import { jest } from "@jest/globals"

const mockLocations = [
  {
    id: "1",
    lat: 30.0444,
    lng: 31.2357,
    type: "bus" as const,
    name: "حافلة المدرسة",
    status: "on-time",
    eta: "5 دقائق",
    occupancy: 75,
  },
  {
    id: "2",
    lat: 30.0626,
    lng: 31.2497,
    type: "home" as const,
    name: "المنزل",
  },
  {
    id: "3",
    lat: 30.033,
    lng: 31.2336,
    type: "school" as const,
    name: "مدرسة الأزهر",
  },
]

describe("InteractiveMap", () => {
  it("renders map with locations", () => {
    render(<InteractiveMap locations={mockLocations} />)

    expect(screen.getByText("خريطة تفاعلية")).toBeInTheDocument()
    expect(screen.getByText("تتبع مباشر")).toBeInTheDocument()
  })

  it("shows location details when marker is clicked", () => {
    const onLocationSelect = jest.fn()
    render(<InteractiveMap locations={mockLocations} onLocationSelect={onLocationSelect} />)

    // Click on bus marker
    const busMarker = screen.getByRole("button", { name: /حافلة المدرسة/i })
    fireEvent.click(busMarker)

    expect(onLocationSelect).toHaveBeenCalledWith(mockLocations[0])
  })

  it("toggles tracking mode", () => {
    render(<InteractiveMap locations={mockLocations} />)

    const trackingButton = screen.getByText("تتبع مباشر")
    fireEvent.click(trackingButton)

    expect(screen.getByText("إيقاف التتبع")).toBeInTheDocument()
  })
})
