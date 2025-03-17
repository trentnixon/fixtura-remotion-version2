// src/components/backgrounds/variants/Image/ImageBackground.tsx
import React, { useState, useEffect } from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";

// Import all effect components and types
import {
  ImageEffectType,
  ZoomEffect,
  ZoomDirection,
  PanEffect,
  PanDirection,
  KenBurnsEffect,
  BreathingEffect,
  ColorOverlayEffect,
  OverlayType,
  FocusBlurEffect,
  BlurDirection,
} from "./variants/index";

// Interface for template variation config
interface ImageVariationConfig {
  type: string;
  url: string;
  ratio?: string;
  width?: number;
  height?: number;
  direction?: string;
  intensity?: number;
  startTime?: number;
  endTime?: number;
  zoomIntensity?: number;
  zoomDirection?: "in" | "out";
  // Any other properties from your template variation
}

interface ImageBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  className = "",
  style = {},
}) => {
  // Get video context for template variation
  const { Video } = useVideoDataContext();
  const { selectedPalette } = useThemeContext();

  // Extract configuration from template variation if not provided directly
  const effectConfig = Video?.TemplateVariation?.Image || {};

  // Extract effect type, defaulting to none
  const effectType =
    (effectConfig.type as ImageEffectType) || ImageEffectType.None;

  // Extract image URL
  const imageUrl = effectConfig.url || Video?.TemplateVariation?.useBackground;

  // If no image URL is available, return null
  if (!imageUrl) {
    return null;
  }

  // Base props for all effects
  const baseProps = {
    src: imageUrl,
    className,
    style,
    startTime: effectConfig.startTime || 0,
    endTime: effectConfig.endTime,
  };

  // Get theme colors for overlay effects
  const overlayColor = selectedPalette?.background?.main || "rgba(0,0,0,0.5)";
  const overlaySecondaryColor =
    selectedPalette?.background?.accent || "rgba(0,0,0,0)";

  // Select and render the appropriate effect component
  switch (effectType) {
    case ImageEffectType.Zoom:
      return (
        <ZoomEffect
          {...baseProps}
          direction={effectConfig.zoomDirection || "in"}
          intensity={effectConfig.zoomIntensity || 1.2}
        />
      );

    case ImageEffectType.Pan:
      return (
        <PanEffect
          {...baseProps}
          direction={effectConfig.direction || "left"}
          intensity={effectConfig.intensity || 15}
        />
      );

    case ImageEffectType.KenBurns:
      return (
        <KenBurnsEffect
          {...baseProps}
          zoomDirection={effectConfig.zoomDirection || "in"}
          panDirection={effectConfig.direction || "left"}
          zoomIntensity={effectConfig.zoomIntensity || 1.15}
          panIntensity={effectConfig.intensity || 15}
        />
      );

    case ImageEffectType.Breathing:
      return (
        <BreathingEffect
          {...baseProps}
          intensity={effectConfig.intensity || 1.05}
        />
      );

    case ImageEffectType.ColorOverlay:
      return (
        <ColorOverlayEffect
          {...baseProps}
          overlayType={effectConfig.overlayType || OverlayType.Solid}
          color={overlayColor}
          secondaryColor={overlaySecondaryColor}
          opacity={effectConfig.opacity || 0.3}
          animateOpacity={effectConfig.animateOpacity || false}
        />
      );

    case ImageEffectType.FocusBlur:
      return (
        <FocusBlurEffect
          {...baseProps}
          direction={effectConfig.direction || "in"}
          maxBlur={effectConfig.intensity || 8}
        />
      );

    case ImageEffectType.None:
    default:
      // Just show the static image with no effects
      return (
        <AbsoluteFill className={`static-bg-image ${className}`}>
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              ...style,
            }}
          />
        </AbsoluteFill>
      );
  }
};

export default ImageBackground;
