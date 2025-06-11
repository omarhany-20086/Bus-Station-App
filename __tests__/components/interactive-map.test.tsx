import { render, screen, fireEvent } from "@testing-library/react";
import { InteractiveMap } from "@/components/interactive-map";
import { jest } from "@jest/globals";

const mockLocations = [
  {
    id: 1,
    name: "حافلة المدرسة",
    lat: 30.0444,
    lng: 31.2357,
    status: "active",
    lastUpdate: new Date().toISOString(),
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
];

describe("InteractiveMap", () => {
  const onLocationSelect = jest.fn();

  beforeEach(() => {
    onLocationSelect.mockClear();
  });

  it("renders the map with markers", () => {
    render(<InteractiveMap locations={mockLocations} />);

    expect(screen.getByText("خريطة تفاعلية")).toBeInTheDocument();
    expect(screen.getByTestId("bus-marker-1")).toBeInTheDocument();
  });

  it("shows location details when marker is clicked", () => {
    render(<InteractiveMap locations={mockLocations} />);

    const marker = screen.getByTestId("bus-marker-1");
    fireEvent.click(marker);

    expect(screen.getByText("حافلة المدرسة")).toBeInTheDocument();
  });

  it("toggles tracking mode", () => {
    render(<InteractiveMap locations={mockLocations} />);

    const trackingButton = screen.getByText("تتبع مباشر");
    fireEvent.click(trackingButton);

    expect(trackingButton).toHaveClass("bg-primary");
  });
});
