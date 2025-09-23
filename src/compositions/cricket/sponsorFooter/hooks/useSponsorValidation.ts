// src/compositions/cricket/sponsorFooter/hooks/useSponsorValidation.ts

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { ThemeLayout } from "../../../../core/context/types/ThemeContextTypes";
import { SponsorsData } from "../../../../core/types/data/sponsors";

interface ValidationResult {
  isValid: boolean;
  logoAnimations?: {
    introIn: string;
    introOut: string;
  };
  heights?: ThemeLayout["heights"];
  sponsors?: SponsorsData;
  videoDataContext?: unknown;
  animationContext?: unknown;
  data?: unknown;
}
/**
 * Custom hook for sponsor validation logic
 * Consolidates all validation logic used by SponsorFooter components
 */
export const useSponsorValidation = (): ValidationResult => {
  const animationContext = useAnimationContext();
  const videoDataContext = useVideoDataContext();
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Early return if critical validation fails
  if (!animationContext || !videoDataContext) {
    console.warn(
      "[useSponsorValidation] Missing animation or video data context",
    );
    return { isValid: false };
  }

  const { animations } = animationContext;
  const { data, sponsors } = videoDataContext;

  if (!animations?.image?.sponsor?.logo) {
    console.warn("[useSponsorValidation] Missing logo animations");
    return { isValid: false };
  }

  if (!data?.timings) {
    console.warn("[useSponsorValidation] Missing video data or timings");
    return { isValid: false };
  }

  // Extract validated data
  const logoAnimations = animations.image.sponsor.logo;

  return {
    isValid: true,
    logoAnimations,
    heights: heights!,
    sponsors: sponsors!,
    videoDataContext,
    animationContext,
    data,
  };
};
