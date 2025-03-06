// src/templates/variants/basic/components/ui/Title.tsx

import React from "react";
import { useThemeContext } from "../../core/context/ThemeContext";
import { getVariantStyles, applyContrastSafety } from "./config/variants";
import { getTypographyStyles } from "./config/styles";

// Keep the explicit prop definition for better IDE support
export const SubTitle = ({
  children,
  variant = "default",
  contrastSafe = true,
  className = "",
  style = {},
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
}) => {
  const theme = useThemeContext();

  // Get the theme context
  const { colors } = theme;
  const { utils } = colors;

  // Get typography styles from theme
  const subtitleStyles = getTypographyStyles(
    theme.typography?.Subtitle,
    theme.componentStyles?.subtitle,
    variant,
    "4xl",
    "semibold",
    "text-center m-0 px-4",
  );

  // Get variant-specific styles
  const variantStyles = getVariantStyles(variant, utils, colors, contrastSafe);

  // Determine the final text color
  let textColor = variantStyles.color;

  // If variant didn't specify a color, use the default for this component
  if (textColor === null) {
    textColor = utils.variations.primary.dark;
  }

  // Apply contrast safety
  if (variant !== "gradient" && textColor) {
    textColor = applyContrastSafety(textColor, variant, utils, contrastSafe);
  }

  // Create the style object with proper type handling
  const componentStyle: React.CSSProperties = {
    ...subtitleStyles.style,
    ...variantStyles.additionalStyles,
    fontFamily: theme.fonts?.copy?.family,
    ...style,
  };

  // Only add color if it's defined and not a gradient
  if (variant !== "gradient" && textColor) {
    componentStyle.color = textColor;
  }

  return (
    <h2
      className={`${subtitleStyles.className} ${className}`}
      style={componentStyle}
    >
      {children}
    </h2>
  );
};
