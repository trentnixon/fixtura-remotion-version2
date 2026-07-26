/**
 * Unit tests for computeBroadcastProRosterPlayerListMetrics — run with:
 * node --test scripts/computeBroadcastProRosterPlayerListMetrics.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const DEFAULT = {
  leftColumnHeaderReservePx: 0,
  minRowPx: 26,
  minNameFontPx: 15,
  maxNameFontPx: 48,
  minNumberFontPx: 14,
  maxNumberFontPx: 44,
  nameRowHeightMultiplier: 0.52,
  numberRowHeightMultiplier: 0.48,
  nameFontBonusPx: 4,
  nameInnerClampMaxOffsetPx: 2,
};

const computeMetrics = (availableHeightPx, playerCount, sizing = {}) => {
  const s = { ...DEFAULT, ...sizing };
  const n = Math.max(1, playerCount);
  const listHeightPx = Math.max(
    s.minRowPx * n,
    availableHeightPx - s.leftColumnHeaderReservePx,
  );
  const gapPx = n <= 15 ? 8 : n <= 22 ? 6 : n <= 28 ? 4 : 2;
  const totalGaps = (n - 1) * gapPx;
  const rowPx = Math.max(
    s.minRowPx,
    Math.floor((listHeightPx - totalGaps) / n),
  );
  const nameInnerMax = Math.min(
    s.maxNameFontPx - s.nameInnerClampMaxOffsetPx,
    rowPx * s.nameRowHeightMultiplier,
  );
  const nameFontPx = Math.min(
    s.maxNameFontPx,
    Math.max(
      s.minNameFontPx,
      Math.round(Math.max(s.minNameFontPx, nameInnerMax)) + s.nameFontBonusPx,
    ),
  );
  const numFontPx = Math.round(
    Math.max(
      s.minNumberFontPx,
      Math.min(s.maxNumberFontPx, rowPx * s.numberRowHeightMultiplier),
    ),
  );
  return { rowPx, gapPx, nameFontPx, numFontPx, numColWidthPx: 64 };
};

const sumRows = (m, n) => n * m.rowPx + (n - 1) * m.gapPx;

describe("computeBroadcastProRosterPlayerListMetrics", () => {
  it("fits 11 players in asset minus footer (~810px)", () => {
    const m = computeMetrics(810, 11);
    assert.ok(m.nameFontPx >= 28, `name font too small (${m.nameFontPx}px)`);
    assert.ok(m.numFontPx >= 24, `index font too small (${m.numFontPx}px)`);
    assert.equal(m.numColWidthPx, 64);
    assert.ok(sumRows(m, 11) <= 810);
  });

  it("uses 8px gap for up to 15 players", () => {
    assert.equal(computeMetrics(810, 15).gapPx, 8);
    assert.equal(computeMetrics(810, 16).gapPx, 6);
  });
});
