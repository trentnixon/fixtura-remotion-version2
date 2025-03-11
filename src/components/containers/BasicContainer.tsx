import React from "react";
import { useThemeContext } from "../../core/context/ThemeContext";
import { AnimatedContainer } from "./AnimatedContainer";

interface ContainerAnimation {
  type: string;
  duration: number;
  easing?: string;
  delay?: number;
}

interface BasicContainerProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "highlight";
  animation?: ContainerAnimation;
  exitAnimation?: ContainerAnimation;
  exitFrame?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const BasicContainer: React.FC<BasicContainerProps> = ({
  children,
  variant = "primary",
  animation,
  exitAnimation,
  exitFrame,
  className = "",
  style = {},
}) => {
  const { getActivePalette } = useThemeContext();

  // Get the active palette
  const palette = getActivePalette();

  // Map variant to palette container color
  let backgroundColor, textColor;
  switch (variant) {
    case "primary":
      backgroundColor = palette.container.primary;
      textColor = palette.container.text;
      break;
    case "secondary":
      backgroundColor = palette.container.secondary;
      textColor = palette.container.text;
      break;
    case "accent":
      backgroundColor = palette.accent.primary;
      textColor = palette.text.contrastSafe;
      break;
    case "highlight":
      backgroundColor = palette.accent.highlight;
      textColor = palette.text.contrastSafe;
      break;
    default:
      backgroundColor = palette.container.primary;
      textColor = palette.container.text;
  }

  // Combine styles
  const combinedStyle = {
    backgroundColor,
    color: textColor,
    borderColor: palette.container.border,
    boxShadow: palette.container.shadow,
    ...style,
  };

  // If animation is provided, use AnimatedContainer
  if (animation) {
    return (
      <AnimatedContainer
        animation={animation}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
        className={`p-4 ${className}`}
        style={combinedStyle}
      >
        {children}
      </AnimatedContainer>
    );
  }

  // Otherwise, render a regular div
  return (
    <div className={`p-4 ${className}`} style={combinedStyle}>
      {children}
    </div>
  );
};
