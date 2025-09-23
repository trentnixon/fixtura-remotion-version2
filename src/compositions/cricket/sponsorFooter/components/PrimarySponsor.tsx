/* eslint-disable @typescript-eslint/no-explicit-any */
// src/compositions/cricket/sponsorFooter/components/PrimarySponsor.tsx

import React from "react";
import { AnimatedImage } from "../../../../components/images/AnimatedImage";
import { useSponsorValidation } from "../hooks/useSponsorValidation";

// Sponsor configuration constants
const SPONSOR_CONFIG = {
  EXIT_FRAME: 300,
} as const;

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

export const PrimarySponsor = React.memo(() => {
  const validation = useSponsorValidation();

  if (
    !validation.isValid ||
    !validation.logoAnimations ||
    !validation.heights ||
    !validation.sponsors
  ) {
    return null;
  }

  const { logoAnimations, heights, sponsors } = validation;
  const primaryArray = Object.values(sponsors.primary);

  if (primaryArray.length > 0 && primaryArray[0]) {
    if (!primaryArray[0]?.logo?.url) {
      console.warn("[PrimarySponsor] Primary sponsor missing logo url");
      return null;
    }

    return (
      <div
        className="flex justify-center items-center flex-shrink-0"
        style={{ height: heights.footer }}
      >
        <AnimatedImage
          src={primaryArray[0].logo.url || ""}
          alt={primaryArray[0].name || "Primary sponsor"}
          width="auto"
          height="auto"
          maxHeight={heights.footer}
          maxWidth={calculateMaxWidth(primaryArray[0].logo, heights.footer)}
          fit="contain"
          preserveRatio={true}
          animation={logoAnimations.introIn as any}
          exitAnimation={logoAnimations.introOut as any}
          exitFrame={SPONSOR_CONFIG.EXIT_FRAME}
        />
      </div>
    );
  }

  return null;
});
