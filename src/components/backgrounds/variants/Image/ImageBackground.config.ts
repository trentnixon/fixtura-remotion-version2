// src/components/backgrounds/ImageBackground/ImageBackground.config.ts
import {
  ZoomDirection,
  PanDirection,
  OverlayType,
  BlurDirection,
  ImageEffectType,
  BACKGROUND_POSITIONS,
  BACKGROUND_SIZES,
} from "./ImageBackground.types";

// Default configuration for the ImageBackground component
export const DEFAULT_IMAGE_CONFIG = {
  // Base image settings
  position: BACKGROUND_POSITIONS.CENTER,
  size: BACKGROUND_SIZES.COVER,
  repeat: "no-repeat" as const,

  // Default effect type
  effectType: ImageEffectType.None,

  // Zoom effect defaults
  zoomDirection: ZoomDirection.In,
  zoomIntensity: 1.15,

  // Pan effect defaults
  panDirection: PanDirection.Left,
  panIntensity: 15,

  // Overlay effect defaults
  overlayType: OverlayType.Solid,
  overlayColor: "rgba(0, 0, 0, 0.3)",
  overlaySecondaryColor: "rgba(0, 0, 0, 0)",
  overlayOpacity: 0.3,
  animateOverlay: false,

  // Blur effect defaults
  blurDirection: BlurDirection.In,
  maxBlur: 8,

  // Effect timing defaults
  effectStartFrame: 0,
  effectEndFrame: undefined,
};

// Helper function to determine optimal effect settings based on image ratio
export const getOptimizedEffectSettings = (
  imageRatio: number,
  effectType: ImageEffectType,
  currentSettings: any,
) => {
  const isPortrait = imageRatio < 0.7;
  const isLandscape = imageRatio > 1.3;

  // Clone current settings to avoid mutation
  const settings = { ...currentSettings };

  if (effectType === ImageEffectType.Pan) {
    // For portrait images, prefer vertical panning if horizontal was selected
    if (
      isPortrait &&
      (settings.direction === PanDirection.Left ||
        settings.direction === PanDirection.Right)
    ) {
      settings.direction = PanDirection.Up;
    }

    // For landscape images, prefer horizontal panning if vertical was selected
    if (
      isLandscape &&
      (settings.direction === PanDirection.Up ||
        settings.direction === PanDirection.Down)
    ) {
      settings.direction = PanDirection.Left;
    }
  }

  if (effectType === ImageEffectType.KenBurns) {
    // For portrait images, prefer vertical panning if horizontal was selected
    if (
      isPortrait &&
      (settings.panDirection === PanDirection.Left ||
        settings.panDirection === PanDirection.Right)
    ) {
      settings.panDirection = PanDirection.Up;
    }

    // For landscape images, prefer horizontal panning if vertical was selected
    if (
      isLandscape &&
      (settings.panDirection === PanDirection.Up ||
        settings.panDirection === PanDirection.Down)
    ) {
      settings.panDirection = PanDirection.Left;
    }
  }

  return settings;
};

// Helper utility to create nice aspect ratio aware image containers
export const aspectRatioFit = (
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number,
) => {
  const imageRatio = imageWidth / imageHeight;
  const containerRatio = containerWidth / containerHeight;

  let width, height, x, y;

  if (imageRatio > containerRatio) {
    // Image is wider than container relative to height
    // Height will fill container, width will overflow
    height = containerHeight;
    width = height * imageRatio;
    y = 0;
    x = (containerWidth - width) / 2;
  } else {
    // Image is taller than container relative to width
    // Width will fill container, height will overflow
    width = containerWidth;
    height = width / imageRatio;
    x = 0;
    y = (containerHeight - height) / 2;
  }

  return { width, height, x, y };
};

// Helper function to optimize container based on image aspect ratio
export const getOptimalBackgroundSize = (
  imageRatio: number, // width / height
): "cover" | "contain" | "100% auto" | "auto 100%" => {
  // Determine optimal background sizing
  if (imageRatio > 1.3) {
    // Landscape
    return "cover";
  } else if (imageRatio < 0.7) {
    // Portrait
    return "auto 100%";
  } else {
    // Square-ish
    return "cover";
  }
};
