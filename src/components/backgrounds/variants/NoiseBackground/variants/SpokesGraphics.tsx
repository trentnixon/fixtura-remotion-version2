import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

import { CNSWSpokesIntro } from "./svg/spokes/intro";
import { CNSWSpokesContent } from "./svg/spokes/content";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

interface SpokesGraphicsProps {
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

/**
 * SpokesGraphics - A spokes-based graphics background
 *
 * This variant creates animated spokes with a gradient background,
 * combining intro and content animations for a dynamic effect.
 * Perfect for modern, dynamic designs with smooth transitions.
 */
const SpokesGraphics: React.FC<SpokesGraphicsProps> = ({
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { selectedPalette } = useThemeContext();
  const { video } = useVideoDataContext();

  // Default fallback gradient
  const DEFAULT_GRADIENT =
    "linear-gradient(0deg, #000021 0%, #4a90e2 50%, #7b68ee 100%)";

  // Get gradient configuration from video data
  const gradientType =
    video.templateVariation?.gradient?.type || "primaryToSecondary";
  const gradientDirection =
    video.templateVariation?.gradient?.direction || "VERTICAL";

  // Extract the CSS for the background
  const backgroundCSS = React.useMemo(() => {
    if (!selectedPalette?.background?.gradient) return DEFAULT_GRADIENT;

    const gradients = selectedPalette.background.gradient;

    // Try primary requested gradient
    const selectedGradient = gradients[gradientType as keyof typeof gradients];
    const primaryCSS = extractCSS(selectedGradient);

    if (primaryCSS) {
      const directionCSS =
        primaryCSS[gradientDirection as keyof typeof primaryCSS];
      if (directionCSS) return directionCSS;
    }

    // Try fallback to secondaryToPrimary
    const fallbackCSS = extractCSS(gradients.secondaryToPrimary);
    if (fallbackCSS) return fallbackCSS;

    return DEFAULT_GRADIENT;
  }, [selectedPalette, gradientType, gradientDirection]);

  // Animation for intro (0-90 frames)
  const introOpacity = interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Animation for content (90-end frames)
  const contentOpacity = interpolate(frame, [90, 120, 150, 180], [0, 1, 1, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      className={`bg-spokes-graphics ${className}`}
      style={{
        background: backgroundCSS as string,
        zIndex: -1,
        ...style,
      }}
    >
      {/* Intro Spokes (0-90 frames) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: introOpacity,
          zIndex: 1,
        }}
      >
        <CNSWSpokesIntro />
      </div>

      {/* Content Spokes (90-end frames) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: contentOpacity,
          zIndex: 2,
        }}
      >
        <CNSWSpokesContent />
      </div>
    </AbsoluteFill>
  );
};

export default SpokesGraphics;
