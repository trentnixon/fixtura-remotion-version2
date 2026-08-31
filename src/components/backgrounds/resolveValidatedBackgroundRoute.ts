import {
  matchLegacyIngress,
  rendererAdapterRegistry,
} from "./variants/Generated/catalogue";
import type {
  LegacyIngressMatchResult,
  LegacyWirePayload,
  UnsupportedIngressReason,
} from "./variants/Generated/catalogue";
import type { RendererAdapterKey } from "./variants/Generated/catalogue/types";
import {
  NOISE_VARIANTS,
  type NoiseVariant,
} from "./variants/NoiseBackground/config";

export type UnsupportedBackgroundDiagnostic = {
  readonly code: "unsupported-background-ingress";
  readonly ingressId: string;
  readonly reason: UnsupportedIngressReason;
};

export type ValidatedBackgroundRoute =
  | {
      readonly kind: "unsupported";
      readonly diagnostic: UnsupportedBackgroundDiagnostic;
    }
  | { readonly kind: "solid" }
  | { readonly kind: "gradient" }
  | { readonly kind: "image" }
  | { readonly kind: "video" }
  | { readonly kind: "texture" }
  | { readonly kind: "luminance" }
  | { readonly kind: "animated" }
  | {
      readonly kind: "pattern";
      readonly adapter: RendererAdapterKey;
      readonly presetId: string;
    }
  | {
      readonly kind: "particle";
      readonly adapter: RendererAdapterKey;
      readonly presetId: string;
    }
  | {
      readonly kind: "noise";
      readonly variant: NoiseVariant;
      readonly adapter: RendererAdapterKey;
      readonly presetId: string;
    };

const noiseVariantSet = new Set<string>(Object.keys(NOISE_VARIANTS));

const readNoiseVariant = (wire: Record<string, unknown>): NoiseVariant => {
  const noise = wire.noise;
  if (
    typeof noise === "object" &&
    noise !== null &&
    "type" in noise &&
    typeof noise.type === "string" &&
    noiseVariantSet.has(noise.type)
  ) {
    return noise.type as NoiseVariant;
  }

  return "default";
};

const unsupportedRoute = (
  match: Extract<LegacyIngressMatchResult, { outcome: "unsupported" }>,
): ValidatedBackgroundRoute => ({
  kind: "unsupported",
  diagnostic: {
    code: "unsupported-background-ingress",
    ingressId: match.ingressId,
    reason: match.reason,
  },
});

const passthroughRoute = (
  useBackground: string,
): ValidatedBackgroundRoute | null => {
  switch (useBackground) {
    case "Solid":
      return { kind: "solid" };
    case "Gradient":
      return { kind: "gradient" };
    case "Image":
      return { kind: "image" };
    case "Video":
      return { kind: "video" };
    case "Texture":
      return { kind: "texture" };
    case "Luminance":
      return { kind: "luminance" };
    case "Animated":
      return { kind: "animated" };
    default:
      return null;
  }
};

export const resolveValidatedBackgroundRoute = (
  match: LegacyIngressMatchResult,
): ValidatedBackgroundRoute => {
  switch (match.outcome) {
    case "unsupported":
      return unsupportedRoute(match);
    case "passthrough": {
      const route = passthroughRoute(match.useBackground);
      return (
        route ??
        unsupportedRoute({
          outcome: "unsupported",
          ingressId: match.ingressId,
          reason: "unknown-wire",
        })
      );
    }
    case "generated": {
      const adapter = rendererAdapterRegistry.get(match.presetId);
      if (!adapter) {
        return unsupportedRoute({
          outcome: "unsupported",
          ingressId: match.ingressId,
          reason: "unknown-wire",
        });
      }

      const wire = match.originalWire;
      const useBackground = wire.useBackground;

      switch (useBackground) {
        case "Animated":
          return { kind: "animated" };
        case "Pattern":
          return { kind: "pattern", adapter, presetId: match.presetId };
        case "Particle":
          return { kind: "particle", adapter, presetId: match.presetId };
        case "Graphics":
        case "Noise":
          return {
            kind: "noise",
            variant: readNoiseVariant(wire),
            adapter,
            presetId: match.presetId,
          };
        default:
          return unsupportedRoute({
            outcome: "unsupported",
            ingressId: match.ingressId,
            reason: "unknown-wire",
          });
      }
    }
    default: {
      const exhaustive: never = match;
      return exhaustive;
    }
  }
};

export const resolveBackgroundRouteFromWire = (
  wire: LegacyWirePayload,
): ValidatedBackgroundRoute =>
  resolveValidatedBackgroundRoute(matchLegacyIngress(wire));

export const logUnsupportedBackgroundDiagnostic = (
  diagnostic: UnsupportedBackgroundDiagnostic,
): void => {
  console.warn(
    "[SelectTemplateBackground] Unsupported background ingress",
    diagnostic,
  );
};
