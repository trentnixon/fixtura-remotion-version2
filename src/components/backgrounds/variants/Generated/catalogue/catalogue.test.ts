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
  ["INV-PAR-lines", "ingress-particle-lines", "streak-lines"],
  [
    "INV-NOI-floatingParticles",
    "ingress-noise-floatingParticles",
    "floating-particles",
  ],
  ["INV-NOI-pulsingCircles", "ingress-noise-pulsingCircles", "pulsing-circles"],
  ["INV-NOI-digitalRain", "ingress-noise-digitalRain", "digital-rain"],
  ["INV-NOI-spokes", "ingress-noise-spokes", "spokes-field"],
] satisfies ReadonlyArray<readonly [string, string, string]>;

describe("generated catalogue", () => {
  test("contains 16 unique visual presets and nine adapter groups", () => {
    expect(generatedCatalogue).toHaveLength(16);
    expect(new Set(generatedCatalogue.map((entry) => entry.id)).size).toBe(16);
    expect(rendererAdapterRegistry.size).toBe(16);

    const adapterCounts = generatedCatalogue.reduce<Record<string, number>>(
      (counts, entry) => ({
        ...counts,
        [entry.rendererAdapter]: (counts[entry.rendererAdapter] ?? 0) + 1,
      }),
      {},
    );

    expect(adapterCounts).toEqual({
      "pattern-tiled": 1,
      "particle-field": 1,
      "grid-noise": 1,
      "particle-noise": 2,
      "svg-spokes": 1,
      "effects-solid": 5,
      "motion-asset": 1,
      "html-in-canvas": 3,
      "three-scene": 1,
    });
  });

  test("maps all inventory keys through catalogue ingress IDs", () => {
    expect(inventoryIngressCases).toHaveLength(6);

    for (const [
      inventoryKey,
      ingressId,
      expectedPresetId,
    ] of inventoryIngressCases) {
      const preset = findGeneratedPresetByLegacyIngressId(ingressId);
      expect(preset?.id, inventoryKey).toBe(expectedPresetId);
    }
  });

  test("owns all generated ingress IDs without duplicates", () => {
    const ingressIds = generatedCatalogue.flatMap(
      (entry) => entry.legacyIngressIds,
    );
    expect(ingressIds).toHaveLength(26);
    expect(new Set(ingressIds).size).toBe(26);
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

  test("excludes unresolved visibility presets from operator presets", () => {
    expect(operatorPresets).toEqual([]);
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

  test("registers html-in-canvas presets on the html-in-canvas adapter", () => {
    const htmlPresets = generatedCatalogue.filter(
      (entry) => entry.rendererAdapter === "html-in-canvas",
    );

    expect(htmlPresets.map((entry) => entry.id)).toEqual([
      "html-orbit-rings",
      "html-scoreboard-grid",
      "html-neon-beams",
    ]);
  });

  test("registers webgpu-metal-wave on the three-scene adapter", () => {
    const metalWave = generatedCatalogue.find(
      (entry) => entry.id === "webgpu-metal-wave",
    );

    expect(metalWave).toMatchObject({
      rendererAdapter: "three-scene",
      defaultConfiguration: {
        useBackground: "Animated",
        animation: { type: "webgpu-metal-wave" },
      },
    });
  });
});
