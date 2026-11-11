import { describe, expect, it } from "vitest";
import { dedupeVenueLabel } from "./venue";

describe("dedupeVenueLabel", () => {
  it("returns trimmed single segments unchanged", () => {
    expect(dedupeVenueLabel("Pacific Pines Park")).toBe("Pacific Pines Park");
    expect(dedupeVenueLabel("  Main Ground  ")).toBe("Main Ground");
  });

  it("dedupes repeated slash segments case-insensitively", () => {
    expect(dedupeVenueLabel("Pacific Pines Park / Pacific Pines Park")).toBe(
      "Pacific Pines Park",
    );
    expect(dedupeVenueLabel("Stadium A / Stadium A / Stadium B")).toBe(
      "Stadium A / Stadium B",
    );
  });

  it("drops parent venue when a later segment extends it", () => {
    expect(
      dedupeVenueLabel(
        "Alan Nielsen Park / Alan Nielsen Park 3 (Corbwood No 3)",
      ),
    ).toBe("Alan Nielsen Park 3 (Corbwood No 3)");
  });

  it("keeps distinct segments that are not prefix extensions", () => {
    expect(dedupeVenueLabel("Main Oval / West End")).toBe(
      "Main Oval / West End",
    );
  });

  it("does not treat substring overlap as a parent venue", () => {
    expect(dedupeVenueLabel("Park / Parking Lot")).toBe("Park / Parking Lot");
  });
});
