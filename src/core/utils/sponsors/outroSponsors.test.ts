import { describe, expect, it } from "vitest";
import { Sponsor } from "../../types/data/sponsors";
import {
  OUTRO_SPONSOR_PAGE_SIZE,
  buildOutroSponsorSequence,
  chunkSponsors,
} from "./outroSponsors";

const sponsor = (id: number): Sponsor => ({
  id,
  name: `S${id}`,
  logo: { id: id * 10, url: `https://example.com/${id}.png` },
});

describe("buildOutroSponsorSequence", () => {
  it("concatenates account primaries then generals", () => {
    const result = buildOutroSponsorSequence({
      primary: [1, 2].map(sponsor),
      general: [10, 11, 12].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 10, 11, 12]);
  });
});

describe("chunkSponsors", () => {
  it("groups sponsors into pages of six", () => {
    const sponsors = [1, 2, 3, 4, 5, 6, 7, 8].map(sponsor);
    const pages = chunkSponsors(sponsors, OUTRO_SPONSOR_PAGE_SIZE);

    expect(pages).toHaveLength(2);
    expect(pages[0].map((s) => s.id)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(pages[1].map((s) => s.id)).toEqual([7, 8]);
  });
});
