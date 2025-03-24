// src/components/backgrounds/variants/Image/overlays/OverlayRenderer.tsx
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  OverlayStyle,
  BlendMode,
  OverlayConfig,
  SolidOverlayConfig,
  GradientOverlayConfig,
  VignetteOverlayConfig,
  DuotoneOverlayConfig,
  PatternOverlayConfig,
  ColorFilterOverlayConfig,
} from "./";

interface OverlayRendererProps {
  config: OverlayConfig;
}

export const OverlayRenderer: React.FC<OverlayRendererProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Return null for "None" overlay
  if (config.style === OverlayStyle.None) {
    return null;
  }

  // Calculate animated opacity if needed
  const calculateOpacity = (baseOpacity: number, animate?: boolean) => {
    if (!animate) return baseOpacity;

    // Create a breathing effect for the opacity
    const breathingSpeed = 0.15;
    const opacityVariation = 0.15; // How much opacity will vary
    const breathingProgress = Math.sin(
      frame * breathingSpeed * (Math.PI / fps),
    );
    const animatedOpacity = baseOpacity + breathingProgress * opacityVariation;

    return Math.max(0, Math.min(1, animatedOpacity)); // Clamp between 0 and 1
  };

  // Render based on overlay style
  switch (config.style) {
    case OverlayStyle.Solid:
      return renderSolidOverlay(config as SolidOverlayConfig, calculateOpacity);

    case OverlayStyle.Gradient:
      return renderGradientOverlay(
        config as GradientOverlayConfig,
        calculateOpacity,
      );

    case OverlayStyle.Vignette:
      return renderVignetteOverlay(
        config as VignetteOverlayConfig,
        calculateOpacity,
      );

    case OverlayStyle.Duotone:
      return renderDuotoneOverlay(
        config as DuotoneOverlayConfig,
        calculateOpacity,
      );

    case OverlayStyle.Pattern:
      return renderPatternOverlay(
        config as PatternOverlayConfig,
        calculateOpacity,
      );

    case OverlayStyle.ColorFilter:
      return renderColorFilterOverlay(
        config as ColorFilterOverlayConfig,
        calculateOpacity,
      );

    default:
      return null;
  }
};

// Individual overlay renderers
const renderSolidOverlay = (
  config: SolidOverlayConfig,
  calculateOpacity: (baseOpacity: number, animate?: boolean) => number,
) => {
  const opacity = calculateOpacity(config.opacity, config.animateOpacity);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: config.color,
        opacity,
        mixBlendMode: config.blendMode || BlendMode.Normal,
        zIndex: 1,
      }}
    />
  );
};

const renderGradientOverlay = (
  config: GradientOverlayConfig,
  calculateOpacity: (baseOpacity: number, animate?: boolean) => number,
) => {
  const opacity = calculateOpacity(config.opacity, config.animateOpacity);
  const gradientType = config.gradientType || "linear";

  let backgroundImage;
  if (gradientType === "linear") {
    backgroundImage = `linear-gradient(${config.gradientAngle || "135deg"}, ${config.secondaryColor}, ${config.primaryColor})`;
  } else {
    backgroundImage = `radial-gradient(circle, ${config.primaryColor}, ${config.secondaryColor})`;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage,
        opacity,
        mixBlendMode: config.blendMode || BlendMode.Normal,
        zIndex: 1,
      }}
    />
  );
};

const renderVignetteOverlay = (
  config: VignetteOverlayConfig,
  calculateOpacity: (baseOpacity: number, animate?: boolean) => number,
) => {
  const opacity = calculateOpacity(config.opacity, config.animateOpacity);
  const shape = config.shape || "circle";
  const size = config.size || 150;

  const boxShadowValue =
    shape === "circle"
      ? `inset 0 0 ${size}px ${size}px ${config.color}`
      : `inset 0 0 ${size}px ${size * 1.5}px ${config.color}`;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boxShadow: boxShadowValue,
        opacity,
        mixBlendMode: config.blendMode || BlendMode.Normal,
        zIndex: 1,
      }}
    />
  );
};

const renderDuotoneOverlay = (
  config: DuotoneOverlayConfig,
  calculateOpacity: (baseOpacity: number, animate?: boolean) => number,
) => {
  const opacity = calculateOpacity(config.opacity, config.animateOpacity);
  const intensity = config.intensity || 0.8;

  // For duotone effects, we'll use a combination of layers
  return (
    <>
      {/* Shadow layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: config.shadowColor,
          opacity: opacity * intensity,
          mixBlendMode: "multiply",
          zIndex: 1,
        }}
      />

      {/* Highlight layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: config.highlightColor,
          opacity: opacity * (1 - intensity),
          mixBlendMode: "screen",
          zIndex: 2,
        }}
      />
    </>
  );
};

const renderPatternOverlay = (
  config: PatternOverlayConfig,
  calculateOpacity: (baseOpacity: number, animate?: boolean) => number,
) => {
  const opacity = calculateOpacity(config.opacity, config.animateOpacity);
  const patternOpacity =
    config.patternOpacity !== undefined ? config.patternOpacity : opacity;
  const scale = config.patternScale || 1;

  return (
    <>
      {/* Background color layer */}
      {config.backgroundColor && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: config.backgroundColor,
            opacity,
            zIndex: 1,
          }}
        />
      )}

      {/* Pattern layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${config.patternUrl})`,
          backgroundRepeat: "repeat",
          backgroundSize: `${scale * 100}%`,
          opacity: patternOpacity,
          mixBlendMode: config.blendMode || BlendMode.Multiply,
          zIndex: 2,
        }}
      />
    </>
  );
};

const renderColorFilterOverlay = (
  config: ColorFilterOverlayConfig,
  calculateOpacity: (baseOpacity: number, animate?: boolean) => number,
) => {
  const opacity = calculateOpacity(config.opacity, config.animateOpacity);

  // Build the filter string
  const filters = [
    config.hueRotate !== undefined ? `hue-rotate(${config.hueRotate}deg)` : "",
    config.saturate !== undefined ? `saturate(${config.saturate}%)` : "",
    config.brightness !== undefined ? `brightness(${config.brightness}%)` : "",
    config.contrast !== undefined ? `contrast(${config.contrast}%)` : "",
    config.sepia !== undefined ? `sepia(${config.sepia}%)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: filters,
        WebkitBackdropFilter: filters,
        opacity,
        mixBlendMode: config.blendMode || BlendMode.Normal,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default OverlayRenderer;
