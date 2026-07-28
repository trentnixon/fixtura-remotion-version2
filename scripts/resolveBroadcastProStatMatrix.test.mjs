/**
 * Unit tests for Broadcast Pro stat matrix helpers — run with:
 * node --test scripts/resolveBroadcastProStatMatrix.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const BROADCAST_PRO_BOWLING_STAT_LABELS = {
  full: { figures: "Figures", overs: "Overs", economy: "Economy" },
  short: { figures: "Figs", overs: "Ov", economy: "Econ" },
};

const resolveBroadcastProStatMatrixScoreRole = (tier) => {
  if (tier === "compact") return "compactStat";
  if (tier === "resultRow") return "playerStatPrimary";
  if (tier === "featuredTriple") return "featuredStat";
  return "gridStat";
};

const resolveBroadcastProStatMatrixHighlight = (tier, cellIndex, cell = {}) => {
  if (cell.highlight) return true;
  if (tier === "performancesTriple" && cellIndex === 0) {
    return !!cell.label;
  }
  return false;
};

describe("resolveBroadcastProStatMatrixScoreRole", () => {
  it("maps tiers to score roles", () => {
    assert.equal(
      resolveBroadcastProStatMatrixScoreRole("featuredTriple"),
      "featuredStat",
    );
    assert.equal(
      resolveBroadcastProStatMatrixScoreRole("gridTriple"),
      "gridStat",
    );
    assert.equal(
      resolveBroadcastProStatMatrixScoreRole("compact"),
      "compactStat",
    );
    assert.equal(
      resolveBroadcastProStatMatrixScoreRole("resultRow"),
      "playerStatPrimary",
    );
  });
});

describe("resolveBroadcastProStatMatrixHighlight", () => {
  it("highlights performances col 1 when labelled", () => {
    assert.equal(
      resolveBroadcastProStatMatrixHighlight("performancesTriple", 0, {
        label: "Figs",
      }),
      true,
    );
    assert.equal(
      resolveBroadcastProStatMatrixHighlight("performancesTriple", 1, {
        label: "Ov",
      }),
      false,
    );
  });

  it("respects explicit highlight on result rows", () => {
    assert.equal(
      resolveBroadcastProStatMatrixHighlight("resultRow", 2, {
        highlight: true,
      }),
      true,
    );
  });
});

describe("bowling label vocabulary", () => {
  it("uses short labels for performances tier builders", () => {
    assert.equal(BROADCAST_PRO_BOWLING_STAT_LABELS.short.figures, "Figs");
    assert.equal(BROADCAST_PRO_BOWLING_STAT_LABELS.full.figures, "Figures");
  });
});
