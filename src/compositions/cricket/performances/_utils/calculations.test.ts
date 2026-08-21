import { describe, expect, it } from "vitest";
import { Sponsor } from "../../../../core/types/data/sponsors";
import { PerformanceData } from "../_types/types";
import { buildPerformancesFooterSponsors } from "./calculations";

const sponsor = (id: number): Sponsor => ({
  id,
  name: `S${id}`,
  logo: { id: id * 10, url: `https://example.com/${id}.png` },
});

const performance = (
  partial: Partial<PerformanceData> & { name: string },
): PerformanceData =>
  ({
    type: "batting",
    runs: 10,
    balls: 5,
    SR: 200,
    notOut: true,
    teamLogo: { url: "https://example.com/team.png", width: 1, height: 1 },
    playedFor: "Team",
    prompt: "",
    assignSponsors: { competition: [], grade: [], team: [] },
    ...partial,
  }) as PerformanceData;

describe("buildPerformancesFooterSponsors", () => {
  it("uses first item primaryForScreen and entity", () => {
    const result = buildPerformancesFooterSponsors(
      [
        performance({
          name: "A",
          primaryForScreen: [1, 2].map(sponsor),
          assignSponsors: {
            competition: [],
            grade: [sponsor(10)],
            team: [],
          },
        }),
        performance({
          name: "B",
          primaryForScreen: [9].map(sponsor),
          assignSponsors: {
            competition: [],
            grade: [sponsor(99)],
            team: [],
          },
        }),
      ],
      [7, 8].map(sponsor),
    );

    expect(result.map((s) => s.id)).toEqual([1, 2, 10]);
  });

  it("falls back to account primary only when first item has no primaryForScreen", () => {
    const result = buildPerformancesFooterSponsors(
      [
        performance({
          name: "A",
          assignSponsors: {
            competition: [],
            grade: [],
            team: [sponsor(10)],
          },
        }),
      ],
      [1, 2].map(sponsor),
    );

    expect(result.map((s) => s.id)).toEqual([1, 2, 10]);
  });

  it("tolerates legacy assignSponsors entity metadata objects (non-arrays)", () => {
    const result = buildPerformancesFooterSponsors(
      [
        performance({
          name: "A",
          // Pre-v2 fixtures ship grade/team/competition as metadata objects, not Sponsor[].
          assignSponsors: {
            Team: { name: "Redlands Logan" },
            grade: { id: 85929, name: "O60 Div 2" },
            competition: { id: 20200, name: "QVC Competitions" },
          } as unknown as PerformanceData["assignSponsors"],
        }),
      ],
      [1, 2].map(sponsor),
    );

    expect(result.map((s) => s.id)).toEqual([1, 2]);
  });
});
