import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useThemeContext } from "../../core/context/ThemeContext";
import { getVariantStyles, applyContrastSafety } from "./config/variants";
import {
  AnimationType,
  AnimationConfig,
  normalizeAnimation,
  useAnimation,
  EasingType,
  SpringConfig,
  SPRING_CONFIGS,
} from "./config/animations";
import { useFontContext } from "../../core/context/FontContext";

// Define the possible typography types based on componentStyles keys
export type TypographyType =
  | "title"
  | "subtitle"
  | "bodyText"
  | "playerName"
  | "score"
  | "teamName"
  | "label"
  | string; // Allow for custom types

// Define color variants
export type ColorVariant =
  | "main"
  | "onContainer"
  | "onBackground"
  | "onBackgroundMain"
  | "onBackgroundAccent"
  | "onBackgroundDark"
  | "onBackgroundLight"
  | "onBackgroundMuted"
  | "onContainerMain"
  | "onContainerSecondary"
  | "onContainerDark"
  | "onContainerLight"
  | "onContainerAccent"
  | "onContainerMuted"
  | "onBackgroundMain";

// Define animation modes
export type AnimationMode = "none" | "word" | AnimationType | AnimationConfig;

interface AnimatedTextProps {
  children: string;
  type?: TypographyType;
  variant?: ColorVariant;
  contrastSafe?: boolean;
  className?: string;
  style?: React.CSSProperties;

  // Entry Animation props
  animation?: AnimationType | AnimationConfig;
  animationDelay?: number;
  animationDuration?: number;
  animationEasing?: EasingType;
  springConfig?: SpringConfig;
  staggerDelay?: number;
  letterAnimation?: AnimationMode;

  // Exit Animation props
  exitAnimation?: AnimationType | AnimationConfig;
  exitAnimationDelay?: number;
  exitAnimationDuration?: number;
  exitAnimationEasing?: EasingType;
  exitSpringConfig?: SpringConfig;
  exitFrame?: number; // Frame at which to start the exit animation

  // Optional style overrides
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";

  // Font family override
  fontFamily?: string;
}

/**
 * AnimatedText component that applies styles from ThemeContext's componentStyles
 * and supports character-by-character or word-by-word animations with entry and exit animations.
 *
 * @example
 * <AnimatedText type="title" variant="primary" animation="fadeIn">Hello World</AnimatedText>
 * <AnimatedText type="bodyText" letterAnimation="word" staggerDelay={5}>Animate by word</AnimatedText>
 * <AnimatedText type="label" letterAnimation="fadeIn" exitAnimation="fadeOut" exitFrame={60}>Animate with exit</AnimatedText>
 * <AnimatedText type="score" letterAnimation="none">No animation</AnimatedText>
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  type = "bodyText",
  variant = "default",
  contrastSafe = true,
  className = "",
  style = {},

  // Entry animation props
  animation,
  animationDelay = 0,
  animationDuration = 30,
  animationEasing = "easeInOut",
  springConfig = SPRING_CONFIGS.DEFAULT,
  staggerDelay = 2,
  letterAnimation = "fadeIn",

  // Exit animation props
  exitAnimation,
  exitAnimationDelay = 0,
  exitAnimationDuration = 30,
  exitAnimationEasing = "easeInOut",
  exitSpringConfig = SPRING_CONFIGS.DEFAULT,
  exitFrame = 0,

  // Style overrides
  textAlign,
  textTransform,
  fontFamily,
}) => {
  // Get the current frame from Remotion
  const currentFrame = useCurrentFrame();

  // Get theme context and font context
  const { colors, componentStyles, selectedPalette, fontClasses, fonts } =
    useThemeContext();
  const { availableFonts, loadFont } = useFontContext();
  const { colorSystem } = colors;

  // Get style from componentStyles or fallback to bodyText
  const componentStyle = componentStyles[type] ||
    componentStyles.bodyText || { className: "", style: {} };

  // Get font family from various sources with cascading precedence
  // 1. Direct prop override
  // 2. Type-specific font class in theme
  // 3. Default copy font from theme fonts
  // 4. Fallback to system fonts
  const typeFontFamily = (() => {
    // Direct prop override has highest priority
    if (fontFamily) return fontFamily;

    // Next, check if we have a font class for this type
    if (fontClasses && fontClasses[type] && fontClasses[type]?.family) {
      return fontClasses[type]?.family;
    }

    // Map common types to theme font configurations
    if (type === "title" || type === "heading") {
      if (fonts?.title?.family) return fonts.title.family;
      if (fontClasses?.heading?.family) return fontClasses.heading.family;
      return fonts?.heading?.family;
    }

    if (type === "subtitle" || type === "subheading") {
      if (fonts?.subheading?.family) return fonts.subheading.family;
      if (fontClasses?.subheading?.family) return fontClasses.subheading.family;
      return "Heebo"; // Default fallback
    }

    // Default to body/copy font
    if (fonts?.copy?.family) return fonts.copy.family;
    if (fontClasses?.body?.family) return fontClasses.body.family;

    // Ultimate fallback
    return "Arial, sans-serif";
  })();

  // Make sure we load the font on first render (as a safety measure)
  React.useEffect(() => {
    // Only try to load if it's not a system font
    if (
      typeFontFamily &&
      !typeFontFamily.includes(",") &&
      !typeFontFamily.includes("Arial") &&
      !typeFontFamily.includes("sans-serif")
    ) {
      loadFont(typeFontFamily).catch((err) =>
        console.warn(`Failed to load font ${typeFontFamily} on demand:`, err),
      );
    }
  }, [typeFontFamily, loadFont]);

  // Get color variant styles
  const variantStyles = getVariantStyles(
    variant,
    colorSystem,
    colors,
    contrastSafe,
  );

  // Apply contrast safety if needed
  const textColor =
    contrastSafe && variantStyles.color
      ? applyContrastSafety(
          variantStyles.color,
          variant,
          selectedPalette,
          contrastSafe,
        )
      : variantStyles.color;

  // Calculate entry animation progress
  const entryProgress = animation
    ? interpolate(
        currentFrame,
        [animationDelay, animationDelay + animationDuration],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : 1;

  // Calculate exit animation progress
  const exitProgress =
    exitFrame > 0 && currentFrame >= exitFrame
      ? interpolate(
          currentFrame,
          [exitFrame, exitFrame + exitAnimationDuration],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        )
      : 0;

  // Determine if we should show exit animation
  const isExitActive = exitAnimation && exitProgress > 0;

  // If we're past the exit frame and no exit animation is defined, don't render
  if (exitFrame > 0 && currentFrame >= exitFrame && !exitAnimation) {
    return null;
  }

  // Calculate the final opacity based on both animations
  const opacity = isExitActive
    ? 1 - exitProgress
    : animation
      ? entryProgress
      : 1;

  // Get container animation config
  const containerAnimConfig = normalizeAnimation(
    isExitActive ? exitAnimation : animation,
    isExitActive ? exitAnimationDelay : animationDelay,
    isExitActive ? exitAnimationDuration : animationDuration,
    isExitActive ? exitAnimationEasing : animationEasing,
    isExitActive ? exitSpringConfig : springConfig,
  );

  // Get container animation styles
  const containerAnimStyles = containerAnimConfig
    ? useAnimation(containerAnimConfig)
    : {};

  // Style overrides
  const overrideStyles: React.CSSProperties = {
    ...(textAlign && { textAlign }),
    ...(textTransform && { textTransform }),
    ...(typeFontFamily && { fontFamily: typeFontFamily }),
  };

  // Convert children to string
  const text = String(children);

  // Determine animation mode
  const animationMode =
    letterAnimation === "none"
      ? "none"
      : letterAnimation === "word"
        ? "word"
        : "letter";

  // For debugging font resolution
  //console.log(`AnimatedText [${type}] using font: "${typeFontFamily}"`);

  return (
    <div
      className={`${componentStyle.className} ${className}`.trim()}
      style={{
        ...componentStyle.style,
        color: textColor || undefined,
        ...variantStyles.additionalStyles,
        ...overrideStyles,
        ...style,
        ...(containerAnimStyles as React.CSSProperties),
        opacity,
      }}
    >
      {animationMode === "none"
        ? // Render the text as a whole without animation
          text
        : animationMode === "word"
          ? // Render with word-by-word animation
            text.split(/\s+/).map((word, index) => {
              // Calculate staggered delay for each word
              const wordDelay =
                (isExitActive ? exitAnimationDelay : animationDelay) +
                index * staggerDelay;

              // Calculate word-specific progress
              const wordEntryProgress = animation
                ? interpolate(
                    currentFrame,
                    [wordDelay, wordDelay + animationDuration],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  )
                : 1;

              const wordOpacity = isExitActive
                ? 1 - exitProgress
                : animation
                  ? wordEntryProgress
                  : 1;

              // Create animation config for this word
              const wordAnimConfig = normalizeAnimation(
                isExitActive ? exitAnimation : ("fadeIn" as AnimationType),
                wordDelay,
                isExitActive ? exitAnimationDuration : animationDuration,
                isExitActive ? exitAnimationEasing : animationEasing,
                isExitActive ? exitSpringConfig : springConfig,
              );

              // Get animation styles for this word
              const wordAnimStyles = useAnimation(wordAnimConfig);

              return (
                <React.Fragment key={index}>
                  {index > 0 && " "}
                  <span
                    style={{
                      display: "inline-block",
                      ...(wordAnimStyles as React.CSSProperties),
                      opacity: wordOpacity,
                    }}
                  >
                    {word}
                  </span>
                </React.Fragment>
              );
            })
          : // Render with letter-by-letter animation
            text.split("").map((char, index) => {
              // Calculate staggered delay for each character
              const charDelay =
                (isExitActive ? exitAnimationDelay : animationDelay) +
                index * staggerDelay;

              // Calculate character-specific progress
              const charEntryProgress = animation
                ? interpolate(
                    currentFrame,
                    [charDelay, charDelay + animationDuration],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  )
                : 1;

              const charOpacity = isExitActive
                ? 1 - exitProgress
                : animation
                  ? charEntryProgress
                  : 1;

              // Create animation config for this character
              const charAnimConfig = normalizeAnimation(
                isExitActive
                  ? exitAnimation
                  : letterAnimation === "word" || letterAnimation === "none"
                    ? ("fadeIn" as AnimationType)
                    : (letterAnimation as AnimationType),
                charDelay,
                isExitActive ? exitAnimationDuration : animationDuration,
                isExitActive ? exitAnimationEasing : animationEasing,
                isExitActive ? exitSpringConfig : springConfig,
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
                    opacity: charOpacity,
                  }}
                >
                  {char}
                </span>
              );
            })}
    </div>
  );
};
