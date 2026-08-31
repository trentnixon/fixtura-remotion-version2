import type {
  AnimationType,
  PatternType,
} from "../../Patterns/variants/config";
import type {
  ParticleAnimation,
  ParticleDirection,
  ParticleType,
} from "../../Particles/config";

export type RendererAdapterKey =
  | "pattern-tiled"
  | "particle-field"
  | "grid-noise"
  | "particle-noise"
  | "svg-geometric"
  | "svg-spokes"
  | "effects-solid";

export type AnimatedPresetType =
  | "dot-field"
  | "line-field"
  | "tile-grid"
  | "crosshatch-field"
  | "triangle-tile"
  | "chevron-field"
  | "floating-dots"
  | "streak-lines"
  | "bubble-field"
  | "snow-field"
  | "confetti-field"
  | "balanced-noise"
  | "subtle-noise"
  | "grain-field"
  | "wave-noise"
  | "fog-field"
  | "tv-static"
  | "floating-particles"
  | "dynamic-particles"
  | "triangle-swarm"
  | "pulsing-circles"
  | "digital-rain"
  | "gradient-grid"
  | "geometric-field"
  | "spokes-field"
  | "light-leak"
  | "pulsingGradient"
  | "movingGradient"
  | "breathingColor"
  | "waveEffect";

export type PatternWireConfig = {
  readonly type: PatternType;
  readonly scale?: number;
  readonly rotation?: number;
  readonly opacity?: number;
  readonly animation?: AnimationType;
  readonly animationDuration?: number;
  readonly animationSpeed?: number;
};

export type ParticleWireConfig = {
  readonly type: ParticleType;
  readonly particleCount?: number;
  readonly speed?: number;
  readonly direction?: string;
  readonly animation?: ParticleAnimation;
};

export type AnimatedWireConfig = {
  readonly type: AnimatedPresetType;
  readonly scale?: number;
  readonly rotation?: number;
  readonly opacity?: number;
  readonly motion?:
    | "none"
    | "panUp"
    | "panDown"
    | "panLeft"
    | "panRight"
    | "rotate"
    | "pulse";
  readonly animation?: "fade" | "scale" | "slide" | "none";
  readonly duration?: number;
  readonly speed?: number;
  readonly particleCount?: number;
  readonly direction?: ParticleDirection;
  readonly colors?: readonly string[];
  readonly baseColor?: string;
  readonly intensity?: number;
};

export type LegacyEgressPayload = {
  readonly useBackground: "Animated";
  readonly animation: AnimatedWireConfig;
};

export type PassthroughWire = {
  readonly useBackground:
    | "Solid"
    | "Gradient"
    | "Image"
    | "Video"
    | "Texture"
    | "Luminance";
};

export type DevBackgroundWire = LegacyEgressPayload | PassthroughWire;

export type DevAppearanceMetadata =
  | { readonly kind: "generated"; readonly presetId: string }
  | { readonly kind: "passthrough"; readonly label: string };

export type OperatorVisibilityState =
  | { readonly status: "resolved-visible" }
  | { readonly status: "resolved-hidden"; readonly reason: string }
  | { readonly status: "unresolved"; readonly note: string };

export type ReadabilityPolicyState =
  | {
      readonly status: "resolved";
      readonly policy:
        | "none"
        | "scrim"
        | "vignette"
        | "safe-region"
        | "contrast-limit"
        | "density-limit";
    }
  | { readonly status: "unresolved"; readonly note: string };

type PalettePart = {
  readonly aspect: string;
  readonly mode: "active-palette" | "fixed";
  readonly roles?: readonly string[];
  readonly note?: string;
};

export type PaletteBehaviorState =
  | {
      readonly status: "resolved";
      readonly mode: "active-palette";
      readonly roles?: readonly string[];
    }
  | {
      readonly status: "resolved";
      readonly mode: "fixed";
      readonly note: string;
    }
  | {
      readonly status: "resolved";
      readonly mode: "mixed";
      readonly parts: readonly PalettePart[];
    }
  | { readonly status: "unresolved"; readonly note: string };

export type OperatorControl = {
  readonly key: string;
  readonly label: string;
  readonly type: "preset";
};

export type AuthorControl = {
  readonly key: string;
  readonly label: string;
  readonly type: "number" | "enum" | "boolean" | "color";
  readonly enumValues?: readonly string[];
  readonly source:
    | "templateVariation"
    | "renderer-default"
    | "palette-injected";
  readonly affectsRendering: boolean;
};

export type DiscoveryMetadata = {
  readonly motionClass: "static" | "ambient" | "energetic" | "intro-sequence";
  readonly tags: readonly string[];
  readonly relatedPresetIds?: readonly string[];
  readonly preview?: {
    readonly still?: string;
    readonly loop?: string;
  };
};

export type GeneratedCatalogueEntry = {
  readonly id: string;
  readonly displayName: string;
  readonly description: string;
  readonly inventoryKey: string;
  readonly rendererAdapter: RendererAdapterKey;
  readonly defaultConfiguration: LegacyEgressPayload;
  readonly operatorVisibility: OperatorVisibilityState;
  readonly readabilityPolicy: ReadabilityPolicyState;
  readonly paletteBehavior: PaletteBehaviorState;
  readonly operatorControls: readonly OperatorControl[];
  readonly authorControls: readonly AuthorControl[];
  readonly legacyIngressIds: readonly string[];
  readonly discovery: DiscoveryMetadata;
};
