// src/components/backgrounds/variants/Image/ImageBackground.tsx
import React from "react";
import { AbsoluteFill, Img } from "remotion";

import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";

import { ZoomEffect } from "./variants/zoom";
import { OverlayRenderer } from "./overlays/OverlayRenderer";
import { OverlayConfig, OverlayStyle } from "./overlays/";

// Import adapter for template variation

import {
  BackgroundOptions,
  ContainerOptions,
} from "../../../../core/utils/designPalettes";

import { ImageBackgroundProps, ImageEffectType } from "./ImageBackground.types";
import { adaptImageConfig } from "./TemplateVariationAdapter";
import { BreathingEffect, FocusBlurEffect, Pan } from "./variants";
import type { BreathingEffectProps } from "./variants/breath";
import type { FocusBlurEffectProps } from "./variants/blur";
import type { ZoomEffectProps } from "./variants/zoom";
import type { PanEffectProps } from "./variants/pan";

// Support both camelCase `heroImage` and legacy PascalCase `HeroImage`
type LegacyHero = { url?: string; width?: number; height?: number };
const extractHero = (media?: unknown): LegacyHero | undefined => {
  if (!media || typeof media !== "object") return undefined;
  const m = media as { heroImage?: LegacyHero; HeroImage?: LegacyHero };
  return m.heroImage ?? m.HeroImage;
};

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  className = "",
  style = {},
}) => {
  // Get video context for template variation
  const { video } = useVideoDataContext();
  const { selectedPalette } = useThemeContext();

  // Extract raw configuration from template variation
  const rawConfig = video?.templateVariation?.image || {};

  // Adapt legacy configuration to enhanced format
  const config = adaptImageConfig(rawConfig);

  // Extract effect type and overlay style
  const effectType = config.effectType
    ? (config.effectType as string as ImageEffectType)
    : ImageEffectType.None;
  const overlayStyleName = config.overlayStyle
    ? (config.overlayStyle as string as OverlayStyle)
    : OverlayStyle.None;

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=1000";

  // Prefer HeroImage from video media (support both camelCase and legacy PascalCase)
  const hero = extractHero(video?.media);
  const heroUrl: string | undefined = hero?.url || undefined;
  const heroWidth: number | undefined = hero?.width || undefined;
  const heroHeight: number | undefined = hero?.height || undefined;

  // Extract image URL with precedence: HeroImage -> adapted config -> templateVariation -> default
  const imageUrl =
    heroUrl ||
    config.url ||
    video?.templateVariation?.image?.url ||
    DEFAULT_IMAGE;

  // If no image URL is available, return null
  if (!imageUrl) {
    console.warn("No image URL provided for ImageBackground");
    //return null;
  }

  // Base props for all effects
  const baseProps = {
    src: imageUrl,
    className,
    style,
    startTime: config.startTime || 0,
    endTime: config.endTime,
    width: config.width || heroWidth || 1080,
    height: config.height || heroHeight || 1080,
  };

  // Determine overlay configuration
  let overlayConfig: OverlayConfig = { style: OverlayStyle.None };

  // Otherwise, build from the provided configuration
  if (overlayStyleName !== OverlayStyle.None) {
    // Get colors from the theme if not specified
    const getPaletteColor = (colorKey: string, fallback: string) => {
      if (config[colorKey as keyof typeof config])
        return config[colorKey as keyof typeof config];

      // Try to find the color in the palette
      if (
        selectedPalette?.background?.[
          colorKey.replace("overlay", "") as keyof BackgroundOptions
        ]
      ) {
        return selectedPalette.background[
          colorKey.replace("overlay", "") as keyof BackgroundOptions
        ];
      }

      // If not in background, try container
      if (
        selectedPalette?.container?.[
          colorKey.replace("overlay", "") as keyof ContainerOptions
        ]
      ) {
        return selectedPalette.container[
          colorKey.replace("overlay", "") as keyof ContainerOptions
        ];
      }

      return fallback;
    };

    // Default colors from the theme if not specified
    const primaryColor = getPaletteColor("overlayColor", "rgba(0,0,0,0.8)");
    const secondaryColor = getPaletteColor(
      "overlaySecondaryColor",
      "rgba(0,0,0,0.5)",
    );

    // If we have a custom overlay, create it from the provided configuration
    switch (overlayStyleName) {
      case OverlayStyle.Solid:
        overlayConfig = {
          style: OverlayStyle.Solid,
          color: primaryColor as string,
          opacity: config.overlayOpacity || 0.3,
          animateOpacity: config.animateOverlayOpacity || false,
          blendMode: config.overlayBlendMode,
        };
        break;

      case OverlayStyle.Gradient:
        overlayConfig = {
          style: OverlayStyle.Gradient,
          primaryColor: primaryColor as string,
          secondaryColor: secondaryColor as string,
          gradientAngle: config.gradientAngle || "135deg",
          gradientType: config.gradientType || "linear",
          opacity: config.overlayOpacity || 0.3,
          animateOpacity: config.animateOverlayOpacity || false,
          blendMode: config.overlayBlendMode,
        };
        break;

      case OverlayStyle.Vignette:
        overlayConfig = {
          style: OverlayStyle.Vignette,
          color: primaryColor as string,
          size: config.vignetteSize || 80,
          shape: config.vignetteShape || "circle",
          opacity: config.overlayOpacity || 0.75,
          animateOpacity: config.animateOverlayOpacity || false,
        };
        break;

      case OverlayStyle.Duotone:
        overlayConfig = {
          style: OverlayStyle.Duotone,
          shadowColor: primaryColor as string,
          highlightColor: secondaryColor as string,
          intensity: config.duotoneIntensity || 0.8,
          opacity: config.overlayOpacity || 0.85,
          animateOpacity: config.animateOverlayOpacity || false,
        };
        break;

      case OverlayStyle.Pattern:
        overlayConfig = {
          style: OverlayStyle.Pattern,
          patternUrl:
            config.patternUrl ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQImWNgYGD4z0AswK4SAFXuAf8EPy+xAAAAAElFTkSuQmCC",
          backgroundColor: primaryColor as string,
          patternScale: config.patternScale || 1,
          patternOpacity: config.patternOpacity,
          opacity: config.overlayOpacity || 0.3,
          animateOpacity: config.animateOverlayOpacity || false,
          blendMode: config.overlayBlendMode,
        };
        break;

      case OverlayStyle.ColorFilter:
        overlayConfig = {
          style: OverlayStyle.ColorFilter,
          hueRotate: config.hueRotate,
          saturate: config.saturate,
          brightness: config.brightness,
          contrast: config.contrast,
          sepia: config.sepia,
          opacity: config.overlayOpacity || 1,
          animateOpacity: config.animateOverlayOpacity || false,
        };
        break;

      default:
        overlayConfig = { style: OverlayStyle.None };
    }
  } else {
    // Default to no overlay
    overlayConfig = { style: OverlayStyle.None };
  }

  // Function to render the correct effect component based on effectType
  const renderEffect = () => {
    switch (effectType) {
      case ImageEffectType.Zoom:
        return (
          <ZoomEffect
            {...(baseProps as ZoomEffectProps)}
            direction={config.zoomDirection || "in"}
            intensity={config.zoomIntensity || 1.2}
          />
        );

      case ImageEffectType.Pan:
        return <Pan {...(baseProps as PanEffectProps)} />;

      case ImageEffectType.Breathing:
        return (
          <BreathingEffect
            {...(baseProps as BreathingEffectProps)}
            intensity={config.breathingIntensity || 1.05}
          />
        );

      case ImageEffectType.FocusBlur:
        return (
          <FocusBlurEffect
            {...(baseProps as FocusBlurEffectProps)}
            direction={config.blurDirection || "in"}
            maxBlur={config.blurIntensity || 8}
          />
        );

      case ImageEffectType.None:
      default:
        // Just show the static image with no effects
        return (
          <Img
            src={imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              ...style,
            }}
          />
        );
    }
  };

  // Return the complete component with effect and overlay
  return (
    <AbsoluteFill className={`image-background-container ${className} `}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          opacity: 0.9,
        }}
      >
        {renderEffect()}
        <OverlayRenderer config={overlayConfig as OverlayConfig} />
      </div>
    </AbsoluteFill>
  );
};

export default ImageBackground;
