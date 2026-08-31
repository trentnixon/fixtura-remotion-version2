import type { NoiseVariant } from "../../NoiseBackground/config";
import type { PatternType } from "../../Patterns/variants/config";
import type { ParticleType } from "../../Particles/config";
import type {
  AuthorControl,
  AnimatedPresetType,
  AnimatedWireConfig,
  DiscoveryMetadata,
  GeneratedCatalogueEntry,
  LegacyEgressPayload,
  OperatorControl,
  PaletteBehaviorState,
  RendererAdapterKey,
} from "./types";

const unresolvedCmsVisibility = {
  status: "unresolved",
  note: "CMS visibility inventory pending",
} satisfies GeneratedCatalogueEntry["operatorVisibility"];

const noReadabilityPolicy = {
  status: "resolved",
  policy: "none",
} satisfies GeneratedCatalogueEntry["readabilityPolicy"];

const animatedOperatorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "preset",
  },
] satisfies readonly OperatorControl[];

const patternPalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.contrast", "background.gradient.primary"],
} satisfies PaletteBehaviorState;

const particlePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.contrast", "background.gradient.primaryRadial"],
} satisfies PaletteBehaviorState;

const particleLinePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.gradient.primaryRadial", "text.onContainer.light"],
} satisfies PaletteBehaviorState;

const snowPalette = {
  status: "resolved",
  mode: "mixed",
  parts: [
    {
      aspect: "background",
      mode: "active-palette",
      roles: ["background.gradient.primaryRadial"],
    },
    {
      aspect: "particles",
      mode: "fixed",
      note: "SnowRenderer hardcodes white particles",
    },
  ],
} satisfies PaletteBehaviorState;

const gridNoisePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.main", "background.accent"],
} satisfies PaletteBehaviorState;

const grainPalette = {
  status: "unresolved",
  note: "Invalid noiseColor implementation defect",
} satisfies PaletteBehaviorState;

const particleNoisePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["container.gradientPrimaryToSecondaryVertical", "container.main"],
} satisfies PaletteBehaviorState;

const gradientGridPalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.accent", "background.main"],
} satisfies PaletteBehaviorState;

const geometricPalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.main", "background.accent", "container.main"],
} satisfies PaletteBehaviorState;

const spokesPalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.gradient", "templateVariation.gradient"],
} satisfies PaletteBehaviorState;

const lightLeakPalette = gridNoisePalette;

const lightLeakReadability = {
  status: "resolved",
  policy: "vignette",
} satisfies GeneratedCatalogueEntry["readabilityPolicy"];

const effectsSolidAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["light-leak"],
    source: "templateVariation",
    affectsRendering: true,
  },
] satisfies readonly AuthorControl[];

const patternAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: [
      "dot-field",
      "line-field",
      "tile-grid",
      "crosshatch-field",
      "triangle-tile",
      "chevron-field",
    ],
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.scale",
    label: "Scale",
    type: "number",
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.rotation",
    label: "Rotation",
    type: "number",
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.motion",
    label: "Animation",
    type: "enum",
    enumValues: [
      "none",
      "panUp",
      "panDown",
      "panLeft",
      "panRight",
      "rotate",
      "pulse",
    ],
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.duration",
    label: "Animation duration",
    type: "number",
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.speed",
    label: "Animation speed",
    type: "number",
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.opacity",
    label: "Opacity",
    type: "number",
    source: "templateVariation",
    affectsRendering: false,
  },
] satisfies readonly AuthorControl[];

const particleAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: [
      "floating-dots",
      "streak-lines",
      "bubble-field",
      "snow-field",
      "confetti-field",
    ],
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.particleCount",
    label: "Particle count",
    type: "number",
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.speed",
    label: "Speed",
    type: "number",
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.direction",
    label: "Direction",
    type: "enum",
    enumValues: ["up", "down", "left", "right", "random"],
    source: "templateVariation",
    affectsRendering: true,
  },
  {
    key: "animation.animation",
    label: "Animation",
    type: "enum",
    enumValues: ["fade", "scale", "slide", "none"],
    source: "templateVariation",
    affectsRendering: false,
  },
] satisfies readonly AuthorControl[];

const noiseAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: [
      "balanced-noise",
      "subtle-noise",
      "grain-field",
      "wave-noise",
      "fog-field",
      "tv-static",
      "floating-particles",
      "dynamic-particles",
      "triangle-swarm",
      "pulsing-circles",
      "digital-rain",
      "gradient-grid",
      "geometric-field",
      "spokes-field",
    ],
    source: "templateVariation",
    affectsRendering: true,
  },
] satisfies readonly AuthorControl[];

type PresetIdentity<Id extends string> = {
  readonly id: Id;
  readonly displayName: string;
  readonly description: string;
  readonly inventoryKey: string;
  readonly discovery: DiscoveryMetadata;
};

const makePatternPreset = <const Id extends string>(
  identity: PresetIdentity<Id>,
  patternType: PatternType,
  legacyIngressIds: readonly string[],
  animationDefaults: Pick<
    AnimatedWireConfig,
    "motion" | "duration" | "speed"
  > = {},
): GeneratedCatalogueEntry & { readonly id: Id } => ({
  ...identity,
  rendererAdapter: "pattern-tiled",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: {
      type: identity.id as AnimatedPresetType,
      scale: 1,
      rotation: 0,
      ...animationDefaults,
    },
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy: noReadabilityPolicy,
  paletteBehavior: patternPalette,
  operatorControls: animatedOperatorControls,
  authorControls: patternAuthorControls,
  legacyIngressIds,
});

const makeParticlePreset = <const Id extends string>(
  identity: PresetIdentity<Id>,
  particleType: ParticleType,
  paletteBehavior: PaletteBehaviorState,
  legacyIngressIds: readonly string[],
): GeneratedCatalogueEntry & { readonly id: Id } => ({
  ...identity,
  rendererAdapter: "particle-field",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: {
      type: identity.id as AnimatedPresetType,
      particleCount: 300,
      speed: 1,
      direction: "random",
    },
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy: noReadabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: particleAuthorControls,
  legacyIngressIds,
});

type NoisePresetOptions<Id extends string> = PresetIdentity<Id> & {
  readonly noiseType: NoiseVariant;
  readonly useBackground: "Noise" | "Graphics";
  readonly rendererAdapter: Exclude<
    RendererAdapterKey,
    "pattern-tiled" | "particle-field"
  >;
  readonly paletteBehavior: PaletteBehaviorState;
  readonly legacyIngressIds: readonly string[];
};

const makeNoisePreset = <const Id extends string>(
  options: NoisePresetOptions<Id>,
): GeneratedCatalogueEntry & { readonly id: Id } => {
  const {
    noiseType,
    useBackground,
    rendererAdapter,
    paletteBehavior,
    legacyIngressIds,
    ...identity
  } = options;

  // Retain these legacy inputs in the factory contract while emitting only
  // the canonical Animated wire shape.
  void noiseType;
  void useBackground;

  return {
    ...identity,
    rendererAdapter,
    defaultConfiguration: {
      useBackground: "Animated",
      animation: { type: identity.id as AnimatedPresetType },
    },
    operatorVisibility: unresolvedCmsVisibility,
    readabilityPolicy: noReadabilityPolicy,
    paletteBehavior,
    operatorControls: animatedOperatorControls,
    authorControls: noiseAuthorControls,
    legacyIngressIds,
  };
};

const makeEffectsSolidPreset = <const Id extends string>(
  identity: PresetIdentity<Id>,
  paletteBehavior: PaletteBehaviorState,
  readabilityPolicy: GeneratedCatalogueEntry["readabilityPolicy"],
  legacyIngressIds: readonly string[],
): GeneratedCatalogueEntry & { readonly id: Id } => ({
  ...identity,
  rendererAdapter: "effects-solid",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id as AnimatedPresetType },
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: effectsSolidAuthorControls,
  legacyIngressIds,
});

const defineGeneratedCatalogue = <
  const Catalogue extends readonly GeneratedCatalogueEntry[],
>(
  catalogue: Catalogue,
): Catalogue => catalogue;

export const generatedCatalogue = defineGeneratedCatalogue([
  makePatternPreset(
    {
      id: "dot-field",
      displayName: "Dot field",
      description:
        "A tiled field of dots with optional pan, rotation, or pulse motion.",
      inventoryKey: "INV-PAT-dots",
      discovery: {
        motionClass: "ambient",
        tags: ["dots", "tile", "pattern"],
        relatedPresetIds: ["floating-dots", "pulsing-circles"],
      },
    },
    "dots",
    ["ingress-pattern-dots", "ingress-pattern-missing-type"],
    { motion: "panLeft", duration: 600, speed: 1 },
  ),
  makePatternPreset(
    {
      id: "line-field",
      displayName: "Line field",
      description: "A tiled line pattern with optional directional motion.",
      inventoryKey: "INV-PAT-lines",
      discovery: {
        motionClass: "ambient",
        tags: ["lines", "tile", "pattern"],
        relatedPresetIds: ["streak-lines"],
      },
    },
    "lines",
    ["ingress-pattern-lines"],
  ),
  makePatternPreset(
    {
      id: "tile-grid",
      displayName: "Tile grid",
      description: "A regular tiled grid drawn from the active palette.",
      inventoryKey: "INV-PAT-grid",
      discovery: {
        motionClass: "ambient",
        tags: ["grid", "tile", "pattern"],
        relatedPresetIds: ["gradient-grid"],
      },
    },
    "grid",
    ["ingress-pattern-grid"],
  ),
  makePatternPreset(
    {
      id: "crosshatch-field",
      displayName: "Crosshatch",
      description:
        "A layered crosshatch pattern drawn from the active palette.",
      inventoryKey: "INV-PAT-crosshatch",
      discovery: {
        motionClass: "ambient",
        tags: ["crosshatch", "tile", "pattern"],
      },
    },
    "crosshatch",
    ["ingress-pattern-crosshatch"],
  ),
  makePatternPreset(
    {
      id: "triangle-tile",
      displayName: "Triangle tile",
      description: "A repeating triangle motif with optional ambient motion.",
      inventoryKey: "INV-PAT-triangles",
      discovery: {
        motionClass: "ambient",
        tags: ["triangles", "tile", "pattern"],
        relatedPresetIds: ["triangle-swarm"],
      },
    },
    "triangles",
    ["ingress-pattern-triangles"],
  ),
  makePatternPreset(
    {
      id: "chevron-field",
      displayName: "Chevron",
      description: "A repeating chevron pattern drawn from the active palette.",
      inventoryKey: "INV-PAT-chevron",
      discovery: {
        motionClass: "ambient",
        tags: ["chevron", "tile", "pattern"],
      },
    },
    "chevron",
    ["ingress-pattern-chevron"],
  ),
  makeParticlePreset(
    {
      id: "floating-dots",
      displayName: "Floating dots",
      description: "A moving field of dot particles.",
      inventoryKey: "INV-PAR-dots",
      discovery: {
        motionClass: "ambient",
        tags: ["dots", "particles", "floating"],
        relatedPresetIds: ["dot-field", "floating-particles"],
      },
    },
    "dots",
    particlePalette,
    ["ingress-particle-dots", "ingress-particle-missing-type"],
  ),
  makeParticlePreset(
    {
      id: "streak-lines",
      displayName: "Streak lines",
      description:
        "A moving field of line particles using the template text palette.",
      inventoryKey: "INV-PAR-lines",
      discovery: {
        motionClass: "energetic",
        tags: ["lines", "particles", "streaks"],
        relatedPresetIds: ["line-field"],
      },
    },
    "lines",
    particleLinePalette,
    ["ingress-particle-lines"],
  ),
  makeParticlePreset(
    {
      id: "bubble-field",
      displayName: "Bubbles",
      description: "A moving field of bubble particles.",
      inventoryKey: "INV-PAR-bubbles",
      discovery: {
        motionClass: "ambient",
        tags: ["bubbles", "particles", "floating"],
      },
    },
    "bubbles",
    particlePalette,
    ["ingress-particle-bubbles"],
  ),
  makeParticlePreset(
    {
      id: "snow-field",
      displayName: "Snow",
      description: "White snow particles over an active-palette background.",
      inventoryKey: "INV-PAR-snow",
      discovery: {
        motionClass: "ambient",
        tags: ["snow", "particles", "white"],
      },
    },
    "snow",
    snowPalette,
    ["ingress-particle-snow"],
  ),
  makeParticlePreset(
    {
      id: "confetti-field",
      displayName: "Confetti",
      description: "An energetic field of confetti particles.",
      inventoryKey: "INV-PAR-confetti",
      discovery: {
        motionClass: "energetic",
        tags: ["confetti", "particles", "celebration"],
      },
    },
    "confetti",
    particlePalette,
    ["ingress-particle-confetti"],
  ),
  makeNoisePreset({
    id: "balanced-noise",
    displayName: "Balanced noise",
    description: "The default animated noise grid with balanced settings.",
    inventoryKey: "INV-NOI-default",
    noiseType: "default",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: gridNoisePalette,
    legacyIngressIds: [
      "ingress-graphics-default",
      "ingress-noise-default",
      "ingress-graphics-missing-type",
      "ingress-noise-missing-type",
      "ingress-graphics-graphics",
      "ingress-noise-graphics",
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["noise", "grid", "balanced"],
      relatedPresetIds: ["subtle-noise", "grain-field"],
    },
  }),
  makeNoisePreset({
    id: "subtle-noise",
    displayName: "Subtle noise",
    description: "A low-opacity animated noise texture.",
    inventoryKey: "INV-NOI-subtle",
    noiseType: "subtle",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: gridNoisePalette,
    legacyIngressIds: ["ingress-graphics-subtle", "ingress-noise-subtle"],
    discovery: { motionClass: "ambient", tags: ["noise", "subtle", "texture"] },
  }),
  makeNoisePreset({
    id: "grain-field",
    displayName: "Film grain",
    description:
      "A fine animated grain texture with unresolved colour behavior.",
    inventoryKey: "INV-NOI-grain",
    noiseType: "grain",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: grainPalette,
    legacyIngressIds: ["ingress-graphics-grain", "ingress-noise-grain"],
    discovery: { motionClass: "ambient", tags: ["grain", "noise", "texture"] },
  }),
  makeNoisePreset({
    id: "wave-noise",
    displayName: "Wave noise",
    description: "A flowing animated noise field.",
    inventoryKey: "INV-NOI-wave",
    noiseType: "wave",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: gridNoisePalette,
    legacyIngressIds: ["ingress-graphics-wave", "ingress-noise-wave"],
    discovery: { motionClass: "ambient", tags: ["wave", "noise", "flow"] },
  }),
  makeNoisePreset({
    id: "fog-field",
    displayName: "Fog",
    description: "A soft animated fog-like noise field.",
    inventoryKey: "INV-NOI-fog",
    noiseType: "fog",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: gridNoisePalette,
    legacyIngressIds: ["ingress-graphics-fog", "ingress-noise-fog"],
    discovery: { motionClass: "ambient", tags: ["fog", "noise", "soft"] },
  }),
  makeNoisePreset({
    id: "tv-static",
    displayName: "TV static",
    description: "A fast, high-contrast animated static field.",
    inventoryKey: "INV-NOI-static",
    noiseType: "static",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: gridNoisePalette,
    legacyIngressIds: ["ingress-graphics-static", "ingress-noise-static"],
    discovery: {
      motionClass: "energetic",
      tags: ["static", "noise", "television"],
    },
  }),
  makeNoisePreset({
    id: "floating-particles",
    displayName: "Floating particles",
    description: "A dense field of slowly moving circular particles.",
    inventoryKey: "INV-NOI-floatingParticles",
    noiseType: "floatingParticles",
    useBackground: "Graphics",
    rendererAdapter: "particle-noise",
    paletteBehavior: particleNoisePalette,
    legacyIngressIds: [
      "ingress-graphics-floatingParticles",
      "ingress-noise-floatingParticles",
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["particles", "floating", "circles"],
      relatedPresetIds: ["floating-dots", "dynamic-particles"],
    },
  }),
  makeNoisePreset({
    id: "dynamic-particles",
    displayName: "Dynamic particles",
    description: "A lighter, more energetic moving particle field.",
    inventoryKey: "INV-NOI-dynamicParticles",
    noiseType: "dynamicParticles",
    useBackground: "Noise",
    rendererAdapter: "particle-noise",
    paletteBehavior: particleNoisePalette,
    legacyIngressIds: [
      "ingress-graphics-dynamicParticles",
      "ingress-noise-dynamicParticles",
    ],
    discovery: {
      motionClass: "energetic",
      tags: ["particles", "dynamic", "circles"],
      relatedPresetIds: ["floating-particles"],
    },
  }),
  makeNoisePreset({
    id: "triangle-swarm",
    displayName: "Triangle swarm",
    description: "A moving field of triangle particles.",
    inventoryKey: "INV-NOI-triangleSwarm",
    noiseType: "triangleSwarm",
    useBackground: "Noise",
    rendererAdapter: "particle-noise",
    paletteBehavior: particleNoisePalette,
    legacyIngressIds: [
      "ingress-graphics-triangleSwarm",
      "ingress-noise-triangleSwarm",
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["triangles", "particles", "swarm"],
      relatedPresetIds: ["triangle-tile"],
    },
  }),
  makeNoisePreset({
    id: "pulsing-circles",
    displayName: "Pulsing circles",
    description: "A grid of soft circles driven by animated noise.",
    inventoryKey: "INV-NOI-pulsingCircles",
    noiseType: "pulsingCircles",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: gridNoisePalette,
    legacyIngressIds: [
      "ingress-graphics-pulsingCircles",
      "ingress-noise-pulsingCircles",
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["circles", "pulse", "grid"],
      relatedPresetIds: ["dot-field"],
    },
  }),
  makeNoisePreset({
    id: "digital-rain",
    displayName: "Digital rain",
    description: "A field of falling line particles.",
    inventoryKey: "INV-NOI-digitalRain",
    noiseType: "digitalRain",
    useBackground: "Noise",
    rendererAdapter: "particle-noise",
    paletteBehavior: particleNoisePalette,
    legacyIngressIds: [
      "ingress-graphics-digitalRain",
      "ingress-noise-digitalRain",
    ],
    discovery: { motionClass: "energetic", tags: ["digital", "rain", "lines"] },
  }),
  makeNoisePreset({
    id: "gradient-grid",
    displayName: "Gradient grid",
    description: "An animated noise grid blended across palette colours.",
    inventoryKey: "INV-NOI-gradientGrid",
    noiseType: "gradientGrid",
    useBackground: "Noise",
    rendererAdapter: "grid-noise",
    paletteBehavior: gradientGridPalette,
    legacyIngressIds: [
      "ingress-graphics-gradientGrid",
      "ingress-noise-gradientGrid",
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["gradient", "grid", "noise"],
      relatedPresetIds: ["tile-grid"],
    },
  }),
  makeNoisePreset({
    id: "geometric-field",
    displayName: "Geometric field",
    description: "Animated geometric SVG shapes drawn from the active palette.",
    inventoryKey: "INV-NOI-geometric",
    noiseType: "geometric",
    useBackground: "Graphics",
    rendererAdapter: "svg-geometric",
    paletteBehavior: geometricPalette,
    legacyIngressIds: ["ingress-graphics-geometric", "ingress-noise-geometric"],
    discovery: {
      motionClass: "energetic",
      tags: ["geometry", "svg", "shapes"],
      relatedPresetIds: ["triangle-tile", "triangle-swarm"],
    },
  }),
  makeNoisePreset({
    id: "spokes-field",
    displayName: "Radial spokes",
    description: "An animated radial spokes sequence over a palette gradient.",
    inventoryKey: "INV-NOI-spokes",
    noiseType: "spokes",
    useBackground: "Graphics",
    rendererAdapter: "svg-spokes",
    paletteBehavior: spokesPalette,
    legacyIngressIds: ["ingress-graphics-spokes", "ingress-noise-spokes"],
    discovery: {
      motionClass: "intro-sequence",
      tags: ["spokes", "radial", "svg"],
    },
  }),
  makeEffectsSolidPreset(
    {
      id: "light-leak",
      displayName: "Light leak",
      description:
        "A cinematic two-colour light leak overlay with an internally randomized variant.",
      inventoryKey: "INV-EFF-lightLeak",
      discovery: {
        motionClass: "ambient",
        tags: ["light-leak", "gradient", "cinematic"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-light-leak"],
  ),
]);

export type GeneratedPresetId = (typeof generatedCatalogue)[number]["id"];

const toRendererAdapterPair = (
  entry: (typeof generatedCatalogue)[number],
): readonly [GeneratedPresetId, RendererAdapterKey] => [
  entry.id,
  entry.rendererAdapter,
];

export const rendererAdapterRegistry: ReadonlyMap<
  GeneratedPresetId,
  RendererAdapterKey
> = new Map(generatedCatalogue.map(toRendererAdapterPair));

export const isOperatorSelectable = (entry: GeneratedCatalogueEntry): boolean =>
  entry.operatorVisibility.status === "resolved-visible" &&
  entry.readabilityPolicy.status === "resolved" &&
  entry.paletteBehavior.status === "resolved";

export const operatorPresets = generatedCatalogue.filter(isOperatorSelectable);

export const findGeneratedPresetByLegacyIngressId = (
  legacyIngressId: string,
): (typeof generatedCatalogue)[number] | undefined =>
  generatedCatalogue.find((entry) =>
    entry.legacyIngressIds.includes(legacyIngressId),
  );

export const getCanonicalEgress = (
  presetId: GeneratedPresetId,
): LegacyEgressPayload => {
  const preset = generatedCatalogue.find((entry) => entry.id === presetId);

  if (!preset) {
    throw new Error(`Catalogue invariant failed for preset: ${presetId}`);
  }

  return preset.defaultConfiguration;
};
