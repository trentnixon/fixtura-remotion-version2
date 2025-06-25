import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AbsoluteFill, Img } from "remotion";
import { Pan as PanDirection } from "./pan";
import { ZoomDirection } from "./zoom";

interface KenBurnsEffectProps {
  src: string;
  zoomDirection?: typeof ZoomDirection;
  panDirection?: typeof PanDirection;
  zoomIntensity?: number; // How much to zoom (e.g., 1.2 means zoom to 120%)
  panIntensity?: number; // How much to pan (percentage of image size)
  startTime?: number; // Frame to start effect
  endTime?: number; // Frame to end effect
  style?: React.CSSProperties;
  className?: string;
}

export const KenBurnsEffect: React.FC<KenBurnsEffectProps> = ({
  src,
  zoomDirection = "in",
  panDirection = "left",
  zoomIntensity = 1.15, // Default 15% zoom
  panIntensity = 10, // Default 10% pan
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

  // Calculate scale based on zoom direction
  let scale: number;
  if (zoomDirection === "in") {
    // Start at 1 and increase to intensity
    scale = 1 + (zoomIntensity - 1) * progress;
  } else {
    // Start at intensity and decrease to 1
    scale = zoomIntensity - (zoomIntensity - 1) * progress;
  }

  // Calculate additional scale for pan (to ensure no empty areas)
  const panScale = 1 + panIntensity / 100;
  const totalScale = scale * panScale;

  // Calculate transform values based on pan direction
  let transformX = 0;
  let transformY = 0;

  // The maximum amount to translate (as a percentage of the overflow)
  const maxTranslate = ((panScale - 1) / panScale) * 100;

  switch (panDirection) {
    case "left":
      transformX = maxTranslate * (1 - progress);
      break;
    case "right":
      transformX = -maxTranslate * (1 - progress);
      break;
    case "up":
      transformY = maxTranslate * (1 - progress);
      break;
    case "down":
      transformY = -maxTranslate * (1 - progress);
      break;
  }

  return (
    <AbsoluteFill className={`ken-burns-effect ${className}`}>
      <Img
        src={src}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${totalScale}) translate(${transformX}%, ${transformY}%)`,
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};
