import { describe, expect, it } from "vitest";
import {
  formatTotwStats,
  getTotwRoleLabel,
  resolveTotwDensity,
  resolveTotwTeamName,
} from "./formatTotwStats";
import type { TeamOfTheWeekPlayer } from "../../../TeamOfTheWeek/types";

const batter = (
  overrides: Partial<TeamOfTheWeekPlayer> = {},
): TeamOfTheWeekPlayer =>
  ({
    category: "Batter",
    categoryDetail: { type: "Batter", position: "topscorer" },
    rank: 1,
    player: "greg noon",
    primaryTeam: "Brisbane Silver",
    club: { name: "Brisbane Silver", logo: { url: "", width: 0, height: 0 } },
    rankings: {},
    batting: {
      runs: 44,
      balls: 40,
      fours: 7,
      sixes: 0,
      strikeRate: 110,
      notOut: false,
      team: "Brisbane Silver",
    },
    ...overrides,
  }) as TeamOfTheWeekPlayer;

describe("formatTotwStats", () => {
  it("formats batting runs, balls, and strike rate", () => {
    expect(formatTotwStats(batter())).toEqual({
      main: "44",
      suffix: "(40)",
      subline: "SR 110.0",
    });
  });

  it("formats bowling figures with economy subline", () => {
    expect(
      formatTotwStats(
        batter({
          category: "Bowler",
          categoryDetail: { type: "Bowler", position: "mostwickets" },
          bowling: {
            wickets: 4,
            runs: 22,
            overs: 8,
            maidens: 1,
            economy: 2.75,
            team: "Team",
          },
        }),
      ),
    ).toEqual({
      main: "4/22",
      suffix: "(8)",
      subline: "Econ 2.75",
    });
  });

  it("formats wicket keeper fielding stats", () => {
    expect(
      formatTotwStats(
        batter({
          category: "Wicket-Keeper",
          categoryDetail: {
            type: "Wicket-Keeper",
            position: "wicketKeeper",
          },
          fielding: { catches: 3, stumpings: 1 },
        }),
      ),
    ).toEqual({
      main: "3 ct",
      suffix: "",
      subline: "1 st",
    });
  });
});

describe("getTotwRoleLabel", () => {
  it("combines category and position label", () => {
    expect(getTotwRoleLabel(batter())).toBe("Batter · Top Scorer");
  });
});

describe("resolveTotwTeamName", () => {
  it("prefers primaryTeam then club name", () => {
    expect(resolveTotwTeamName(batter())).toBe("Brisbane Silver");
    expect(
      resolveTotwTeamName(
        batter({
          primaryTeam: "",
          club: {
            name: "Fallback Club",
            logo: { url: "", width: 0, height: 0 },
          },
        }),
      ),
    ).toBe("Fallback Club");
  });
});

describe("resolveTotwDensity", () => {
  it("uses design thresholds at 7 and 10 players", () => {
    expect(resolveTotwDensity(7)).toBe("normal");
    expect(resolveTotwDensity(8)).toBe("compact");
    expect(resolveTotwDensity(10)).toBe("compact");
    expect(resolveTotwDensity(11)).toBe("tight");
  });
});
