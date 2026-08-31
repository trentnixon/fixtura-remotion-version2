import type { LuminanceLookupTable, LuminanceSupersampleScale } from "../types";
import { applyPreMapTone } from "../applyPreMapTone";
import type { ProtectedBrandMatteRanges } from "../protectedBrandMattes";
import {
  getBlackProtectionAlpha,
  getWhiteProtectionAlpha,
} from "../protectedBrandMattes";
import {
  coverSampleSourceXY,
  LUMINANCE_OUTPUT_HEIGHT,
  LUMINANCE_OUTPUT_WIDTH,
} from "./supersampleLuminance";

const luminanceByte = (r: number, g: number, b: number): number =>
  Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

const readBilinearRgb = (
  source: Uint8ClampedArray | Buffer,
  sourceWidth: number,
  sourceHeight: number,
  sx: number,
  sy: number,
): [number, number, number] => {
  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const x1 = Math.min(sourceWidth - 1, x0 + 1);
  const y1 = Math.min(sourceHeight - 1, y0 + 1);
  const tx = sx - x0;
  const ty = sy - y0;

  const at = (x: number, y: number) => {
    const index = (y * sourceWidth + x) * 4;
    return [source[index]!, source[index + 1]!, source[index + 2]!] as const;
  };

  const c00 = at(x0, y0);
  const c10 = at(x1, y0);
  const c01 = at(x0, y1);
  const c11 = at(x1, y1);
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;

  return [
    Math.round(mix(mix(c00[0], c10[0], tx), mix(c01[0], c11[0], tx), ty)),
    Math.round(mix(mix(c00[1], c10[1], tx), mix(c01[1], c11[1], tx), ty)),
    Math.round(mix(mix(c00[2], c10[2], tx), mix(c01[2], c11[2], tx), ty)),
  ];
};

/** Integer-factor area-average for a single-channel float buffer. */
export const downsampleFloatAreaAverage = (
  source: Float32Array,
  sourceWidth: number,
  sourceHeight: number,
  factor: number,
): { data: Float32Array; width: number; height: number } => {
  if (!Number.isInteger(factor) || factor < 1) {
    throw new Error("Downsample factor must be a positive integer");
  }

  if (factor === 1) {
    return {
      data: new Float32Array(source),
      width: sourceWidth,
      height: sourceHeight,
    };
  }

  if (sourceWidth % factor !== 0 || sourceHeight % factor !== 0) {
    throw new Error(
      `Source ${sourceWidth}×${sourceHeight} is not divisible by factor ${factor}`,
    );
  }

  const width = sourceWidth / factor;
  const height = sourceHeight / factor;
  const data = new Float32Array(width * height);
  const block = factor * factor;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let sum = 0;
      for (let oy = 0; oy < factor; oy += 1) {
        for (let ox = 0; ox < factor; ox += 1) {
          const sx = x * factor + ox;
          const sy = y * factor + oy;
          sum += source[sy * sourceWidth + sx]!;
        }
      }
      data[y * width + x] = sum / block;
    }
  }

  return { data, width, height };
};

export const compositeChannel = (
  background: number,
  foreground: number,
  alpha: number,
): number => foreground * alpha + background * (1 - alpha);

/**
 * Composite black then white mattes over brand RGB at final resolution.
 * Boundary pixels may blend; full-coverage cores stay exact.
 */
export const compositeProtectedMattesRgba = (input: {
  brandRgb: Uint8ClampedArray;
  blackAlpha: Float32Array;
  whiteAlpha: Float32Array;
  pixelCount: number;
}): Uint8ClampedArray => {
  const out = new Uint8ClampedArray(input.pixelCount * 4);

  for (let i = 0; i < input.pixelCount; i += 1) {
    const base = i * 4;
    let r = input.brandRgb[base]!;
    let g = input.brandRgb[base + 1]!;
    let b = input.brandRgb[base + 2]!;

    const black = input.blackAlpha[i]!;
    if (black > 0) {
      r = compositeChannel(r, 0, black);
      g = compositeChannel(g, 0, black);
      b = compositeChannel(b, 0, black);
    }

    const white = input.whiteAlpha[i]!;
    if (white > 0) {
      r = compositeChannel(r, 255, white);
      g = compositeChannel(g, 255, white);
      b = compositeChannel(b, 255, white);
    }

    out[base] = Math.round(r);
    out[base + 1] = Math.round(g);
    out[base + 2] = Math.round(b);
    out[base + 3] = 255;
  }

  return out;
};

const lookupBrandRgb = (
  lut: LuminanceLookupTable,
  tone: number,
): [number, number, number] => {
  const index = Math.min(255, Math.max(0, Math.round(tone)));
  return [lut.r[index] ?? 0, lut.g[index] ?? 0, lut.b[index] ?? 0];
};

export type ProtectedBrandBuffers = {
  luminance: Float32Array;
  blackAlpha: Float32Array;
  whiteAlpha: Float32Array;
  width: number;
  height: number;
};

/**
 * Cover-fit rasterize source to working size, neutralize + pre-map tone,
 * then derive brand luminance + protected coverage mattes.
 */
export const createProtectedBrandBuffers = (input: {
  sourceRgba: Uint8ClampedArray | Buffer;
  sourceWidth: number;
  sourceHeight: number;
  workingWidth: number;
  workingHeight: number;
  matteRanges: ProtectedBrandMatteRanges;
  contrast?: number;
  brightness?: number;
}): ProtectedBrandBuffers => {
  const pixelCount = input.workingWidth * input.workingHeight;
  const luminance = new Float32Array(pixelCount);
  const blackAlpha = new Float32Array(pixelCount);
  const whiteAlpha = new Float32Array(pixelCount);

  for (let y = 0; y < input.workingHeight; y += 1) {
    for (let x = 0; x < input.workingWidth; x += 1) {
      const { sx, sy } = coverSampleSourceXY(
        x,
        y,
        input.workingWidth,
        input.workingHeight,
        input.sourceWidth,
        input.sourceHeight,
      );
      const [r, g, b] = readBilinearRgb(
        input.sourceRgba,
        input.sourceWidth,
        input.sourceHeight,
        sx,
        sy,
      );
      const tone = applyPreMapTone(luminanceByte(r, g, b), {
        contrast: input.contrast,
        brightness: input.brightness,
      });
      const luminance01 = tone / 255;
      const index = y * input.workingWidth + x;
      luminance[index] = tone;
      blackAlpha[index] = getBlackProtectionAlpha(
        luminance01,
        input.matteRanges,
      );
      whiteAlpha[index] = getWhiteProtectionAlpha(
        luminance01,
        input.matteRanges,
      );
    }
  }

  return {
    luminance,
    blackAlpha,
    whiteAlpha,
    width: input.workingWidth,
    height: input.workingHeight,
  };
};

/**
 * Independent matte/luminance downsample → brand LUT at final size →
 * protected composite. Avoids RGB fringe from downsampling pre-composited edges.
 */
export const renderProtectedBrandMatteSupersample = (input: {
  sourceRgba: Uint8ClampedArray | Buffer;
  sourceWidth: number;
  sourceHeight: number;
  brandLut: LuminanceLookupTable;
  matteRanges: ProtectedBrandMatteRanges;
  scale: LuminanceSupersampleScale;
  contrast?: number;
  brightness?: number;
  outputWidth?: number;
  outputHeight?: number;
}): { data: Uint8ClampedArray; width: number; height: number } => {
  const outputWidth = input.outputWidth ?? LUMINANCE_OUTPUT_WIDTH;
  const outputHeight = input.outputHeight ?? LUMINANCE_OUTPUT_HEIGHT;
  const workingWidth = outputWidth * input.scale;
  const workingHeight = outputHeight * input.scale;

  const buffers = createProtectedBrandBuffers({
    sourceRgba: input.sourceRgba,
    sourceWidth: input.sourceWidth,
    sourceHeight: input.sourceHeight,
    workingWidth,
    workingHeight,
    matteRanges: input.matteRanges,
    contrast: input.contrast,
    brightness: input.brightness,
  });

  const luminanceFinal = downsampleFloatAreaAverage(
    buffers.luminance,
    buffers.width,
    buffers.height,
    input.scale,
  );
  const blackFinal = downsampleFloatAreaAverage(
    buffers.blackAlpha,
    buffers.width,
    buffers.height,
    input.scale,
  );
  const whiteFinal = downsampleFloatAreaAverage(
    buffers.whiteAlpha,
    buffers.width,
    buffers.height,
    input.scale,
  );

  const pixelCount = luminanceFinal.width * luminanceFinal.height;
  const brandRgb = new Uint8ClampedArray(pixelCount * 4);

  for (let i = 0; i < pixelCount; i += 1) {
    const [r, g, b] = lookupBrandRgb(input.brandLut, luminanceFinal.data[i]!);
    const base = i * 4;
    brandRgb[base] = r;
    brandRgb[base + 1] = g;
    brandRgb[base + 2] = b;
    brandRgb[base + 3] = 255;
  }

  const data = compositeProtectedMattesRgba({
    brandRgb,
    blackAlpha: blackFinal.data,
    whiteAlpha: whiteFinal.data,
    pixelCount,
  });

  return {
    data,
    width: luminanceFinal.width,
    height: luminanceFinal.height,
  };
};
