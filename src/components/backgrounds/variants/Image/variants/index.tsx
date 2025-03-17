// Export all image effect components and utilities
import { ZoomEffect, ZoomDirection, type ZoomDirectionType } from "./zoom";
import { PanEffect, PanDirection, type PanDirectionType } from "./pan";
import { KenBurnsEffect } from "./kenBurns";
import { BreathingEffect } from "./breath";
import {
  ColorOverlayEffect,
  OverlayType,
  type OverlayTypeValue,
} from "./colorOverlay";
import { FocusBlurEffect, BlurDirection, type BlurDirectionType } from "./blur";
import {
  CombinedEffects,
  aspectRatioFit,
  getOptimalBackgroundSize,
} from "./combined";

// Define available effect types
export enum ImageEffectType {
  Zoom = "zoom",
  Pan = "pan",
  KenBurns = "kenBurns",
  Breathing = "breathing",
  ColorOverlay = "colorOverlay",
  FocusBlur = "focusBlur",
  None = "none",
}

// Interface for template variation config
interface ImageVariationConfig {
  type: string;
  url: string;
  ratio: string;
  width: number;
  height: number;
  direction?: string;
  intensity?: number;
  startTime?: number;
  endTime?: number;
  // Add default values for zoom
  zoomIntensity?: number;
  zoomDirection?: "in" | "out";
}

// Export all components and types
export {
  ZoomEffect,
  ZoomDirection,
  type ZoomDirectionType,
  PanEffect,
  PanDirection,
  type PanDirectionType,
  KenBurnsEffect,
  BreathingEffect,
  ColorOverlayEffect,
  OverlayType,
  type OverlayTypeValue,
  FocusBlurEffect,
  BlurDirection,
  type BlurDirectionType,
  CombinedEffects,
  aspectRatioFit,
  getOptimalBackgroundSize,
};

// Helper function to convert template variation config to component props
const convertConfigToProps = (
  config: ImageVariationConfig,
  effectType: ImageEffectType,
) => {
  const baseProps = {
    src: config.url,
    startTime: config.startTime || 0,
    endTime: config.endTime,
    intensity: config.intensity,
  };

  switch (effectType) {
    case ImageEffectType.Zoom: {
      const zoomProps = {
        ...baseProps,
        direction: (config.zoomDirection ||
          config.direction ||
          "in") as ZoomDirectionType,
        intensity: config.zoomIntensity || config.intensity || 1.2, // Default 20% zoom
      };
      return zoomProps;
    }
    case ImageEffectType.Pan: {
      const panProps = {
        ...baseProps,
        direction: (config.direction === "right"
          ? "right"
          : config.direction === "up"
            ? "up"
            : config.direction === "down"
              ? "down"
              : "left") as PanDirectionType,
      };
      return panProps;
    }
    case ImageEffectType.FocusBlur: {
      const blurProps = {
        ...baseProps,
        direction: (config.direction === "out"
          ? "out"
          : config.direction === "pulse"
            ? "pulse"
            : "in") as BlurDirectionType,
      };
      return blurProps;
    }
    default:
      return baseProps;
  }
};

// Export a factory function to create the appropriate effect component
export const createImageEffect = (
  effectType: ImageEffectType,
  props: ImageVariationConfig,
) => {
  // First convert the type string to our enum
  const actualEffectType = props.type as keyof typeof ImageEffectType;
  const componentProps = convertConfigToProps(
    props,
    ImageEffectType[actualEffectType],
  );

  switch (effectType) {
    case ImageEffectType.Zoom:
      return <ZoomEffect {...componentProps} />;
    case ImageEffectType.Pan:
      return <PanEffect {...componentProps} />;
    case ImageEffectType.KenBurns:
      return <KenBurnsEffect {...componentProps} />;
    case ImageEffectType.Breathing:
      return <BreathingEffect {...componentProps} />;
    case ImageEffectType.ColorOverlay:
      return <ColorOverlayEffect {...componentProps} />;
    case ImageEffectType.FocusBlur:
      return <FocusBlurEffect {...componentProps} />;
    case ImageEffectType.None:
    default:
      // Just return a static image with no effects
      return (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${props.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      );
  }
};
