import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { useThemeContext } from "../../core/context/ThemeContext";
import { getVariantStyles, applyContrastSafety } from "./config/variants";
import {
  AnimationType,
  AnimationConfig,
  normalizeAnimation,
  useAnimation,
  getAnimationStyles,
  SpringConfig,
  SPRING_CONFIGS,
} from "./config/animations";
import type { ImageEasingType } from "./config/animations/types";
import { useFontContext } from "../../core/context/FontContext";

// Define the possible typography types based on componentStyles keys
export type TypographyType =
  | "title"
  | "titleSmall"
  | "subtitle"
  | "bodyText"
  | "playerName"
  | "score"
  | "teamName"
  | "label"
  | "ladderGradeLabel"
  | "ladderTeamName"
  | "ladderTeamPoints"
  | "metadataSmall"
  | "metadataMedium"
  | "metadataLarge"
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
  | "onBackgroundMain"
  | "onContainerCopy"
  | "onContainerCopyNoBg"
  | "onContainerTitle";

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
  animationEasing?: ImageEasingType;
  springConfig?: SpringConfig;
  letterAnimation?: AnimationMode;

  // Exit Animation props
  exitAnimation?: AnimationType | AnimationConfig;
  exitAnimationDuration?: number;
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
  animationEasing = { type: "inOut", base: "ease" },
  springConfig = SPRING_CONFIGS.DEFAULT,
  letterAnimation = "fadeIn",

  // Exit animation props
  exitAnimation,
  exitAnimationDuration = 30,
  exitFrame = 0,

  // Style overrides
  textAlign,
  textTransform,
  fontFamily,
}) => {
  // --- ALL HOOKS AT THE TOP ---
  const frame = useCurrentFrame();
  const { componentStyles, selectedPalette, fontClasses, fonts } =
    useThemeContext();
  const { loadFont } = useFontContext();
  /* const { colorSystem } = colors; */
  const { fps } = useVideoConfig();

  // Get font family from various sources with cascading precedence
  const typeFontFamily = (() => {
    if (fontFamily) return fontFamily;
    if (fontClasses && fontClasses[type] && fontClasses[type]?.family) {
      return fontClasses[type]?.family;
    }
    if (type === "title" || type === "heading") {
      if (fonts?.title?.family) return fonts.title.family;
      if (fontClasses?.heading?.family) return fontClasses.heading.family;
      return fonts?.heading?.family;
    }
    if (type === "subtitle" || type === "subheading") {
      if (fonts?.subheading?.family) return fonts.subheading.family;
      if (fontClasses?.subheading?.family) return fontClasses.subheading.family;
      return "Heebo";
    }
    if (fonts?.copy?.family) return fonts.copy.family;
    if (fontClasses?.body?.family) return fontClasses.body.family;
    return "Arial, sans-serif";
  })();

  // --- useEffect for font loading at the top ---
  React.useEffect(() => {
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

  // --- Compute container animation config and styles at the top ---
  const containerAnimConfig = normalizeAnimation(
    animation,
    animationDelay,
    animationDuration,
    animationEasing as ImageEasingType,
    springConfig,
  );
  const containerAnimStyles = useAnimation(containerAnimConfig);

  const exitAnimConfig = normalizeAnimation(
    exitAnimation || "fadeOut",
    0,
    exitAnimationDuration,
    animationEasing as ImageEasingType,
    springConfig,
  );

  let animStyles: React.CSSProperties;
  if (exitAnimation && exitFrame > 0 && frame >= exitFrame) {
    // Use the exit animation, but offset the frame
    animStyles = getAnimationStyles(exitAnimConfig, frame - exitFrame, fps);
  } else {
    animStyles = containerAnimStyles;
  }

  // --- EARLY RETURN CAN NOW USE 'frame' ---
  if (exitFrame > 0 && frame >= exitFrame && !exitAnimation) {
    return null;
  }

  // Ensure baseComponentStyle always has className and style
  const baseComponentStyle = (componentStyles[type] ||
    componentStyles.bodyText || { className: "", style: {} }) as {
    className: string;
    style: React.CSSProperties;
  };
  const componentStyle = {
    className: baseComponentStyle.className ?? "",
    style: baseComponentStyle.style ?? {},
  };

  // Get color variant styles
  const variantStyles = getVariantStyles(variant, selectedPalette);

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
        frame,
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
    exitFrame > 0 && frame >= exitFrame
      ? interpolate(
          frame,
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

  // Calculate the final opacity based on both animations
  const opacity = isExitActive
    ? 1 - exitProgress
    : animation
      ? entryProgress
      : 1;

  // Convert children to string
  const text = String(children);

  // Determine animation mode
  const animationMode =
    letterAnimation === "none"
      ? "none"
      : letterAnimation === "word"
        ? "word"
        : "letter";

  // Precompute words and letters
  const words = text.split(/\s+/);
  const chars = text.split("");

  // Style overrides
  const overrideStyles: React.CSSProperties = {
    ...(textAlign && { textAlign }),
    ...(textTransform && { textTransform }),
    ...(typeFontFamily && { fontFamily: typeFontFamily }),
  };

  return (
    <div
      className={`${componentStyle.className} ${className}`.trim()}
      style={{
        ...componentStyle.style,
        color: textColor || undefined,
        ...variantStyles.additionalStyles,
        ...overrideStyles,
        ...style,
        ...(animStyles as React.CSSProperties),
        opacity,
      }}
    >
      {animationMode === "none"
        ? text
        : animationMode === "word"
          ? words.map((word, index) => (
              <React.Fragment key={index}>
                {index > 0 && " "}
                <span
                  style={{
                    display: "inline-block",
                  }}
                >
                  {word}
                </span>
              </React.Fragment>
            ))
          : chars.map((char, index) => {
              if (char === " ") {
                return <span key={index}>&nbsp;</span>;
              }
              return (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                  }}
                >
                  {char}
                </span>
              );
            })}
    </div>
  );
};
