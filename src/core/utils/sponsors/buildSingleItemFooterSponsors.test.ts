import { describe, expect, it } from "vitest";
import { AssignSponsors, Sponsor } from "../../types/data/sponsors";
import { buildSingleItemFooterSponsors } from "./buildSingleItemFooterSponsors";

const sponsor = (id: number): Sponsor => ({
  id,
  name: `S${id}`,
  logo: { id: id * 10, url: `https://example.com/${id}.png` },
});

const assign = (partial: Partial<AssignSponsors>): AssignSponsors => ({
  competition: [],
  grade: [],
  team: [],
  ...partial,
});

describe("buildSingleItemFooterSponsors", () => {
  it("uses the item entity plus primaryForScreen with max-5 paint order", () => {
    const result = buildSingleItemFooterSponsors({
      primaryForScreen: [1, 2, 3, 4].map(sponsor),
      assignSponsors: assign({ grade: [sponsor(10)] }),
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 3, 4, 10]);
  });

  it("falls back to account primaries when primaryForScreen is absent", () => {
    const result = buildSingleItemFooterSponsors({
      assignSponsors: assign({ team: [sponsor(10)] }),
      fallbackPrimary: [1, 2].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 10]);
  });

  it("does not use fallback when primaryForScreen is present but empty", () => {
    // Empty primaryForScreen is intentional (e.g. Creator entity-wins cleared all).
    const result = buildSingleItemFooterSponsors({
      primaryForScreen: [],
      assignSponsors: assign({ grade: [sponsor(10)] }),
      fallbackPrimary: [1, 2, 3].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([10]);
  });

  it("shows fallback primaries only when entity arrays are empty and primaryForScreen is absent", () => {
    const result = buildSingleItemFooterSponsors({
      assignSponsors: assign({}),
      fallbackPrimary: [1, 2, 3].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 3]);
  });
});
