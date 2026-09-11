import { describe, expect, it } from "vitest";
import { resolvePerformanceScreenDensity } from "./resolvePerformanceScreenDensity";

describe("resolvePerformanceScreenDensity", () => {
  it("returns undefined for five or fewer rows", () => {
    expect(resolvePerformanceScreenDensity(5)).toBeUndefined();
    expect(resolvePerformanceScreenDensity(3)).toBeUndefined();
  });

  it("returns compact for six rows", () => {
    expect(resolvePerformanceScreenDensity(6)).toBe("compact");
  });

  it("returns tight for seven or more rows", () => {
    expect(resolvePerformanceScreenDensity(7)).toBe("tight");
    expect(resolvePerformanceScreenDensity(10)).toBe("tight");
  });
});
