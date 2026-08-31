import React, { useId, useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { resolvePaletteGradient } from "../../../../core/utils/colorSystem/gradientResolver";
import { problematicLightPalette } from "./__fixtures__/palettes/minimal-brand";
import {
  ForegroundProtection,
  LUMINANCE_LAYER_Z_INDEX,
} from "./ForegroundProtection";
import { LuminanceMappedImage } from "./LuminanceMappedImage";
import {
  parseLuminanceBackgroundConfig,
  parseLuminanceMapConfig,
} from "./parseLuminanceConfig";
import { resolveLuminanceAssetSrc } from "./resolveLuminanceAsset";
import { resolveLuminanceMap } from "./resolveLuminanceMap";
import { resolveMissingAssetFallback } from "./resolveMissingAssetFallback";
import type { LuminanceRenderBackend } from "./types";
import { isLuminanceProtectionPreset } from "./fixturePresets";
import { resolveLuminanceSupersampleScale } from "./resolveLuminanceSupersampleScale";
import {
  resolveProtectedBrandBrandLut,
  resolveProtectedBrandMatteRanges,
} from "./protectedBrandMattes";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  /** Test-only: force backend for spike matrix. Production ignores this. */
  backendOverride?: LuminanceRenderBackend;
  /** Test-only: force problematic palette for F04. */
  paletteOverride?: "default" | "problematic";
};

/**
 * Production path: grayscale master + map config come only from
 * `video.templateVariation.luminance` on the data OBJ (same contract as texture/image).
 */
export const LuminanceBackground: React.FC<Props> = ({
  className = "",
  style = {},
  backendOverride = "svg",
  paletteOverride = "default",
}) => {
  const { selectedPalette } = useThemeContext();
  const { video } = useVideoDataContext();
  const filterInstanceId = useId();

  const palette =
    paletteOverride === "problematic"
      ? problematicLightPalette
      : selectedPalette;

  const templateLuminance = video.templateVariation?.luminance;

  const parsedConfig = useMemo(() => {
    return parseLuminanceBackgroundConfig({
      name: templateLuminance?.name,
      asset: templateLuminance?.asset,
      url: templateLuminance?.url,
      map: templateLuminance?.map ?? { kind: "theme", preset: "brand" },
      contrast: templateLuminance?.contrast,
      brightness: templateLuminance?.brightness,
      protection: templateLuminance?.protection ?? "none",
      opacity: templateLuminance?.opacity,
      position: templateLuminance?.position,
      size: templateLuminance?.size,
      supersampleScale: templateLuminance?.supersampleScale,
    });
  }, [templateLuminance]);

  const mapConfig = useMemo(
    () => parseLuminanceMapConfig(parsedConfig.map),
    [parsedConfig.map],
  );

  const supersampleScale = resolveLuminanceSupersampleScale(
    mapConfig,
    parsedConfig.supersampleScale,
  );

  const resolved = useMemo(
    () =>
      resolveLuminanceMap({
        palette,
        config: mapConfig,
        contrast: parsedConfig.contrast,
        brightness: parsedConfig.brightness,
      }),
    [mapConfig, palette, parsedConfig.brightness, parsedConfig.contrast],
  );

  const protectedBrandLayout = useMemo(
    () =>
      mapConfig.kind === "theme" && mapConfig.preset === "protected-brand"
        ? {
            coreWidth: mapConfig.protectedEndpointCore,
            transitionWidth: mapConfig.endpointTransitionWidth,
            brandSolidWidth: mapConfig.brandSolidWidth,
          }
        : null,
    [mapConfig],
  );

  const useProtectedMattes =
    Boolean(protectedBrandLayout) && supersampleScale > 1;

  const mappedLut = useMemo(() => {
    if (!useProtectedMattes || !protectedBrandLayout) {
      return resolved.lut;
    }
    return resolveProtectedBrandBrandLut(palette, protectedBrandLayout);
  }, [palette, protectedBrandLayout, resolved.lut, useProtectedMattes]);

  const protectedMattes = useMemo(() => {
    if (!useProtectedMattes || !protectedBrandLayout) {
      return undefined;
    }
    return resolveProtectedBrandMatteRanges(protectedBrandLayout);
  }, [protectedBrandLayout, useProtectedMattes]);

  const assetSrc = resolveLuminanceAssetSrc({
    name: parsedConfig.name,
    asset: parsedConfig.asset,
    url: parsedConfig.url,
  });

  const protectionPreset = isLuminanceProtectionPreset(parsedConfig.protection)
    ? parsedConfig.protection
    : "none";

  const fallbackMode =
    !assetSrc || !resolved ? resolveMissingAssetFallback() : null;

  const fallbackBackground = useMemo(() => {
    if (!fallbackMode) {
      return undefined;
    }

    if (fallbackMode === "solid") {
      return palette.background.main;
    }

    return (
      resolvePaletteGradient(palette, "primaryToSecondary", "HORIZONTAL") ??
      `linear-gradient(to right, ${palette.background.dark}, ${palette.background.accent})`
    );
  }, [fallbackMode, palette]);

  return (
    <AbsoluteFill
      className={`luminance-background ${className}`}
      style={{ zIndex: -1, ...style }}
      data-testid="luminance-background-root"
    >
      {fallbackMode ? (
        <div
          data-testid="luminance-fallback"
          style={{
            position: "absolute",
            inset: 0,
            background: fallbackBackground,
            zIndex: LUMINANCE_LAYER_Z_INDEX.mappedImage,
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: LUMINANCE_LAYER_Z_INDEX.mappedImage,
          }}
        >
          <LuminanceMappedImage
            src={assetSrc as string}
            lut={mappedLut}
            filterInstanceId={filterInstanceId}
            backend={backendOverride}
            contrast={parsedConfig.contrast}
            brightness={parsedConfig.brightness}
            opacity={parsedConfig.opacity ?? 1}
            objectFit={
              (parsedConfig.size as React.CSSProperties["objectFit"]) ?? "cover"
            }
            objectPosition={parsedConfig.position ?? "center"}
            supersampleScale={supersampleScale}
            protectedMattes={protectedMattes}
          />
        </div>
      )}

      <ForegroundProtection
        preset={protectionPreset}
        scrimColor={palette.background.dark}
        opacity={0.5}
      />
    </AbsoluteFill>
  );
};

export default LuminanceBackground;
