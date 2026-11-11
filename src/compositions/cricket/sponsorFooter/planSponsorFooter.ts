import { buildSingleItemFooterSponsors } from "../../../core/utils/sponsors";
import {
  FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
  FOOTER_LOGO_GAP_PX,
  calculateFooterExitFrame,
} from "../../../core/timing/sponsorFooterExitPolicy";
import type { Timings } from "../../../core/types/data/common";
import type {
  AssignSponsors,
  Sponsor,
  SponsorsData,
} from "../../../core/types/data/sponsors";
import {
  calculateFooterLogoBox,
  type FooterLogoBox,
} from "./_utils/calculations";

const ANIMATION_DELAY_MULTIPLIER = 5;

export type SponsorFooterHiddenReason =
  | "missing-input"
  | "invalid-runtime"
  | "no-visible-logos"
  | "invalid-logo-box";

export type SponsorFooterPlan =
  | { kind: "hidden"; reason: SponsorFooterHiddenReason }
  | {
      kind: "visible";
      visibleSponsors: Sponsor[];
      exitFrame: number;
      exitAnimationDuration: number;
      logoBox: FooterLogoBox;
      logoAnimations: { introIn: string; introOut: string };
      animationDelayMultiplier: number;
      logoGapPx: number;
    };

export type PlanSponsorFooterInput = {
  sponsors?: Sponsor[];
  assignSponsors?: AssignSponsors;
  primaryForScreen?: Sponsor[];
  timings?: Timings;
  footerHeight?: number;
  accountSponsors?: SponsorsData;
  logoAnimations?: { introIn: string; introOut: string };
};

export const planSponsorFooter = (
  input: PlanSponsorFooterInput,
): SponsorFooterPlan => {
  if (!input.sponsors && !input.assignSponsors) {
    return { kind: "hidden", reason: "missing-input" };
  }

  if (
    !input.logoAnimations ||
    !input.timings ||
    input.footerHeight == null ||
    !Number.isFinite(input.footerHeight) ||
    input.footerHeight <= 0 ||
    !input.accountSponsors
  ) {
    return { kind: "hidden", reason: "invalid-runtime" };
  }

  const allSponsors = input.sponsors
    ? input.sponsors
    : buildSingleItemFooterSponsors({
        assignSponsors: input.assignSponsors,
        primaryForScreen: input.primaryForScreen,
        fallbackPrimary: Array.isArray(input.accountSponsors.primary)
          ? input.accountSponsors.primary
          : [],
      });

  const visibleSponsors = allSponsors.filter((sponsor) =>
    Boolean(sponsor?.logo?.url),
  );

  if (visibleSponsors.length === 0) {
    return { kind: "hidden", reason: "no-visible-logos" };
  }

  const logoBox = calculateFooterLogoBox({
    footerHeight: input.footerHeight,
    count: visibleSponsors.length,
  });

  if (logoBox.width <= 0 || logoBox.height <= 0) {
    return { kind: "hidden", reason: "invalid-logo-box" };
  }

  return {
    kind: "visible",
    visibleSponsors,
    exitFrame: calculateFooterExitFrame(input.timings),
    exitAnimationDuration: FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
    logoBox,
    logoAnimations: input.logoAnimations,
    animationDelayMultiplier: ANIMATION_DELAY_MULTIPLIER,
    logoGapPx: FOOTER_LOGO_GAP_PX,
  };
};
