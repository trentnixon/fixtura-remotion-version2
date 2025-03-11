import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { ContainerProps, normalizeContainerAnimation } from "./config";
import { useDualContainerAnimation } from "./hooks";
import { classNames } from "../../core/utils/classNames";

/**
 * Container Component
 *
 * A versatile container component with animation capabilities for Remotion videos.
 * Supports both entry and exit animations and flexible content.
 * Uses Tailwind CSS for styling.
 *
 * @example Basic Usage with Tailwind
 * ```tsx
 * <Container className="w-[300px] h-[100px] bg-gray-100 p-4 rounded-lg">
 *   <Typography>Container Content</Typography>
 * </Container>
 * ```
 *
 * @example With Animation
 * ```tsx
 * <Container
 *   className="w-[300px] h-[100px] bg-gray-100 p-4 rounded-lg"
 *   animation={{
 *     type: "fadeIn",
 *     duration: 30,
 *     easing: "easeInOut"
 *   }}
 *   exitAnimation={{
 *     type: "fadeOut",
 *     duration: 30,
 *     easing: "easeInOut"
 *   }}
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

  // Styling
  className = "",
  style = {},

  // Event handling
  onClick,

  // Accessibility
  role,
  ariaLabel,
  tabIndex,

  // We'll handle all other styling through Tailwind classes
  ...otherProps
}) => {
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

  // Get animation styles (keep these as inline styles since they're dynamic)
  const animationStyles = useDualContainerAnimation(
    animationConfig,
    exitAnimationConfig,
    exitFrame,
  );

  // Combine the animation styles with any other styles provided
  const combinedStyles = useMemo(
    () => ({
      ...style,
      ...animationStyles,
    }),
    [style, animationStyles],
  );

  return (
    <div
      className={classNames(`container-${variant}`, className)}
      style={combinedStyles}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      {...otherProps}
    >
      {children}
    </div>
  );
};
