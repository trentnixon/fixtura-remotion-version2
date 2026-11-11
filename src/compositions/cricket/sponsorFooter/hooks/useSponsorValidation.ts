// src/compositions/cricket/sponsorFooter/hooks/useSponsorValidation.ts

import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import type { Timings } from "../../../../core/types/data/common";
import type { SponsorsData } from "../../../../core/types/data/sponsors";

export type SponsorFooterRuntime = {
  isValid: boolean;
  logoAnimations?: { introIn: string; introOut: string };
  footerHeight?: number;
  accountSponsors?: SponsorsData;
  timings?: Timings;
};

/**
 * Reads Remotion contexts into a plain runtime bag for {@link planSponsorFooter}.
 */
export const useSponsorValidation = (): SponsorFooterRuntime => {
  const animationContext = useAnimationContext();
  const videoDataContext = useVideoDataContext();
  const { layout } = useThemeContext();
  const { heights } = layout;

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

  const logoAnimations = animations.image.sponsor.logo;

  return {
    isValid: true,
    logoAnimations,
    footerHeight: heights?.footer,
    accountSponsors: sponsors,
    timings: data.timings,
  };
};
