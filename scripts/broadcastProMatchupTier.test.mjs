/**
 * Unit tests for BroadcastPro matchup tier maps — run with:
 * node --test scripts/broadcastProMatchupTier.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

/** Mirrors src/templates/types/broadcast-pro/matchup.ts */
const BROADCAST_PRO_MATCHUP_TIER_DIVIDER = {
  fixture: "vs",
  result: "none",
  roster: "versus",
};

const BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY = {
  fixture: "broadcastProMatchupFixture",
  result: "broadcastProMatchupResultStack",
  roster: "broadcastProMatchupRosterSidebar",
};

describe("BroadcastProMatchupTier maps", () => {
  it("maps fixture to vs divider", () => {
    assert.equal(BROADCAST_PRO_MATCHUP_TIER_DIVIDER.fixture, "vs");
  });

  it("maps result to no divider", () => {
    assert.equal(BROADCAST_PRO_MATCHUP_TIER_DIVIDER.result, "none");
  });

  it("maps roster to versus divider", () => {
    assert.equal(BROADCAST_PRO_MATCHUP_TIER_DIVIDER.roster, "versus");
  });

  it("maps tiers to layout theme keys", () => {
    assert.equal(
      BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY.fixture,
      "broadcastProMatchupFixture",
    );
    assert.equal(
      BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY.result,
      "broadcastProMatchupResultStack",
    );
    assert.equal(
      BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY.roster,
      "broadcastProMatchupRosterSidebar",
    );
  });
});
