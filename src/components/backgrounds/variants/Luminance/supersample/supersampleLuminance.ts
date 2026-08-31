import type { LuminanceLookupTable } from "../types";
import type { LuminanceSupersampleScale } from "../types";

export const LUMINANCE_OUTPUT_WIDTH = 1080;
export const LUMINANCE_OUTPUT_HEIGHT = 1350;

export const isLuminanceSupersampleScale = (
  value: unknown,
): value is LuminanceSupersampleScale =>
  value === 1 || value === 2 || value === 4;

/** Working frame size for an integer supersample scale. */
export const workingSizeForScale = (
  scale: LuminanceSupersampleScale,
): { width: number; height: number } => ({
  width: LUMINANCE_OUTPUT_WIDTH * scale,
  height: LUMINANCE_OUTPUT_HEIGHT * scale,
});

/**
 * Integer-factor area-average downsample (box filter).
 * Prefer for 2× and 4× reduction — preserves thin lines without soft blur.
 */
export const downsampleRgbaAreaAverage = (
  source: Uint8ClampedArray | Buffer,
  sourceWidth: number,
  sourceHeight: number,
  factor: number,
): { data: Uint8ClampedArray; width: number; height: number } => {
  if (!Number.isInteger(factor) || factor < 1) {
    throw new Error("Downsample factor must be a positive integer");
  }

  if (factor === 1) {
    return {
      data: new Uint8ClampedArray(source),
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
  const data = new Uint8ClampedArray(width * height * 4);
  const block = factor * factor;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;

      for (let oy = 0; oy < factor; oy += 1) {
        for (let ox = 0; ox < factor; ox += 1) {
          const sx = x * factor + ox;
          const sy = y * factor + oy;
          const index = (sy * sourceWidth + sx) * 4;
          r += source[index]!;
          g += source[index + 1]!;
          b += source[index + 2]!;
          a += source[index + 3]!;
        }
      }

      const out = (y * width + x) * 4;
      data[out] = Math.round(r / block);
      data[out + 1] = Math.round(g / block);
      data[out + 2] = Math.round(b / block);
      data[out + 3] = Math.round(a / block);
    }
  }

  return { data, width, height };
};

const luminanceByte = (r: number, g: number, b: number): number =>
  Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

/**
 * Apply neutralized luminance → LUT lookup in place on RGBA buffer.
 */
export const applyLuminanceLutToRgba = (
  rgba: Uint8ClampedArray | Buffer,
  lut: LuminanceLookupTable,
): void => {
  for (let index = 0; index < rgba.length; index += 4) {
    const tone = luminanceByte(
      rgba[index]!,
      rgba[index + 1]!,
      rgba[index + 2]!,
    );
    rgba[index] = lut.r[tone] ?? 0;
    rgba[index + 1] = lut.g[tone] ?? 0;
    rgba[index + 2] = lut.b[tone] ?? 0;
    // alpha unchanged
  }
};

/**
 * Cover-fit sample: map output pixel (x,y) into source image coordinates.
 */
export const coverSampleSourceXY = (
  x: number,
  y: number,
  destWidth: number,
  destHeight: number,
  sourceWidth: number,
  sourceHeight: number,
): { sx: number; sy: number } => {
  const scale = Math.max(destWidth / sourceWidth, destHeight / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const offsetX = (destWidth - drawWidth) / 2;
  const offsetY = (destHeight - drawHeight) / 2;

  const sx = (x + 0.5 - offsetX) / scale - 0.5;
  const sy = (y + 0.5 - offsetY) / scale - 0.5;

  return {
    sx: Math.min(sourceWidth - 1, Math.max(0, sx)),
    sy: Math.min(sourceHeight - 1, Math.max(0, sy)),
  };
};

const readBilinear = (
  source: Uint8ClampedArray | Buffer,
  sourceWidth: number,
  sourceHeight: number,
  sx: number,
  sy: number,
): [number, number, number, number] => {
  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const x1 = Math.min(sourceWidth - 1, x0 + 1);
  const y1 = Math.min(sourceHeight - 1, y0 + 1);
  const tx = sx - x0;
  const ty = sy - y0;

  const at = (x: number, y: number) => {
    const index = (y * sourceWidth + x) * 4;
    return [
      source[index]!,
      source[index + 1]!,
      source[index + 2]!,
      source[index + 3]!,
    ] as const;
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
    Math.round(mix(mix(c00[3], c10[3], tx), mix(c01[3], c11[3], tx), ty)),
  ];
};

/**
 * Rasterize source → working size (cover fit, bilinear), apply LUT, optionally
 * area-average downsample to final output size.
 */
export const renderSupersampledLuminanceRgba = (input: {
  sourceRgba: Uint8ClampedArray | Buffer;
  sourceWidth: number;
  sourceHeight: number;
  lut: LuminanceLookupTable;
  scale: LuminanceSupersampleScale;
  outputWidth?: number;
  outputHeight?: number;
}): {
  data: Uint8ClampedArray;
  width: number;
  height: number;
} => {
  const outputWidth = input.outputWidth ?? LUMINANCE_OUTPUT_WIDTH;
  const outputHeight = input.outputHeight ?? LUMINANCE_OUTPUT_HEIGHT;
  const workingWidth = outputWidth * input.scale;
  const workingHeight = outputHeight * input.scale;
  const working = new Uint8ClampedArray(workingWidth * workingHeight * 4);

  for (let y = 0; y < workingHeight; y += 1) {
    for (let x = 0; x < workingWidth; x += 1) {
      const { sx, sy } = coverSampleSourceXY(
        x,
        y,
        workingWidth,
        workingHeight,
        input.sourceWidth,
        input.sourceHeight,
      );
      const [r, g, b, a] = readBilinear(
        input.sourceRgba,
        input.sourceWidth,
        input.sourceHeight,
        sx,
        sy,
      );
      const index = (y * workingWidth + x) * 4;
      working[index] = r;
      working[index + 1] = g;
      working[index + 2] = b;
      working[index + 3] = a;
    }
  }

  applyLuminanceLutToRgba(working, input.lut);

  if (input.scale === 1) {
    return { data: working, width: workingWidth, height: workingHeight };
  }

  return downsampleRgbaAreaAverage(
    working,
    workingWidth,
    workingHeight,
    input.scale,
  );
};
