import { describe, expect, it } from "vitest";
import { planSponsorFooterChrome } from "./planSponsorFooterChrome";

describe("planSponsorFooterChrome", () => {
  it("hides when theme chrome is unset", () => {
    expect(
      planSponsorFooterChrome({ layoutFooterHeight: 120 }),
    ).toEqual({ kind: "hidden" });
  });

  it("plans scoreline chrome with default strip key", () => {
    const plan = planSponsorFooterChrome({
      themeChromeKind: "scoreline",
      layoutFooterHeight: 140,
    });

    expect(plan).toEqual({
      kind: "visible",
      chromeKind: "scoreline",
      sponsorStripKey: "scorelineSponsorStrip",
      footerHeight: 140,
    });
  });

  it("prefers height override and custom strip key", () => {
    const plan = planSponsorFooterChrome({
      themeChromeKind: "nightSession",
      chromeKindOverride: "scoreline",
      sponsorStripKey: "customStrip",
      layoutFooterHeight: 100,
      heightOverride: 88,
    });

    expect(plan).toEqual({
      kind: "visible",
      chromeKind: "scoreline",
      sponsorStripKey: "customStrip",
      footerHeight: 88,
    });
  });
});
