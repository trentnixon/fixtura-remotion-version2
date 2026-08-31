import { describe, expect, it } from "vitest";
import twoStopFixture from "./__fixtures__/luts/two-stop-linear.checkpoints.json";
import {
  minimalBrandPalette,
  problematicLightPalette,
} from "./__fixtures__/palettes/minimal-brand";
import { applyPreMapTone } from "./applyPreMapTone";
import {
  resolveLuminanceMap,
  resolveMappedChannelsAtTone,
} from "./resolveLuminanceMap";
import { lutIndexForStopPosition } from "./sampleLutFromStops";

describe("resolveLuminanceMap", () => {
  it("samples two-stop linear checkpoints", () => {
    const { lut } = resolveLuminanceMap({
      palette: minimalBrandPalette,
      config: {
        kind: "stops",
        stops: twoStopFixture.stops as [
          { position: number; color: string },
          { position: number; color: string },
        ],
      },
    });

    for (const boundary of twoStopFixture.boundaries) {
      expect(lut.r[boundary.index]).toBe(boundary.r);
      expect(lut.g[boundary.index]).toBe(boundary.g);
      expect(lut.b[boundary.index]).toBe(boundary.b);
    }

    const midpoint = twoStopFixture.midpoints[0];
    expect(lut.r[midpoint.index]).toBe(midpoint.r);
    expect(lut.g[midpoint.index]).toBe(midpoint.g);
    expect(lut.b[midpoint.index]).toBe(midpoint.b);
  });

  it("preserves uneven stop positions", () => {
    const { lut } = resolveLuminanceMap({
      palette: minimalBrandPalette,
      config: {
        kind: "stops",
        stops: [
          { position: 0, color: "#000000" },
          { position: 0.25, color: "#ff0000" },
          { position: 0.7, color: "#0000ff" },
          { position: 1, color: "#ffffff" },
        ],
      },
    });

    const quarterIndex = lutIndexForStopPosition(0.25);
    expect(lut.r[quarterIndex]).toBeGreaterThan(240);
    expect(lut.g[quarterIndex]).toBeLessThan(20);
    expect(lut.b[quarterIndex]).toBeLessThan(20);
  });

  it("uses tonal fallback for problematic palettes", () => {
    const result = resolveLuminanceMap({
      palette: problematicLightPalette,
      config: { kind: "theme", preset: "brand" },
    });

    expect(result.usedTonalFallback).toBe(true);
  });

  it("reverses stop positions when reverse is true", () => {
    const forward = resolveLuminanceMap({
      palette: minimalBrandPalette,
      config: {
        kind: "stops",
        stops: [
          { position: 0, color: "#000000" },
          { position: 1, color: "#ffffff" },
        ],
      },
    });

    const reversed = resolveLuminanceMap({
      palette: minimalBrandPalette,
      config: {
        kind: "stops",
        stops: [
          { position: 0, color: "#000000" },
          { position: 1, color: "#ffffff" },
        ],
        reverse: true,
      },
    });

    expect(reversed.lut.r[0]).toBe(forward.lut.r[255]);
    expect(reversed.lut.r[255]).toBe(forward.lut.r[0]);
  });

  it("applies pre-map contrast before lookup", () => {
    const lowContrast = resolveMappedChannelsAtTone(
      {
        palette: minimalBrandPalette,
        config: {
          kind: "stops",
          stops: [
            { position: 0, color: "#000000" },
            { position: 1, color: "#ffffff" },
          ],
        },
        contrast: 1,
      },
      128,
    );

    const highContrast = resolveMappedChannelsAtTone(
      {
        palette: minimalBrandPalette,
        config: {
          kind: "stops",
          stops: [
            { position: 0, color: "#000000" },
            { position: 1, color: "#ffffff" },
          ],
        },
        contrast: 2,
      },
      128,
    );

    expect(highContrast.r).not.toBe(lowContrast.r);
  });
});

describe("applyPreMapTone", () => {
  it("clamps mapped tone to byte range", () => {
    expect(
      applyPreMapTone(128, { contrast: 4, brightness: 0.5 }),
    ).toBeLessThanOrEqual(255);
    expect(
      applyPreMapTone(128, { contrast: 4, brightness: -0.5 }),
    ).toBeGreaterThanOrEqual(0);
  });
});
