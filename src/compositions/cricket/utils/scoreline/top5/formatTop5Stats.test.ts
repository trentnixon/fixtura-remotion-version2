import { describe, expect, it } from "vitest";
import { formatTop5Stats } from "./formatTop5Stats";
import type { BatterData, BowlerData } from "../../../top5/_types/types";

const batter = (overrides: Partial<BatterData> = {}): BatterData => ({
  type: "batting",
  name: "Player",
  playedFor: "Team",
  runs: 44,
  balls: 40,
  SR: 110,
  notOut: false,
  prompt: "",
  teamLogo: { url: "", width: 0, height: 0 },
  assignSponsors: { Team: { name: "Team" } },
  ...overrides,
});

const bowler = (overrides: Partial<BowlerData> = {}): BowlerData => ({
  type: "bowling",
  name: "Player",
  playedFor: "Team",
  wickets: 4,
  runs: 22,
  overs: "8",
  prompt: "",
  teamLogo: { url: "", width: 0, height: 0 },
  assignSponsors: { Team: { name: "Team" } },
  ...overrides,
});

describe("formatTop5Stats", () => {
  it("formats batting runs, balls, and strike rate", () => {
    expect(formatTop5Stats(batter())).toEqual({
      main: "44",
      suffix: "(40)",
      suffixClassName: "leader-balls",
      subline: "SR 110",
    });
  });

  it("appends not-out marker to batting main figure", () => {
    expect(formatTop5Stats(batter({ notOut: true })).main).toBe("44*");
  });

  it("hides strike rate subline when SR is zero", () => {
    expect(formatTop5Stats(batter({ SR: 0 })).subline).toBe("");
  });

  it("formats bowling figures with overs suffix class", () => {
    expect(formatTop5Stats(bowler())).toEqual({
      figureLabel: "Figures",
      main: "4/22",
      suffix: "(8)",
      suffixClassName: "leader-overs",
      subline: "",
    });
  });
});
