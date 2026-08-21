import { describe, expect, it } from "vitest";
import { Sponsor, SponsorsData } from "../../types/data/sponsors";
import {
  OUTRO_SPONSOR_PAGE_SIZE,
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_NO_SPONSORS_DURATION_FRAMES,
  buildOutroSponsorSequence,
  chunkSponsors,
  calculateOutroDurationFromSponsors,
} from "./outroSponsors";

const sponsor = (id: number): Sponsor => ({
  id,
  name: `S${id}`,
  logo: { id: id * 10, url: `https://example.com/${id}.png` },
});

const account = (primary: number, general: number): SponsorsData => ({
  primary: Array.from({ length: primary }, (_, i) => sponsor(i + 1)),
  general: Array.from({ length: general }, (_, i) => sponsor(100 + i)),
  sponsorNum: primary + general,
});

describe("buildOutroSponsorSequence", () => {
  it("concatenates account primaries then generals", () => {
    const result = buildOutroSponsorSequence({
      primary: [1, 2].map(sponsor),
      general: [10, 11, 12].map(sponsor),
    });

    expect(result.map((s) => s.id)).toEqual([1, 2, 10, 11, 12]);
  });

  it("treats non-array buckets as empty", () => {
    const result = buildOutroSponsorSequence({
      primary: { 0: sponsor(1) } as unknown as Sponsor[],
      general: undefined as unknown as Sponsor[],
    });
    expect(result).toEqual([]);
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

describe("calculateOutroDurationFromSponsors", () => {
  it("uses 15+90+15 per page from sponsor count", () => {
    expect(OUTRO_PAGE_DURATION_FRAMES).toBe(120);
    expect(calculateOutroDurationFromSponsors(account(3, 3), true)).toBe(120);
    expect(calculateOutroDurationFromSponsors(account(4, 3), true)).toBe(240);
  });

  it("returns no-sponsor fallback when gated off", () => {
    expect(calculateOutroDurationFromSponsors(account(6, 0), false)).toBe(
      OUTRO_NO_SPONSORS_DURATION_FRAMES,
    );
  });
});
