import React from "react";
import { useThemeContext } from "../../core/context/ThemeContext";
import { getVariantStyles, applyContrastSafety } from "./config/variants";
import { getTypographyStyles } from "./config/styles";
import {
  AnimationType,
  AnimationConfig,
  normalizeAnimation,
  useAnimation,
  EasingType,
  SpringConfig,
  SPRING_CONFIGS,
} from "./config/animations";

interface AnimatedTextProps {
  children: string;
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
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  animation?: AnimationType | AnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: EasingType;
  springConfig?: SpringConfig;
  staggerDelay?: number;
  letterAnimation?: AnimationType | AnimationConfig;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  letterSpacing?: string;
  lineHeight?: string;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
}

/**
 * AnimatedText component that supports letter-by-letter animations
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  variant = "default",
  contrastSafe = true,
  className = "",
  style = {},
  component = "p",
  animation,
  animationDelay = 0,
  animationDuration = 30,
  animationEasing = "easeInOut",
  springConfig = SPRING_CONFIGS.DEFAULT,
  staggerDelay = 2,
  letterAnimation = "fadeIn",
  fontSize,
  fontWeight,
  textAlign,
  letterSpacing,
  lineHeight,
  textTransform,
}) => {
  const theme = useThemeContext();

  // Get the theme context
  const { colors } = theme;
  const { utils } = colors;

  // Determine default font size based on component type
  const defaultFontSize = (() => {
    switch (component) {
      case "h1":
        return "5xl";
      case "h2":
        return "4xl";
      case "h3":
        return "3xl";
      case "h4":
        return "2xl";
      case "h5":
        return "xl";
      case "h6":
        return "lg";
      case "p":
        return "base";
      case "span":
        return "base";
      default:
        return "base";
    }
  })();

  // Determine default font weight based on component type
  const defaultFontWeight = (() => {
    if (component.startsWith("h")) return "bold";
    return "normal";
  })();

  // Get typography styles from theme
  const typographyStyles = getTypographyStyles(
    theme.typography?.[component === "p" ? "Body" : component],
    theme.componentStyles?.[component.toLowerCase()],
    variant,
    fontSize || defaultFontSize,
    fontWeight || defaultFontWeight,
    className,
  );

  // Get variant-specific styles
  const variantStyles = getVariantStyles(variant, utils, colors, contrastSafe);

  // Determine the final text color
  let textColor = variantStyles.color;

  // Apply contrast safety if needed
  if (contrastSafe && textColor) {
    textColor = applyContrastSafety(textColor, variant, utils, contrastSafe);
  }

  // Get container animation if specified
  const containerAnimConfig = normalizeAnimation(
    animation,
    animationDelay,
    animationDuration,
    animationEasing,
    springConfig,
  );

  const containerAnimStyles = animation
    ? useAnimation(containerAnimConfig)
    : {};

  // Convert children to string and split into characters
  const text = String(children);
  const characters = text.split("");

  // Create the component
  const Component = component;

  // Additional custom styles
  const customStyles: React.CSSProperties = {
    ...(textAlign && { textAlign }),
    ...(letterSpacing && { letterSpacing }),
    ...(lineHeight && { lineHeight }),
    ...(textTransform && { textTransform }),
  };

  return (
    <Component
      className={typographyStyles.className}
      style={{
        ...typographyStyles.style,
        color: textColor || undefined,
        ...variantStyles.additionalStyles,
        ...customStyles,
        ...style,
        ...(containerAnimStyles as React.CSSProperties),
      }}
    >
      {characters.map((char, index) => {
        // Calculate staggered delay for each character
        const charDelay = animationDelay + index * staggerDelay;

        // Create animation config for this character
        const charAnimConfig = normalizeAnimation(
          letterAnimation,
          charDelay,
          animationDuration,
          animationEasing,
          springConfig,
        );

        // Get animation styles for this character
        const charAnimStyles = useAnimation(charAnimConfig);

        // Handle spaces specially
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              ...(charAnimStyles as React.CSSProperties),
            }}
          >
            {char}
          </span>
        );
      })}
    </Component>
  );
};
