import React from "react";
import { AbsoluteFill } from "remotion";
import { PatternBackgroundProps } from "../config";
import { useStylesContext } from "../../../core/context/StyleContext";

interface Props extends Partial<PatternBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

export const PatternBackground: React.FC<Props> = ({
  pattern = "dots",
  primaryColor,
  secondaryColor,
  scale = 1,
  rotation = 0,
  animation,
  animationDuration,
  animationDelay,
  exitAnimation,
  exitAnimationDuration,
  exitFrame,
  customProps,
  className = "",
  style = {},
}) => {
  const { THEME } = useStylesContext();

  // Use provided colors or theme colors
  const primary = primaryColor || THEME.primary;
  const secondary = secondaryColor || THEME.secondary;

  // Generate pattern based on type
  let patternElement;

  switch (pattern) {
    case "dots":
      patternElement = (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              patternTransform={`scale(${scale}) rotate(${rotation})`}
            >
              <circle cx="10" cy="10" r="2" fill={primary} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={secondary} />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      );
      break;

    case "lines":
      patternElement = (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="lines"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              patternTransform={`scale(${scale}) rotate(${rotation})`}
            >
              <line
                x1="0"
                y1="0"
                x2="20"
                y2="20"
                stroke={primary}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={secondary} />
          <rect width="100%" height="100%" fill="url(#lines)" />
        </svg>
      );
      break;

    case "grid":
      patternElement = (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
              patternTransform={`scale(${scale}) rotate(${rotation})`}
            >
              <rect
                width="20"
                height="20"
                fill="none"
                stroke={primary}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={secondary} />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      );
      break;

    // Add more patterns as needed

    default:
      patternElement = (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill={secondary} />
        </svg>
      );
  }

  return (
    <AbsoluteFill
      className={`bg-pattern bg-pattern-${pattern} ${className}`}
      style={{
        zIndex: -1,
        ...style,
      }}
    >
      {patternElement}
    </AbsoluteFill>
  );
};
