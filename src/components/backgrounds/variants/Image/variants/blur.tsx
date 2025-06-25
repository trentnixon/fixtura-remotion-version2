import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AbsoluteFill, Img } from "remotion";

export const BlurDirection = {
  In: "in" as const,
  Out: "out" as const,
  Pulse: "pulse" as const,
} as const;

export type BlurDirectionType =
  (typeof BlurDirection)[keyof typeof BlurDirection];

export interface FocusBlurEffectProps {
  src?: string;
  direction?: BlurDirectionType;
  maxBlur?: number; // Maximum blur radius in pixels
  startTime?: number;
  endTime?: number;
  pulseFrequency?: number; // For pulse mode: number of blur/focus cycles
  style?: React.CSSProperties;
  className?: string;
}

export const FocusBlurEffect: React.FC<FocusBlurEffectProps> = ({
  src,
  direction = "in",
  maxBlur = 8,
  startTime = 0,
  endTime,
  pulseFrequency = 2,
  style = {},
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Default end time to video duration if not specified
  const effectEndTime = endTime ?? durationInFrames;
  const effectDuration = effectEndTime - startTime;

  // Calculate progress of the effect (0 to 1)
  const progress = Math.max(
    0,
    Math.min(1, (frame - startTime) / effectDuration),
  );

  // Calculate blur radius based on direction
  let blurRadius: number;

  switch (direction) {
    case "in":
      // Start blurred and become clear
      blurRadius = maxBlur * (1 - progress);
      break;
    case "out":
      // Start clear and become blurred
      blurRadius = maxBlur * progress;
      break;
    case "pulse": {
      // Oscillate between clear and blurred
      const phase = progress * Math.PI * 2 * pulseFrequency;
      // Use sine wave for smooth transitions
      const sineValue = Math.sin(phase);
      // Map sine value (-1 to 1) to blur radius (0 to maxBlur)
      blurRadius = (maxBlur / 2) * (sineValue + 1);
      break;
    }
  }

  return (
    <AbsoluteFill className={`focus-blur-effect ${className}`}>
      <Img
        src={src || ""}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `blur(${blurRadius}px)`,
          // Slightly scale up to avoid blur edges
          transform: "scale(1.05)",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};
