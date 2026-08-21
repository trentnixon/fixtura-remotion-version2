import { describe, expect, it } from "vitest";
import { Sponsor, SponsorsData } from "../../types/data/sponsors";
import {
  INTRO_PRIMARY_SPONSOR_MAX,
  getIntroPrimarySponsors,
} from "./getIntroPrimarySponsors";

const sponsor = (id: number, withUrl = true): Sponsor => ({
  id,
  name: `S${id}`,
  logo: {
    id: id * 10,
    url: withUrl ? `https://example.com/${id}.png` : "",
  },
});

const account = (primary: Sponsor[]): SponsorsData => ({
  primary,
  general: [sponsor(99)],
  sponsorNum: primary.length + 1,
});

describe("getIntroPrimarySponsors", () => {
  it("returns only account primaries, never general", () => {
    const result = getIntroPrimarySponsors(
      account([sponsor(1), sponsor(2), sponsor(3)]),
    );

    expect(result.map((s) => s.id)).toEqual([1, 2, 3]);
    expect(result.every((s) => s.id !== 99)).toBe(true);
  });

  it("caps at four primaries", () => {
    const result = getIntroPrimarySponsors(
      account([1, 2, 3, 4, 5].map((id) => sponsor(id))),
    );

    expect(result).toHaveLength(INTRO_PRIMARY_SPONSOR_MAX);
    expect(result.map((s) => s.id)).toEqual([1, 2, 3, 4]);
  });

  it("skips primaries without a logo url", () => {
    const result = getIntroPrimarySponsors(
      account([sponsor(1), sponsor(2, false), sponsor(3)]),
    );

    expect(result.map((s) => s.id)).toEqual([1, 3]);
  });

  it("returns empty when there are no primaries", () => {
    expect(getIntroPrimarySponsors(account([]))).toEqual([]);
    expect(getIntroPrimarySponsors(undefined)).toEqual([]);
  });
});
