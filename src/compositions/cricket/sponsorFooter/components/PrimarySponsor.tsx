/* eslint-disable @typescript-eslint/no-explicit-any */
// src/compositions/cricket/sponsorFooter/components/PrimarySponsor.tsx

import React from "react";
import { AnimatedImage } from "../../../../components/images/AnimatedImage";
import {
  FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
  calculateFooterExitFrame,
} from "../_utils/calculations";
import { useSponsorValidation } from "../hooks/useSponsorValidation";

// Helper function to calculate max width based on logo dimensions
const calculateMaxWidth = (
  logo: { width?: number; height?: number },
  footerHeight: number,
): number => {
  if (logo.width && logo.height) {
    // Calculate the natural aspect ratio
    const aspectRatio = logo.width / logo.height;
    // Calculate width if logo fills the full footer height
    const naturalWidth = footerHeight * aspectRatio;
    // Return the natural width (no artificial limits)
    return naturalWidth;
  }
  // Fallback: if no dimensions provided, allow up to 3x footer height
  return footerHeight * 3;
};

interface PrimarySponsorProps {
  primarySponsors: any[];
}

export const PrimarySponsor = React.memo(
  ({ primarySponsors }: PrimarySponsorProps) => {
    const validation = useSponsorValidation();

    if (
      !validation.isValid ||
      !validation.logoAnimations ||
      !validation.heights
    ) {
      return null;
    }

    const { logoAnimations, heights } = validation;
    const exitFrame = calculateFooterExitFrame(validation.timings);

    if (primarySponsors.length > 0 && primarySponsors[0]) {
      if (!primarySponsors[0]?.logo?.url) {
        console.warn("[PrimarySponsor] Primary sponsor missing logo url");
        return null;
      }

      return (
        <div
          className="flex justify-center items-center flex-shrink-0"
          style={{ height: heights.footer }}
        >
          <AnimatedImage
            src={primarySponsors[0].logo.url || ""}
            alt={primarySponsors[0].name || "Primary sponsor"}
            width="auto"
            height="auto"
            maxHeight={heights.footer}
            maxWidth={calculateMaxWidth(
              primarySponsors[0].logo,
              heights.footer,
            )}
            fit="contain"
            preserveRatio={true}
            animation={logoAnimations.introIn as any}
            exitAnimation={logoAnimations.introOut as any}
            exitFrame={exitFrame}
            exitAnimationDuration={FOOTER_EXIT_ANIMATION_DURATION_FRAMES}
          />
        </div>
      );
    }

    return null;
  },
);
