/**
 * Unit tests for resolveBroadcastProCrestWellSize — run with:
 * node --test scripts/resolveBroadcastProCrestWellSize.test.mjs
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const DEFAULT_SIZING = {
  contentInsetRatio: 0.85,
  fullBleedInsetRatio: 1,
  compactPx: 48,
  fixtureDefaultPx: 80,
  rowDefaultPx: 48,
  gridPx: 80,
  featuredPx: 176,
  rosterHomePx: 128,
  rosterAwayPx: 96,
};

const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

const resolveBroadcastProRowCrestSize = (containerHeight) => {
  const minPx = containerHeight < 40 ? 24 : containerHeight < 52 ? 28 : 36;
  return clamp(minPx, containerHeight, containerHeight);
};

const resolveBroadcastProFixtureCrestSize = (containerHeight) =>
  Math.min(
    Math.max(containerHeight - 32, 48),
    Math.max(72, Math.floor(containerHeight * 0.42)),
  );

const insetForTier = (tier, sizing) =>
  tier === "grid" || tier === "featured"
    ? sizing.fullBleedInsetRatio
    : sizing.contentInsetRatio;

const resolveBroadcastProCrestWellSize = (
  tier,
  containerHeight,
  sizing = DEFAULT_SIZING,
) => {
  const contentInsetRatio = insetForTier(tier, sizing);
  switch (tier) {
    case "compact":
      return { sizePx: sizing.compactPx, contentInsetRatio };
    case "row":
      return {
        sizePx:
          containerHeight != null
            ? resolveBroadcastProRowCrestSize(containerHeight)
            : sizing.rowDefaultPx,
        contentInsetRatio,
      };
    case "fixture":
      return {
        sizePx:
          containerHeight != null
            ? resolveBroadcastProFixtureCrestSize(containerHeight)
            : sizing.fixtureDefaultPx,
        contentInsetRatio,
      };
    case "grid":
      return { sizePx: null, contentInsetRatio };
    case "featured":
      return { sizePx: null, contentInsetRatio };
    case "rosterHome":
      return { sizePx: sizing.rosterHomePx, contentInsetRatio };
    case "rosterAway":
      return { sizePx: sizing.rosterAwayPx, contentInsetRatio };
    default:
      throw new Error(`unknown tier ${tier}`);
  }
};

describe("resolveBroadcastProCrestWellSize", () => {
  it("returns compact 48px with 85% inset", () => {
    const result = resolveBroadcastProCrestWellSize("compact");
    assert.equal(result.sizePx, 48);
    assert.equal(result.contentInsetRatio, 0.85);
  });

  it("clamps ladder row size", () => {
    assert.equal(resolveBroadcastProCrestWellSize("row", 32).sizePx, 32);
    assert.equal(resolveBroadcastProCrestWellSize("row", 40).sizePx, 40);
    assert.equal(resolveBroadcastProCrestWellSize("row", 52).sizePx, 52);
    assert.equal(resolveBroadcastProCrestWellSize("row", 72).sizePx, 72);
    assert.equal(resolveBroadcastProCrestWellSize("row", 100).sizePx, 100);
  });

  it("clamps upcoming fixture size", () => {
    assert.equal(resolveBroadcastProCrestWellSize("fixture", 60).sizePx, 48);
    assert.equal(resolveBroadcastProCrestWellSize("fixture", 200).sizePx, 84);
    assert.equal(resolveBroadcastProCrestWellSize("fixture", 400).sizePx, 168);
  });

  it("returns null sizePx for grid and featured with full bleed inset", () => {
    assert.deepEqual(resolveBroadcastProCrestWellSize("grid"), {
      sizePx: null,
      contentInsetRatio: 1,
    });
    assert.deepEqual(resolveBroadcastProCrestWellSize("featured"), {
      sizePx: null,
      contentInsetRatio: 1,
    });
  });

  it("returns roster home and away sizes", () => {
    assert.equal(resolveBroadcastProCrestWellSize("rosterHome").sizePx, 128);
    assert.equal(resolveBroadcastProCrestWellSize("rosterAway").sizePx, 96);
  });
});
