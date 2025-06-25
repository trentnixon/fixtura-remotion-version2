import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AbsoluteFill, Img } from "remotion";

export const ZoomDirection = {
  In: "in" as const,
  Out: "out" as const,
} as const;

export type ZoomDirectionType =
  (typeof ZoomDirection)[keyof typeof ZoomDirection];

export interface ZoomEffectProps {
  src: string;
  direction?: ZoomDirectionType;
  intensity?: number; // How much to zoom (e.g., 1.2 means zoom to 120%)
  startTime?: number; // Frame to start zoom effect
  endTime?: number; // Frame to end zoom effect
  style?: React.CSSProperties;
  className?: string;
}

export const ZoomEffect: React.FC<ZoomEffectProps> = ({
  src,
  direction = "in",
  intensity = 1.2, // Default 20% zoom
  startTime = 0,
  endTime,
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

  // Calculate scale based on direction
  let scale: number;
  if (direction === "in") {
    // Start at 1 and increase to intensity
    scale = 1 + (intensity - 1) * progress;
  } else {
    // Start at intensity and decrease to 1
    scale = intensity - (intensity - 1) * progress;
  }

  return (
    <AbsoluteFill className={`zoom-effect ${className}`}>
      <Img
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          transition: "transform 0.1s linear",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};
