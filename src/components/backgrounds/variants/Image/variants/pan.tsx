import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { AbsoluteFill } from "remotion";

export const PanDirection = {
  Left: "left" as const,
  Right: "right" as const,
  Up: "up" as const,
  Down: "down" as const,
  Out: "out" as const,
} as const;

export type PanDirectionType = (typeof PanDirection)[keyof typeof PanDirection];

interface PanEffectProps {
  src: string;
  direction?: PanDirectionType;
  intensity?: number;
  startTime?: number;
  endTime?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const PanEffect: React.FC<PanEffectProps> = ({
  src,
  direction = "out",
  intensity = 15,
  startTime = 0,
  endTime,
  style = {},
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const effectEndTime = endTime ?? durationInFrames;
  const effectDuration = effectEndTime - startTime;

  const progress = Math.max(
    0,
    Math.min(1, (frame - startTime) / effectDuration),
  );

  // Increase scale to ensure no empty areas during pan
  const scale = 1 + intensity / 100;

  // Calculate initial offset to ensure edges are flush
  let initialTransformX = 0;
  let initialTransformY = 0;

  // Maximum translation based on scale overflow
  const maxTranslate = ((scale - 1) / scale) * 100;

  switch (direction) {
    case "left":
      // Start with right edge flush, translate left
      initialTransformX = maxTranslate * (1 - progress);
      break;
    case "right":
      // Start with left edge flush, translate right
      initialTransformX = -maxTranslate * (1 - progress);
      break;
    case "up":
      // Start with bottom edge flush, translate up
      initialTransformY = maxTranslate * (1 - progress);
      break;
    case "down":
      // Start with top edge flush, translate down
      initialTransformY = -maxTranslate * (1 - progress);
      break;
    case "out":
      // Diagonal flush positioning
      initialTransformX = -maxTranslate * (1 - progress);
      initialTransformY = -maxTranslate * (1 - progress);
      break;
  }

  // Calculate movement during effect
  let movementX = 0;
  let movementY = 0;

  switch (direction) {
    case "left":
      movementX = -maxTranslate * progress;
      break;
    case "right":
      movementX = maxTranslate * progress;
      break;
    case "up":
      movementY = -maxTranslate * progress;
      break;
    case "down":
      movementY = maxTranslate * progress;
      break;
    case "out":
      movementX = maxTranslate * progress;
      movementY = maxTranslate * progress;
      break;
  }

  // Combine initial positioning with movement
  const finalTransformX = initialTransformX + movementX;
  const finalTransformY = initialTransformY + movementY;

  return (
    <AbsoluteFill className={`pan-effect ${className}`}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${scale}) translate(${finalTransformX}%, ${finalTransformY}%)`,
          transformOrigin: "center center",
          ...style,
        }}
      />
    </AbsoluteFill>
  );
};
