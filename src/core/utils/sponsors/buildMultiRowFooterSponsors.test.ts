import { describe, expect, it } from "vitest";
import { AssignSponsors, Sponsor } from "../../types/data/sponsors";
import { buildMultiRowFooterSponsors } from "./buildMultiRowFooterSponsors";

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

describe("buildMultiRowFooterSponsors", () => {
  it("ignores legacy assignSponsors entity metadata objects (non-arrays)", () => {
    const result = buildMultiRowFooterSponsors([
      {
        primaryForScreen: [1, 2].map(sponsor),
        assignSponsors: {
          Team: { name: "Redlands Logan" },
          grade: { id: 85929, name: "O60 Div 2" },
          competition: { id: 20200, name: "QVC" },
        } as unknown as AssignSponsors,
      },
    ]);

    expect(result.map((s) => s.id)).toEqual([1, 2]);
  });

  it("collects entities from every row grade and team arrays", () => {
    const result = buildMultiRowFooterSponsors([
      {
        primaryForScreen: [1, 2, 3, 4].map(sponsor),
        assignSponsors: assign({ grade: [sponsor(10)] }),
      },
      {
        primaryForScreen: [1, 2, 3, 4].map(sponsor),
        assignSponsors: assign({ team: [sponsor(11)] }),
      },
    ]);

    expect(result.map((s) => s.id)).toEqual([1, 2, 3, 10, 11]);
  });

  it("fills primaries from the first row primaryForScreen only", () => {
    const result = buildMultiRowFooterSponsors([
      {
        primaryForScreen: [1, 2].map(sponsor),
        assignSponsors: assign({}),
      },
      {
        primaryForScreen: [9, 8, 7].map(sponsor),
        assignSponsors: assign({ grade: [sponsor(10)] }),
      },
    ]);

    // first row primaries + entity from second row; second row primaries ignored for fill
    expect(result.map((s) => s.id)).toEqual([1, 2, 10]);
  });

  it("shows first-row primaries only when all entities are empty", () => {
    const result = buildMultiRowFooterSponsors([
      {
        primaryForScreen: [1, 2, 3].map(sponsor),
        assignSponsors: assign({}),
      },
      {
        primaryForScreen: [1, 2, 3].map(sponsor),
        assignSponsors: assign({}),
      },
    ]);

    expect(result.map((s) => s.id)).toEqual([1, 2, 3]);
  });

  it("caps at five with entities claiming slots first", () => {
    const result = buildMultiRowFooterSponsors([
      {
        primaryForScreen: [1, 2, 3, 4].map(sponsor),
        assignSponsors: assign({
          grade: [sponsor(10), sponsor(11)],
          team: [sponsor(12)],
        }),
      },
      {
        primaryForScreen: [1, 2, 3, 4].map(sponsor),
        assignSponsors: assign({ team: [sponsor(13), sponsor(14)] }),
      },
    ]);

    expect(result).toHaveLength(5);
    expect(result.map((s) => s.id)).toEqual([10, 11, 12, 13, 14]);
  });

  it("returns an empty list when there are no rows", () => {
    expect(buildMultiRowFooterSponsors([])).toEqual([]);
  });
});
