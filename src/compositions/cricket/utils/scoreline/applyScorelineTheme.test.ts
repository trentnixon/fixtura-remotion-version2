import { describe, expect, it } from "vitest";
import { deriveScorelineThemeVars } from "./applyScorelineTheme";

describe("deriveScorelineThemeVars", () => {
  it("derives readable on-surface contrast for a dark primary", () => {
    const vars = deriveScorelineThemeVars({
      primary: "#001a4d",
      secondary: "#e8c547",
    });

    expect(vars.clubPrimary).toMatch(/^rgb\(/);
    expect(vars.onSurface).toMatch(/^rgb\(/);
    expect(vars.teamSurfacePrimary).toMatch(/^rgb\(/);
  });

  it("separates similar primary and secondary luminance", () => {
    const vars = deriveScorelineThemeVars({
      primary: "#334455",
      secondary: "#3a4a5a",
    });

    expect(vars.clubPrimary).not.toEqual(vars.clubSecondary);
  });
});
