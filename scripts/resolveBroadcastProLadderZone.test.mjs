/**
 * Unit tests for resolveBroadcastProLadderZone — run with:
 * node --test scripts/resolveBroadcastProLadderZone.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const DEFAULT_SIZING = {
  finalsCount: 4,
  lowerTailRows: 2,
  lowerOpacity: 0.8,
  relegationOpacity: 0.6,
};

/** Mirrors src/compositions/cricket/utils/broadcastPro/ladder/resolveBroadcastProLadderZone.ts */
const effectiveFinalsCount = (totalTeams, finalsCount) =>
  Math.max(1, Math.min(finalsCount, totalTeams));

const resolveBroadcastProLadderZone = ({
  position,
  index,
  totalTeams,
  sizing = DEFAULT_SIZING,
}) => {
  const finalsCutoff = effectiveFinalsCount(totalTeams, sizing.finalsCount);

  if (position === 1) {
    return {
      zone: "leader",
      rowOpacity: 1,
      rankAccent: true,
      pointsAccent: true,
    };
  }

  if (position <= finalsCutoff) {
    return {
      zone: "finals",
      rowOpacity: 1,
      rankAccent: false,
      pointsAccent: false,
    };
  }

  if (totalTeams >= 3 && index === totalTeams - 2) {
    return {
      zone: "lower",
      rowOpacity: sizing.lowerOpacity,
      rankAccent: false,
      pointsAccent: false,
    };
  }

  if (totalTeams >= 2 && index === totalTeams - 1) {
    return {
      zone: "relegation",
      rowOpacity: sizing.relegationOpacity,
      rankAccent: false,
      pointsAccent: false,
    };
  }

  return {
    zone: "mid",
    rowOpacity: 1,
    rankAccent: false,
    pointsAccent: false,
  };
};

describe("resolveBroadcastProLadderZone", () => {
  it("returns leader for rank 1 in 6-team stitch table", () => {
    const r = resolveBroadcastProLadderZone({
      position: 1,
      index: 0,
      totalTeams: 6,
    });
    assert.equal(r.zone, "leader");
    assert.equal(r.rowOpacity, 1);
    assert.equal(r.rankAccent, true);
    assert.equal(r.pointsAccent, true);
  });

  it("returns finals for rank 4", () => {
    const r = resolveBroadcastProLadderZone({
      position: 4,
      index: 3,
      totalTeams: 6,
    });
    assert.equal(r.zone, "finals");
    assert.equal(r.rowOpacity, 1);
  });

  it("returns lower and relegation for stitch tail rows", () => {
    const lower = resolveBroadcastProLadderZone({
      position: 5,
      index: 4,
      totalTeams: 6,
    });
    assert.equal(lower.zone, "lower");
    assert.equal(lower.rowOpacity, 0.8);

    const relegation = resolveBroadcastProLadderZone({
      position: 6,
      index: 5,
      totalTeams: 6,
    });
    assert.equal(relegation.zone, "relegation");
    assert.equal(relegation.rowOpacity, 0.6);
  });

  it("clamps finals count for small tables", () => {
    const r = resolveBroadcastProLadderZone({
      position: 3,
      index: 2,
      totalTeams: 3,
    });
    assert.equal(r.zone, "finals");
  });

  it("returns leader for single-team ladder", () => {
    const r = resolveBroadcastProLadderZone({
      position: 1,
      index: 0,
      totalTeams: 1,
    });
    assert.equal(r.zone, "leader");
    assert.equal(r.rowOpacity, 1);
  });
});
