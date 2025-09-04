import React from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import {
  resolvePaletteGradient,
  determineGradientTypeForPalette,
} from "../../../../core/utils/colorSystem/gradientResolver";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

// No local gradient parsing: use centralized resolver

export const GradientBackground: React.FC<Props> = ({
  className = "",
  style = {},
}) => {
  const { selectedPalette } = useThemeContext();
  const { video } = useVideoDataContext();

  // Default fallback gradient
  const DEFAULT_GRADIENT = "linear-gradient(to right, #333, #666)";

  // Get gradient configuration from video data
  const gradientType =
    video.templateVariation?.gradient?.type || "primaryToSecondary";
  const gradientDirection =
    video.templateVariation?.gradient?.direction || "HORIZONTAL";

  // Extract the CSS for the background
  const backgroundCSS = React.useMemo<string>(() => {
    if (!selectedPalette?.background?.gradient) return DEFAULT_GRADIENT;

    // Determine effective type based on selected palette, without mutating JSON
    const effectiveType = determineGradientTypeForPalette(
      (selectedPalette as unknown as { name?: string })?.name,
      gradientType as string,
    );

    // Resolve directly from palette gradients using centralized resolver
    const resolved = resolvePaletteGradient(
      selectedPalette,
      effectiveType,
      gradientDirection as string,
    );
    if (resolved) return resolved;

    // Fallback to a sensible palette type before defaulting
    const fallback = resolvePaletteGradient(
      selectedPalette,
      "secondaryToPrimary",
      gradientDirection as string,
    );
    if (fallback) return fallback;

    return DEFAULT_GRADIENT;
  }, [selectedPalette, gradientType, gradientDirection]);

  return (
    <AbsoluteFill
      className={` ${className}`}
      style={{
        background: backgroundCSS as string,
        zIndex: -1,
        ...style,
      }}
    />
  );
};
