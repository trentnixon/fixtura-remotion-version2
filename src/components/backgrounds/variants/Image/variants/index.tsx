// Export all image effect components and utilities
import { ZoomEffect, ZoomDirection, type ZoomDirectionType } from "./zoom";
import { Pan } from "./pan";
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

// Export all components and types
export {
  ZoomEffect,
  ZoomDirection,
  type ZoomDirectionType,
  Pan,
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
