/* eslint-disable @typescript-eslint/no-explicit-any */
// src/compositions/cricket/sponsorFooter/index.tsx

import React, { useMemo } from "react";
import { AnimatedImage } from "../../../components/images/AnimatedImage";
import { AssignSponsors, Sponsor } from "../../../core/types/data/sponsors";
import { selectFooterSponsors } from "../../../core/utils/sponsors";
import { useSponsorValidation } from "./hooks/useSponsorValidation";

const SPONSOR_CONFIG = {
  ANIMATION_DELAY_MULTIPLIER: 5,
  EXIT_FRAME: 300,
} as const;

const calculateMaxWidth = (
  logo: { width?: number; height?: number },
  footerHeight: number,
): number => {
  if (logo.width && logo.height) {
    const aspectRatio = logo.width / logo.height;
    return footerHeight * aspectRatio;
  }
  return footerHeight * 3;
};

const calculateImageHeight = (footerHeight: number): number => {
  return footerHeight - 20;
};

const entitiesFromAssign = (assignSponsors: AssignSponsors): Sponsor[] => {
  const { grade = [], team = [] } = assignSponsors;
  return [...grade, ...team];
};

export type SponsorFooterProps = {
  /** Pre-selected footer logos (preferred — Results/Upcoming multi-row builders). */
  sponsors?: Sponsor[];
  /**
   * Legacy single-bucket path for compositions not yet on multi-row selection.
   * Uses account primary + this assign set through selectFooterSponsors.
   */
  assignSponsors?: AssignSponsors;
};

export const SponsorFooter = React.memo(
  ({ sponsors, assignSponsors }: SponsorFooterProps) => {
    const validation = useSponsorValidation();

    const allSponsors = useMemo(() => {
      if (sponsors) {
        return sponsors;
      }
      if (!assignSponsors || !validation.sponsors) {
        return [];
      }
      const primaryForScreen = Array.isArray(validation.sponsors.primary)
        ? validation.sponsors.primary
        : [];
      return selectFooterSponsors({
        primaryForScreen,
        entities: entitiesFromAssign(assignSponsors),
      });
    }, [sponsors, assignSponsors, validation.sponsors]);

    if (!sponsors && !assignSponsors) {
      console.warn("[SponsorFooter] Missing sponsors or assignSponsors");
      return null;
    }

    if (
      !validation.isValid ||
      !validation.logoAnimations ||
      !validation.heights ||
      !validation.sponsors
    ) {
      return null;
    }

    if (allSponsors.length === 0) {
      return null;
    }

    const { logoAnimations, heights } = validation;
    const imageHeight = calculateImageHeight(heights.footer);

    return (
      <div
        className="flex flex-row justify-start gap-4 items-center my-0 px-16 overflow-hidden"
        style={{
          height: imageHeight,
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      >
        {allSponsors.map((sponsor, idx) => {
          if (!sponsor?.logo?.url) {
            return null;
          }
          return (
            <div
              key={`${sponsor.id}_${idx}`}
              className="flex items-center justify-center flex-shrink-0"
              style={{ height: imageHeight }}
            >
              <AnimatedImage
                src={sponsor.logo.url}
                alt={sponsor.name || `Sponsor logo ${idx + 1}`}
                width="auto"
                height="auto"
                maxHeight={imageHeight}
                maxWidth={calculateMaxWidth(sponsor.logo, imageHeight)}
                fit="contain"
                preserveRatio={true}
                animation={logoAnimations.introIn as any}
                exitAnimation={logoAnimations.introOut as any}
                animationDelay={idx * SPONSOR_CONFIG.ANIMATION_DELAY_MULTIPLIER}
                exitFrame={SPONSOR_CONFIG.EXIT_FRAME}
              />
            </div>
          );
        })}
      </div>
    );
  },
);
