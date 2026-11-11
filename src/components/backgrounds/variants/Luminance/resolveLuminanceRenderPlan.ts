import type { CSSProperties } from "react";
import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import { resolvePaletteGradient } from "../../../../core/utils/colorSystem/gradientResolver";
import { parseLuminanceBackgroundConfig, parseLuminanceMapConfig } from "./parseLuminanceConfig";
import { resolveLuminanceAssetSrc } from "./resolveLuminanceAsset";
import { resolveLuminanceMap } from "./resolveLuminanceMap";
import { resolveMissingAssetFallback } from "./resolveMissingAssetFallback";
import { resolveLuminanceSupersampleScale } from "./resolveLuminanceSupersampleScale";
import {
  resolveProtectedBrandBrandLut,
  resolveProtectedBrandMatteRanges,
} from "./protectedBrandMattes";
import { isLuminanceProtectionPreset } from "./fixturePresets";
import type {
  LuminanceLookupTable,
  LuminanceProtectionPreset,
  LuminanceRenderBackend,
} from "./types";
import type { ProtectedBrandMatteRanges } from "./protectedBrandMattes";
import type { ProtectedBrandLayout } from "./resolveProtectedBrandSegments";

export type LuminanceRenderPlan =
  | {
      mode: "fallback";
      fallbackBackground: string;
      protectionPreset: LuminanceProtectionPreset;
      scrimColor: string;
    }
  | {
      mode: "mapped";
      assetSrc: string;
      lut: LuminanceLookupTable;
      backend: LuminanceRenderBackend;
      contrast: number;
      brightness: number;
      opacity: number;
      objectFit: CSSProperties["objectFit"];
      objectPosition: string;
      supersampleScale: number;
      protectedMattes?: ProtectedBrandMatteRanges;
      protectionPreset: LuminanceProtectionPreset;
      scrimColor: string;
    };

export type ResolveLuminanceRenderPlanInput = {
  /** Raw `templateVariation.luminance` slice from video data. */
  templateLuminance: unknown;
  palette: DesignPalette;
  backend?: LuminanceRenderBackend;
};

const resolveFallbackBackground = (
  palette: DesignPalette,
  mode: ReturnType<typeof resolveMissingAssetFallback>,
): string => {
  if (mode === "solid") {
    return palette.background.main;
  }

  return (
    resolvePaletteGradient(palette, "primaryToSecondary", "HORIZONTAL") ??
    `linear-gradient(to right, ${palette.background.dark}, ${palette.background.accent})`
  );
};

const resolveProtectedBrandLayout = (
  mapConfig: ReturnType<typeof parseLuminanceMapConfig>,
): ProtectedBrandLayout | null =>
  mapConfig.kind === "theme" && mapConfig.preset === "protected-brand"
    ? {
        coreWidth: mapConfig.protectedEndpointCore,
        transitionWidth: mapConfig.endpointTransitionWidth,
        brandSolidWidth: mapConfig.brandSolidWidth,
      }
    : null;

export const resolveLuminanceRenderPlan = (
  input: ResolveLuminanceRenderPlanInput,
): LuminanceRenderPlan => {
  const backend = input.backend ?? "svg";
  const templateLuminance =
    input.templateLuminance && typeof input.templateLuminance === "object"
      ? (input.templateLuminance as Record<string, unknown>)
      : {};

  const parsedConfig = parseLuminanceBackgroundConfig({
    name: templateLuminance.name,
    asset: templateLuminance.asset,
    url: templateLuminance.url,
    map: templateLuminance.map ?? { kind: "theme", preset: "brand" },
    contrast: templateLuminance.contrast,
    brightness: templateLuminance.brightness,
    protection: templateLuminance.protection ?? "none",
    opacity: templateLuminance.opacity,
    position: templateLuminance.position,
    size: templateLuminance.size,
    supersampleScale: templateLuminance.supersampleScale,
  });

  const mapConfig = parseLuminanceMapConfig(parsedConfig.map);
  const supersampleScale = resolveLuminanceSupersampleScale(
    mapConfig,
    parsedConfig.supersampleScale,
  );

  const resolved = resolveLuminanceMap({
    palette: input.palette,
    config: mapConfig,
    contrast: parsedConfig.contrast,
    brightness: parsedConfig.brightness,
  });

  const protectionRaw = parsedConfig.protection;
  const protectionPreset: LuminanceProtectionPreset = isLuminanceProtectionPreset(
    protectionRaw,
  )
    ? protectionRaw
    : "none";

  const scrimColor = input.palette.background.dark;

  const protectedBrandLayout = resolveProtectedBrandLayout(mapConfig);
  const useProtectedMattes = Boolean(protectedBrandLayout) && supersampleScale > 1;

  const mappedLut =
    useProtectedMattes && protectedBrandLayout
      ? resolveProtectedBrandBrandLut(input.palette, protectedBrandLayout)
      : resolved.lut;

  const protectedMattes =
    useProtectedMattes && protectedBrandLayout
      ? resolveProtectedBrandMatteRanges(protectedBrandLayout)
      : undefined;

  const assetSrc = resolveLuminanceAssetSrc({
    name: parsedConfig.name,
    asset: parsedConfig.asset,
    url: parsedConfig.url,
  });

  if (!assetSrc || !resolved) {
    const fallbackMode = resolveMissingAssetFallback();
    return {
      mode: "fallback",
      fallbackBackground: resolveFallbackBackground(input.palette, fallbackMode),
      protectionPreset,
      scrimColor,
    };
  }

  return {
    mode: "mapped",
    assetSrc,
    lut: mappedLut,
    backend,
    contrast: parsedConfig.contrast ?? 1,
    brightness: parsedConfig.brightness ?? 0,
    opacity: parsedConfig.opacity ?? 1,
    objectFit: (parsedConfig.size as CSSProperties["objectFit"]) ?? "cover",
    objectPosition: parsedConfig.position ?? "center",
    supersampleScale,
    protectedMattes,
    protectionPreset,
    scrimColor,
  };
};
