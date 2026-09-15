import { describe, expect, it } from "vitest";
import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import { resolveNightSessionBandTokens } from "./resolveNightSessionOverlayTokens";

const darkPalette = {
  container: {
    background: "#080b0d",
    backgroundAlt: "#1a1a1a",
  },
  text: {
    onContainer: {
      title: "#ffffff",
      accent: "#c41e3a",
      copy: "#ffffff",
    },
  },
} as DesignPalette;

describe("resolveNightSessionBandTokens", () => {
  it("uses light band score on dark container modes", () => {
    const tokens = resolveNightSessionBandTokens(darkPalette);
    expect(tokens["--ns-band-score"]).toBe("#ffffff");
    expect(tokens["--ns-performance-border"]).toContain("255");
  });
});
