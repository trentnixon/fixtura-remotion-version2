import { describe, expect, it } from "vitest";
import { dedupeVenueLabel } from "./venue.js";

describe("dedupeVenueLabel", () => {
  it("collapses duplicate slash-separated venue parts", () => {
    expect(dedupeVenueLabel("Stadium A / Stadium A / Stadium B")).toBe(
      "Stadium A / Stadium B",
    );
  });

  it("returns trimmed single segments unchanged", () => {
    expect(dedupeVenueLabel("  Main Ground  ")).toBe("Main Ground");
  });
});
