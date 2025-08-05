import React from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

// Type for gradient objects that might have a css property
type GradientWithCSS = { css: string };

// Helper function to safely extract CSS from different gradient formats
const extractCSS = (gradient: unknown): string | null => {
  if (!gradient) return null;

  if (typeof gradient === "string") return gradient;

  if (typeof gradient === "object" && gradient !== null && "css" in gradient) {
    return (gradient as GradientWithCSS).css;
  }

  return null;
};

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
  const backgroundCSS = React.useMemo(() => {
    if (!selectedPalette?.background?.gradient) return DEFAULT_GRADIENT;

    const gradients = selectedPalette.background.gradient;

    // Try primary requested gradient
    const selectedGradient = gradients[gradientType as keyof typeof gradients];
    const primaryCSS = extractCSS(selectedGradient);

    if (primaryCSS)
      return primaryCSS[gradientDirection as keyof typeof primaryCSS];

    // Try fallback to secondaryToPrimary
    const fallbackCSS = extractCSS(gradients.secondaryToPrimary);
    if (fallbackCSS) return fallbackCSS;

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
