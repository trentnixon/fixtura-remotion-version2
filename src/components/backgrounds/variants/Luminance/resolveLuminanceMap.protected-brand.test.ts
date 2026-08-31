import { describe, expect, it } from "vitest";
import { minimalBrandPalette } from "./__fixtures__/palettes/minimal-brand";
import { resolveLuminanceMap } from "./resolveLuminanceMap";
import { toneToHex } from "./applyPreMapTone";
import type { LuminanceSegment } from "./types";

const primary = "#224466";
const secondary = "#8899aa";

const hexAt = (
  lut: { r: readonly number[]; g: readonly number[]; b: readonly number[] },
  index: number,
) => toneToHex(lut, index);

const rgbAt = (
  lut: { r: readonly number[]; g: readonly number[]; b: readonly number[] },
  index: number,
) => ({ r: lut.r[index]!, g: lut.g[index]!, b: lut.b[index]! });

const segmentLabelAt = (
  segments: readonly LuminanceSegment[],
  index: number,
): string => {
  const position = index / 255;
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i]!;
    const isLast = i === segments.length - 1;
    const inSegment = isLast
      ? position >= segment.from && position <= segment.to
      : position >= segment.from && position < segment.to;
    if (!inSegment) continue;

    if (segment.kind === "gradient") {
      if (segment.fromColor.toLowerCase() === "#000000") {
        return "black-to-primary";
      }
      if (segment.toColor.toLowerCase() === "#ffffff") {
        return "secondary-to-white";
      }
      return "primary-to-secondary";
    }

    if (segment.color.toLowerCase() === "#000000") return "solid-black";
    if (segment.color.toLowerCase() === "#ffffff") return "solid-white";
    if (segment.color.toLowerCase() === primary.toLowerCase()) {
      return "solid-primary";
    }
    if (segment.color.toLowerCase() === secondary.toLowerCase()) {
      return "solid-secondary";
    }
    return "solid";
  }
  return "none";
};

const maxChannelStep = (
  lut: { r: readonly number[]; g: readonly number[]; b: readonly number[] },
  fromIndex: number,
  toIndex: number,
) => {
  let max = 0;
  for (let index = fromIndex; index < toIndex; index += 1) {
    max = Math.max(
      max,
      Math.abs(lut.r[index + 1]! - lut.r[index]!),
      Math.abs(lut.g[index + 1]! - lut.g[index]!),
      Math.abs(lut.b[index + 1]! - lut.b[index]!),
    );
  }
  return max;
};

describe("protected-brand luminance map", () => {
  const result = resolveLuminanceMap({
    palette: minimalBrandPalette,
    config: { kind: "theme", preset: "protected-brand" },
  });

  it("keeps index 0 exact black and index 255 exact white", () => {
    expect(hexAt(result.lut, 0)).toBe("#000000");
    expect(hexAt(result.lut, 255)).toBe("#ffffff");
  });

  it("keeps protected endpoint cores constant", () => {
    const segments = result.segments!;

    // 0–2% black core: index 5 ≈ 0.0196
    expect(segmentLabelAt(segments, 5)).toBe("solid-black");
    expect(hexAt(result.lut, 0)).toBe("#000000");
    expect(hexAt(result.lut, 5)).toBe("#000000");

    // 98–100% white core: index 250 ≈ 0.9804
    expect(segmentLabelAt(segments, 250)).toBe("solid-white");
    expect(hexAt(result.lut, 250)).toBe("#ffffff");
    expect(hexAt(result.lut, 255)).toBe("#ffffff");
  });

  it("uses endpoint transition bands instead of hard black→primary jumps", () => {
    const segments = result.segments!;

    // 2% boundary: index 5 core, index 6 enters black→primary transition
    expect(segmentLabelAt(segments, 5)).toBe("solid-black");
    expect(segmentLabelAt(segments, 6)).toBe("black-to-primary");
    expect(hexAt(result.lut, 6)).not.toBe(primary);

    // 8% boundary: index 20 still transitioning; index 21 solid primary
    expect(segmentLabelAt(segments, 20)).toBe("black-to-primary");
    expect(segmentLabelAt(segments, 21)).toBe("solid-primary");
    expect(hexAt(result.lut, 21)).toBe(primary);

    // Transition steps stay small (no single-step leap into primary)
    expect(maxChannelStep(result.lut, 5, 21)).toBeLessThan(40);
  });

  it("uses secondary→white transition instead of hard white jumps", () => {
    const segments = result.segments!;

    // 92% boundary: index 234 secondary; index 235 secondary→white
    expect(segmentLabelAt(segments, 234)).toBe("solid-secondary");
    expect(hexAt(result.lut, 234)).toBe(secondary);
    expect(segmentLabelAt(segments, 235)).toBe("secondary-to-white");
    expect(hexAt(result.lut, 235)).not.toBe("#ffffff");

    // 98% boundary: index 249 still transitioning; index 250 white core
    expect(segmentLabelAt(segments, 249)).toBe("secondary-to-white");
    expect(segmentLabelAt(segments, 250)).toBe("solid-white");

    expect(maxChannelStep(result.lut, 234, 250)).toBeLessThan(40);
  });

  it("keeps brand solid bands constant around midtone boundaries", () => {
    const segments = result.segments!;

    // 15% primary→mid: index 38 primary, index 39 mid gradient
    expect(segmentLabelAt(segments, 38)).toBe("solid-primary");
    expect(hexAt(result.lut, 38)).toBe(primary);
    expect(segmentLabelAt(segments, 39)).toBe("primary-to-secondary");

    // 85% mid→secondary: index 216 mid, index 217 secondary
    expect(segmentLabelAt(segments, 216)).toBe("primary-to-secondary");
    expect(segmentLabelAt(segments, 217)).toBe("solid-secondary");
    expect(hexAt(result.lut, 217)).toBe(secondary);

    expect(hexAt(result.lut, 21)).toBe(primary);
    expect(hexAt(result.lut, 30)).toBe(primary);
    expect(hexAt(result.lut, 38)).toBe(primary);

    expect(hexAt(result.lut, 217)).toBe(secondary);
    expect(hexAt(result.lut, 225)).toBe(secondary);
    expect(hexAt(result.lut, 234)).toBe(secondary);
  });

  it("interpolates the middle band between theme primary and secondary", () => {
    const mid = rgbAt(result.lut, 128);
    const primaryRgb = { r: 0x22, g: 0x44, b: 0x66 };
    const secondaryRgb = { r: 0x88, g: 0x99, b: 0xaa };

    expect(mid.r).toBeGreaterThan(primaryRgb.r);
    expect(mid.r).toBeLessThan(secondaryRgb.r);
    expect(mid.g).toBeGreaterThan(primaryRgb.g);
    expect(mid.g).toBeLessThan(secondaryRgb.g);
    expect(mid.b).toBeGreaterThan(primaryRgb.b);
    expect(mid.b).toBeLessThan(secondaryRgb.b);
  });

  it("supports custom core and transition widths", () => {
    const narrowCore = resolveLuminanceMap({
      palette: minimalBrandPalette,
      config: {
        kind: "theme",
        preset: "protected-brand",
        protectedEndpointCore: 0.01,
        endpointTransitionWidth: 0.04,
        brandSolidWidth: 0.05,
      },
    });

    // 1% core: index 2 ≈ 0.0078 black; index 3 ≈ 0.0118 transition
    expect(hexAt(narrowCore.lut, 2)).toBe("#000000");
    expect(segmentLabelAt(narrowCore.segments!, 3)).toBe("black-to-primary");

    const wideTransition = resolveLuminanceMap({
      palette: minimalBrandPalette,
      config: {
        kind: "theme",
        preset: "protected-brand",
        protectedEndpointCore: 0.02,
        endpointTransitionWidth: 0.1,
        brandSolidWidth: 0.05,
      },
    });

    // Transition runs to 12%: index 30 ≈ 0.1176 still transitioning
    expect(segmentLabelAt(wideTransition.segments!, 30)).toBe(
      "black-to-primary",
    );
    expect(hexAt(wideTransition.lut, 30)).not.toBe(primary);
  });
});
