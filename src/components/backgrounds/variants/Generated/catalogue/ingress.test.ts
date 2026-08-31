import { describe, expect, test } from "vitest";
import { buildDiscoveryContract } from "./discoveryContract";
import {
  applyCanonicalEgress,
  legacyIngress,
  matchLegacyIngress,
  normalizeForDisplay,
  preserveStickyIngress,
} from "./ingress";

describe("matchLegacyIngress", () => {
  test("matches generated Pattern and Particle ingresses", () => {
    expect(
      matchLegacyIngress({
        useBackground: "Pattern",
        pattern: { type: "grid" },
      }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "tile-grid",
      ingressId: "ingress-pattern-grid",
    });

    expect(
      matchLegacyIngress({
        useBackground: "Particle",
        particle: { type: "snow" },
      }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "snow-field",
      ingressId: "ingress-particle-snow",
    });
  });

  test("matches dual Graphics and Noise ingresses", () => {
    expect(
      matchLegacyIngress({
        useBackground: "Graphics",
        noise: { type: "geometric" },
      }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "geometric-field",
      ingressId: "ingress-graphics-geometric",
    });

    expect(
      matchLegacyIngress({
        useBackground: "Noise",
        noise: { type: "geometric" },
      }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "geometric-field",
      ingressId: "ingress-noise-geometric",
    });
  });

  test("maps inventory-only graphics type to balanced-noise", () => {
    expect(
      matchLegacyIngress({
        useBackground: "Noise",
        noise: { type: "graphics" },
      }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "balanced-noise",
      ingressId: "ingress-noise-graphics",
    });
  });

  test("treats missing discriminators as generated defaults", () => {
    expect(
      matchLegacyIngress({ useBackground: "Pattern", pattern: {} }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "dot-field",
      ingressId: "ingress-pattern-missing-type",
    });

    expect(
      matchLegacyIngress({ useBackground: "Noise", noise: {} }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "balanced-noise",
      ingressId: "ingress-noise-missing-type",
    });
  });

  test("classifies unknown discriminators as unsupported", () => {
    expect(
      matchLegacyIngress({
        useBackground: "Pattern",
        pattern: { type: "dotz" },
      }),
    ).toMatchObject({
      outcome: "unsupported",
      ingressId: "ingress-unsupported-pattern-unknown-type",
    });

    expect(
      matchLegacyIngress({
        useBackground: "Noise",
        noise: { type: "not-a-mode" },
      }),
    ).toMatchObject({
      outcome: "unsupported",
      ingressId: "ingress-unsupported-noise-unknown-noise-type",
    });
  });

  test("classifies missing family objects as unsupported", () => {
    expect(matchLegacyIngress({ useBackground: "Pattern" })).toMatchObject({
      outcome: "unsupported",
      ingressId: "ingress-unsupported-pattern-missing-family",
    });

    expect(matchLegacyIngress({ useBackground: "Graphics" })).toMatchObject({
      outcome: "unsupported",
      ingressId: "ingress-unsupported-graphics-missing-noise",
    });
  });

  test("passthrough and unknown wire outcomes forbid presetId", () => {
    const passthrough = matchLegacyIngress({ useBackground: "Solid" });
    expect(passthrough).toMatchObject({
      outcome: "passthrough",
      ingressId: "ingress-passthrough-solid",
    });
    expect("presetId" in passthrough).toBe(false);

    const unsupported = matchLegacyIngress({ useBackground: "Layered" });
    expect(unsupported.outcome).toBe("unsupported");
    expect("presetId" in unsupported).toBe(false);
  });

  test("rejects Generated wire in Phase 1", () => {
    expect(
      matchLegacyIngress({
        useBackground: "Generated",
        generated: { presetId: "dot-field" },
      }),
    ).toMatchObject({
      outcome: "unsupported",
    });
  });

  test("matches the unified Animated wire by concrete preset type", () => {
    expect(
      matchLegacyIngress({
        useBackground: "Animated",
        animation: { type: "dot-field", motion: "panLeft" },
      }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "dot-field",
    });
  });

  test("extracts nested templateVariation payloads", () => {
    expect(
      matchLegacyIngress({
        templateVariation: {
          useBackground: "Pattern",
          pattern: { type: "dots" },
        },
      }),
    ).toMatchObject({
      outcome: "generated",
      presetId: "dot-field",
    });
  });
});

describe("normalizeForDisplay", () => {
  test("consumes match results without re-parsing wire", () => {
    const match = matchLegacyIngress({
      useBackground: "Pattern",
      pattern: { type: "dots" },
    });
    expect(normalizeForDisplay(match)).toEqual({
      category: "generated",
      presetId: "dot-field",
    });
  });
});

describe("preserveStickyIngress", () => {
  test("preserves original wire on unchanged preset", () => {
    const original = {
      useBackground: "Noise",
      noise: { type: "wave" },
      pattern: { type: "dots" },
    };

    const saved = preserveStickyIngress(original, "wave-noise");
    expect(saved).toEqual(original);
  });

  test("writes canonical egress when preset changes and retains sibling blocks", () => {
    const original = {
      useBackground: "Noise",
      noise: { type: "wave" },
      pattern: { type: "dots" },
    };

    const saved = preserveStickyIngress(original, "dot-field") as {
      useBackground: string;
      animation?: { type: string };
      noise?: { type: string };
    };

    expect(saved.useBackground).toBe("Animated");
    expect(saved.animation?.type).toBe("dot-field");
    expect(saved.noise?.type).toBe("wave");
  });

  test("applyCanonicalEgress matches catalogue defaults", () => {
    expect(applyCanonicalEgress("floating-particles")).toEqual({
      useBackground: "Animated",
      animation: { type: "floating-particles" },
    });
  });
});

describe("buildDiscoveryContract", () => {
  test("emits expected ingress row counts and operator presets", () => {
    const contract = buildDiscoveryContract("2026-08-28T00:00:00.000Z");

    expect(contract.contractVersion).toBe("1.0.0");
    expect(contract.catalogue.presets).toHaveLength(25);
    expect(contract.operatorPresets).toEqual([]);
    expect(contract.legacyIngress).toHaveLength(legacyIngress.length);
    expect(contract.legacyIngress).toHaveLength(60);
  });
});
