// variants/PatternBackground/index.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import {
  PatternBackgroundProps,
  PATTERN_TYPES,
  ANIMATION_TYPES,
  PatternType,
  AnimationType,
  PatternComponentProps,
} from "./variants/config";

import DotsPattern from "./variants/dots";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../core/context/StyleContext";

interface PatternTemplateVariation {
  type?: PatternType;
  scale?: number;
  rotation?: number;
  animation?: AnimationType;
  animationDuration?: number;
  animationSpeed?: number;
}

const patternTypeByAnimationType: Record<string, PatternType> = {
  "dot-field": "dots",
};

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  scale = 1,
  rotation = 0,
  opacity = 0.2,
  animation,
  animationDuration,
  animationSpeed,
  className = "",
  style = {},
}) => {
  const { video } = useVideoDataContext();
  const { selectedPalette } = useStylesContext();

  const animationConfig = video.templateVariation?.animation;
  const animationType = animationConfig?.type;
  const existingPattern =
    video.templateVariation?.useBackground !== "Animated"
      ? (video.templateVariation?.pattern as
          | PatternTemplateVariation
          | undefined)
      : undefined;
  const patternConfig: PatternTemplateVariation = existingPattern || {
    type: patternTypeByAnimationType[animationType || ""] ?? "dots",
    scale: animationConfig?.scale,
    rotation: animationConfig?.rotation,
    animation: animationConfig?.motion as AnimationType | undefined,
    animationDuration: animationConfig?.duration,
    animationSpeed: animationConfig?.speed,
  };
  const patternType = patternConfig.type || PATTERN_TYPES.DOTS;

  const patternProps: PatternComponentProps = {
    primaryColor: selectedPalette.background.contrast,
    secondaryColor: selectedPalette.background.gradient.primary.css.HORIZONTAL,
    scale: patternConfig.scale || scale,
    rotation: patternConfig.rotation || rotation,
    opacity,
    animation: (patternConfig.animation || animation) as
      | AnimationType
      | undefined,
    animationDuration: patternConfig.animationDuration || animationDuration,
    animationSpeed: patternConfig.animationSpeed || animationSpeed,
  };

  return (
    <AbsoluteFill
      className={`pattern-background pattern-${patternType} ${className}`}
      style={{
        ...style,
      }}
    >
      <DotsPattern {...patternProps} />
    </AbsoluteFill>
  );
};

export const PatternVariants = {
  Dots: DotsPattern,
};

export { PATTERN_TYPES, ANIMATION_TYPES };

export default PatternBackground;
