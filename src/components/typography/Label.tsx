import React from "react";
import { useThemeContext } from "../../core/context/ThemeContext";
import { getVariantStyles, applyContrastSafety } from "./config/variants";
import { getTypographyStyles } from "./config/styles";

export const Label = ({
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
    | "highlight"
    | "muted"
    | "safe-primary"
    | "safe-secondary"
    | "team-color"
    | "opponent-color";
  contrastSafe?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const theme = useThemeContext();

  // Get the theme context
  const { colors } = theme;
  const { utils } = colors;

  // Get typography styles from theme
  const labelStyles = getTypographyStyles(
    theme.typography?.Sports?.Label,
    theme.componentStyles?.label,
    variant,
    "sm",
    "medium",
  );

  // Get variant-specific styles
  const variantStyles = getVariantStyles(variant, utils, colors, contrastSafe);

  // Determine the final text color
  let textColor = variantStyles.color;

  // If variant didn't specify a color, use the default for this component
  if (textColor === null) {
    textColor = utils.text.body;
  }

  // Handle sports-specific variants
  if (variant === "team-color" && theme.sports?.teamColor) {
    textColor = theme.sports.teamColor;
  } else if (variant === "opponent-color" && theme.sports?.opponentColor) {
    textColor = theme.sports.opponentColor;
  }

  // Apply contrast safety
  if (textColor) {
    textColor = applyContrastSafety(textColor, variant, utils, contrastSafe);
  }

  // Create the style object with proper type handling
  const componentStyle: React.CSSProperties = {
    ...labelStyles.style,
    ...variantStyles.additionalStyles,
    fontFamily: theme.fontClasses?.label?.family,
    textTransform: "uppercase",
    ...style,
  };

  // Only add color if it's defined
  if (textColor) {
    componentStyle.color = textColor;
  }

  return (
    <span
      className={`${labelStyles.className} ${className}`}
      style={componentStyle}
    >
      {children}
    </span>
  );
};
