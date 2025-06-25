// variants/PatternBackground/variants/grid.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PatternComponentProps, ANIMATION_TYPES } from "./config";

export const GridPattern: React.FC<PatternComponentProps> = ({
  primaryColor,
  secondaryColor,
  scale = 1,
  rotation = 0,
  opacity = 0.7,
  animation = "none",
  animationDuration = 600, // 20 seconds at 30fps
  animationSpeed = 1,
}) => {
  // Get current frame for animation
  const frame = useCurrentFrame();

  // Create pattern with fixed attributes to avoid transformation jumps
  const patternSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="20" height="20" fill="none" stroke="${primaryColor}" stroke-width="1" />
    </svg>
  `;

  // Convert SVG to data URL for background
  const patternUrl = `url("data:image/svg+xml,${encodeURIComponent(patternSvg)}")`;

  // Background style - solid color
  const backgroundStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: secondaryColor,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
  };

  // Pattern overlay style
  const patternStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundImage: patternUrl,
    backgroundSize: `${20 * scale}px ${20 * scale}px`,
    opacity: opacity,
    transform: `rotate(${rotation}deg)`,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  // Animation offsets
  const animatedStyle: React.CSSProperties = {};

  // Calculate position for animations
  switch (animation) {
    case ANIMATION_TYPES.PAN_LEFT: {
      // For left pan, we move the background position from right to left
      const leftOffset = -(frame * animationSpeed) % (20 * scale);
      animatedStyle.backgroundPosition = `${leftOffset}px 0px`;
      break;
    }
    case ANIMATION_TYPES.PAN_RIGHT: {
      // For right pan, we move the background position from left to right
      const rightOffset = (frame * animationSpeed) % (20 * scale);
      animatedStyle.backgroundPosition = `${rightOffset}px 0px`;
      break;
    }
    case ANIMATION_TYPES.PAN_UP: {
      // For up pan, we move the background position from bottom to top
      const upOffset = -(frame * animationSpeed) % (20 * scale);
      animatedStyle.backgroundPosition = `0px ${upOffset}px`;
      break;
    }
    case ANIMATION_TYPES.PAN_DOWN: {
      // For down pan, we move the background position from top to bottom
      const downOffset = (frame * animationSpeed) % (20 * scale);
      animatedStyle.backgroundPosition = `0px ${downOffset}px`;
      break;
    }
    case ANIMATION_TYPES.ROTATE: {
      // For rotation, calculate continuous rotation
      const rotationAngle = rotation + ((frame * animationSpeed * 0.5) % 360);
      animatedStyle.transform = `rotate(${rotationAngle}deg)`;
      break;
    }
    case ANIMATION_TYPES.PULSE: {
      // For pulse, use a sine wave to create smooth size pulsing
      const pulsePhase =
        (frame * animationSpeed * Math.PI * 2) / animationDuration;
      const pulseFactor = 1 + Math.sin(pulsePhase) * 0.1;
      animatedStyle.backgroundSize = `${20 * scale * pulseFactor}px ${20 * scale * pulseFactor}px`;
      break;
    }
    default:
      break;
  }

  return (
    <AbsoluteFill style={{ zIndex: -1 }}>
      {/* Solid background layer */}
      <div style={backgroundStyle} />

      {/* Pattern overlay with animation */}
      <div style={{ ...patternStyle, ...animatedStyle }} />
    </AbsoluteFill>
  );
};

export default GridPattern;
