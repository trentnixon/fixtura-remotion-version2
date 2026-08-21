import { describe, expect, it } from "vitest";
import { Sponsor } from "../../types/data/sponsors";
import {
  FOOTER_SPONSOR_MAX,
  selectFooterSponsors,
} from "./selectFooterSponsors";

const sponsor = (id: number): Sponsor => ({
  id,
  name: `S${id}`,
  logo: { id: id * 10, url: `https://example.com/${id}.png` },
});

describe("selectFooterSponsors", () => {
  it("returns at most five logos", () => {
    const result = selectFooterSponsors({
      primaryForScreen: [1, 2, 3, 4].map(sponsor),
      entities: [5, 6, 7].map(sponsor),
    });

    expect(result).toHaveLength(FOOTER_SPONSOR_MAX);
  });

  it("lets entities claim slots before primaries and fills the rest from primaries", () => {
    const result = selectFooterSponsors({
      primaryForScreen: [1, 2, 3, 4].map(sponsor),
      entities: [10, 11].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 3, 10, 11]);
  });

  it("returns only the first five entities when entities alone fill the cap", () => {
    const result = selectFooterSponsors({
      primaryForScreen: [1, 2, 3, 4].map(sponsor),
      entities: [10, 11, 12, 13, 14, 15].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([10, 11, 12, 13, 14]);
  });

  it("returns primaries only when entities are empty", () => {
    const result = selectFooterSponsors({
      primaryForScreen: [1, 2, 3].map(sponsor),
      entities: [],
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 3]);
  });

  it("paints primaries before entities", () => {
    const result = selectFooterSponsors({
      primaryForScreen: [1, 2].map(sponsor),
      entities: [10].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 10]);
  });
});
