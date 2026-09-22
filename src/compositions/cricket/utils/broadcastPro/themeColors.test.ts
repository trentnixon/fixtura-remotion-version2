import { describe, expect, it } from "vitest";
import tinycolor from "tinycolor2";
import { resolveBroadcastProAccentOnSurface } from "./themeColors";

describe("resolveBroadcastProAccentOnSurface", () => {
  it("keeps a dark brand accent on a light container", () => {
    const accent = "#352466";
    expect(resolveBroadcastProAccentOnSurface("#ffffff", accent)).toBe(accent);
  });

  it("lightens a dark brand accent on a dark container so it still reads", () => {
    const resolved = resolveBroadcastProAccentOnSurface("#000000", "#352466");
    expect(tinycolor.readability("#000000", resolved)).toBeGreaterThanOrEqual(
      4.5,
    );
    expect(tinycolor(resolved).toHexString()).not.toBe("#ffffff");
  });
});
