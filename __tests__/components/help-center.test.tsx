import { render, screen, fireEvent } from "@testing-library/react"
import { HelpCenter } from "@/components/help-center"

describe("HelpCenter", () => {
  it("renders help center with search", () => {
    render(<HelpCenter />)

    expect(screen.getByText("مركز المساعدة")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("ابحث عن سؤالك هنا...")).toBeInTheDocument()
  })

  it("filters FAQs based on search query", () => {
    render(<HelpCenter />)

    const searchInput = screen.getByPlaceholderText("ابحث عن سؤالك هنا...")
    fireEvent.change(searchInput, { target: { value: "أمان" } })

    expect(screen.getByText(/نتيجة للبحث/)).toBeInTheDocument()
  })

  it("switches between FAQ categories", () => {
    render(<HelpCenter />)

    const trackingTab = screen.getByText("التتبع")
    fireEvent.click(trackingTab)

    expect(screen.getByText(/لماذا لا تظهر الحافلة/)).toBeInTheDocument()
  })
})
