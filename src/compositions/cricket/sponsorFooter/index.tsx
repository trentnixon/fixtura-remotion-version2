import React, { useMemo } from "react";
import { AssignSponsors, Sponsor } from "../../../core/types/data/sponsors";
import { planSponsorFooter } from "./planSponsorFooter";
import { useSponsorValidation } from "./hooks/useSponsorValidation";
import { SponsorFooterView } from "./SponsorFooterView";

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
    const runtime = useSponsorValidation();

    const plan = useMemo(
      () =>
        planSponsorFooter({
          sponsors,
          assignSponsors,
          primaryForScreen,
          timings: runtime.timings,
          footerHeight: runtime.footerHeight,
          accountSponsors: runtime.accountSponsors,
          logoAnimations: runtime.logoAnimations,
        }),
      [
        assignSponsors,
        primaryForScreen,
        runtime.accountSponsors,
        runtime.footerHeight,
        runtime.logoAnimations,
        runtime.timings,
        sponsors,
      ],
    );

    if (plan.kind === "hidden") {
      if (plan.reason === "missing-input") {
        console.warn("[SponsorFooter] Missing sponsors or assignSponsors");
      }
      return null;
    }

    return <SponsorFooterView plan={plan} />;
  },
);

export { planSponsorFooter, type SponsorFooterPlan } from "./planSponsorFooter";
export {
  planSponsorFooterChrome,
  type SponsorFooterChromePlan,
} from "./planSponsorFooterChrome";
