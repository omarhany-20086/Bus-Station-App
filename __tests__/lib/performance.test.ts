import { debounce, throttle, storage } from "@/lib/performance"
import jest from "jest"

describe("Performance utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  describe("debounce", () => {
    it("delays function execution", (done) => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      expect(mockFn).not.toHaveBeenCalled()

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1)
        done()
      }, 150)
    })
  })

  describe("throttle", () => {
    it("limits function execution frequency", (done) => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn()
      throttledFn()
      throttledFn()

      expect(mockFn).toHaveBeenCalledTimes(1)

      setTimeout(() => {
        throttledFn()
        expect(mockFn).toHaveBeenCalledTimes(2)
        done()
      }, 150)
    })
  })

  describe("storage", () => {
    it("stores and retrieves data", () => {
      const testData = { name: "Ahmed", age: 30 }

      storage.set("user", testData)
      const retrieved = storage.get("user")

      expect(retrieved).toEqual(testData)
    })

    it("returns default value for non-existent keys", () => {
      const defaultValue = { default: true }
      const result = storage.get("nonexistent", defaultValue)

      expect(result).toEqual(defaultValue)
    })
  })
})
