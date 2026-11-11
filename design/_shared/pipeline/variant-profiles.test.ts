import { describe, expect, it } from "vitest";
import { resolveCanvasSelector } from "./variant-profiles.js";

describe("resolveCanvasSelector", () => {
  it("maps known variant slugs to canvas roots", () => {
    expect(resolveCanvasSelector("night-session")).toBe(
      ".night-session-canvas",
    );
    expect(resolveCanvasSelector("scoreline")).toBe(".scoreline-canvas");
    expect(resolveCanvasSelector("broadcast-pro")).toBe(".template-canvas");
  });
});
