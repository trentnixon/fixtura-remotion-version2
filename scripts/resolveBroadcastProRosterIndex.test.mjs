/**
 * Unit tests for Broadcast Pro roster index helpers — run with:
 * node --test scripts/resolveBroadcastProRosterIndex.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const BROADCAST_PRO_ROSTER_INDEX_PAD_WIDTH = 2;

const formatBroadcastProRosterIndex = (
  index,
  padWidth = BROADCAST_PRO_ROSTER_INDEX_PAD_WIDTH,
) => String(index + 1).padStart(padWidth, "0");

const resolveBroadcastProRosterIndex = (index) => {
  if (index === 0) {
    return { variant: "leader", colorVariant: "onContainerAccent" };
  }
  return { variant: "default", colorVariant: "onContainerMuted" };
};

describe("formatBroadcastProRosterIndex", () => {
  it("pads lineup order from 01", () => {
    assert.equal(formatBroadcastProRosterIndex(0), "01");
    assert.equal(formatBroadcastProRosterIndex(10), "11");
  });
});

describe("resolveBroadcastProRosterIndex", () => {
  it("returns leader accent for first row", () => {
    const r = resolveBroadcastProRosterIndex(0);
    assert.equal(r.variant, "leader");
    assert.equal(r.colorVariant, "onContainerAccent");
  });

  it("returns muted default for remaining rows", () => {
    const r = resolveBroadcastProRosterIndex(3);
    assert.equal(r.variant, "default");
    assert.equal(r.colorVariant, "onContainerMuted");
  });
});
