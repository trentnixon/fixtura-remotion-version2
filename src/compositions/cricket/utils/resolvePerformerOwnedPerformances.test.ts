import { describe, expect, it } from "vitest";
import { resolvePerformerOwnedPerformances } from "./resolvePerformerOwnedPerformances";

type TestPerformance = {
  id: string;
  team: string;
};

type TestTeam = {
  name: string;
  isClubTeam: boolean;
  battingPerformances?: TestPerformance[];
  bowlingPerformances?: TestPerformance[];
};

describe("resolvePerformerOwnedPerformances", () => {
  it("projects both disciplines onto their actual fixture teams", () => {
    const homeTeam: TestTeam = {
      name: "Mudgeeraba Blue",
      isClubTeam: true,
      battingPerformances: [{ id: "home-batter", team: "Mudgeeraba Blue" }],
      bowlingPerformances: [{ id: "away-bowler", team: "Coomera" }],
    };
    const awayTeam: TestTeam = {
      name: "Coomera",
      isClubTeam: false,
      battingPerformances: [{ id: "away-batter", team: "Coomera" }],
      bowlingPerformances: [{ id: "home-bowler", team: "Mudgeeraba Blue" }],
    };

    const result = resolvePerformerOwnedPerformances({ homeTeam, awayTeam });

    expect(result.home.battingPerformances.map((item) => item.id)).toEqual([
      "home-batter",
    ]);
    expect(result.home.bowlingPerformances.map((item) => item.id)).toEqual([
      "home-bowler",
    ]);
    expect(result.away.battingPerformances.map((item) => item.id)).toEqual([
      "away-batter",
    ]);
    expect(result.away.bowlingPerformances.map((item) => item.id)).toEqual([
      "away-bowler",
    ]);
  });

  it("omits rows that do not identify either fixture team", () => {
    const homeTeam: TestTeam = {
      name: "Home",
      isClubTeam: true,
      battingPerformances: [
        { id: "valid-home", team: "Home" },
        { id: "unknown", team: "Unknown" },
      ],
    };
    const awayTeam: TestTeam = {
      name: "Away",
      isClubTeam: false,
      bowlingPerformances: [
        { id: "valid-away", team: "Away" },
        { id: "unknown-bowler", team: "" },
      ],
    };

    const result = resolvePerformerOwnedPerformances({ homeTeam, awayTeam });

    expect(result.home.battingPerformances.map((item) => item.id)).toEqual([
      "valid-home",
    ]);
    expect(result.away.bowlingPerformances.map((item) => item.id)).toEqual([
      "valid-away",
    ]);
  });
});
