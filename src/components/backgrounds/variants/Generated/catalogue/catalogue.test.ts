import { describe, expect, test } from "vitest";
import {
  findGeneratedPresetByLegacyIngressId,
  generatedCatalogue,
  getCanonicalEgress,
  isOperatorSelectable,
  operatorPresets,
  rendererAdapterRegistry,
} from "./catalogue";

const inventoryIngressCases = [
  ["INV-PAT-dots", "ingress-pattern-dots", "dot-field"],
  ["INV-PAT-lines", "ingress-pattern-lines", "line-field"],
  ["INV-PAT-grid", "ingress-pattern-grid", "tile-grid"],
  ["INV-PAT-crosshatch", "ingress-pattern-crosshatch", "crosshatch-field"],
  ["INV-PAT-triangles", "ingress-pattern-triangles", "triangle-tile"],
  ["INV-PAT-chevron", "ingress-pattern-chevron", "chevron-field"],
  ["INV-PAR-dots", "ingress-particle-dots", "floating-dots"],
  ["INV-PAR-lines", "ingress-particle-lines", "streak-lines"],
  ["INV-PAR-bubbles", "ingress-particle-bubbles", "bubble-field"],
  ["INV-PAR-snow", "ingress-particle-snow", "snow-field"],
  ["INV-PAR-confetti", "ingress-particle-confetti", "confetti-field"],
  ["INV-NOI-default", "ingress-noise-default", "balanced-noise"],
  ["INV-NOI-subtle", "ingress-noise-subtle", "subtle-noise"],
  ["INV-NOI-grain", "ingress-noise-grain", "grain-field"],
  ["INV-NOI-wave", "ingress-noise-wave", "wave-noise"],
  ["INV-NOI-fog", "ingress-noise-fog", "fog-field"],
  ["INV-NOI-static", "ingress-noise-static", "tv-static"],
  [
    "INV-NOI-floatingParticles",
    "ingress-noise-floatingParticles",
    "floating-particles",
  ],
  [
    "INV-NOI-dynamicParticles",
    "ingress-noise-dynamicParticles",
    "dynamic-particles",
  ],
  ["INV-NOI-triangleSwarm", "ingress-noise-triangleSwarm", "triangle-swarm"],
  ["INV-NOI-pulsingCircles", "ingress-noise-pulsingCircles", "pulsing-circles"],
  ["INV-NOI-digitalRain", "ingress-noise-digitalRain", "digital-rain"],
  ["INV-NOI-gradientGrid", "ingress-noise-gradientGrid", "gradient-grid"],
  ["INV-NOI-graphics", "ingress-noise-graphics", "balanced-noise"],
  ["INV-NOI-geometric", "ingress-noise-geometric", "geometric-field"],
  ["INV-NOI-spokes", "ingress-noise-spokes", "spokes-field"],
] satisfies ReadonlyArray<readonly [string, string, string]>;

describe("generated catalogue", () => {
  test("contains 26 unique visual presets and seven adapter groups", () => {
    expect(generatedCatalogue).toHaveLength(26);
    expect(new Set(generatedCatalogue.map((entry) => entry.id)).size).toBe(26);
    expect(rendererAdapterRegistry.size).toBe(26);

    const adapterCounts = generatedCatalogue.reduce<Record<string, number>>(
      (counts, entry) => ({
        ...counts,
        [entry.rendererAdapter]: (counts[entry.rendererAdapter] ?? 0) + 1,
      }),
      {},
    );

    expect(adapterCounts).toEqual({
      "pattern-tiled": 6,
      "particle-field": 5,
      "grid-noise": 8,
      "particle-noise": 4,
      "svg-geometric": 1,
      "svg-spokes": 1,
      "effects-solid": 1,
    });
  });

  test("maps all 26 inventory keys through catalogue ingress IDs", () => {
    expect(inventoryIngressCases).toHaveLength(26);

    for (const [
      inventoryKey,
      ingressId,
      expectedPresetId,
    ] of inventoryIngressCases) {
      const preset = findGeneratedPresetByLegacyIngressId(ingressId);
      expect(preset?.id, inventoryKey).toBe(expectedPresetId);
    }
  });

  test("owns all 45 generated ingress IDs without duplicates", () => {
    const ingressIds = generatedCatalogue.flatMap(
      (entry) => entry.legacyIngressIds,
    );
    expect(ingressIds).toHaveLength(46);
    expect(new Set(ingressIds).size).toBe(46);
  });

  test("defines the exact canonical egress for every preset", () => {
    for (const preset of generatedCatalogue) {
      expect(getCanonicalEgress(preset.id)).toMatchObject({
        useBackground: "Animated",
        animation: { type: preset.id },
      });
    }
  });

  test("gives dot-field an animated default motion", () => {
    expect(getCanonicalEgress("dot-field")).toEqual({
      useBackground: "Animated",
      animation: {
        type: "dot-field",
        scale: 1,
        rotation: 0,
        motion: "panLeft",
        duration: 600,
        speed: 1,
      },
    });
  });

  test("exposes animated preset selection to the operator", () => {
    expect(
      generatedCatalogue.every(
        (entry) =>
          entry.operatorControls[0]?.key === "animation.type" &&
          entry.operatorControls[0]?.type === "preset",
      ),
    ).toBe(true);
  });

  test("excludes unresolved visibility and palette states from operator presets", () => {
    expect(operatorPresets).toEqual([]);

    const grain = generatedCatalogue.find(
      (entry) => entry.id === "grain-field",
    );
    expect(grain?.paletteBehavior.status).toBe("unresolved");

    if (!grain) {
      throw new Error("Expected grain-field in the Generated catalogue");
    }

    const visibleGrain = {
      ...grain,
      operatorVisibility: { status: "resolved-visible" },
    } satisfies GeneratedCatalogueEntry;

    expect(isOperatorSelectable(visibleGrain)).toBe(false);
  });

  test("registers light-leak on the effects-solid adapter with active palette", () => {
    const lightLeak = generatedCatalogue.find((entry) => entry.id === "light-leak");

    expect(lightLeak).toMatchObject({
      rendererAdapter: "effects-solid",
      defaultConfiguration: {
        useBackground: "Animated",
        animation: { type: "light-leak" },
      },
      paletteBehavior: {
        status: "resolved",
        mode: "active-palette",
        roles: ["background.main", "background.accent"],
      },
      readabilityPolicy: {
        status: "resolved",
        policy: "vignette",
      },
    });
  });
});
