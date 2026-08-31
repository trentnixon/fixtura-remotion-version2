import { describe, expect, test } from "vitest";
import { colorToHue } from "./hexToHue";

describe("colorToHue", () => {
  test("returns hue for hex colors", () => {
    expect(colorToHue("#FF0000")).toBe(0);
    expect(colorToHue("#004DE2")).toBeCloseTo(220, 0);
  });

  test("returns hue for shorthand hex", () => {
    expect(colorToHue("#F00")).toBe(0);
  });

  test("returns hue for rgb colors", () => {
    expect(colorToHue("rgb(255, 0, 0)")).toBe(0);
  });

  test("returns 0 for null, undefined, empty, and invalid values", () => {
    expect(colorToHue(null)).toBe(0);
    expect(colorToHue(undefined)).toBe(0);
    expect(colorToHue("")).toBe(0);
    expect(colorToHue("not-a-color")).toBe(0);
  });
});
