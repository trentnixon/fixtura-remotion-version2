import React from "react";
import { AbsoluteFill } from "remotion";
import {
  GradientBackgroundProps,
  DEFAULT_GRADIENT_BACKGROUND,
} from "../config";
import { useStylesContext } from "../../../core/context/StyleContext";
import { useGlobalContext } from "../../../core/context/GlobalContext";

interface Props extends Partial<GradientBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

export const GradientBackground: React.FC<Props> = ({
  gradientType = "linear",
  colors,
  direction,
  positions,
  animation,
  animationDuration,
  animationDelay,
  exitAnimation,
  exitAnimationDuration,
  exitFrame,
  className = "",
  style = {},
}) => {
  const { THEME } = useStylesContext();
  const { settings } = useGlobalContext();

  // Use provided colors or theme colors
  const gradientColors = colors || [THEME.primary, THEME.secondary];

  // Use provided direction or settings
  const gradientDirection = direction || `${settings.gradientDegree}`;

  // Generate gradient based on type
  let backgroundImage = "";

  if (gradientType === "linear") {
    if (positions && positions.length === gradientColors.length) {
      // With color stops
      const colorStops = gradientColors
        .map((color, index) => `${color} ${positions[index]}`)
        .join(", ");
      backgroundImage = `linear-gradient(${gradientDirection}, ${colorStops})`;
    } else {
      // Without color stops
      backgroundImage = `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`;
    }
  } else if (gradientType === "radial") {
    if (positions && positions.length === gradientColors.length) {
      // With color stops
      const colorStops = gradientColors
        .map((color, index) => `${color} ${positions[index]}`)
        .join(", ");
      backgroundImage = `radial-gradient(circle, ${colorStops})`;
    } else {
      // Without color stops
      backgroundImage = `radial-gradient(circle, ${gradientColors.join(", ")})`;
    }
  } else if (gradientType === "conic") {
    if (positions && positions.length === gradientColors.length) {
      // With color stops
      const colorStops = gradientColors
        .map((color, index) => `${color} ${positions[index]}`)
        .join(", ");
      backgroundImage = `conic-gradient(from ${gradientDirection}, ${colorStops})`;
    } else {
      // Without color stops
      backgroundImage = `conic-gradient(from ${gradientDirection}, ${gradientColors.join(", ")})`;
    }
  }

  return (
    <AbsoluteFill
      className={`bg-gradient ${className}`}
      style={{
        backgroundImage,
        zIndex: -1,
        ...style,
      }}
    />
  );
};
