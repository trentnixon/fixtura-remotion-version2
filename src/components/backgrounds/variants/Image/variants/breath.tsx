import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AbsoluteFill, Img } from "remotion";

export interface BreathingEffectProps {
  src: string;
  intensity?: number; // Maximum zoom percentage (e.g., 1.03 for 3% zoom)
  frequency?: number; // Number of complete "breaths" during the video
  startTime?: number; // Frame to start effect
  endTime?: number; // Frame to end effect
  style?: React.CSSProperties;
  className?: string;
}

export const BreathingEffect: React.FC<BreathingEffectProps> = ({
  src,
  intensity = 1.03, // Default 3% maximum zoom
  frequency = 3, // Default 3 complete cycles
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

  // Only apply effect within the specified time range
  if (frame < startTime || frame > effectEndTime) {
    return (
      <AbsoluteFill className={`breathing-effect ${className}`}>
        <Img
          src={src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style,
          }}
        />
      </AbsoluteFill>
    );
  }

  // Calculate relative frame within effect duration
  const relativeFrame = frame - startTime;

  // Calculate the phase of the breathing effect (0 to 2π * frequency)
  const phase = (relativeFrame / effectDuration) * Math.PI * 2 * frequency;

  // Use sine wave to create smooth breathing effect
  // Sin output is between -1 and 1, we map this to a scale factor
  const sineValue = Math.sin(phase);

  // Map sine value (-1 to 1) to scale (1 to intensity)
  const scale = 1 + ((intensity - 1) / 2) * (sineValue + 1);

  return (
    <AbsoluteFill className={`breathing-effect ${className}`}>
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
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};
