// variants/PatternBackground/index.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import {
  PatternBackgroundProps,
  PATTERN_TYPES,
  ANIMATION_TYPES,
} from "./variants/config";

// Import pattern components
import DotsPattern from "./variants/dots";
import LinesPattern from "./variants/lines";
import GridPattern from "./variants/grid";
import CrosshatchPattern from "./variants/CrosshatchPattern";
import TrianglesPattern from "./variants/TrianglesPattern";
import ChevronPattern from "./variants/ChevronPattern";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useStylesContext } from "../../../../core/context/StyleContext";

/**
 * PatternBackground component that renders different pattern backgrounds
 */
export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  pattern,
  scale = 1,
  rotation = 0,
  opacity = 0.5,
  animation,
  animationDuration,
  animationSpeed,
  className = "",
  style = {},
  ...props
}) => {
  const { video } = useVideoDataContext();
  const { selectedPalette } = useStylesContext();

  // Get pattern type and animation settings from template variation or use defaults
  const patternConfig = video.templateVariation?.Pattern || {};
  const patternType = patternConfig.type || PATTERN_TYPES.DOTS;

  // Create unique ID for the pattern
  const patternId = `pattern-${patternType}-${Math.random().toString(36).substr(2, 9)}`;

  // Common pattern props
  const patternProps = {
    primaryColor: selectedPalette.background.contrast,
    secondaryColor: selectedPalette.background.gradient.primary.css.HORIZONTAL,
    scale: patternConfig.scale || scale,
    rotation: patternConfig.rotation || rotation,
    opacity,
    patternId,
    animation: patternConfig.animation || animation,
    animationDuration: patternConfig.animationDuration || animationDuration,
    animationSpeed: patternConfig.animationSpeed || animationSpeed,
  };

  // Select the pattern component based on pattern type
  const renderPattern = () => {
    switch (patternType) {
      case PATTERN_TYPES.DOTS:
        return <DotsPattern {...patternProps} />;
      case PATTERN_TYPES.LINES:
        return <LinesPattern {...patternProps} />;
      case PATTERN_TYPES.GRID:
        return <GridPattern {...patternProps} />;
      case PATTERN_TYPES.CROSSHATCH:
        return <CrosshatchPattern {...patternProps} />;
      case PATTERN_TYPES.TRIANGLES:
        return <TrianglesPattern {...patternProps} />;
      case PATTERN_TYPES.CHEVRON:
        return <ChevronPattern {...patternProps} />;
      default:
        return <DotsPattern {...patternProps} />;
    }
  };

  return (
    <AbsoluteFill
      className={`pattern-background pattern-${patternType} ${className}`}
      style={{
        ...style,
      }}
    >
      {renderPattern()}
    </AbsoluteFill>
  );
};

// Export pattern variants
export const PatternVariants = {
  Dots: DotsPattern,
  Lines: LinesPattern,
  Grid: GridPattern,
  Crosshatch: CrosshatchPattern,
  Triangles: TrianglesPattern,
  Chevron: ChevronPattern,
};

// Export pattern types and animation types
export { PATTERN_TYPES, ANIMATION_TYPES };

// Default export
export default PatternBackground;
