import React from "react";
import { useThemeContext } from "../../core/context/ThemeContext";
import { getVariantStyles, applyContrastSafety } from "./config/variants";
import { getTypographyStyles } from "./config/styles";

export const BodyXS = ({
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
  const bodyStyles = getTypographyStyles(
    theme.typography?.Body,
    theme.componentStyles?.bodyXS,
    variant,
    "xs",
    "normal",
  );

  // Get variant-specific styles
  const variantStyles = getVariantStyles(variant, utils, colors, contrastSafe);

  // Determine the final text color
  let textColor = variantStyles.color;

  // If variant didn't specify a color, use the default for this component
  if (textColor === null) {
    textColor = utils.text.body;
  }

  // Apply contrast safety
  if (textColor) {
    textColor = applyContrastSafety(textColor, variant, utils, contrastSafe);
  }

  // Create the style object with proper type handling
  const componentStyle: React.CSSProperties = {
    ...bodyStyles.style,
    ...variantStyles.additionalStyles,
    fontFamily: theme.fonts?.body?.family,
    ...style,
  };

  // Only add color if it's defined
  if (textColor) {
    componentStyle.color = textColor;
  }

  return (
    <p
      className={`${bodyStyles.className} ${className}`}
      style={componentStyle}
    >
      {children}
    </p>
  );
};
