/* eslint-disable @typescript-eslint/no-explicit-any */
// src/compositions/cricket/sponsorFooter/index.tsx

import React, { useMemo } from "react";
import { AnimatedImage } from "../../../components/images/AnimatedImage";
import { AssignSponsors } from "../composition-types";
import { useSponsorValidation } from "./hooks/useSponsorValidation";

// Sponsor configuration constants
const SPONSOR_CONFIG = {
  ANIMATION_DELAY_MULTIPLIER: 5,
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

// Helper function to get unique sponsors by ID
const getUniqueSponsors = (sponsors: any[]): any[] => {
  const seen = new Set<number>();
  return sponsors.filter((sponsor) => {
    if (sponsor.id && seen.has(sponsor.id)) {
      return false;
    }
    if (sponsor.id) {
      seen.add(sponsor.id);
    }
    return true;
  });
};

// Helper function to calculate image height with padding
const calculateImageHeight = (footerHeight: number): number => {
  return footerHeight - 20;
};

// Helper function to get all sponsors with deduplication
const getAllSponsors = (
  primarySponsors: any[],
  assignSponsors: AssignSponsors,
): any[] => {
  const assignedSponsors = createFlatSponsorList(assignSponsors);
  return getUniqueSponsors([...primarySponsors, ...assignedSponsors]);
};

export const SponsorFooter = React.memo(
  ({ assignSponsors }: { assignSponsors: AssignSponsors }) => {
    const validation = useSponsorValidation();

    // Memoize all sponsors with deduplication (must be before early returns)
    const allSponsors = useMemo(() => {
      if (!assignSponsors || !validation.sponsors) {
        return [];
      }
      const primarySponsors = Object.values(validation.sponsors.primary);
      return getAllSponsors(primarySponsors, assignSponsors);
    }, [validation.sponsors, assignSponsors]);

    if (!assignSponsors) {
      console.warn("[SponsorFooter] Missing assignSponsors");
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
          const key = "id" in sponsor ? sponsor.id : idx;

          if (!sponsor?.logo?.url) {
            return null;
          }
          return (
            <div
              key={key}
              className="flex items-center justify-center flex-shrink-0"
              style={{ height: imageHeight }}
            >
              <AnimatedImage
                src={sponsor?.logo?.url || ""}
                alt={
                  "name" in sponsor ? sponsor.name : `Sponsor logo ${idx + 1}`
                }
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

function createFlatSponsorList(assignSponsors: AssignSponsors) {
  const { competition = [], grade = [], team = [] } = assignSponsors;
  return [...competition, ...grade, ...team];
}
