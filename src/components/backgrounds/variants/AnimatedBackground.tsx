import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { PatternBackground } from "./Patterns";
import ParticleBackground from "./Particles";
import type { AnimatedPresetType } from "./Generated/catalogue/types";
import { GridNoise } from "./NoiseBackground/GridNoise";
import SubtleNoise from "./NoiseBackground/variants/SubtleNoise";
import GrainNoise from "./NoiseBackground/variants/GrainNoise";
import WaveNoise from "./NoiseBackground/variants/WaveNoise";
import FogNoise from "./NoiseBackground/variants/FogNoise";
import StaticNoise from "./NoiseBackground/variants/StaticNoise";
import FloatingParticles from "./NoiseBackground/variants/FloatingParticles";
import DynamicParticles from "./NoiseBackground/variants/DynamicParticles";
import TriangleSwarm from "./NoiseBackground/variants/TriangleSwarm";
import PulsingCircles from "./NoiseBackground/variants/PulsingCircles";
import DigitalRain from "./NoiseBackground/variants/DigitalRain";
import GradientGrid from "./NoiseBackground/variants/GradientGrid";
import GeometricGraphics from "./NoiseBackground/variants/GeometricGraphics";
import SpokesGraphics from "./NoiseBackground/variants/SpokesGraphics";

type AnimationType = AnimatedPresetType;

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
  const { video } = useVideoDataContext();
  const animationConfig = video.templateVariation?.animation;
  const animationType = (animationConfig?.type || type) as AnimationType;

  if (
    [
      "dot-field",
      "line-field",
      "tile-grid",
      "crosshatch-field",
      "triangle-tile",
      "chevron-field",
    ].includes(animationType)
  ) {
    return <PatternBackground />;
  }

  if (
    [
      "floating-dots",
      "streak-lines",
      "bubble-field",
      "snow-field",
      "confetti-field",
    ].includes(animationType)
  ) {
    return <ParticleBackground />;
  }

  if (
    [
      "balanced-noise",
      "subtle-noise",
      "grain-field",
      "wave-noise",
      "fog-field",
      "tv-static",
      "floating-particles",
      "dynamic-particles",
      "triangle-swarm",
      "pulsing-circles",
      "digital-rain",
      "gradient-grid",
      "geometric-field",
      "spokes-field",
    ].includes(animationType)
  ) {
    return <GeneratedNoise type={animationType} />;
  }

  const resolvedColors = animationConfig?.colors
    ? [...animationConfig.colors]
    : colors;
  const resolvedDuration = animationConfig?.duration ?? duration;
  const resolvedIntensity = animationConfig?.intensity ?? intensity;
  const resolvedBaseColor = animationConfig?.baseColor ?? baseColor;
  const resolvedDirection = animationConfig?.direction ?? direction;

  // Calculate animation progress
  const progress = (frame % resolvedDuration) / resolvedDuration;

  // Render different animation types
  switch (animationType) {
    case "pulsingGradient": {
      // Pulsing gradient effect
      const scale = interpolate(
        progress,
        [0, 0.5, 1],
        [1, 1 + resolvedIntensity, 1],
        {
          extrapolateRight: "clamp",
        },
      );

      return (
        <AbsoluteFill
          className={`bg-animated bg-pulsing-gradient ${className}`}
          style={{
            background: `linear-gradient(${resolvedDirection}, ${resolvedColors[0]}, ${resolvedColors[1]})`,
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
            background: `linear-gradient(${resolvedDirection}, ${resolvedColors[0]}, ${resolvedColors[1]}, ${resolvedColors[0]})`,
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
        [1, 1 - resolvedIntensity, 1],
        { extrapolateRight: "clamp" },
      );

      return (
        <AbsoluteFill
          className={`bg-animated bg-breathing-color ${className}`}
          style={{
            backgroundColor: resolvedBaseColor,
            zIndex: -1,
            ...style,
          }}
        >
          <AbsoluteFill
            style={{
              backgroundColor: resolvedColors[0],
              opacity,
            }}
          />
        </AbsoluteFill>
      );
    }

    case "waveEffect": {
      // Wave effect using SVG
      const waveHeight = 20 * resolvedIntensity;
      const wavePosition = interpolate(progress, [0, 1], [0, 100], {
        extrapolateRight: "clamp",
      });

      return (
        <AbsoluteFill
          className={`bg-animated bg-wave-effect ${className}`}
          style={{
            backgroundColor: resolvedBaseColor,
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
                <stop offset="0%" stopColor={resolvedColors[0]} />
                <stop offset="100%" stopColor={resolvedColors[1]} />
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
            backgroundColor: resolvedBaseColor,
            zIndex: -1,
            ...style,
          }}
        />
      );
  }
};

const GeneratedNoise: React.FC<{ type: AnimationType }> = ({ type }) => {
  const { selectedPalette } = useThemeContext();
  const baseProps = {
    baseColor: selectedPalette.background.main,
    noiseColor: selectedPalette.background.accent,
  };

  switch (type) {
    case "subtle-noise":
      return <SubtleNoise {...baseProps} />;
    case "grain-field":
      return <GrainNoise {...baseProps} />;
    case "wave-noise":
      return <WaveNoise {...baseProps} />;
    case "fog-field":
      return <FogNoise {...baseProps} />;
    case "tv-static":
      return <StaticNoise {...baseProps} />;
    case "floating-particles":
      return <FloatingParticles {...baseProps} />;
    case "dynamic-particles":
      return <DynamicParticles {...baseProps} />;
    case "triangle-swarm":
      return <TriangleSwarm {...baseProps} />;
    case "pulsing-circles":
      return <PulsingCircles {...baseProps} />;
    case "digital-rain":
      return <DigitalRain {...baseProps} />;
    case "gradient-grid":
      return <GradientGrid {...baseProps} />;
    case "geometric-field":
      return (
        <GeometricGraphics
          baseColor={baseProps.baseColor}
          primaryColor={baseProps.noiseColor}
          secondaryColor={selectedPalette.container.secondary}
          accentColor={selectedPalette.container.accent}
        />
      );
    case "spokes-field":
      return <SpokesGraphics />;
    case "balanced-noise":
    default:
      return <GridNoise {...baseProps} />;
  }
};
