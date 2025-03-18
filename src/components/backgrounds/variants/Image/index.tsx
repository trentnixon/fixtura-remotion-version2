// src/components/backgrounds/variants/Image/ImageBackground.tsx
import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";

// Import all effect components and types
import {
  ImageEffectType,
  ZoomEffect,
  Pan,
  KenBurnsEffect,
  BreathingEffect,
  FocusBlurEffect,
} from "./variants/index";

// Import overlay system
import { OverlayRenderer } from "./overlays/OverlayRenderer";
import { OverlayStyle, OverlayConfig } from "./overlays/";

// Import theme integration
import createThemeOverlayPresets from "./overlays/themeIntegration";

// Import adapter for template variation
import { adaptImageConfig } from "./TemplateVariationAdapter";
import {
  BackgroundOptions,
  ContainerOptions,
} from "../../../../core/utils/designPalettes";

import { ImageBackgroundProps } from "./ImageBackground.types";

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  className = "",
  style = {},
}) => {
  // Get video context for template variation
  const { Video } = useVideoDataContext();
  const { selectedPalette } = useThemeContext();

  // Extract raw configuration from template variation
  const rawConfig = Video?.TemplateVariation?.Image || {};

  // Adapt legacy configuration to enhanced format
  const config = adaptImageConfig(rawConfig);

  // Extract effect type and overlay style
  const effectType =
    (config.effectType as ImageEffectType) || ImageEffectType.None;
  const overlayStyleName =
    (config.overlayStyle as OverlayStyle) || OverlayStyle.None;

  // Extract image URL
  const imageUrl = config.url || Video?.TemplateVariation?.useBackground;

  // If no image URL is available, return null
  if (!imageUrl) {
    console.warn("No image URL provided for ImageBackground");
    return null;
  }

  // Log configuration for debugging
  /*  if (true) {
    console.log("ImageBackground configuration:", {
      effectType,
      overlayStyle: overlayStyleName,
      imageUrl,
      config,
      selectedPalette,

    });
  } */

  // Base props for all effects
  const baseProps: any = {
    src: imageUrl,
    className,
    style,
    startTime: config.startTime || 0,
    endTime: config.endTime,
    width: config.width,
    height: config.height,
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
    const primaryColor = getPaletteColor(
      "overlayColor",
      selectedPalette?.background?.main || "rgba(0,0,0,0.5)",
    );
    const secondaryColor = getPaletteColor(
      "overlaySecondaryColor",
      selectedPalette?.background?.accent || "rgba(0,0,0,0)",
    );

    console.log("[overlayStyleName]", overlayStyleName);
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
          size: config.vignetteSize || 150,
          shape: config.vignetteShape || "circle",
          opacity: config.overlayOpacity || 0.9,
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
            {...baseProps}
            direction={config.zoomDirection || "in"}
            intensity={config.zoomIntensity || 1.2}
          />
        );

      case ImageEffectType.Pan:
        return (
          <Pan
            {...baseProps}
            direction={config.panDirection || "left"}
            intensity={config.panIntensity || 15}
          />
        );

      /*       case ImageEffectType.KenBurns:
        return (
          <KenBurnsEffect
            {...baseProps}
            zoomDirection={config.zoomDirection || "in"}
            panDirection={config.panDirection || "left"}
            zoomIntensity={config.zoomIntensity || 1.15}
            panIntensity={config.panIntensity || 15}
          />
        ); */

      case ImageEffectType.Breathing:
        return (
          <BreathingEffect
            {...baseProps}
            intensity={config.breathingIntensity || 1.05}
          />
        );

      case ImageEffectType.FocusBlur:
        return (
          <FocusBlurEffect
            {...baseProps}
            direction={config.blurDirection || "in"}
            maxBlur={config.blurIntensity || 8}
          />
        );

      case ImageEffectType.None:
      default:
        // Just show the static image with no effects
        return (
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
        );
    }
  };

  // Return the complete component with effect and overlay
  return (
    <AbsoluteFill className={`image-background-container ${className}`}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {renderEffect()}
        <OverlayRenderer config={overlayConfig as OverlayConfig} />
      </div>
    </AbsoluteFill>
  );
};

export default ImageBackground;
