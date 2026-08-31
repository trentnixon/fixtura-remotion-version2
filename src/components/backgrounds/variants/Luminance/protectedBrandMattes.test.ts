import { describe, expect, it } from "vitest";
import {
  getBlackProtectionAlpha,
  getWhiteProtectionAlpha,
  resolveProtectedBrandBrandLut,
  resolveProtectedBrandMatteRanges,
} from "./protectedBrandMattes";
import { minimalBrandPalette } from "./__fixtures__/palettes/minimal-brand";
import {
  compositeChannel,
  compositeProtectedMattesRgba,
  downsampleFloatAreaAverage,
  renderProtectedBrandMatteSupersample,
} from "./supersample/protectedBrandMattePipeline";

describe("protected brand mattes", () => {
  const ranges = resolveProtectedBrandMatteRanges();

  it("uses default 2% cores and 6% transitions without overlap", () => {
    expect(ranges).toEqual({
      blackCoreEnd: 0.02,
      blackTransitionEnd: 0.08,
      whiteTransitionStart: 0.92,
      whiteCoreStart: 0.98,
    });
  });

  it("ramps black alpha from core through transition", () => {
    expect(getBlackProtectionAlpha(0, ranges)).toBe(1);
    expect(getBlackProtectionAlpha(0.02, ranges)).toBe(1);
    expect(getBlackProtectionAlpha(0.05, ranges)).toBeCloseTo(0.5, 5);
    expect(getBlackProtectionAlpha(0.08, ranges)).toBe(0);
    expect(getBlackProtectionAlpha(0.5, ranges)).toBe(0);
  });

  it("ramps white alpha from transition through core", () => {
    expect(getWhiteProtectionAlpha(0.5, ranges)).toBe(0);
    expect(getWhiteProtectionAlpha(0.92, ranges)).toBe(0);
    expect(getWhiteProtectionAlpha(0.95, ranges)).toBeCloseTo(0.5, 5);
    expect(getWhiteProtectionAlpha(0.98, ranges)).toBe(1);
    expect(getWhiteProtectionAlpha(1, ranges)).toBe(1);
  });
});

describe("downsampleFloatAreaAverage", () => {
  it("averages coverage along a horizontal edge", () => {
    // 4×2 → factor 2 → 2×1: top row [1,1,0,0] averaged with bottom [1,1,0,0]
    const source = new Float32Array([1, 1, 0, 0, 1, 1, 0, 0]);
    const { data, width, height } = downsampleFloatAreaAverage(source, 4, 2, 2);
    expect(width).toBe(2);
    expect(height).toBe(1);
    expect(data[0]).toBe(1);
    expect(data[1]).toBe(0);
  });

  it("averages a straddling edge to partial coverage", () => {
    // 2×2 block average of [1,0 / 1,0] with factor 2 → single 0.5
    const source = new Float32Array([1, 0, 1, 0]);
    const { data, width, height } = downsampleFloatAreaAverage(source, 2, 2, 2);
    expect(width).toBe(1);
    expect(height).toBe(1);
    expect(data[0]).toBe(0.5);
  });
});

describe("compositeProtectedMattesRgba", () => {
  it("full black coverage yields exact black", () => {
    const brandRgb = new Uint8ClampedArray([255, 204, 0, 255]);
    const out = compositeProtectedMattesRgba({
      brandRgb,
      blackAlpha: new Float32Array([1]),
      whiteAlpha: new Float32Array([0]),
      pixelCount: 1,
    });
    expect([...out.slice(0, 3)]).toEqual([0, 0, 0]);
  });

  it("full white coverage yields exact white", () => {
    const brandRgb = new Uint8ClampedArray([34, 68, 102, 255]);
    const out = compositeProtectedMattesRgba({
      brandRgb,
      blackAlpha: new Float32Array([0]),
      whiteAlpha: new Float32Array([1]),
      pixelCount: 1,
    });
    expect([...out.slice(0, 3)]).toEqual([255, 255, 255]);
  });

  it("zero coverage leaves brand colour unchanged", () => {
    const brandRgb = new Uint8ClampedArray([255, 204, 0, 255]);
    const out = compositeProtectedMattesRgba({
      brandRgb,
      blackAlpha: new Float32Array([0]),
      whiteAlpha: new Float32Array([0]),
      pixelCount: 1,
    });
    expect([...out.slice(0, 3)]).toEqual([255, 204, 0]);
  });

  it("partial black coverage blends against brand colour", () => {
    expect(compositeChannel(255, 0, 0.5)).toBe(127.5);
    const brandRgb = new Uint8ClampedArray([255, 204, 0, 255]);
    const out = compositeProtectedMattesRgba({
      brandRgb,
      blackAlpha: new Float32Array([0.5]),
      whiteAlpha: new Float32Array([0]),
      pixelCount: 1,
    });
    expect(out[0]).toBe(128);
    expect(out[1]).toBe(102);
    expect(out[2]).toBe(0);
  });
});

describe("renderProtectedBrandMatteSupersample", () => {
  it("full-black source stays exact #000000 at 2×", () => {
    const source = new Uint8ClampedArray(2 * 2 * 4);
    for (let i = 0; i < source.length; i += 4) {
      source[i + 3] = 255;
    }
    const result = renderProtectedBrandMatteSupersample({
      sourceRgba: source,
      sourceWidth: 2,
      sourceHeight: 2,
      brandLut: resolveProtectedBrandBrandLut(minimalBrandPalette),
      matteRanges: resolveProtectedBrandMatteRanges(),
      scale: 2,
      outputWidth: 2,
      outputHeight: 2,
    });
    for (let i = 0; i < result.data.length; i += 4) {
      expect(result.data[i]).toBe(0);
      expect(result.data[i + 1]).toBe(0);
      expect(result.data[i + 2]).toBe(0);
    }
  });

  it("full-white source stays exact #FFFFFF at 2×", () => {
    const source = new Uint8ClampedArray(2 * 2 * 4);
    for (let i = 0; i < source.length; i += 4) {
      source[i] = 255;
      source[i + 1] = 255;
      source[i + 2] = 255;
      source[i + 3] = 255;
    }
    const result = renderProtectedBrandMatteSupersample({
      sourceRgba: source,
      sourceWidth: 2,
      sourceHeight: 2,
      brandLut: resolveProtectedBrandBrandLut(minimalBrandPalette),
      matteRanges: resolveProtectedBrandMatteRanges(),
      scale: 2,
      outputWidth: 2,
      outputHeight: 2,
    });
    for (let i = 0; i < result.data.length; i += 4) {
      expect(result.data[i]).toBe(255);
      expect(result.data[i + 1]).toBe(255);
      expect(result.data[i + 2]).toBe(255);
    }
  });
});
