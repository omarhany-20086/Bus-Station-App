import { render, screen, fireEvent } from "@testing-library/react";
import { HelpCenter } from "@/components/help-center";

const mockFaqs = {
  general: [
    {
      question: "كيف يمكنني الاتصال بالدعم؟",
      answer:
        "يمكنك الاتصال بنا على الرقم +20 123 456 7890 أو عبر البريد الإلكتروني help@busstation.com",
    },
  ],
  tracking: [
    {
      question: "كيف يمكنني تتبع الحافلة؟",
      answer: "يمكنك تتبع الحافلة من خلال الخريطة التفاعلية في التطبيق",
    },
  ],
};

describe("HelpCenter", () => {
  it("renders the help center with initial general FAQs", () => {
    render(<HelpCenter faqs={mockFaqs} />);

    expect(screen.getByText("مركز المساعدة")).toBeInTheDocument();
    expect(screen.getByText("كيف يمكنني الاتصال بالدعم؟")).toBeInTheDocument();
  });

  it("switches to tracking FAQs when clicking the tracking section", () => {
    render(<HelpCenter faqs={mockFaqs} />);

    const trackingSection = screen.getByText("تتبع الحافلات");
    fireEvent.click(trackingSection);

    // Wait for the FAQ to be displayed
    const trackingFaq = screen.getByText("كيف يمكنني تتبع الحافلة؟");
    expect(trackingFaq).toBeInTheDocument();
  });

  it("filters FAQs based on search query", () => {
    render(<HelpCenter faqs={mockFaqs} />);

    // First click on tracking section to show tracking FAQs
    const trackingSection = screen.getByText("تتبع الحافلات");
    fireEvent.click(trackingSection);

    // Then search for "تتبع"
    const searchInput = screen.getByPlaceholderText("ابحث عن سؤالك هنا...");
    fireEvent.change(searchInput, { target: { value: "تتبع" } });

    // Wait for the filtered FAQ to be displayed
    const trackingFaq = screen.getByText("كيف يمكنني تتبع الحافلة؟");
    expect(trackingFaq).toBeInTheDocument();

    // Verify the general FAQ is not shown
    const generalFaq = screen.queryByText("كيف يمكنني الاتصال بالدعم؟");
    expect(generalFaq).not.toBeInTheDocument();
  });
});
