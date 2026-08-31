/**
 * Node-side supersample compare for protected-linework masters.
 * Scale >1 uses independent matte/luminance downsample + final composite.
 *
 * Usage (via scripts/luminance-supersample-compare.mjs --node-only):
 *   LUMINANCE_SUPERSAMPLE_WRITE=1
 */
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import { describe, expect, it } from "vitest";
import { minimalBrandPalette } from "../__fixtures__/palettes/minimal-brand";
import {
  resolveProtectedBrandBrandLut,
  resolveProtectedBrandMatteRanges,
} from "../protectedBrandMattes";
import {
  LUMINANCE_OUTPUT_HEIGHT,
  LUMINANCE_OUTPUT_WIDTH,
} from "./supersampleLuminance";
import { renderProtectedBrandMatteSupersample } from "./protectedBrandMattePipeline";
import type { LuminanceSupersampleScale } from "../types";

const root = path.resolve(__dirname, "../../../../../../");
const masterPath = path.join(root, "public/luminance/_verify/test007.png");
const outDir = path.join(root, "out/luminance-supersample");

const readPngRgba = (filePath: string) => {
  const png = PNG.sync.read(fs.readFileSync(filePath));
  return {
    data: png.data as Buffer,
    width: png.width,
    height: png.height,
  };
};

const writePngRgba = (
  filePath: string,
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
) => {
  const png = new PNG({ width, height });
  png.data = Buffer.from(rgba);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, PNG.sync.write(png));
};

describe.skipIf(process.env.LUMINANCE_SUPERSAMPLE_WRITE !== "1")(
  "supersample matte compare write (test007)",
  () => {
    it("writes matte-path 1× / 2× / 4× finals at 1080×1350", () => {
      expect(fs.existsSync(masterPath)).toBe(true);
      const master = readPngRgba(masterPath);
      const brandLut = resolveProtectedBrandBrandLut(minimalBrandPalette);
      const matteRanges = resolveProtectedBrandMatteRanges();

      const scales: LuminanceSupersampleScale[] = [1, 2, 4];
      for (const scale of scales) {
        const mapped = renderProtectedBrandMatteSupersample({
          sourceRgba: master.data,
          sourceWidth: master.width,
          sourceHeight: master.height,
          brandLut,
          matteRanges,
          scale,
          outputWidth: LUMINANCE_OUTPUT_WIDTH,
          outputHeight: LUMINANCE_OUTPUT_HEIGHT,
        });

        expect(mapped.width).toBe(LUMINANCE_OUTPUT_WIDTH);
        expect(mapped.height).toBe(LUMINANCE_OUTPUT_HEIGHT);

        const label =
          scale === 1
            ? "final-matte-1x"
            : scale === 2
              ? "final-matte-2x"
              : "final-matte-4x";
        const outPath = path.join(outDir, `F07-${label}.png`);
        writePngRgba(outPath, mapped.data, mapped.width, mapped.height);
        expect(fs.existsSync(outPath)).toBe(true);
      }
    }, 180_000);
  },
);
