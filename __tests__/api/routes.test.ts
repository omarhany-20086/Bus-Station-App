import { GET, POST } from "@/app/api/routes/route"
import { NextRequest } from "next/server"
import jest from "jest"
import { query } from "@/lib/db"

describe("/api/routes", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("GET", () => {
    it("returns routes successfully", async () => {
      const mockRoutes = [
        {
          id: 1,
          number: "42",
          name: "Route 42",
          frequency: "15 min",
          start_point: "Station A",
          end_point: "Station B",
          stops: ["Stop 1", "Stop 2"],
          status: "active",
          is_accessible: true,
          is_express: false,
        },
      ]

      query.mockResolvedValue({ rows: mockRoutes })

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveLength(1)
      expect(data[0].number).toBe("42")
    })

    it("handles database errors", async () => {
      query.mockRejectedValue(new Error("Database error"))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe("Failed to fetch routes")
    })
  })

  describe("POST", () => {
    it("creates a new route successfully", async () => {
      const newRoute = {
        number: "43",
        name: "Route 43",
        frequency: "20 min",
        startPoint: "Station C",
        endPoint: "Station D",
        stops: ["Stop 3", "Stop 4"],
      }

      const mockDbResponse = {
        id: 2,
        number: "43",
        name: "Route 43",
        frequency: "20 min",
        start_point: "Station C",
        end_point: "Station D",
        stops: ["Stop 3", "Stop 4"],
        status: "active",
        is_accessible: false,
        is_express: false,
      }

      query.mockResolvedValue({ rows: [mockDbResponse] })

      const request = new NextRequest("http://localhost:3000/api/routes", {
        method: "POST",
        body: JSON.stringify(newRoute),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.number).toBe("43")
    })

    it("validates required fields", async () => {
      const incompleteRoute = {
        number: "44",
        // Missing required fields
      }

      const request = new NextRequest("http://localhost:3000/api/routes", {
        method: "POST",
        body: JSON.stringify(incompleteRoute),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe("Missing required fields")
    })
  })
})
