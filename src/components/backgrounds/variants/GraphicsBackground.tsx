import React from "react";
import { AbsoluteFill } from "remotion";
import { GraphicsBackgroundProps } from "../config";
import { useStylesContext } from "../../../core/context/StyleContext";

interface Props extends Partial<GraphicsBackgroundProps> {
  className?: string;
  style?: React.CSSProperties;
}

export const GraphicsBackground: React.FC<Props> = ({
  variant = "abstract",
  primaryColor,
  secondaryColor,
  density = "medium",

  className = "",
  style = {},
}) => {
  const { selectedPalette } = useStylesContext();

  // Use provided colors or theme colors
  const primary =
    primaryColor ||
    selectedPalette.background.gradient.primaryRadial.css.DEFAULT;
  const secondary =
    secondaryColor ||
    selectedPalette.background.gradient.secondaryRadial.css.DEFAULT;

  // For now, we'll implement a simple version
  // In a real implementation, you would have different SVG patterns or WebGL graphics
  // based on the variant and density

  return (
    <AbsoluteFill
      className={`bg-graphics bg-graphics-${variant} ${className}`}
      style={{
        backgroundColor: primary,
        zIndex: -1,
        ...style,
      }}
    >
      {/* This is a placeholder for actual graphics implementation */}
      {/* In a real implementation, you would render different SVG patterns or WebGL graphics */}
      {/* based on the variant and density */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      >
        {variant === "abstract" && (
          <>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} stopOpacity="1" />
                <stop offset="100%" stopColor={secondary} stopOpacity="1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" />
            {/* Add some abstract shapes based on density */}
            {density === "low" && (
              <>
                <circle
                  cx="20%"
                  cy="30%"
                  r="10%"
                  fill={secondary}
                  opacity="0.2"
                />
                <circle
                  cx="70%"
                  cy="60%"
                  r="15%"
                  fill={primary}
                  opacity="0.3"
                />
              </>
            )}
            {density === "medium" && (
              <>
                <circle
                  cx="20%"
                  cy="30%"
                  r="10%"
                  fill={secondary}
                  opacity="0.2"
                />
                <circle
                  cx="70%"
                  cy="60%"
                  r="15%"
                  fill={primary}
                  opacity="0.3"
                />
                <circle
                  cx="40%"
                  cy="80%"
                  r="8%"
                  fill={secondary}
                  opacity="0.2"
                />
                <circle
                  cx="85%"
                  cy="25%"
                  r="12%"
                  fill={primary}
                  opacity="0.3"
                />
              </>
            )}
            {density === "high" && (
              <>
                <circle
                  cx="20%"
                  cy="30%"
                  r="10%"
                  fill={secondary}
                  opacity="0.2"
                />
                <circle
                  cx="70%"
                  cy="60%"
                  r="15%"
                  fill={primary}
                  opacity="0.3"
                />
                <circle
                  cx="40%"
                  cy="80%"
                  r="8%"
                  fill={secondary}
                  opacity="0.2"
                />
                <circle
                  cx="85%"
                  cy="25%"
                  r="12%"
                  fill={primary}
                  opacity="0.3"
                />
                <circle
                  cx="30%"
                  cy="50%"
                  r="7%"
                  fill={secondary}
                  opacity="0.2"
                />
                <circle cx="60%" cy="20%" r="9%" fill={primary} opacity="0.3" />
                <circle
                  cx="15%"
                  cy="75%"
                  r="11%"
                  fill={secondary}
                  opacity="0.2"
                />
                <circle cx="90%" cy="85%" r="6%" fill={primary} opacity="0.3" />
              </>
            )}
          </>
        )}

        {variant === "geometric" && (
          <>
            <defs>
              <pattern
                id="pattern1"
                patternUnits="userSpaceOnUse"
                width="100"
                height="100"
              >
                <rect width="50" height="50" fill={primary} opacity="0.2" />
                <rect
                  x="50"
                  y="50"
                  width="50"
                  height="50"
                  fill={primary}
                  opacity="0.2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={secondary} />
            <rect width="100%" height="100%" fill="url(#pattern1)" />
          </>
        )}

        {/* Add more variants as needed */}
      </svg>
    </AbsoluteFill>
  );
};
