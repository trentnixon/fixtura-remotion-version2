/**
 * Unit tests for resolveBroadcastProLadderRowTypography — run with:
 * node --test scripts/resolveBroadcastProLadderRowTypography.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

const resolveBroadcastProLadderRowTypography = (rowHeightPx) => {
  const h = Math.max(1, rowHeightPx);
  return {
    rankFontPx: clamp(24, Math.round(h * 0.7), 48),
    statFontPx: clamp(20, Math.round(h * 0.58), 36),
    pointsFontPx: clamp(22, Math.round(h * 0.65), 48),
    nameFontPx: clamp(22, Math.round(h * 0.55), 38),
    scoreCompact: h < 64,
  };
};

describe("resolveBroadcastProLadderRowTypography", () => {
  it("scales 15-club row (~59px) to readable sizes", () => {
    const t = resolveBroadcastProLadderRowTypography(59);
    assert.ok(t.nameFontPx >= 30, `name too small (${t.nameFontPx}px)`);
    assert.ok(t.statFontPx >= 30, `stat too small (${t.statFontPx}px)`);
    assert.equal(t.scoreCompact, true);
  });

  it("caps tall rows at max sizes", () => {
    const t = resolveBroadcastProLadderRowTypography(96);
    assert.equal(t.rankFontPx, 48);
    assert.equal(t.nameFontPx, 38);
    assert.equal(t.scoreCompact, false);
  });
});
