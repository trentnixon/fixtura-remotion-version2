/* eslint-disable @typescript-eslint/no-explicit-any */
// src/compositions/cricket/sponsorFooter/components/PrimarySponsor.tsx

import React from "react";
import { AnimatedImage } from "../../../../components/images/AnimatedImage";
import {
  FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
  calculateFooterExitFrame,
  calculateFooterLogoBox,
} from "../_utils/calculations";
import { useSponsorValidation } from "../hooks/useSponsorValidation";

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

    const { logoAnimations } = validation;
    const exitFrame = calculateFooterExitFrame(validation.timings);
    const logoCount = primarySponsors.filter((sponsor) =>
      Boolean(sponsor?.logo?.url),
    ).length;
    const logoBox = calculateFooterLogoBox({
      footerHeight: validation.heights.footer,
      count: logoCount,
    });

    if (primarySponsors.length > 0 && primarySponsors[0]) {
      if (!primarySponsors[0]?.logo?.url) {
        console.warn("[PrimarySponsor] Primary sponsor missing logo url");
        return null;
      }

      if (logoBox.width <= 0 || logoBox.height <= 0) {
        return null;
      }

      return (
        <div
          className="flex shrink-0 items-center justify-center overflow-hidden"
          style={{
            height: logoBox.height,
            maxHeight: logoBox.height,
            maxWidth: logoBox.width,
            width: logoBox.fit === "width" ? logoBox.width : "auto",
          }}
        >
          <AnimatedImage
            src={primarySponsors[0].logo.url || ""}
            alt={primarySponsors[0].name || "Primary sponsor"}
            width={logoBox.fit === "width" ? "100%" : "auto"}
            height={logoBox.fit === "width" ? "100%" : logoBox.height}
            maxWidth="100%"
            maxHeight="100%"
            fit="contain"
            preserveRatio={false}
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
