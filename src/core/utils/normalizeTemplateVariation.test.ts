import { describe, expect, it } from "vitest";
import { normalizeTemplateVariation } from "./normalizeTemplateVariation";

describe("normalizeTemplateVariation", () => {
  it("drops null background fields and keeps set values", () => {
    const normalized = normalizeTemplateVariation({
      useBackground: "Animated",
      image: {
        url: null,
        type: null,
        direction: null,
        gradientType: null,
        overlayStyle: null,
        overlayOpacity: null,
      },
      noise: { type: null },
      video: {
        url: null,
        size: null,
        muted: null,
        volume: null,
        position: null,
        overlay: null,
      },
      pattern: {
        type: null,
        scale: null,
        opacity: null,
        animation: null,
        animationSpeed: null,
        animationDuration: null,
      },
      gradient: { type: null, direction: null },
      particle: {
        type: null,
        speed: null,
        animation: null,
        direction: null,
        particleCount: null,
      },
      animation: { type: "html-neon-beams" },
    });

    expect(normalized).toEqual({
      useBackground: "Animated",
      image: {},
      noise: {},
      video: {},
      pattern: {},
      gradient: {},
      particle: {},
      animation: { type: "html-neon-beams" },
    });
  });
});
