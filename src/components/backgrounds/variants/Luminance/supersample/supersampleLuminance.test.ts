import { describe, expect, it } from "vitest";
import {
  downsampleRgbaAreaAverage,
  renderSupersampledLuminanceRgba,
} from "./supersampleLuminance";
import { resolveLuminanceSupersampleScale } from "../resolveLuminanceSupersampleScale";

describe("downsampleRgbaAreaAverage", () => {
  it("averages a 2×2 block into one pixel", () => {
    // 2×2 image: four different greys
    const source = new Uint8ClampedArray([
      0, 0, 0, 255, 100, 100, 100, 255, 200, 200, 200, 255, 255, 255, 255, 255,
    ]);
    const { data, width, height } = downsampleRgbaAreaAverage(source, 2, 2, 2);
    expect(width).toBe(1);
    expect(height).toBe(1);
    expect(data[0]).toBe(Math.round((0 + 100 + 200 + 255) / 4));
    expect(data[3]).toBe(255);
  });
});

describe("renderSupersampledLuminanceRgba", () => {
  it("keeps exact black and white after 2× supersample", () => {
    // 2×2: black, mid, mid, white — cover-fit into 2×2 working → 1×1 output?
    // Use output 2×2 with scale 2 → working 4×4 → output 2×2
    const source = new Uint8ClampedArray([
      0, 0, 0, 255, 128, 128, 128, 255, 128, 128, 128, 255, 255, 255, 255, 255,
    ]);
    const lut = {
      r: Array.from({ length: 256 }, (_, i) => i),
      g: Array.from({ length: 256 }, (_, i) => i),
      b: Array.from({ length: 256 }, (_, i) => i),
    };

    const result = renderSupersampledLuminanceRgba({
      sourceRgba: source,
      sourceWidth: 2,
      sourceHeight: 2,
      lut,
      scale: 2,
      outputWidth: 2,
      outputHeight: 2,
    });

    expect(result.width).toBe(2);
    expect(result.height).toBe(2);
    // Identity LUT: corners should stay near black/white after downsample
    expect(result.data[0]).toBeLessThan(40);
    const last = (2 * 2 - 1) * 4;
    expect(result.data[last]).toBeGreaterThan(215);
  });
});

describe("resolveLuminanceSupersampleScale", () => {
  it("defaults protected-brand to 2× and others to 1×", () => {
    expect(
      resolveLuminanceSupersampleScale({
        kind: "theme",
        preset: "protected-brand",
      }),
    ).toBe(2);
    expect(
      resolveLuminanceSupersampleScale({ kind: "theme", preset: "brand" }),
    ).toBe(1);
    expect(
      resolveLuminanceSupersampleScale(
        { kind: "theme", preset: "protected-brand" },
        4,
      ),
    ).toBe(4);
    expect(
      resolveLuminanceSupersampleScale(
        { kind: "theme", preset: "protected-brand" },
        1,
      ),
    ).toBe(1);
  });
});
