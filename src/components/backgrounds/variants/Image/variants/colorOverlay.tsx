// src/components/backgrounds/variants/Image/effects/colorOverlay.tsx
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AbsoluteFill, Img } from "remotion";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

export const OverlayType = {
  Solid: "solid" as const,
  Gradient: "gradient" as const,
  Vignette: "vignette" as const,
  BottomToTop: "bottomToTop" as const,
  TopToBottom: "topToBottom" as const,
  LeftToRight: "leftToRight" as const,
  RightToLeft: "rightToLeft" as const,
  Radial: "radial" as const,
};

export type OverlayTypeValue = (typeof OverlayType)[keyof typeof OverlayType];

interface ColorOverlayEffectProps {
  src: string;
  overlayType?: OverlayTypeValue;
  color?: string;
  secondaryColor?: string;
  opacity?: number;
  animateOpacity?: boolean;
  maxOpacity?: number;
  minOpacity?: number;
  gradientDirection?: string;
  vignetteIntensity?: number;
  startTime?: number;
  endTime?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const ColorOverlayEffect: React.FC<ColorOverlayEffectProps> = ({
  src,
  overlayType = "solid",
  color,
  secondaryColor,
  opacity = 0.3,
  animateOpacity = false,
  maxOpacity = 0.4,
  minOpacity = 0.2,
  gradientDirection = "to right",
  vignetteIntensity = 0.6,
  startTime = 0,
  endTime,
  style = {},
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { selectedPalette } = useThemeContext();

  // Use provided colors or get from theme context
  const overlayColor =
    color || selectedPalette?.background?.main || "rgba(0,0,0,0.5)";
  const overlaySndColor =
    secondaryColor || selectedPalette?.background?.accent || "rgba(0,0,0,0)";

  // Default end time to video duration if not specified
  const effectEndTime = endTime ?? durationInFrames;

  // Calculate progress of the effect (0 to 1)
  const progress = Math.max(
    0,
    Math.min(1, (frame - startTime) / (effectEndTime - startTime)),
  );

  // Calculate current opacity if animation is enabled
  let currentOpacity = opacity;
  if (animateOpacity) {
    // Use a sine wave to create smooth opacity changes
    const phase = progress * Math.PI * 2;
    const sineValue = Math.sin(phase);

    // Map sine value (-1 to 1) to opacity range (minOpacity to maxOpacity)
    currentOpacity =
      minOpacity + ((maxOpacity - minOpacity) / 2) * (sineValue + 1);
  }

  // Generate overlay styles based on type
  let overlayStyle: React.CSSProperties = {};

  switch (overlayType) {
    case "gradient":
      overlayStyle = {
        background: `linear-gradient(${gradientDirection}, ${overlayColor}, ${overlaySndColor})`,
        opacity: currentOpacity,
      };
      break;
    case "bottomToTop":
      overlayStyle = {
        background: `linear-gradient(to top, ${overlayColor}, ${overlaySndColor})`,
        opacity: currentOpacity,
      };
      break;
    case "topToBottom":
      overlayStyle = {
        background: `linear-gradient(to bottom, ${overlayColor}, ${overlaySndColor})`,
        opacity: currentOpacity,
      };
      break;
    case "leftToRight":
      overlayStyle = {
        background: `linear-gradient(to right, ${overlayColor}, ${overlaySndColor})`,
        opacity: currentOpacity,
      };
      break;
    case "rightToLeft":
      overlayStyle = {
        background: `linear-gradient(to left, ${overlayColor}, ${overlaySndColor})`,
        opacity: currentOpacity,
      };
      break;
    case "radial":
      overlayStyle = {
        background: `radial-gradient(circle, ${overlaySndColor}, ${overlayColor})`,
        opacity: currentOpacity,
      };
      break;
    case "vignette":
      overlayStyle = {
        background: `radial-gradient(
          circle,
          transparent 0%,
          ${overlayColor} ${(1 - vignetteIntensity) * 100}%
        )`,
        opacity: currentOpacity,
      };
      break;
    case "solid":
    default:
      overlayStyle = {
        backgroundColor: overlayColor,
        opacity: currentOpacity,
      };
      break;
  }

  return (
    <AbsoluteFill className={`color-overlay-effect ${className}`}>
      {/* Background image */}
      <Img
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          ...style,
        }}
      />

      {/* Color overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          ...overlayStyle,
        }}
      />
    </AbsoluteFill>
  );
};
