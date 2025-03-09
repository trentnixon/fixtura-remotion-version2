import React from "react";
import { useThemeContext } from "../../core/context/ThemeContext";
import { getVariantStyles, applyContrastSafety } from "./config/variants";
import { getTypographyStyles } from "./config/styles";
import {
  AnimationType,
  AnimationConfig,
  normalizeAnimation,
  useAnimation,
} from "./config/animations";

export const H2 = ({
  children,
  variant = "default",
  contrastSafe = true,
  className = "",
  style = {},
  animation,
  animationDelay,
  animationDuration,
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "contrast"
    | "gradient"
    | "muted"
    | "safe-primary"
    | "safe-secondary"
    | "highlight";
  contrastSafe?: boolean;
  className?: string;
  style?: React.CSSProperties;
  animation?: AnimationType | AnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
}) => {
  const theme = useThemeContext();

  // Get the theme context
  const { colors } = theme;
  const { utils } = colors;

  // Get typography styles from theme
  const headingStyles = getTypographyStyles(
    theme.typography?.Subtitle,
    theme.componentStyles?.h2,
    variant,
    "5xl",
    "bold",
  );

  // Get variant-specific styles
  const variantStyles = getVariantStyles(variant, utils, colors, contrastSafe);

  // Determine the final text color
  let textColor = variantStyles.color;

  // If variant didn't specify a color, use the default for this component
  if (textColor === null) {
    textColor = utils.text.title;
  }

  // Apply contrast safety
  if (variant !== "gradient" && textColor) {
    textColor = applyContrastSafety(textColor, variant, utils, contrastSafe);
  }

  // Create the style object with proper type handling
  const componentStyle: React.CSSProperties = {
    ...headingStyles.style,
    ...variantStyles.additionalStyles,
    fontFamily: theme.fonts?.heading?.family,
    ...style,
  };

  // Only add color if it's defined and not a gradient
  if (variant !== "gradient" && textColor) {
    componentStyle.color = textColor;
  }

  // Process animation configuration
  const animationConfig = normalizeAnimation(
    animation,
    animationDelay,
    animationDuration,
  );

  // For typewriter animation, pass the text length
  if (animationConfig.type === "typewriter" && typeof children === "string") {
    animationConfig.custom = {
      ...animationConfig.custom,
      textLength: children.length,
    };
  }

  // Get animation styles
  const animationStyles = useAnimation(animationConfig);

  // Merge all styles
  const finalStyle: React.CSSProperties = {
    ...componentStyle,
    ...animationStyles,
  };

  return (
    <h2
      className={`${headingStyles.className} ${className}`}
      style={finalStyle}
    >
      {children}
    </h2>
  );
};
