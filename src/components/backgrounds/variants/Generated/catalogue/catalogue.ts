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

const particleLinePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.gradient.primaryRadial", "text.onContainer.light"],
} satisfies PaletteBehaviorState;

const gridNoisePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.main", "background.accent"],
} satisfies PaletteBehaviorState;

const particleNoisePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["container.gradientPrimaryToSecondaryVertical", "container.main"],
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
    enumValues: [
      "light-leak",
      "broadcast-halftone",
      "topographic-flow",
      "signal-grid",
      "reactive-path",
    ],
    source: "templateVariation",
    affectsRendering: true,
  },
] satisfies readonly AuthorControl[];

const motionAssetAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["motion-motif"],
    source: "templateVariation",
    affectsRendering: true,
  },
] satisfies readonly AuthorControl[];

const htmlInCanvasAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: [
      "html-orbit-rings",
      "html-scoreboard-grid",
      "html-neon-beams",
    ],
    source: "templateVariation",
    affectsRendering: true,
  },
] satisfies readonly AuthorControl[];

const threeSceneAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["webgpu-metal-wave"],
    source: "templateVariation",
    affectsRendering: true,
  },
] satisfies readonly AuthorControl[];

const patternAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["dot-field"],
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
    enumValues: ["streak-lines"],
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
      "floating-particles",
      "pulsing-circles",
      "digital-rain",
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

const makeMotionAssetPreset = <const Id extends string>(
  identity: PresetIdentity<Id>,
  paletteBehavior: PaletteBehaviorState,
  readabilityPolicy: GeneratedCatalogueEntry["readabilityPolicy"],
  legacyIngressIds: readonly string[],
): GeneratedCatalogueEntry & { readonly id: Id } => ({
  ...identity,
  rendererAdapter: "motion-asset",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id as AnimatedPresetType },
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: motionAssetAuthorControls,
  legacyIngressIds,
});

const makeHtmlInCanvasPreset = <const Id extends string>(
  identity: PresetIdentity<Id>,
  paletteBehavior: PaletteBehaviorState,
  readabilityPolicy: GeneratedCatalogueEntry["readabilityPolicy"],
  legacyIngressIds: readonly string[],
): GeneratedCatalogueEntry & { readonly id: Id } => ({
  ...identity,
  rendererAdapter: "html-in-canvas",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id as AnimatedPresetType },
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: htmlInCanvasAuthorControls,
  legacyIngressIds,
});

const makeThreeScenePreset = <const Id extends string>(
  identity: PresetIdentity<Id>,
  paletteBehavior: PaletteBehaviorState,
  readabilityPolicy: GeneratedCatalogueEntry["readabilityPolicy"],
  legacyIngressIds: readonly string[],
): GeneratedCatalogueEntry & { readonly id: Id } => ({
  ...identity,
  rendererAdapter: "three-scene",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id as AnimatedPresetType },
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: threeSceneAuthorControls,
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
      displayName: "Soft Dots",
      description: "A gentle dotted pattern in your club colours.",
      inventoryKey: "INV-PAT-dots",
      discovery: {
        motionClass: "ambient",
        tags: ["dots", "tile", "pattern"],
        relatedPresetIds: ["pulsing-circles"],
      },
    },
    "dots",
    ["ingress-pattern-dots", "ingress-pattern-missing-type"],
    { motion: "panLeft", duration: 600, speed: 1 },
  ),
  makeParticlePreset(
    {
      id: "streak-lines",
      displayName: "Speed Lines",
      description: "Dynamic streaks that suggest motion and energy.",
      inventoryKey: "INV-PAR-lines",
      discovery: {
        motionClass: "energetic",
        tags: ["lines", "particles", "streaks"],
        relatedPresetIds: ["digital-rain"],
      },
    },
    "lines",
    particleLinePalette,
    ["ingress-particle-lines", "ingress-particle-missing-type"],
  ),
  makeNoisePreset({
    id: "floating-particles",
    displayName: "Drifting Lights",
    description: "Soft lights floating slowly across the background.",
    inventoryKey: "INV-NOI-floatingParticles",
    noiseType: "floatingParticles",
    useBackground: "Graphics",
    rendererAdapter: "particle-noise",
    paletteBehavior: particleNoisePalette,
    legacyIngressIds: [
      "ingress-graphics-floatingParticles",
      "ingress-noise-floatingParticles",
      "ingress-graphics-default",
      "ingress-noise-default",
      "ingress-graphics-missing-type",
      "ingress-noise-missing-type",
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["particles", "floating", "circles"],
      relatedPresetIds: ["dot-field", "pulsing-circles"],
    },
  }),
  makeNoisePreset({
    id: "pulsing-circles",
    displayName: "Breathing Circles",
    description: "Soft circles that gently expand and fade.",
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
    displayName: "Falling Lines",
    description: "Vertical lines cascading down the screen.",
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
    id: "spokes-field",
    displayName: "Sunburst",
    description: "Radiating spokes over a smooth colour gradient.",
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
      displayName: "Cinematic Glow",
      description: "Warm colour washes moving across the frame.",
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
  makeEffectsSolidPreset(
    {
      id: "broadcast-halftone",
      displayName: "Halftone Blend",
      description:
        "Classic print-style dots blended with your club colours.",
      inventoryKey: "INV-EFF-broadcastHalftone",
      discovery: {
        motionClass: "ambient",
        tags: ["halftone", "gradient", "broadcast"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-broadcast-halftone"],
  ),
  makeEffectsSolidPreset(
    {
      id: "topographic-flow",
      displayName: "Flowing Contours",
      description: "Slow-moving colour bands like rolling terrain.",
      inventoryKey: "INV-EFF-topographicFlow",
      discovery: {
        motionClass: "ambient",
        tags: ["topographic", "contours", "liquid"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-topographic-flow"],
  ),
  makeEffectsSolidPreset(
    {
      id: "signal-grid",
      displayName: "Live Grid",
      description: "A perspective grid with a broadcast studio feel.",
      inventoryKey: "INV-EFF-signalGrid",
      discovery: {
        motionClass: "ambient",
        tags: ["grid", "scanlines", "perspective"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-signal-grid"],
  ),
  makeEffectsSolidPreset(
    {
      id: "reactive-path",
      displayName: "Route Pulse",
      description: "Travelling energy marks along curved paths.",
      inventoryKey: "INV-EFF-reactivePath",
      discovery: {
        motionClass: "energetic",
        tags: ["paths", "orbits", "routes"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-reactive-path"],
  ),
  makeMotionAssetPreset(
    {
      id: "motion-motif",
      displayName: "Club Motif",
      description: "A looping animated emblem in your club colours.",
      inventoryKey: "INV-MOT-motionMotif",
      discovery: {
        motionClass: "ambient",
        tags: ["lottie", "motif", "motion-asset"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-motion-motif"],
  ),
  makeHtmlInCanvasPreset(
    {
      id: "html-orbit-rings",
      displayName: "Orbit Rings",
      description: "Concentric rings with a soft glowing finish.",
      inventoryKey: "INV-HIC-htmlOrbitRings",
      discovery: {
        motionClass: "ambient",
        tags: ["html-in-canvas", "orbits", "rings"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-html-orbit-rings"],
  ),
  makeHtmlInCanvasPreset(
    {
      id: "html-scoreboard-grid",
      displayName: "Stadium Grid",
      description: "A scoreboard-style grid with broadcast glow.",
      inventoryKey: "INV-HIC-htmlScoreboardGrid",
      discovery: {
        motionClass: "ambient",
        tags: ["html-in-canvas", "grid", "scoreboard"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-html-scoreboard-grid"],
  ),
  makeHtmlInCanvasPreset(
    {
      id: "html-neon-beams",
      displayName: "Neon Sweep",
      description: "Diagonal neon light sweeps across the background.",
      inventoryKey: "INV-HIC-htmlNeonBeams",
      discovery: {
        motionClass: "energetic",
        tags: ["html-in-canvas", "neon", "beams"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-html-neon-beams"],
  ),
  makeThreeScenePreset(
    {
      id: "webgpu-metal-wave",
      displayName: "Liquid Metal",
      description: "Shimmering metallic waves in your club colours.",
      inventoryKey: "INV-3SC-webgpuMetalWave",
      discovery: {
        motionClass: "ambient",
        tags: ["three-scene", "webgpu", "metal", "tsl"],
      },
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-webgpu-metal-wave"],
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
