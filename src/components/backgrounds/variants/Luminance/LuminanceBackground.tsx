import React, { useMemo } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { problematicLightPalette } from "./__fixtures__/palettes/minimal-brand";
import type { LuminanceRenderBackend } from "./types";
import { resolveLuminanceRenderPlan } from "./resolveLuminanceRenderPlan";
import { LuminanceBackgroundView } from "./LuminanceBackgroundView";

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

  const palette =
    paletteOverride === "problematic"
      ? problematicLightPalette
      : selectedPalette;

  const templateLuminance = video.templateVariation?.luminance;

  const plan = useMemo(
    () =>
      resolveLuminanceRenderPlan({
        templateLuminance,
        palette,
        backend: backendOverride,
      }),
    [backendOverride, palette, templateLuminance],
  );

  return (
    <LuminanceBackgroundView plan={plan} className={className} style={style} />
  );
};

export default LuminanceBackground;
