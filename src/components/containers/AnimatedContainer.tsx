import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useThemeContext } from "../../core/context/ThemeContext";
import { classNames } from "../../core/utils/classNames";

// Import types
import { ContainerProps } from "./types";
import { AnimationProps } from "./animations";

// Import functions
import { normalizeContainerAnimation, useAnimation } from "./animations";
import {
  getBackgroundColorStyle,
  getTypeStyles,
  getSizeStyles,
  getRoundedStyles,
  getShadowStyles,
} from "./styles";

// Combine the props
export interface AnimatedContainerProps
  extends ContainerProps,
    AnimationProps {}

/**
 * AnimatedContainer Component
 *
 * A versatile container component with animation capabilities for Remotion videos.
 * Supports both entry and exit animations, theme integration, and flexible styling options.
 *
 * @component
 *
 * @example Basic Usage
 * ```tsx
 * <AnimatedContainer
 *   type="border"
 *   backgroundColor="primary"
 *   rounded="md"
 *   shadow="md"
 * >
 *   <Typography>Container Content</Typography>
 * </AnimatedContainer>
 * ```
 *
 * @example With Animation
 * ```tsx
 * <AnimatedContainer
 *   type="card"
 *   backgroundColor="light"
 *   rounded="lg"
 *   shadow="lg"
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
 * </AnimatedContainer>
 * ```
 *
 * @example With Spring Animation
 * ```tsx
 * <AnimatedContainer
 *   type="card"
 *   backgroundColor="light"
 *   rounded="lg"
 *   shadow="lg"
 *   animation="springIn"
 *   springConfig={SPRING_CONFIGS.BOUNCE}
 *   animationDuration={45}
 * >
 *   <Typography>Spring Animated Container</Typography>
 * </AnimatedContainer>
 * ```
 *
 * @example With Slide Animation
 * ```tsx
 * <AnimatedContainer
 *   type="basic"
 *   backgroundColor="secondary"
 *   animation="slideInLeft"
 *   animationDuration={25}
 *   animationEasing="easeOut"
 *   exitAnimation="slideOutRight"
 *   exitFrame={120}
 * >
 *   <Typography>Slide Animated Container</Typography>
 * </AnimatedContainer>
 * ```
 *
 * @example With Scale Animation
 * ```tsx
 * <AnimatedContainer
 *   type="card"
 *   backgroundColor="accent"
 *   rounded="full"
 *   shadow="lg"
 *   animation="scaleIn"
 *   animationDuration={20}
 *   exitAnimation="scaleOut"
 *   exitFrame={100}
 * >
 *   <Typography>Scale Animated Container</Typography>
 * </AnimatedContainer>
 * ```
 *
 * @example With 3D Animation
 * ```tsx
 * <AnimatedContainer
 *   type="card"
 *   backgroundColor="primary"
 *   rounded="md"
 *   shadow="xl"
 *   animation="flipX"
 *   animationDuration={40}
 * >
 *   <Typography>3D Animated Container</Typography>
 * </AnimatedContainer>
 * ```
 *
 * @example Combining Multiple Containers with Different Animations
 * ```tsx
 * <Sequence from={0} durationInFrames={120}>
 *   <AnimatedContainer
 *     type="card"
 *     backgroundColor="primary"
 *     animation="fadeIn"
 *     animationDuration={30}
 *     exitAnimation="fadeOut"
 *     exitFrame={90}
 *   >
 *     <Typography>First Container</Typography>
 *   </AnimatedContainer>
 * </Sequence>
 *
 * <Sequence from={30} durationInFrames={120}>
 *   <AnimatedContainer
 *     type="card"
 *     backgroundColor="secondary"
 *     animation="slideInRight"
 *     animationDuration={30}
 *     exitAnimation="slideOutRight"
 *     exitFrame={120}
 *   >
 *     <Typography>Second Container</Typography>
 *   </AnimatedContainer>
 * </Sequence>
 * ```
 *
 * @prop {React.ReactNode} children - Content to be rendered inside the container
 *
 * @prop {"basic" | "border" | "card" | "fixture" | "score" | "player" | "leaderboard"} [type="basic"] - Container type/variant
 * @prop {"xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto"} [size="auto"] - Container size
 * @prop {"none" | "sm" | "md" | "lg" | "full"} [rounded="none"] - Border radius size
 * @prop {"none" | "sm" | "md" | "lg" | "xl"} [shadow="none"] - Shadow size
 * @prop {string} [backgroundColor="none"] - Background color (uses theme colors)
 *
 * @prop {ContainerAnimationType | ContainerAnimationConfig} [animation="none"] - Animation type or config
 * @prop {number} [animationDelay=0] - Delay before animation starts (in frames)
 * @prop {number} [animationDuration=30] - Animation duration (in frames)
 * @prop {AnimationEasing} [animationEasing="easeInOut"] - Animation easing function
 * @prop {ContainerSpringConfig} [springConfig] - Spring animation configuration
 *
 * @prop {ContainerAnimationType | ContainerAnimationConfig} [exitAnimation="none"] - Exit animation type or config
 * @prop {number} [exitAnimationDelay=0] - Delay before exit animation starts (in frames)
 * @prop {number} [exitAnimationDuration=30] - Exit animation duration (in frames)
 * @prop {AnimationEasing} [exitAnimationEasing="easeInOut"] - Exit animation easing function
 * @prop {ContainerSpringConfig} [exitSpringConfig] - Exit spring animation configuration
 * @prop {number} [exitFrame=0] - Frame at which to start the exit animation
 *
 * @prop {string} [className=""] - Additional CSS classes
 * @prop {React.CSSProperties} [style={}] - Additional inline styles
 * @prop {() => void} [onClick] - Click handler
 * @prop {string} [role] - ARIA role
 * @prop {string} [ariaLabel] - ARIA label
 * @prop {number} [tabIndex] - Tab index
 *
 * @note Animation Types:
 * - Fade: "fadeIn", "fadeOut"
 * - Slide: "slideInLeft", "slideInRight", "slideInTop", "slideInBottom", "slideOutLeft", "slideOutRight", "slideOutTop", "slideOutBottom"
 * - Scale: "scaleIn", "scaleOut", "scaleInX", "scaleInY", "scaleOutX", "scaleOutY"
 * - Reveal: "revealLeft", "revealRight", "revealTop", "revealBottom", "collapseLeft", "collapseRight", "collapseTop", "collapseBottom"
 * - Spring: "springIn", "springOut", "springScale", "springTranslateX", "springTranslateY", "springRotate"
 * - 3D: "flipX", "flipY", "rotate3D", "swing", "zoomPerspective", "glitch", "blur"
 *
 * @note Spring Configurations:
 * - DEFAULT: Standard spring animation
 * - GENTLE: Gentle, slow spring animation
 * - WOBBLY: Wobbly, oscillating spring animation
 * - STIFF: Stiff, quick spring animation
 * - SLOW: Slow, heavy spring animation
 * - MOLASSES: Very slow, heavy spring animation
 * - BOUNCE: Bouncy spring animation
 * - NO_WOBBLE: Spring animation with no oscillation
 *
 * @note Easing Functions:
 * - "linear": Constant speed
 * - "ease": Default easing (slow start, fast middle, slow end)
 * - "easeIn": Slow start, fast end
 * - "easeOut": Fast start, slow end
 * - "easeInOut": Slow start and end, fast middle
 * - "cubic": Cubic bezier curve
 * - "bounce": Bouncy effect at the end
 * - "elastic": Elastic effect at the end
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  // Content
  children,

  // Container styling
  type = "basic",
  size = "auto",
  rounded = "none",
  shadow = "none",
  backgroundColor = "none",

  // Animation
  animation = "none",
  animationDelay = 0,
  animationDuration = 30,
  animationEasing = { type: "inOut", base: "ease" },
  springConfig,

  // Exit Animation
  exitAnimation = "none",
  exitAnimationDelay = 0,
  exitAnimationDuration = 30,
  exitAnimationEasing = { type: "inOut", base: "ease" },
  exitSpringConfig,
  exitFrame = 0,

  // Additional styling
  className = "",
  style = {},

  // Event handling
  onClick,

  // Accessibility
  role,
  ariaLabel,
  tabIndex,
}) => {
  // Get theme context
  const { selectedPalette } = useThemeContext();
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Normalize animation configurations
  const animationConfig = useMemo(
    () =>
      normalizeContainerAnimation(
        animation,
        animationDelay,
        animationDuration,
        animationEasing,
      ),
    [animation, animationDelay, animationDuration, animationEasing],
  );

  const exitAnimationConfig = useMemo(
    () =>
      normalizeContainerAnimation(
        exitAnimation,
        exitAnimationDelay,
        exitAnimationDuration,
        exitAnimationEasing,
      ),
    [
      exitAnimation,
      exitAnimationDelay,
      exitAnimationDuration,
      exitAnimationEasing,
    ],
  );

  // Add spring config to animation configs
  const animationConfigWithSpring = useMemo(
    () => ({
      ...animationConfig,
      springConfig,
    }),
    [animationConfig, springConfig],
  );

  const exitAnimationConfigWithSpring = useMemo(
    () => ({
      ...exitAnimationConfig,
      springConfig: exitSpringConfig,
    }),
    [exitAnimationConfig, exitSpringConfig],
  );

  // Compute a sensible default exit frame if not provided, so exit animations run
  const computedExitFrame = useMemo(() => {
    if (exitFrame > 0) return exitFrame;
    if (!exitAnimationConfig || exitAnimationConfig.type === "none") return 0;
    const delay = exitAnimationConfig.delay || 0;
    const duration = exitAnimationConfig.duration || 30;
    const totalFrames = durationInFrames ?? 0;
    // Choose start so that (start + delay + duration) lands at composition end
    const fallbackStart = Math.max(0, totalFrames - duration - delay);
    return fallbackStart;
  }, [exitFrame, exitAnimationConfig, durationInFrames]);

  // Determine if we should use entry or exit animation
  const isExiting = computedExitFrame > 0 && frame >= computedExitFrame;

  // Calculate animation start frame
  const animationStartFrame = isExiting
    ? computedExitFrame + (exitAnimationConfig.delay || 0)
    : animationConfig.delay || 0;

  // Use the animation hook to get animation styles
  const animationStyles = useAnimation(
    isExiting ? exitAnimationConfigWithSpring : animationConfigWithSpring,
    animationStartFrame,
  );

  // Get style functions from the style modules
  const backgroundColorStyle = useMemo(() => {
    return getBackgroundColorStyle(backgroundColor, selectedPalette);
  }, [backgroundColor, selectedPalette]);

  const typeStyles = useMemo(() => {
    return getTypeStyles(type, selectedPalette);
  }, [type, selectedPalette]);

  const sizeStyles = useMemo(() => {
    return getSizeStyles(size);
  }, [size]);

  const roundedStyles = useMemo(() => {
    return getRoundedStyles(rounded);
  }, [rounded]);

  const shadowStyles = useMemo(() => {
    return getShadowStyles(shadow);
  }, [shadow]);

  // Combine all classes
  const containerClasses = classNames(
    "animated-container",
    `container-${type}`,
    className,
  );

  // Combine the animation styles with any other styles provided
  const combinedStyles = useMemo(
    () => ({
      ...style,
      ...animationStyles,
      ...backgroundColorStyle,
      ...typeStyles,
      ...roundedStyles,
      ...shadowStyles,
      ...sizeStyles,
    }),
    [
      style,
      animationStyles,
      backgroundColorStyle,
      typeStyles,
      roundedStyles,
      shadowStyles,
      sizeStyles,
    ],
  );

  return (
    <div
      className={containerClasses}
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
