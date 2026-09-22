import { describe, expect, it } from "vitest";
import { resolveBroadcastProImageDefaults } from "./image-defaults";

describe("resolveBroadcastProImageDefaults", () => {
  it("applies a mode-aware overlay in the 0.45–0.55 range by default", () => {
    const light = resolveBroadcastProImageDefaults({ mode: "light" });
    expect(light.overlayStyle).toBe("vignette");
    expect(light.overlayOpacity).toBeGreaterThanOrEqual(0.45);
    expect(light.overlayOpacity).toBeLessThanOrEqual(0.55);
    expect(light.overlayColor).toBe("rgba(0, 0, 0, 1)");

    const dark = resolveBroadcastProImageDefaults({ mode: "dark" });
    expect(dark.overlayColor).toBe("rgba(255, 255, 255, 1)");
    expect(dark.overlayOpacity).toBeGreaterThanOrEqual(0.45);
  });

  it("rejects motion with overlay none", () => {
    const result = resolveBroadcastProImageDefaults({
      mode: "light",
      image: { effectType: "kenburns", overlayStyle: "none" },
    });
    expect(result.effectType).not.toBe("none");
    expect(result.overlayStyle).not.toBe("none");
  });

  it("caps zoom at 1.08", () => {
    const result = resolveBroadcastProImageDefaults({
      mode: "light",
      image: { effectType: "zoom", zoomIntensity: 1.2 },
    });
    expect(result.zoomIntensity).toBeLessThanOrEqual(1.08);
  });

  it("pans portrait stills vertically and landscape stills horizontally", () => {
    const portrait = resolveBroadcastProImageDefaults({
      mode: "light",
      image: { effectType: "pan", panDirection: "left" },
      stillRatio: 0.6,
    });
    expect(portrait.panDirection).toBe("up");

    const landscape = resolveBroadcastProImageDefaults({
      mode: "light",
      image: { effectType: "pan", panDirection: "up" },
      stillRatio: 1.6,
    });
    expect(landscape.panDirection).toBe("left");
  });

  it("disables fast pan under dense tables", () => {
    const result = resolveBroadcastProImageDefaults({
      mode: "light",
      compositionId: "CricketLadder",
      image: { effectType: "pan", panIntensity: 15 },
    });
    expect(result.panIntensity).toBe(0);
    expect(result.effectType).toBe("none");
  });
});
