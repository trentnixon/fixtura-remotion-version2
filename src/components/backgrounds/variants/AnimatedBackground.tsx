import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { PatternBackground } from "./Patterns";
import ParticleBackground from "./Particles";
import type { AnimatedPresetType } from "./Generated/catalogue/types";
import FloatingParticles from "./NoiseBackground/variants/FloatingParticles";
import PulsingCircles from "./NoiseBackground/variants/PulsingCircles";
import DigitalRain from "./NoiseBackground/variants/DigitalRain";
import SpokesGraphics from "./NoiseBackground/variants/SpokesGraphics";
import { MotionMotifBackground } from "./Generated/renderers/motion-asset/motionMotif/MotionMotifBackground";
import {
  HtmlInCanvasPresetBackground,
} from "./Generated/renderers/html-in-canvas/HtmlInCanvasPresetBackground";
import { isHtmlInCanvasPresetId } from "./Generated/renderers/html-in-canvas/presets";
import { WebgpuMetalWaveBackground } from "./Generated/renderers/three-scene/webgpuMetalWave/WebgpuMetalWaveBackground";
import { ReactivePathBackground } from "./Generated/renderers/effects-solid/reactivePath/ReactivePathBackground";
import { SignalGridBackground } from "./Generated/renderers/effects-solid/signalGrid/SignalGridBackground";
import { TopographicFlowBackground } from "./Generated/renderers/effects-solid/topographicFlow/TopographicFlowBackground";
import { BroadcastHalftoneBackground } from "./Generated/renderers/effects-solid/broadcastHalftone/BroadcastHalftoneBackground";
import { LightLeakBackground } from "./Generated/renderers/effects-solid/lightLeak/LightLeakBackground";

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

  if (animationType === "light-leak") {
    return <LightLeakBackground />;
  }

  if (animationType === "broadcast-halftone") {
    return <BroadcastHalftoneBackground />;
  }

  if (animationType === "topographic-flow") {
    return <TopographicFlowBackground />;
  }

  if (animationType === "signal-grid") {
    return <SignalGridBackground />;
  }

  if (animationType === "reactive-path") {
    return <ReactivePathBackground />;
  }

  if (animationType === "motion-motif") {
    return <MotionMotifBackground />;
  }

  if (isHtmlInCanvasPresetId(animationType)) {
    return <HtmlInCanvasPresetBackground presetId={animationType} />;
  }

  if (animationType === "webgpu-metal-wave") {
    return <WebgpuMetalWaveBackground />;
  }

  if (animationType === "dot-field") {
    return <PatternBackground />;
  }

  if (animationType === "streak-lines") {
    return <ParticleBackground />;
  }

  if (
    [
      "floating-particles",
      "pulsing-circles",
      "digital-rain",
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

  const progress = (frame % resolvedDuration) / resolvedDuration;

  switch (animationType) {
    case "pulsingGradient": {
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
    case "floating-particles":
      return <FloatingParticles {...baseProps} />;
    case "pulsing-circles":
      return <PulsingCircles {...baseProps} />;
    case "digital-rain":
      return <DigitalRain {...baseProps} />;
    case "spokes-field":
      return <SpokesGraphics />;
    default:
      return <FloatingParticles {...baseProps} />;
  }
};
