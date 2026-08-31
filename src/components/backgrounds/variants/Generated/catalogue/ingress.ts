import {
  findGeneratedPresetByLegacyIngressId,
  generatedCatalogue,
  getCanonicalEgress,
} from "./catalogue";
import type { GeneratedPresetId } from "./catalogue";
import type { LegacyEgressPayload } from "./types";

export type LegacyWirePayload = unknown;

export type LegacyWireObject = Readonly<Record<string, unknown>>;

export type LegacyIngressMatchShape = {
  readonly useBackground: string;
  readonly pattern?: { readonly type?: string };
  readonly particle?: { readonly type?: string };
  readonly noise?: { readonly type?: string };
  readonly animation?: { readonly type?: string };
};

export type LegacyIngressMatchKind =
  | "exact"
  | "missing-type"
  | "missing-family"
  | "unknown-type"
  | "unknown-wire";

export type GeneratedLegacyIngressRow = {
  readonly id: string;
  readonly match: LegacyIngressMatchShape;
  readonly matchKind: "exact" | "missing-type";
  readonly outcome: "generated";
  readonly presetId: GeneratedPresetId;
  readonly note?: string;
};

export type PassthroughLegacyIngressRow = {
  readonly id: string;
  readonly match: LegacyIngressMatchShape;
  readonly matchKind: "exact";
  readonly outcome: "passthrough";
  readonly presetId?: never;
  readonly note?: string;
};

export type UnsupportedLegacyIngressRow = {
  readonly id: string;
  readonly match: LegacyIngressMatchShape;
  readonly matchKind: "missing-family" | "unknown-type" | "unknown-wire";
  readonly outcome: "unsupported";
  readonly presetId?: never;
  readonly note: string;
};

export type LegacyIngressRow =
  | GeneratedLegacyIngressRow
  | PassthroughLegacyIngressRow
  | UnsupportedLegacyIngressRow;

export type UnsupportedIngressReason =
  | "invalid-payload"
  | "missing-family"
  | "unknown-discriminator"
  | "unknown-wire";

export type GeneratedIngressMatch = {
  readonly outcome: "generated";
  readonly ingressId: string;
  readonly presetId: GeneratedPresetId;
  readonly originalWire: LegacyWireObject;
};

export type PassthroughIngressMatch = {
  readonly outcome: "passthrough";
  readonly ingressId: string;
  readonly useBackground: string;
  readonly originalWire: LegacyWireObject;
  readonly presetId?: never;
};

export type UnsupportedIngressMatch = {
  readonly outcome: "unsupported";
  readonly ingressId: string;
  readonly reason: UnsupportedIngressReason;
  readonly presetId?: never;
};

export type LegacyIngressMatchResult =
  | GeneratedIngressMatch
  | PassthroughIngressMatch
  | UnsupportedIngressMatch;

export type GeneratedDisplaySelection = {
  readonly category: "generated";
  readonly presetId: GeneratedPresetId;
};

export type PassthroughDisplaySelection = {
  readonly category: "passthrough";
  readonly useBackground: string;
};

export type UnsupportedDisplaySelection = {
  readonly category: "unsupported";
  readonly reason: UnsupportedIngressReason;
  readonly ingressId: string;
};

export type DisplaySelection =
  | GeneratedDisplaySelection
  | PassthroughDisplaySelection
  | UnsupportedDisplaySelection;

const patternIngress = [
  ["dots", "dot-field"],
  ["lines", "line-field"],
  ["grid", "tile-grid"],
  ["crosshatch", "crosshatch-field"],
  ["triangles", "triangle-tile"],
  ["chevron", "chevron-field"],
] as const;

const particleIngress = [
  ["dots", "floating-dots"],
  ["lines", "streak-lines"],
  ["bubbles", "bubble-field"],
  ["snow", "snow-field"],
  ["confetti", "confetti-field"],
] as const;

const noiseIngress = [
  ["default", "balanced-noise"],
  ["subtle", "subtle-noise"],
  ["grain", "grain-field"],
  ["wave", "wave-noise"],
  ["fog", "fog-field"],
  ["static", "tv-static"],
  ["floatingParticles", "floating-particles"],
  ["dynamicParticles", "dynamic-particles"],
  ["triangleSwarm", "triangle-swarm"],
  ["pulsingCircles", "pulsing-circles"],
  ["digitalRain", "digital-rain"],
  ["gradientGrid", "gradient-grid"],
  ["graphics", "balanced-noise"],
  ["geometric", "geometric-field"],
  ["spokes", "spokes-field"],
] as const;

const getPresetIdForIngress = (ingressId: string): GeneratedPresetId => {
  const preset = findGeneratedPresetByLegacyIngressId(ingressId);
  if (!preset) {
    throw new Error(`Catalogue ingress invariant failed: ${ingressId}`);
  }
  return preset.id;
};

const patternRows: readonly GeneratedLegacyIngressRow[] = [
  ...patternIngress.map(([type]) => {
    const id = `ingress-pattern-${type}`;
    return {
      id,
      match: { useBackground: "Pattern", pattern: { type } },
      matchKind: "exact",
      outcome: "generated",
      presetId: getPresetIdForIngress(id),
    } satisfies GeneratedLegacyIngressRow;
  }),
  {
    id: "ingress-pattern-missing-type",
    match: { useBackground: "Pattern", pattern: {} },
    matchKind: "missing-type",
    outcome: "generated",
    presetId: getPresetIdForIngress("ingress-pattern-missing-type"),
    note: "Pattern object present with an omitted, undefined, or null type",
  },
];

const particleRows: readonly GeneratedLegacyIngressRow[] = [
  ...particleIngress.map(([type]) => {
    const id = `ingress-particle-${type}`;
    return {
      id,
      match: { useBackground: "Particle", particle: { type } },
      matchKind: "exact",
      outcome: "generated",
      presetId: getPresetIdForIngress(id),
    } satisfies GeneratedLegacyIngressRow;
  }),
  {
    id: "ingress-particle-missing-type",
    match: { useBackground: "Particle", particle: {} },
    matchKind: "missing-type",
    outcome: "generated",
    presetId: getPresetIdForIngress("ingress-particle-missing-type"),
    note: "Particle object present with an omitted, undefined, or null type",
  },
];

const noiseRows: readonly GeneratedLegacyIngressRow[] = [
  ...noiseIngress.flatMap(([type]) =>
    (["Graphics", "Noise"] as const).map((useBackground) => {
      const family = useBackground.toLowerCase();
      const id = `ingress-${family}-${type}`;
      return {
        id,
        match: { useBackground, noise: { type } },
        matchKind: "exact",
        outcome: "generated",
        presetId: getPresetIdForIngress(id),
        ...(type === "graphics"
          ? { note: "Inventory-only alias of balanced-noise" }
          : {}),
      } satisfies GeneratedLegacyIngressRow;
    }),
  ),
  ...(["Graphics", "Noise"] as const).map((useBackground) => {
    const family = useBackground.toLowerCase();
    const id = `ingress-${family}-missing-type`;
    return {
      id,
      match: { useBackground, noise: {} },
      matchKind: "missing-type",
      outcome: "generated",
      presetId: getPresetIdForIngress(id),
      note: "Noise object present with an omitted, undefined, or null type",
    } satisfies GeneratedLegacyIngressRow;
  }),
];

const animatedCatalogueRows = generatedCatalogue.flatMap((entry) =>
  entry.legacyIngressIds
    .filter((ingressId) => ingressId.startsWith("ingress-animated-"))
    .map((ingressId) => {
      const match: LegacyIngressMatchShape = {
        useBackground: "Animated",
        animation: { type: entry.id },
      };

      return {
        id: ingressId,
        match,
        matchKind: "exact",
        outcome: "generated",
        presetId: entry.id,
      } satisfies GeneratedLegacyIngressRow;
    }),
);

export const generatedLegacyIngress = [
  ...patternRows,
  ...particleRows,
  ...noiseRows,
  ...animatedCatalogueRows,
] satisfies readonly GeneratedLegacyIngressRow[];

const passthroughBackgrounds = [
  "Solid",
  "Gradient",
  "Image",
  "Video",
  "Texture",
  "Luminance",
] as const;

export const passthroughLegacyIngress = passthroughBackgrounds.map(
  (useBackground) => ({
    id: `ingress-passthrough-${useBackground.toLowerCase()}`,
    match: { useBackground },
    matchKind: "exact",
    outcome: "passthrough",
  }),
) satisfies readonly PassthroughLegacyIngressRow[];

export const unsupportedLegacyIngress = [
  {
    id: "ingress-unsupported-pattern-missing-family",
    match: { useBackground: "Pattern" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "pattern object is absent",
  },
  {
    id: "ingress-unsupported-pattern-unknown-type",
    match: { useBackground: "Pattern", pattern: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "pattern.type is nonempty and not recognized",
  },
  {
    id: "ingress-unsupported-particle-missing-family",
    match: { useBackground: "Particle" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "particle object is absent",
  },
  {
    id: "ingress-unsupported-particle-unknown-type",
    match: { useBackground: "Particle", particle: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "particle.type is nonempty and not recognized",
  },
  {
    id: "ingress-unsupported-graphics-missing-noise",
    match: { useBackground: "Graphics" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "noise object is absent",
  },
  {
    id: "ingress-unsupported-noise-missing-noise",
    match: { useBackground: "Noise" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "noise object is absent",
  },
  {
    id: "ingress-unsupported-graphics-unknown-noise-type",
    match: { useBackground: "Graphics", noise: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "noise.type is nonempty and not recognized",
  },
  {
    id: "ingress-unsupported-noise-unknown-noise-type",
    match: { useBackground: "Noise", noise: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "noise.type is nonempty and not recognized",
  },
  {
    id: "ingress-unsupported-unknown-wire",
    match: { useBackground: "*" },
    matchKind: "unknown-wire",
    outcome: "unsupported",
    note: "useBackground is absent or not recognized",
  },
] satisfies readonly UnsupportedLegacyIngressRow[];

export const legacyIngress = [
  ...generatedLegacyIngress,
  ...passthroughLegacyIngress,
  ...unsupportedLegacyIngress,
] satisfies readonly LegacyIngressRow[];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const extractTemplateVariation = (
  wire: LegacyWirePayload,
): LegacyWireObject | null => {
  if (!isRecord(wire)) {
    return null;
  }

  if (typeof wire.useBackground === "string") {
    return wire;
  }

  if (isRecord(wire.templateVariation)) {
    return wire.templateVariation;
  }

  if (isRecord(wire.videoMeta) && isRecord(wire.videoMeta.video)) {
    const templateVariation = wire.videoMeta.video.templateVariation;
    if (isRecord(templateVariation)) {
      return templateVariation;
    }
  }

  return null;
};

const writeVariationIntoWire = (
  originalWire: LegacyWirePayload,
  variation: LegacyWireObject,
): LegacyWirePayload => {
  if (!isRecord(originalWire)) {
    return variation;
  }

  if (isRecord(originalWire.templateVariation)) {
    return {
      ...originalWire,
      templateVariation: {
        ...originalWire.templateVariation,
        ...variation,
      },
    };
  }

  if (typeof originalWire.useBackground === "string") {
    return {
      ...originalWire,
      ...variation,
    };
  }

  if (
    isRecord(originalWire.videoMeta) &&
    isRecord(originalWire.videoMeta.video)
  ) {
    return {
      ...originalWire,
      videoMeta: {
        ...originalWire.videoMeta,
        video: {
          ...originalWire.videoMeta.video,
          templateVariation: {
            ...(isRecord(originalWire.videoMeta.video.templateVariation)
              ? originalWire.videoMeta.video.templateVariation
              : {}),
            ...variation,
          },
        },
      },
    };
  }

  return { templateVariation: variation };
};

const mergeCanonicalEgressIntoVariation = (
  existing: LegacyWireObject,
  egress: LegacyEgressPayload,
): LegacyWireObject => ({
  ...existing,
  useBackground: "Animated",
  animation: {
    ...(isRecord(existing.animation) ? existing.animation : {}),
    ...egress.animation,
  },
});

const findGeneratedRow = ({
  useBackground,
  type,
}: {
  useBackground: "Pattern" | "Particle" | "Graphics" | "Noise";
  type: string | null;
}): GeneratedLegacyIngressRow | undefined =>
  generatedLegacyIngress.find((row) => {
    if (row.match.useBackground !== useBackground) return false;
    if (type === null) return row.matchKind === "missing-type";

    const rowType =
      row.match.pattern?.type ??
      row.match.particle?.type ??
      row.match.noise?.type ??
      row.match.animation?.type;
    return row.matchKind === "exact" && rowType === type;
  });

const unsupported = (
  ingressId: string,
  reason: UnsupportedIngressReason,
): UnsupportedIngressMatch => ({
  outcome: "unsupported",
  ingressId,
  reason,
});

const matchGeneratedFamily = ({
  wire,
  useBackground,
  familyKey,
  missingFamilyIngressId,
  unknownTypeIngressId,
}: {
  wire: LegacyWireObject;
  useBackground: "Pattern" | "Particle" | "Graphics" | "Noise";
  familyKey: "pattern" | "particle" | "noise";
  missingFamilyIngressId: string;
  unknownTypeIngressId: string;
}): LegacyIngressMatchResult => {
  const family = wire[familyKey];
  if (!isRecord(family)) {
    return unsupported(missingFamilyIngressId, "missing-family");
  }

  const discriminator = family.type;
  const type =
    discriminator === null || discriminator === undefined
      ? null
      : typeof discriminator === "string" && discriminator.length > 0
        ? discriminator
        : undefined;

  if (type === undefined) {
    return unsupported(unknownTypeIngressId, "unknown-discriminator");
  }

  const row = findGeneratedRow({ useBackground, type });
  if (!row) {
    return unsupported(unknownTypeIngressId, "unknown-discriminator");
  }

  return {
    outcome: "generated",
    ingressId: row.id,
    presetId: row.presetId,
    originalWire: wire,
  };
};

export const matchLegacyIngress = (
  wire: LegacyWirePayload,
): LegacyIngressMatchResult => {
  const extracted = extractTemplateVariation(wire);
  if (!extracted) {
    return unsupported("ingress-unsupported-unknown-wire", "invalid-payload");
  }

  const useBackground = extracted.useBackground;
  if (typeof useBackground !== "string") {
    return unsupported("ingress-unsupported-unknown-wire", "unknown-wire");
  }

  if (useBackground === "Generated") {
    return unsupported("ingress-unsupported-unknown-wire", "unknown-wire");
  }

  if (useBackground === "Animated") {
    const animation = extracted.animation;
    const type = isRecord(animation) ? animation.type : undefined;
    const preset =
      typeof type === "string"
        ? generatedCatalogue.find((entry) => entry.id === type)
        : undefined;

    if (preset) {
      return {
        outcome: "generated",
        ingressId: `ingress-animated-${preset.id}`,
        presetId: preset.id,
        originalWire: extracted,
      };
    }

    if (
      type === "pulsingGradient" ||
      type === "movingGradient" ||
      type === "breathingColor" ||
      type === "waveEffect"
    ) {
      return {
        outcome: "passthrough",
        ingressId: `ingress-animated-${type}`,
        useBackground,
        originalWire: extracted,
      };
    }

    return unsupported(
      "ingress-unsupported-unknown-wire",
      "unknown-discriminator",
    );
  }

  const passthrough = passthroughLegacyIngress.find(
    (row) => row.match.useBackground === useBackground,
  );
  if (passthrough) {
    return {
      outcome: "passthrough",
      ingressId: passthrough.id,
      useBackground,
      originalWire: extracted,
    };
  }

  switch (useBackground) {
    case "Pattern":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "pattern",
        missingFamilyIngressId: "ingress-unsupported-pattern-missing-family",
        unknownTypeIngressId: "ingress-unsupported-pattern-unknown-type",
      });
    case "Particle":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "particle",
        missingFamilyIngressId: "ingress-unsupported-particle-missing-family",
        unknownTypeIngressId: "ingress-unsupported-particle-unknown-type",
      });
    case "Graphics":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "noise",
        missingFamilyIngressId: "ingress-unsupported-graphics-missing-noise",
        unknownTypeIngressId: "ingress-unsupported-graphics-unknown-noise-type",
      });
    case "Noise":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "noise",
        missingFamilyIngressId: "ingress-unsupported-noise-missing-noise",
        unknownTypeIngressId: "ingress-unsupported-noise-unknown-noise-type",
      });
    default:
      return unsupported("ingress-unsupported-unknown-wire", "unknown-wire");
  }
};

export const normalizeForDisplay = (
  match: LegacyIngressMatchResult,
): DisplaySelection => {
  switch (match.outcome) {
    case "generated":
      return { category: "generated", presetId: match.presetId };
    case "passthrough":
      return {
        category: "passthrough",
        useBackground: match.useBackground,
      };
    case "unsupported":
      return {
        category: "unsupported",
        reason: match.reason,
        ingressId: match.ingressId,
      };
    default: {
      const exhaustive: never = match;
      return exhaustive;
    }
  }
};

export const applyCanonicalEgress = (
  presetId: GeneratedPresetId,
): LegacyEgressPayload => getCanonicalEgress(presetId);

export const preserveStickyIngress = (
  originalWire: LegacyWirePayload,
  nextPresetId: GeneratedPresetId,
): LegacyWirePayload => {
  const match = matchLegacyIngress(originalWire);
  if (match.outcome === "generated" && match.presetId === nextPresetId) {
    return originalWire;
  }

  const existing = extractTemplateVariation(originalWire) ?? {};
  const canonical = applyCanonicalEgress(nextPresetId);
  const merged = mergeCanonicalEgressIntoVariation(existing, canonical);

  return writeVariationIntoWire(originalWire, merged);
};

const catalogueIngressIds = new Set(
  generatedCatalogue.flatMap((entry) => entry.legacyIngressIds),
);
const publishedGeneratedIngressIds = new Set(
  generatedLegacyIngress.map((row) => row.id),
);

if (
  catalogueIngressIds.size !== publishedGeneratedIngressIds.size ||
  [...catalogueIngressIds].some((id) => !publishedGeneratedIngressIds.has(id))
) {
  throw new Error("Generated catalogue and ingress rows are out of sync");
}
