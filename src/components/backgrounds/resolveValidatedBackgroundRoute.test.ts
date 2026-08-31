import { describe, expect, test } from "vitest";
import {
  resolveBackgroundRouteFromWire,
  resolveValidatedBackgroundRoute,
} from "./resolveValidatedBackgroundRoute";
import { matchLegacyIngress } from "./variants/Generated/catalogue";

describe("resolveValidatedBackgroundRoute", () => {
  test("routes generated pattern presets through catalogue adapters", () => {
    const match = matchLegacyIngress({
      useBackground: "Pattern",
      pattern: { type: "grid" },
    });
    expect(resolveValidatedBackgroundRoute(match)).toEqual({
      kind: "pattern",
      adapter: "pattern-tiled",
      presetId: "tile-grid",
    });
  });

  test("routes the unified Animated wire by concrete preset type", () => {
    expect(
      resolveBackgroundRouteFromWire({
        useBackground: "Animated",
        animation: { type: "dot-field", motion: "panLeft" },
      }),
    ).toEqual({ kind: "animated" });
  });

  test("routes generated particle presets through catalogue adapters", () => {
    const match = matchLegacyIngress({
      useBackground: "Particle",
      particle: { type: "snow" },
    });
    expect(resolveValidatedBackgroundRoute(match)).toEqual({
      kind: "particle",
      adapter: "particle-field",
      presetId: "snow-field",
    });
  });

  test("routes generated noise presets through catalogue adapters", () => {
    const match = matchLegacyIngress({
      useBackground: "Noise",
      noise: { type: "geometric" },
    });
    expect(resolveValidatedBackgroundRoute(match)).toEqual({
      kind: "noise",
      variant: "geometric",
      adapter: "svg-geometric",
      presetId: "geometric-field",
    });

    const spokesMatch = matchLegacyIngress({
      useBackground: "Graphics",
      noise: { type: "spokes" },
    });
    expect(resolveValidatedBackgroundRoute(spokesMatch)).toEqual({
      kind: "noise",
      variant: "spokes",
      adapter: "svg-spokes",
      presetId: "spokes-field",
    });

    const gridNoiseMatch = matchLegacyIngress({
      useBackground: "Noise",
      noise: { type: "wave" },
    });
    expect(resolveValidatedBackgroundRoute(gridNoiseMatch)).toEqual({
      kind: "noise",
      variant: "wave",
      adapter: "grid-noise",
      presetId: "wave-noise",
    });

    const particleNoiseMatch = matchLegacyIngress({
      useBackground: "Noise",
      noise: { type: "floatingParticles" },
    });
    expect(resolveValidatedBackgroundRoute(particleNoiseMatch)).toEqual({
      kind: "noise",
      variant: "floatingParticles",
      adapter: "particle-noise",
      presetId: "floating-particles",
    });
  });

  test("routes passthrough backgrounds unchanged", () => {
    expect(
      resolveBackgroundRouteFromWire({ useBackground: "Luminance" }),
    ).toEqual({ kind: "luminance" });

    expect(
      resolveBackgroundRouteFromWire({ useBackground: "Gradient" }),
    ).toEqual({ kind: "gradient" });
  });

  test("routes unsupported ingress to solid with diagnostic metadata", () => {
    const route = resolveBackgroundRouteFromWire({
      useBackground: "Pattern",
      pattern: { type: "dotz" },
    });

    expect(route).toEqual({
      kind: "unsupported",
      diagnostic: {
        code: "unsupported-background-ingress",
        ingressId: "ingress-unsupported-pattern-unknown-type",
        reason: "unknown-discriminator",
      },
    });
  });

  test("rejects Generated wire in Phase 1", () => {
    const route = resolveBackgroundRouteFromWire({
      useBackground: "Generated",
      generated: { presetId: "dot-field" },
    });

    expect(route.kind).toBe("unsupported");
  });
});
