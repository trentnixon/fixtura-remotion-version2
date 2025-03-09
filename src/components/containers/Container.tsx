import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import {
  ContainerProps,
  ContainerAnimationConfig,
  normalizeContainerAnimation,
  CONTAINER_SIZES,
  DEFAULT_BORDER_RADIUS,
} from "./config";
import { useDualContainerAnimation } from "./hooks";

/**
 * Container Component
 *
 * A versatile container component with animation capabilities for Remotion videos.
 * Supports both entry and exit animations, styling options, and flexible content.
 *
 * @example Basic Usage
 * ```tsx
 * <Container width="300px" height="100px" backgroundColor="#f0f0f0">
 *   <Typography>Container Content</Typography>
 * </Container>
 * ```
 *
 * @example With Animation
 * ```tsx
 * <Container
 *   width="300px"
 *   height="100px"
 *   backgroundColor="#f0f0f0"
 *   animation="fadeIn"
 *   animationDuration={30}
 *   exitAnimation="fadeOut"
 *   exitFrame={60}
 * >
 *   <Typography>Animated Container</Typography>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  // Content
  children,

  // Variant
  variant = "basic",

  // Dimensions
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  size,

  // Spacing
  padding,
  margin,

  // Appearance
  backgroundColor,
  backgroundGradient,
  border,
  borderRadius = DEFAULT_BORDER_RADIUS,
  boxShadow,
  opacity = 1,

  // Animation
  animation = "none",
  animationDelay = 0,
  animationDuration = 30,
  animationEasing = "easeInOut",
  springConfig,

  // Exit Animation
  exitAnimation = "none",
  exitAnimationDelay = 0,
  exitAnimationDuration = 30,
  exitAnimationEasing = "easeInOut",
  exitSpringConfig,
  exitFrame = 0,

  // Other
  className = "",
  style = {},
  onClick,

  // Accessibility
  role,
  ariaLabel,
  tabIndex,
}) => {
  const frame = useCurrentFrame();

  // Normalize animation configurations
  const animationConfig = useMemo(
    () =>
      normalizeContainerAnimation(
        animation,
        animationDelay,
        animationDuration,
        animationEasing,
        springConfig,
      ),
    [
      animation,
      animationDelay,
      animationDuration,
      animationEasing,
      springConfig,
    ],
  );

  const exitAnimationConfig = useMemo(
    () =>
      normalizeContainerAnimation(
        exitAnimation,
        exitAnimationDelay,
        exitAnimationDuration,
        exitAnimationEasing,
        exitSpringConfig,
      ),
    [
      exitAnimation,
      exitAnimationDelay,
      exitAnimationDuration,
      exitAnimationEasing,
      exitSpringConfig,
    ],
  );

  // Get animation styles
  const animationStyles = useDualContainerAnimation(
    animationConfig,
    exitAnimationConfig,
    exitFrame,
  );

  // Calculate base styles
  const baseStyles = useMemo(() => {
    // Get size from predefined sizes if specified
    const sizeStyles = size
      ? CONTAINER_SIZES[size]
      : { width: undefined, padding: undefined };

    // Calculate background styles
    let backgroundStyles: React.CSSProperties = {};
    if (backgroundColor) {
      backgroundStyles = { backgroundColor };
    } else if (backgroundGradient) {
      const {
        type,
        colors,
        direction = "to right",
        positions,
      } = backgroundGradient;

      if (type === "linear") {
        const gradientColors = positions
          ? colors.map((color, index) => `${color} ${positions[index] || ""}`)
          : colors;
        backgroundStyles = {
          background: `linear-gradient(${direction}, ${gradientColors.join(", ")})`,
        };
      } else if (type === "radial") {
        const gradientColors = positions
          ? colors.map((color, index) => `${color} ${positions[index] || ""}`)
          : colors;
        backgroundStyles = {
          background: `radial-gradient(circle, ${gradientColors.join(", ")})`,
        };
      }
    }

    // Calculate border styles
    let borderStyles: React.CSSProperties = {};
    if (typeof border === "string") {
      borderStyles = { border };
    } else if (border) {
      const {
        width: borderWidth,
        style: borderStyle,
        color: borderColor,
      } = border;
      if (borderWidth && borderStyle && borderColor) {
        borderStyles = {
          border: `${borderWidth} ${borderStyle} ${borderColor}`,
        };
      }
    }

    // Calculate box shadow styles
    let shadowStyles: React.CSSProperties = {};
    if (typeof boxShadow === "string") {
      shadowStyles = { boxShadow };
    } else if (boxShadow) {
      const {
        offsetX = "0px",
        offsetY = "4px",
        blur = "6px",
        spread = "0px",
        color = "rgba(0, 0, 0, 0.1)",
        inset = false,
      } = boxShadow;

      shadowStyles = {
        boxShadow: `${inset ? "inset " : ""}${offsetX} ${offsetY} ${blur} ${spread} ${color}`,
      };
    }

    return {
      display: "flex",
      flexDirection: "column" as const,
      width: width || (sizeStyles.width as string | undefined) || "auto",
      height: height || "auto",
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      padding: padding || (sizeStyles.padding as string | undefined) || "1rem",
      margin,
      borderRadius,
      opacity,
      overflow: "hidden",
      ...backgroundStyles,
      ...borderStyles,
      ...shadowStyles,
    };
  }, [
    size,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    margin,
    backgroundColor,
    backgroundGradient,
    border,
    borderRadius,
    boxShadow,
    opacity,
  ]);

  // Combine all styles
  const combinedStyles = useMemo(
    () => ({
      ...baseStyles,
      ...style,
      ...animationStyles,
    }),
    [baseStyles, style, animationStyles],
  );

  return (
    <div
      className={`container container-${variant} ${className}`}
      style={combinedStyles}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};
