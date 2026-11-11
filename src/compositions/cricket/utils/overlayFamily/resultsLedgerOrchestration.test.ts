import { describe, expect, it } from "vitest";
import {
  planResultsLedgerLayout,
  planResultsLedgerScreen,
} from "./resultsLedgerOrchestration";
import { resolveResultsLedgerThemeKeys } from "./resultsLedgerThemeKeys";

describe("planResultsLedgerLayout", () => {
  it("reserves theme footer below the drawable asset height", () => {
    expect(planResultsLedgerLayout({ asset: 910, footer: 130 })).toEqual({
      mainContentHeight: 910,
      columnHeight: 1040,
    });
  });
});

describe("resolveResultsLedgerThemeKeys", () => {
  it("maps each overlay family to registered theme class keys", () => {
    expect(resolveResultsLedgerThemeKeys("scoreline").sponsorStrip).toBe(
      "scorelineResultsSponsorStrip",
    );
    expect(resolveResultsLedgerThemeKeys("nightSession").sponsorStrip).toBe(
      "nightSessionResultsSponsorStrip",
    );
  });
});

describe("planResultsLedgerScreen", () => {
  const heights = { asset: 900, footer: 120 };

  it("pages results and builds footer sponsors", () => {
    const results = [
      { gameID: "a" },
      { gameID: "b" },
      { gameID: "c" },
    ] satisfies Pick<import("../../results/_types/types").MatchResult, "gameID">[];

    const plan = planResultsLedgerScreen({
      family: "scoreline",
      results,
      resultsPerScreen: 2,
      screenIndex: 1,
      heights,
    });

    expect(plan.startIndex).toBe(2);
    expect(plan.endIndex).toBe(3);
    expect(plan.displayedResults).toHaveLength(1);
    expect(plan.layout.mainContentHeight).toBe(900);
    expect(plan.themeKeys.displayColumn).toBe("scorelineDisplayColumn");
  });
});
