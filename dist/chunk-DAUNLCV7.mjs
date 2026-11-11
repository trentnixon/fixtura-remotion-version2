var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/components/backgrounds/variants/Generated/catalogue/catalogue.ts
var unresolvedCmsVisibility = {
  status: "unresolved",
  note: "CMS visibility inventory pending"
};
var noReadabilityPolicy = {
  status: "resolved",
  policy: "none"
};
var animatedOperatorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "preset"
  }
];
var patternPalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.contrast", "background.gradient.primary"]
};
var particleLinePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.gradient.primaryRadial", "text.onContainer.light"]
};
var gridNoisePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.main", "background.accent"]
};
var particleNoisePalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["container.gradientPrimaryToSecondaryVertical", "container.main"]
};
var spokesPalette = {
  status: "resolved",
  mode: "active-palette",
  roles: ["background.gradient", "templateVariation.gradient"]
};
var lightLeakPalette = gridNoisePalette;
var lightLeakReadability = {
  status: "resolved",
  policy: "vignette"
};
var effectsSolidAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: [
      "light-leak",
      "broadcast-halftone",
      "topographic-flow",
      "signal-grid",
      "reactive-path"
    ],
    source: "templateVariation",
    affectsRendering: true
  }
];
var motionAssetAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["motion-motif"],
    source: "templateVariation",
    affectsRendering: true
  }
];
var htmlInCanvasAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["html-orbit-rings", "html-scoreboard-grid", "html-neon-beams"],
    source: "templateVariation",
    affectsRendering: true
  }
];
var threeSceneAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["webgpu-metal-wave"],
    source: "templateVariation",
    affectsRendering: true
  }
];
var patternAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["dot-field"],
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.scale",
    label: "Scale",
    type: "number",
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.rotation",
    label: "Rotation",
    type: "number",
    source: "templateVariation",
    affectsRendering: true
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
      "pulse"
    ],
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.duration",
    label: "Animation duration",
    type: "number",
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.speed",
    label: "Animation speed",
    type: "number",
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.opacity",
    label: "Opacity",
    type: "number",
    source: "templateVariation",
    affectsRendering: false
  }
];
var particleAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: ["streak-lines"],
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.particleCount",
    label: "Particle count",
    type: "number",
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.speed",
    label: "Speed",
    type: "number",
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.direction",
    label: "Direction",
    type: "enum",
    enumValues: ["up", "down", "left", "right", "random"],
    source: "templateVariation",
    affectsRendering: true
  },
  {
    key: "animation.animation",
    label: "Animation",
    type: "enum",
    enumValues: ["fade", "scale", "slide", "none"],
    source: "templateVariation",
    affectsRendering: false
  }
];
var noiseAuthorControls = [
  {
    key: "animation.type",
    label: "Animated preset",
    type: "enum",
    enumValues: [
      "floating-particles",
      "pulsing-circles",
      "digital-rain",
      "spokes-field"
    ],
    source: "templateVariation",
    affectsRendering: true
  }
];
var makePatternPreset = (identity, patternType, legacyIngressIds, animationDefaults = {}) => ({
  ...identity,
  rendererAdapter: "pattern-tiled",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: {
      type: identity.id,
      scale: 1,
      rotation: 0,
      ...animationDefaults
    }
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy: noReadabilityPolicy,
  paletteBehavior: patternPalette,
  operatorControls: animatedOperatorControls,
  authorControls: patternAuthorControls,
  legacyIngressIds
});
var makeParticlePreset = (identity, particleType, paletteBehavior, legacyIngressIds) => ({
  ...identity,
  rendererAdapter: "particle-field",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: {
      type: identity.id,
      particleCount: 300,
      speed: 1,
      direction: "random"
    }
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy: noReadabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: particleAuthorControls,
  legacyIngressIds
});
var makeNoisePreset = (options) => {
  const {
    noiseType,
    useBackground,
    rendererAdapter,
    paletteBehavior,
    legacyIngressIds,
    ...identity
  } = options;
  void noiseType;
  void useBackground;
  return {
    ...identity,
    rendererAdapter,
    defaultConfiguration: {
      useBackground: "Animated",
      animation: { type: identity.id }
    },
    operatorVisibility: unresolvedCmsVisibility,
    readabilityPolicy: noReadabilityPolicy,
    paletteBehavior,
    operatorControls: animatedOperatorControls,
    authorControls: noiseAuthorControls,
    legacyIngressIds
  };
};
var makeEffectsSolidPreset = (identity, paletteBehavior, readabilityPolicy, legacyIngressIds) => ({
  ...identity,
  rendererAdapter: "effects-solid",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id }
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: effectsSolidAuthorControls,
  legacyIngressIds
});
var makeMotionAssetPreset = (identity, paletteBehavior, readabilityPolicy, legacyIngressIds) => ({
  ...identity,
  rendererAdapter: "motion-asset",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id }
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: motionAssetAuthorControls,
  legacyIngressIds
});
var makeHtmlInCanvasPreset = (identity, paletteBehavior, readabilityPolicy, legacyIngressIds) => ({
  ...identity,
  rendererAdapter: "html-in-canvas",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id }
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: htmlInCanvasAuthorControls,
  legacyIngressIds
});
var makeThreeScenePreset = (identity, paletteBehavior, readabilityPolicy, legacyIngressIds) => ({
  ...identity,
  rendererAdapter: "three-scene",
  defaultConfiguration: {
    useBackground: "Animated",
    animation: { type: identity.id }
  },
  operatorVisibility: unresolvedCmsVisibility,
  readabilityPolicy,
  paletteBehavior,
  operatorControls: animatedOperatorControls,
  authorControls: threeSceneAuthorControls,
  legacyIngressIds
});
var defineGeneratedCatalogue = (catalogue) => catalogue;
var generatedCatalogue = defineGeneratedCatalogue([
  makePatternPreset(
    {
      id: "dot-field",
      displayName: "Soft Dots",
      description: "A gentle dotted pattern in your club colours.",
      inventoryKey: "INV-PAT-dots",
      discovery: {
        motionClass: "ambient",
        tags: ["dots", "tile", "pattern"],
        relatedPresetIds: ["pulsing-circles"]
      }
    },
    "dots",
    ["ingress-pattern-dots", "ingress-pattern-missing-type"],
    { motion: "panLeft", duration: 600, speed: 1 }
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
        relatedPresetIds: ["digital-rain"]
      }
    },
    "lines",
    particleLinePalette,
    ["ingress-particle-lines", "ingress-particle-missing-type"]
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
      "ingress-noise-missing-type"
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["particles", "floating", "circles"],
      relatedPresetIds: ["dot-field", "pulsing-circles"]
    }
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
      "ingress-noise-pulsingCircles"
    ],
    discovery: {
      motionClass: "ambient",
      tags: ["circles", "pulse", "grid"],
      relatedPresetIds: ["dot-field"]
    }
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
      "ingress-noise-digitalRain"
    ],
    discovery: { motionClass: "energetic", tags: ["digital", "rain", "lines"] }
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
      tags: ["spokes", "radial", "svg"]
    }
  }),
  makeEffectsSolidPreset(
    {
      id: "light-leak",
      displayName: "Cinematic Glow",
      description: "Warm colour washes moving across the frame.",
      inventoryKey: "INV-EFF-lightLeak",
      discovery: {
        motionClass: "ambient",
        tags: ["light-leak", "gradient", "cinematic"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-light-leak"]
  ),
  makeEffectsSolidPreset(
    {
      id: "broadcast-halftone",
      displayName: "Halftone Blend",
      description: "Classic print-style dots blended with your club colours.",
      inventoryKey: "INV-EFF-broadcastHalftone",
      discovery: {
        motionClass: "ambient",
        tags: ["halftone", "gradient", "broadcast"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-broadcast-halftone"]
  ),
  makeEffectsSolidPreset(
    {
      id: "topographic-flow",
      displayName: "Flowing Contours",
      description: "Slow-moving colour bands like rolling terrain.",
      inventoryKey: "INV-EFF-topographicFlow",
      discovery: {
        motionClass: "ambient",
        tags: ["topographic", "contours", "liquid"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-topographic-flow"]
  ),
  makeEffectsSolidPreset(
    {
      id: "signal-grid",
      displayName: "Live Grid",
      description: "A perspective grid with a broadcast studio feel.",
      inventoryKey: "INV-EFF-signalGrid",
      discovery: {
        motionClass: "ambient",
        tags: ["grid", "scanlines", "perspective"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-signal-grid"]
  ),
  makeEffectsSolidPreset(
    {
      id: "reactive-path",
      displayName: "Route Pulse",
      description: "Travelling energy marks along curved paths.",
      inventoryKey: "INV-EFF-reactivePath",
      discovery: {
        motionClass: "energetic",
        tags: ["paths", "orbits", "routes"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-reactive-path"]
  ),
  makeMotionAssetPreset(
    {
      id: "motion-motif",
      displayName: "Club Motif",
      description: "A looping animated emblem in your club colours.",
      inventoryKey: "INV-MOT-motionMotif",
      discovery: {
        motionClass: "ambient",
        tags: ["lottie", "motif", "motion-asset"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-motion-motif"]
  ),
  makeHtmlInCanvasPreset(
    {
      id: "html-orbit-rings",
      displayName: "Orbit Rings",
      description: "Concentric rings with a soft glowing finish.",
      inventoryKey: "INV-HIC-htmlOrbitRings",
      discovery: {
        motionClass: "ambient",
        tags: ["html-in-canvas", "orbits", "rings"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-html-orbit-rings"]
  ),
  makeHtmlInCanvasPreset(
    {
      id: "html-scoreboard-grid",
      displayName: "Stadium Grid",
      description: "A scoreboard-style grid with broadcast glow.",
      inventoryKey: "INV-HIC-htmlScoreboardGrid",
      discovery: {
        motionClass: "ambient",
        tags: ["html-in-canvas", "grid", "scoreboard"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-html-scoreboard-grid"]
  ),
  makeHtmlInCanvasPreset(
    {
      id: "html-neon-beams",
      displayName: "Neon Sweep",
      description: "Diagonal neon light sweeps across the background.",
      inventoryKey: "INV-HIC-htmlNeonBeams",
      discovery: {
        motionClass: "energetic",
        tags: ["html-in-canvas", "neon", "beams"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-html-neon-beams"]
  ),
  makeThreeScenePreset(
    {
      id: "webgpu-metal-wave",
      displayName: "Liquid Metal",
      description: "Shimmering metallic waves in your club colours.",
      inventoryKey: "INV-3SC-webgpuMetalWave",
      discovery: {
        motionClass: "ambient",
        tags: ["three-scene", "webgpu", "metal", "tsl"]
      }
    },
    lightLeakPalette,
    lightLeakReadability,
    ["ingress-animated-webgpu-metal-wave"]
  )
]);
var isGeneratedPresetId = (value) => generatedCatalogue.some((entry) => entry.id === value);
var toRendererAdapterPair = (entry) => [
  entry.id,
  entry.rendererAdapter
];
var rendererAdapterRegistry = new Map(generatedCatalogue.map(toRendererAdapterPair));
var isOperatorSelectable = (entry) => entry.operatorVisibility.status === "resolved-visible" && entry.readabilityPolicy.status === "resolved" && entry.paletteBehavior.status === "resolved";
var operatorPresets = generatedCatalogue.filter(isOperatorSelectable);
var findGeneratedPresetByLegacyIngressId = (legacyIngressId) => generatedCatalogue.find(
  (entry) => entry.legacyIngressIds.includes(legacyIngressId)
);

// src/components/backgrounds/variants/Generated/catalogue/ingress.ts
var patternIngress = [["dots", "dot-field"]];
var particleIngress = [["lines", "streak-lines"]];
var noiseIngress = [
  ["default", "floating-particles"],
  ["floatingParticles", "floating-particles"],
  ["pulsingCircles", "pulsing-circles"],
  ["digitalRain", "digital-rain"],
  ["spokes", "spokes-field"]
];
var getPresetIdForIngress = (ingressId) => {
  const preset = findGeneratedPresetByLegacyIngressId(ingressId);
  if (!preset) {
    throw new Error(`Catalogue ingress invariant failed: ${ingressId}`);
  }
  return preset.id;
};
var patternRows = [
  ...patternIngress.map(([type]) => {
    const id = `ingress-pattern-${type}`;
    return {
      id,
      match: { useBackground: "Pattern", pattern: { type } },
      matchKind: "exact",
      outcome: "generated",
      presetId: getPresetIdForIngress(id)
    };
  }),
  {
    id: "ingress-pattern-missing-type",
    match: { useBackground: "Pattern", pattern: {} },
    matchKind: "missing-type",
    outcome: "generated",
    presetId: getPresetIdForIngress("ingress-pattern-missing-type"),
    note: "Pattern object present with an omitted, undefined, or null type"
  }
];
var particleRows = [
  ...particleIngress.map(([type]) => {
    const id = `ingress-particle-${type}`;
    return {
      id,
      match: { useBackground: "Particle", particle: { type } },
      matchKind: "exact",
      outcome: "generated",
      presetId: getPresetIdForIngress(id)
    };
  }),
  {
    id: "ingress-particle-missing-type",
    match: { useBackground: "Particle", particle: {} },
    matchKind: "missing-type",
    outcome: "generated",
    presetId: getPresetIdForIngress("ingress-particle-missing-type"),
    note: "Particle object present with an omitted, undefined, or null type"
  }
];
var noiseRows = [
  ...noiseIngress.flatMap(
    ([type]) => ["Graphics", "Noise"].map((useBackground) => {
      const family = useBackground.toLowerCase();
      const id = `ingress-${family}-${type}`;
      return {
        id,
        match: { useBackground, noise: { type } },
        matchKind: "exact",
        outcome: "generated",
        presetId: getPresetIdForIngress(id)
      };
    })
  ),
  ...["Graphics", "Noise"].map((useBackground) => {
    const family = useBackground.toLowerCase();
    const id = `ingress-${family}-missing-type`;
    return {
      id,
      match: { useBackground, noise: {} },
      matchKind: "missing-type",
      outcome: "generated",
      presetId: getPresetIdForIngress(id),
      note: "Noise object present with an omitted, undefined, or null type"
    };
  })
];
var animatedCatalogueRows = generatedCatalogue.flatMap(
  (entry) => entry.legacyIngressIds.filter((ingressId) => ingressId.startsWith("ingress-animated-")).map((ingressId) => {
    const match = {
      useBackground: "Animated",
      animation: { type: entry.id }
    };
    return {
      id: ingressId,
      match,
      matchKind: "exact",
      outcome: "generated",
      presetId: entry.id
    };
  })
);
var generatedLegacyIngress = [
  ...patternRows,
  ...particleRows,
  ...noiseRows,
  ...animatedCatalogueRows
];
var passthroughBackgrounds = [
  "Solid",
  "Gradient",
  "Image",
  "Video",
  "Texture",
  "Luminance"
];
var passthroughLegacyIngress = passthroughBackgrounds.map(
  (useBackground) => ({
    id: `ingress-passthrough-${useBackground.toLowerCase()}`,
    match: { useBackground },
    matchKind: "exact",
    outcome: "passthrough"
  })
);
var unsupportedLegacyIngress = [
  {
    id: "ingress-unsupported-pattern-missing-family",
    match: { useBackground: "Pattern" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "pattern object is absent"
  },
  {
    id: "ingress-unsupported-pattern-unknown-type",
    match: { useBackground: "Pattern", pattern: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "pattern.type is nonempty and not recognized"
  },
  {
    id: "ingress-unsupported-particle-missing-family",
    match: { useBackground: "Particle" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "particle object is absent"
  },
  {
    id: "ingress-unsupported-particle-unknown-type",
    match: { useBackground: "Particle", particle: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "particle.type is nonempty and not recognized"
  },
  {
    id: "ingress-unsupported-graphics-missing-noise",
    match: { useBackground: "Graphics" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "noise object is absent"
  },
  {
    id: "ingress-unsupported-noise-missing-noise",
    match: { useBackground: "Noise" },
    matchKind: "missing-family",
    outcome: "unsupported",
    note: "noise object is absent"
  },
  {
    id: "ingress-unsupported-graphics-unknown-noise-type",
    match: { useBackground: "Graphics", noise: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "noise.type is nonempty and not recognized"
  },
  {
    id: "ingress-unsupported-noise-unknown-noise-type",
    match: { useBackground: "Noise", noise: { type: "*" } },
    matchKind: "unknown-type",
    outcome: "unsupported",
    note: "noise.type is nonempty and not recognized"
  },
  {
    id: "ingress-unsupported-unknown-wire",
    match: { useBackground: "*" },
    matchKind: "unknown-wire",
    outcome: "unsupported",
    note: "useBackground is absent or not recognized"
  }
];
var legacyIngress = [
  ...generatedLegacyIngress,
  ...passthroughLegacyIngress,
  ...unsupportedLegacyIngress
];
var isRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var extractTemplateVariation = (wire) => {
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
var findGeneratedRow = ({
  useBackground,
  type
}) => generatedLegacyIngress.find((row) => {
  var _a, _b, _c, _d, _e, _f, _g;
  if (row.match.useBackground !== useBackground) return false;
  if (type === null) return row.matchKind === "missing-type";
  const rowType = (_g = (_e = (_c = (_a = row.match.pattern) == null ? void 0 : _a.type) != null ? _c : (_b = row.match.particle) == null ? void 0 : _b.type) != null ? _e : (_d = row.match.noise) == null ? void 0 : _d.type) != null ? _g : (_f = row.match.animation) == null ? void 0 : _f.type;
  return row.matchKind === "exact" && rowType === type;
});
var unsupported = (ingressId, reason) => ({
  outcome: "unsupported",
  ingressId,
  reason
});
var matchGeneratedFamily = ({
  wire,
  useBackground,
  familyKey,
  missingFamilyIngressId,
  unknownTypeIngressId
}) => {
  const family = wire[familyKey];
  if (!isRecord(family)) {
    return unsupported(missingFamilyIngressId, "missing-family");
  }
  const discriminator = family.type;
  const type = discriminator === null || discriminator === void 0 ? null : typeof discriminator === "string" && discriminator.length > 0 ? discriminator : void 0;
  if (type === void 0) {
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
    originalWire: wire
  };
};
var matchLegacyIngress = (wire) => {
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
    const type = isRecord(animation) ? animation.type : void 0;
    const preset = typeof type === "string" ? generatedCatalogue.find((entry) => entry.id === type) : void 0;
    if (preset) {
      return {
        outcome: "generated",
        ingressId: `ingress-animated-${preset.id}`,
        presetId: preset.id,
        originalWire: extracted
      };
    }
    if (type === "pulsingGradient" || type === "movingGradient" || type === "breathingColor" || type === "waveEffect") {
      return {
        outcome: "passthrough",
        ingressId: `ingress-animated-${type}`,
        useBackground,
        originalWire: extracted
      };
    }
    return unsupported(
      "ingress-unsupported-unknown-wire",
      "unknown-discriminator"
    );
  }
  const passthrough = passthroughLegacyIngress.find(
    (row) => row.match.useBackground === useBackground
  );
  if (passthrough) {
    return {
      outcome: "passthrough",
      ingressId: passthrough.id,
      useBackground,
      originalWire: extracted
    };
  }
  switch (useBackground) {
    case "Pattern":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "pattern",
        missingFamilyIngressId: "ingress-unsupported-pattern-missing-family",
        unknownTypeIngressId: "ingress-unsupported-pattern-unknown-type"
      });
    case "Particle":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "particle",
        missingFamilyIngressId: "ingress-unsupported-particle-missing-family",
        unknownTypeIngressId: "ingress-unsupported-particle-unknown-type"
      });
    case "Graphics":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "noise",
        missingFamilyIngressId: "ingress-unsupported-graphics-missing-noise",
        unknownTypeIngressId: "ingress-unsupported-graphics-unknown-noise-type"
      });
    case "Noise":
      return matchGeneratedFamily({
        wire: extracted,
        useBackground,
        familyKey: "noise",
        missingFamilyIngressId: "ingress-unsupported-noise-missing-noise",
        unknownTypeIngressId: "ingress-unsupported-noise-unknown-noise-type"
      });
    default:
      return unsupported("ingress-unsupported-unknown-wire", "unknown-wire");
  }
};
var catalogueIngressIds = new Set(
  generatedCatalogue.flatMap((entry) => entry.legacyIngressIds)
);
var publishedGeneratedIngressIds = new Set(
  generatedLegacyIngress.map((row) => row.id)
);
if (catalogueIngressIds.size !== publishedGeneratedIngressIds.size || [...catalogueIngressIds].some((id) => !publishedGeneratedIngressIds.has(id))) {
  throw new Error("Generated catalogue and ingress rows are out of sync");
}

// src/core/utils/sponsors/asSponsorArray.ts
var asSponsorArray = (value) => Array.isArray(value) ? value : [];

// src/core/utils/sponsors/outroSponsors.ts
var OUTRO_SPONSOR_PAGE_SIZE = 6;
var OUTRO_PAGE_ANIMATE_IN_FRAMES = 15;
var OUTRO_PAGE_HOLD_FRAMES = 60;
var OUTRO_PAGE_ANIMATE_OUT_FRAMES = 15;
var OUTRO_PAGE_DURATION_FRAMES = OUTRO_PAGE_ANIMATE_IN_FRAMES + OUTRO_PAGE_HOLD_FRAMES + OUTRO_PAGE_ANIMATE_OUT_FRAMES;
var OUTRO_PAGE_LOGO_EXIT_FRAME = OUTRO_PAGE_DURATION_FRAMES - OUTRO_PAGE_ANIMATE_OUT_FRAMES;
var OUTRO_PAGE_LOGO_STAGGER_FRAMES = 2;
var OUTRO_NO_SPONSORS_DURATION_FRAMES = 0;
var buildOutroSponsorSequence = ({
  primary,
  general
}) => {
  return [...asSponsorArray(primary), ...asSponsorArray(general)];
};
var chunkSponsors = (sponsors, pageSize = OUTRO_SPONSOR_PAGE_SIZE) => {
  const pages = [];
  for (let i = 0; i < sponsors.length; i += pageSize) {
    pages.push(sponsors.slice(i, i + pageSize));
  }
  return pages;
};
var countOutroSponsors = (sponsors) => {
  if (!sponsors) return 0;
  const fromBuckets = asSponsorArray(sponsors.primary).length + asSponsorArray(sponsors.general).length;
  if (fromBuckets > 0) return fromBuckets;
  return typeof sponsors.sponsorNum === "number" && sponsors.sponsorNum > 0 ? sponsors.sponsorNum : 0;
};
var calculateOutroDurationFromSponsors = (sponsors, doesAccountHaveSponsors) => {
  if (!doesAccountHaveSponsors) {
    return OUTRO_NO_SPONSORS_DURATION_FRAMES;
  }
  const count = countOutroSponsors(sponsors);
  if (count <= 0) {
    return OUTRO_NO_SPONSORS_DURATION_FRAMES;
  }
  const pages = Math.ceil(count / OUTRO_SPONSOR_PAGE_SIZE);
  return pages * OUTRO_PAGE_DURATION_FRAMES;
};

// src/core/utils/sponsors/selectFooterSponsors.ts
var FOOTER_SPONSOR_MAX = 5;
var uniqueById = (sponsors) => {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const sponsor of sponsors) {
    if (seen.has(sponsor.id)) continue;
    seen.add(sponsor.id);
    out.push(sponsor);
  }
  return out;
};
var selectFooterSponsors = ({
  primaryForScreen,
  entities,
  max = FOOTER_SPONSOR_MAX
}) => {
  const selectedEntities = uniqueById(entities).slice(0, max);
  const entityIds = new Set(selectedEntities.map((s) => s.id));
  const remainingSlots = max - selectedEntities.length;
  const selectedPrimaries = uniqueById(primaryForScreen).filter((s) => !entityIds.has(s.id)).slice(0, remainingSlots);
  return [...selectedPrimaries, ...selectedEntities];
};

// src/core/utils/sponsors/buildMultiRowFooterSponsors.ts
var collectEntitiesFromRows = (rows) => {
  const entities = [];
  for (const row of rows) {
    const assign = row.assignSponsors;
    if (!assign) continue;
    entities.push(
      ...asSponsorArray(assign.grade),
      ...asSponsorArray(assign.team)
    );
  }
  return entities;
};
var buildMultiRowFooterSponsors = (rows) => {
  var _a;
  if (rows.length === 0) return [];
  return selectFooterSponsors({
    primaryForScreen: (_a = rows[0].primaryForScreen) != null ? _a : [],
    entities: collectEntitiesFromRows(rows)
  });
};

// src/core/utils/sponsors/buildSingleItemFooterSponsors.ts
var buildSingleItemFooterSponsors = ({
  assignSponsors,
  primaryForScreen,
  fallbackPrimary = []
}) => {
  const primaries = primaryForScreen != null ? primaryForScreen : fallbackPrimary;
  return selectFooterSponsors({
    primaryForScreen: primaries,
    entities: collectEntitiesFromRows([{ assignSponsors }])
  });
};

// src/core/utils/sponsors/getIntroPrimarySponsors.ts
var INTRO_PRIMARY_SPONSOR_MAX = 4;
var getIntroPrimarySponsors = (sponsors, max = INTRO_PRIMARY_SPONSOR_MAX) => {
  var _a;
  if (!((_a = sponsors == null ? void 0 : sponsors.primary) == null ? void 0 : _a.length)) return [];
  return sponsors.primary.filter((sponsor) => {
    var _a2;
    return Boolean((_a2 = sponsor == null ? void 0 : sponsor.logo) == null ? void 0 : _a2.url);
  }).slice(0, max);
};

// src/core/utils/general.ts
var hasSponsors = (sponsorList) => {
  if (!sponsorList) return false;
  if (typeof sponsorList.sponsorNum === "number" && sponsorList.sponsorNum > 0) {
    return true;
  }
  const hasPrimary = Array.isArray(sponsorList.primary) && sponsorList.primary.length > 0;
  const hasGeneral = Array.isArray(sponsorList.general) && sponsorList.general.length > 0;
  return hasPrimary || hasGeneral;
};

export {
  __export,
  isGeneratedPresetId,
  rendererAdapterRegistry,
  matchLegacyIngress,
  asSponsorArray,
  OUTRO_SPONSOR_PAGE_SIZE,
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_PAGE_LOGO_EXIT_FRAME,
  OUTRO_PAGE_LOGO_STAGGER_FRAMES,
  buildOutroSponsorSequence,
  chunkSponsors,
  calculateOutroDurationFromSponsors,
  buildMultiRowFooterSponsors,
  buildSingleItemFooterSponsors,
  getIntroPrimarySponsors,
  hasSponsors
};
//# sourceMappingURL=chunk-DAUNLCV7.mjs.map