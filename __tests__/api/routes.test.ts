import { GET, POST } from "@/app/api/routes/route";
import { NextRequest } from "next/server";
import { query } from "@/lib/db";

// Mock the database query
jest.mock("@/lib/db", () => ({
  query: jest.fn(),
}));

// Mock NextResponse.json
jest.mock("next/server", () => {
  const original = jest.requireActual("next/server");
  return {
    ...original,
    NextResponse: {
      json: (data, options) => {
        return {
          status: options && options.status ? options.status : 200,
          json: async () => data,
        };
      },
    },
  };
});

describe("/api/routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("returns routes successfully", async () => {
      const mockRoutes = [
        {
          id: 1,
          number: "42",
          name: "Route 42",
          frequency: "15 min",
          startPoint: "Station A",
          endPoint: "Station B",
          stops: ["Stop 1", "Stop 2"],
          status: "active",
          isAccessible: true,
          isExpress: false,
        },
      ];

      (query as jest.Mock).mockResolvedValue({ rows: mockRoutes });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("number");
      expect(data[0]).toHaveProperty("name");
    });

    it("handles database errors", async () => {
      (query as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200); // Returns demo data
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  describe("POST", () => {
    it("creates a new route successfully", async () => {
      const newRoute = {
        number: "43",
        name: "Route 43",
        frequency: "20 min",
        startPoint: "Station C",
        endPoint: "Station D",
        stops: ["Stop 3", "Stop 4"],
      };

      const mockDbResponse = {
        id: 2,
        number: "43",
        name: "Route 43",
        frequency: "20 min",
        startPoint: "Station C",
        endPoint: "Station D",
        stops: ["Stop 3", "Stop 4"],
        status: "active",
        isAccessible: false,
        isExpress: false,
      };

      (query as jest.Mock).mockResolvedValue({ rows: [mockDbResponse] });

      const request = new NextRequest("http://localhost:3000/api/routes", {
        method: "POST",
        body: JSON.stringify(newRoute),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.number).toBe("43");
    });

    it("validates required fields", async () => {
      const incompleteRoute = {
        number: "44",
        // Missing required fields
      };

      const request = new NextRequest("http://localhost:3000/api/routes", {
        method: "POST",
        body: JSON.stringify(incompleteRoute),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Missing required fields");
    });
  });
});
