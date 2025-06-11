import { debounce, throttle, storage } from "@/lib/performance";

describe("Performance utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("debounce", () => {
    it("delays function execution", () => {
      jest.useFakeTimers();
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 1000);

      debouncedFn();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);
      expect(fn).toHaveBeenCalled();
    });
  });

  describe("throttle", () => {
    it("limits function execution rate", () => {
      jest.useFakeTimers();
      const fn = jest.fn();
      const throttledFn = throttle(fn, 1000);

      throttledFn();
      expect(fn).toHaveBeenCalled();

      throttledFn();
      expect(fn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      throttledFn();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe("storage", () => {
    it("sets and gets items from localStorage", () => {
      const testData = { key: "value" };
      storage.set("test", testData);
      expect(storage.get("test")).toEqual(testData);
    });

    it("removes items from localStorage", () => {
      storage.set("test", "value");
      storage.remove("test");
      expect(storage.get("test")).toBeNull();
    });
  });
});
