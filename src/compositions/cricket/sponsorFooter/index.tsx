/* eslint-disable @typescript-eslint/no-explicit-any */
// src/compositions/cricket/sponsorFooter/index.tsx

import React, { useMemo } from "react";
import { AnimatedImage } from "../../../components/images/AnimatedImage";
import { AssignSponsors, Sponsor } from "../../../core/types/data/sponsors";
import { buildSingleItemFooterSponsors } from "../../../core/utils/sponsors";
import {
  FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
  FOOTER_LOGO_GAP_PX,
  calculateFooterExitFrame,
  calculateFooterLogoBox,
} from "./_utils/calculations";
import { useSponsorValidation } from "./hooks/useSponsorValidation";

const SPONSOR_CONFIG = {
  ANIMATION_DELAY_MULTIPLIER: 5,
} as const;

export type SponsorFooterProps = {
  /** Pre-selected footer logos (Results/Upcoming multi-row builders). */
  sponsors?: Sponsor[];
  /** Single-item entity buckets when not passing a pre-built list. */
  assignSponsors?: AssignSponsors;
  /** Per-item primaryForScreen; account primary used only when this prop is omitted. */
  primaryForScreen?: Sponsor[];
};

/**
 * Three logos or fewer are sized by the footer height. More than three
 * share the footer width so every logo stays in view.
 */
export const SponsorFooter = React.memo(
  ({ sponsors, assignSponsors, primaryForScreen }: SponsorFooterProps) => {
    const validation = useSponsorValidation();

    const allSponsors = useMemo(() => {
      if (sponsors) {
        return sponsors;
      }
      if (!assignSponsors || !validation.sponsors) {
        return [];
      }
      return buildSingleItemFooterSponsors({
        assignSponsors,
        primaryForScreen,
        fallbackPrimary: Array.isArray(validation.sponsors.primary)
          ? validation.sponsors.primary
          : [],
      });
    }, [sponsors, assignSponsors, primaryForScreen, validation.sponsors]);

    const visibleSponsors = useMemo(
      () => allSponsors.filter((sponsor) => Boolean(sponsor?.logo?.url)),
      [allSponsors],
    );

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

    if (visibleSponsors.length === 0) {
      return null;
    }

    const { logoAnimations } = validation;
    const exitFrame = calculateFooterExitFrame(validation.timings);
    const logoBox = calculateFooterLogoBox({
      footerHeight: validation.heights.footer,
      count: visibleSponsors.length,
    });
    if (logoBox.width <= 0 || logoBox.height <= 0) {
      return null;
    }

    return (
      <div
        className="flex h-full w-full flex-row items-center justify-center overflow-hidden px-16"
        style={{ gap: FOOTER_LOGO_GAP_PX }}
      >
        {visibleSponsors.map((sponsor, idx) => (
          <div
            key={`${sponsor.id}_${idx}`}
            className="flex shrink-0 items-center justify-center overflow-hidden"
            style={{
              height: logoBox.height,
              maxHeight: logoBox.height,
              maxWidth: logoBox.width,
              width: logoBox.fit === "width" ? logoBox.width : "auto",
            }}
          >
            <AnimatedImage
              src={sponsor.logo.url}
              alt={sponsor.name || `Sponsor logo ${idx + 1}`}
              width={logoBox.fit === "width" ? "100%" : "auto"}
              height={logoBox.fit === "width" ? "100%" : logoBox.height}
              maxWidth="100%"
              maxHeight="100%"
              fit="contain"
              preserveRatio={false}
              animation={logoAnimations.introIn as any}
              exitAnimation={logoAnimations.introOut as any}
              animationDelay={idx * SPONSOR_CONFIG.ANIMATION_DELAY_MULTIPLIER}
              exitFrame={exitFrame}
              exitAnimationDuration={FOOTER_EXIT_ANIMATION_DURATION_FRAMES}
            />
          </div>
        ))}
      </div>
    );
  },
);
