import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

type AnimationType =
  | "pulsingGradient"
  | "movingGradient"
  | "breathingColor"
  | "waveEffect";

interface AnimatedBackgroundProps {
  type: AnimationType;
  colors?: string[];
  baseColor?: string;
  duration?: number;
  intensity?: number;
  direction?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  type = "pulsingGradient",
  colors = ["#4F46E5", "#7C3AED"],
  baseColor = "#000021",
  duration = 60,
  intensity = 0.2,
  direction = "to right",
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Calculate animation progress
  const progress = (frame % duration) / duration;

  // Render different animation types
  switch (type) {
    case "pulsingGradient": {
      // Pulsing gradient effect
      const scale = interpolate(progress, [0, 0.5, 1], [1, 1 + intensity, 1], {
        extrapolateRight: "clamp",
      });

      return (
        <AbsoluteFill
          className={`bg-animated bg-pulsing-gradient ${className}`}
          style={{
            background: `linear-gradient(${direction}, ${colors[0]}, ${colors[1]})`,
            transform: `scale(${scale})`,
            zIndex: -1,
            ...style,
          }}
        />
      );
    }

    case "movingGradient": {
      // Moving gradient effect
      const position = interpolate(progress, [0, 1], [0, 100], {
        extrapolateRight: "clamp",
      });

      return (
        <AbsoluteFill
          className={`bg-animated bg-moving-gradient ${className}`}
          style={{
            background: `linear-gradient(${direction}, ${colors[0]}, ${colors[1]}, ${colors[0]})`,
            backgroundSize: "200% 200%",
            backgroundPosition: `${position}% ${position}%`,
            zIndex: -1,
            ...style,
          }}
        />
      );
    }

    case "breathingColor": {
      // Breathing color effect
      const opacity = interpolate(
        progress,
        [0, 0.5, 1],
        [1, 1 - intensity, 1],
        { extrapolateRight: "clamp" },
      );

      return (
        <AbsoluteFill
          className={`bg-animated bg-breathing-color ${className}`}
          style={{
            backgroundColor: baseColor,
            zIndex: -1,
            ...style,
          }}
        >
          <AbsoluteFill
            style={{
              backgroundColor: colors[0],
              opacity,
            }}
          />
        </AbsoluteFill>
      );
    }

    case "waveEffect": {
      // Wave effect using SVG
      const waveHeight = 20 * intensity;
      const wavePosition = interpolate(progress, [0, 1], [0, 100], {
        extrapolateRight: "clamp",
      });

      return (
        <AbsoluteFill
          className={`bg-animated bg-wave-effect ${className}`}
          style={{
            backgroundColor: baseColor,
            zIndex: -1,
            overflow: "hidden",
            ...style,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="100%" stopColor={colors[1]} />
              </linearGradient>
            </defs>

            {/* First wave */}
            <path
              d={`M -50 50
                 C 0 ${50 - waveHeight},
                   50 ${50 + waveHeight},
                   100 50
                 L 100 100
                 L 0 100
                 Z`}
              fill="url(#waveGradient)"
              style={{
                transform: `translateX(${wavePosition}%)`,
                opacity: 0.7,
              }}
            />

            {/* Second wave */}
            <path
              d={`M -50 60
                 C 0 ${60 + waveHeight},
                   50 ${60 - waveHeight},
                   100 60
                 L 100 100
                 L 0 100
                 Z`}
              fill="url(#waveGradient)"
              style={{
                transform: `translateX(${-wavePosition}%)`,
                opacity: 0.5,
              }}
            />
          </svg>
        </AbsoluteFill>
      );
    }

    default:
      return (
        <AbsoluteFill
          className={`bg-animated ${className}`}
          style={{
            backgroundColor: baseColor,
            zIndex: -1,
            ...style,
          }}
        />
      );
  }
};
