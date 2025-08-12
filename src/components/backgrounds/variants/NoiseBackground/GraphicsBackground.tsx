import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface GraphicsBackgroundProps {
  baseColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  variant?: "geometric";
  density?: "low" | "medium" | "high";
  animationSpeed?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GraphicsBackground: React.FC<GraphicsBackgroundProps> = ({
  baseColor = "#000021",
  primaryColor = "#4a90e2",
  secondaryColor = "#7b68ee",
  accentColor = "#ff6b6b",
  variant = "geometric",
  density = "medium",
  animationSpeed = 0.5,
  opacity = 0.8,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Animation values
  const rotation = interpolate(frame * animationSpeed, [0, 360], [0, 360]);
  const scale = interpolate(frame * animationSpeed * 0.1, [0, 1], [0.8, 1.2]);

  // Density multipliers
  const densityMultiplier = {
    low: 0.5,
    medium: 1,
    high: 2,
  }[density];

  const renderGeometricGraphics = () => (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="geometricGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="geometricGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.5" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Animated triangles */}
      {Array.from({ length: Math.floor(8 * densityMultiplier) }).map((_, i) => {
        const angle = (i * 45 + rotation) % 360;
        const x = 50 + Math.cos((angle * Math.PI) / 180) * 30;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 30;
        const size = 5 + (i % 3) * 3;

        return (
          <g key={i} transform={`translate(${x}%, ${y}%) rotate(${angle})`}>
            <polygon
              points={`0,-${size} -${size},${size} ${size},${size}`}
              fill={
                i % 2 === 0 ? "url(#geometricGrad1)" : "url(#geometricGrad2)"
              }
              opacity={opacity}
            />
          </g>
        );
      })}

      {/* Animated squares */}
      {Array.from({ length: Math.floor(6 * densityMultiplier) }).map((_, i) => {
        const x = 20 + ((i * 15) % 80);
        const y = 20 + ((i * 12) % 80);
        const size = 3 + (i % 2) * 2;

        return (
          <rect
            key={`square-${i}`}
            x={`${x}%`}
            y={`${y}%`}
            width={`${size}%`}
            height={`${size}%`}
            fill={
              i % 3 === 0
                ? primaryColor
                : i % 3 === 1
                  ? secondaryColor
                  : accentColor
            }
            opacity={opacity * 0.7}
            transform={`rotate(${rotation + i * 30}, ${x + size / 2}%, ${y + size / 2}%)`}
          />
        );
      })}

      {/* Animated circles */}
      {Array.from({ length: Math.floor(4 * densityMultiplier) }).map((_, i) => {
        const x = 30 + ((i * 20) % 70);
        const y = 30 + ((i * 18) % 70);
        const radius = 2 + (i % 2) * 1.5;

        return (
          <circle
            key={`circle-${i}`}
            cx={`${x}%`}
            cy={`${y}%`}
            r={`${radius}%`}
            fill={i % 2 === 0 ? secondaryColor : accentColor}
            opacity={opacity * 0.6}
            transform={`scale(${scale})`}
          />
        );
      })}
    </svg>
  );

  const renderGraphics = () => {
    switch (variant) {
      case "geometric":
        return renderGeometricGraphics();
      default:
        return renderGeometricGraphics();
    }
  };

  return (
    <AbsoluteFill
      className={`bg-graphics bg-graphics-${variant} ${className}`}
      style={{
        backgroundColor: baseColor,
        zIndex: -1,
        ...style,
      }}
    >
      {renderGraphics()}
    </AbsoluteFill>
  );
};
