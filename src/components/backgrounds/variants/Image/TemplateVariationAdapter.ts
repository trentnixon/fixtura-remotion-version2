// src/components/backgrounds/variants/Image/templateVariationAdapter.ts
import { ImageEffectType } from "./variants/index";
import { OverlayStyle, BlendMode } from "./overlays/index";

// Interface for the current image template variation format
interface LegacyImageConfig {
  // Basic properties
  url?: string;
  ratio?: "landscape" | "portrait" | "square";
  width?: number;
  height?: number;

  // Effect properties
  type?: string;
  direction?: string;
  intensity?: number;
  zoomDirection?: "in" | "out";

  // Overlay properties
  overlayPreset?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  overlayStyle?: OverlayStyle;
}

// Interface for our new enhanced image configuration
interface EnhancedImageConfig {
  // Basic properties
  url?: string;
  ratio?: "landscape" | "portrait" | "square";
  width?: number;
  height?: number;

  // Effect properties
  effectType?: ImageEffectType;
  zoomDirection?: "in" | "out";
  zoomIntensity?: number;
  panDirection?: "left" | "right" | "up" | "down";
  panIntensity?: number;
  breathingIntensity?: number;
  blurDirection?: "in" | "out";
  blurIntensity?: number;

  // Overlay properties
  overlayStyle?: OverlayStyle;
  overlayPreset?: string;
  overlayColor?: string;
  overlaySecondaryColor?: string;
  overlayOpacity?: number;
  overlayBlendMode?: BlendMode;
  animateOverlayOpacity?: boolean;
  gradientAngle?: string;
  gradientType?: "linear" | "radial";
  vignetteSize?: number;
  vignetteShape?: "circle" | "ellipse";
  duotoneIntensity?: number;
  patternUrl?: string;
  patternScale?: number;
  patternOpacity?: number;
  hueRotate?: number;
  saturate?: number;
  brightness?: number;
  contrast?: number;
  sepia?: number;

  // Timing
  startTime?: number;
  endTime?: number;

  // Debug
  debug?: boolean;
}

/**
 * Map legacy effect types to new ImageEffectType enum
 */
function mapEffectType(legacyType?: string): ImageEffectType {
  if (!legacyType) return ImageEffectType.None;

  switch (legacyType.toLowerCase()) {
    case "zoom":
      return ImageEffectType.Zoom;
    case "pan":
      return ImageEffectType.Pan;
    case "kenburns":
    case "ken-burns":
    case "kb":
      return ImageEffectType.KenBurns;
    case "breathing":
    case "pulse":
      return ImageEffectType.Breathing;
    case "blur":
    case "focus-blur":
    case "focusblur":
      return ImageEffectType.FocusBlur;
    default:
      return ImageEffectType.None;
  }
}

/**
 * Map legacy direction to pan or zoom direction
 */
function mapDirection(direction?: string, effectType?: ImageEffectType): any {
  if (!direction) {
    return {
      zoomDirection: "in",
      panDirection: "left",
    };
  }

  if (
    effectType === ImageEffectType.Zoom ||
    effectType === ImageEffectType.KenBurns
  ) {
    if (direction === "in" || direction === "out") {
      return { zoomDirection: direction };
    }
  }

  if (
    effectType === ImageEffectType.Pan ||
    effectType === ImageEffectType.KenBurns
  ) {
    if (["left", "right", "up", "down"].includes(direction)) {
      return { panDirection: direction };
    }
  }

  // Default values based on effect type
  switch (effectType) {
    case ImageEffectType.Zoom:
      return { zoomDirection: "in" };
    case ImageEffectType.Pan:
      return { panDirection: "left" };
    case ImageEffectType.KenBurns:
      return {
        zoomDirection: "in",
        panDirection: "left",
      };
    case ImageEffectType.FocusBlur:
      return { blurDirection: "in" };
    default:
      return {};
  }
}

/**
 * Adapts a legacy image configuration to the new enhanced format
 */
export function adaptImageConfig(
  legacyConfig: LegacyImageConfig,
): EnhancedImageConfig {
  // Determine effect type
  const effectType = mapEffectType(legacyConfig.type);

  // Map direction based on effect type
  const directionMap = mapDirection(legacyConfig.direction, effectType);

  // Build enhanced config
  const enhancedConfig: EnhancedImageConfig = {
    // Basic properties
    url: legacyConfig.url,
    ratio: legacyConfig.ratio,
    width: legacyConfig.width,
    height: legacyConfig.height,

    // Effect properties
    effectType,
    ...directionMap,

    // Intensity mapping based on effect type
    ...(effectType === ImageEffectType.Zoom ||
    effectType === ImageEffectType.KenBurns
      ? { zoomIntensity: legacyConfig.intensity || 1.2 }
      : {}),
    ...(effectType === ImageEffectType.Pan ||
    effectType === ImageEffectType.KenBurns
      ? { panIntensity: legacyConfig.intensity || 15 }
      : {}),
    ...(effectType === ImageEffectType.Breathing
      ? { breathingIntensity: legacyConfig.intensity || 1.05 }
      : {}),
    ...(effectType === ImageEffectType.FocusBlur
      ? { blurIntensity: legacyConfig.intensity || 8 }
      : {}),

    // Overlay properties

    overlayStyle: legacyConfig.overlayStyle,
    overlayPreset: legacyConfig.overlayPreset,
    overlayColor: legacyConfig.overlayColor,
    overlayOpacity: legacyConfig.overlayOpacity,
  };

  return enhancedConfig;
}

/**
 * Updates the ImageBackground component configuration in a template variation
 */
export function updatetemplateVariation(templateVariation: any): any {
  if (!templateVariation || !templateVariation.Image) {
    return templateVariation;
  }

  // Create a deep copy of the template variation
  const newVariation = JSON.parse(JSON.stringify(templateVariation));

  // Adapt the Image configuration
  newVariation.Image = adaptImageConfig(templateVariation.Image);

  return newVariation;
}
