/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AnimatedImage } from "../../../components/images/AnimatedImage";
import type { SponsorFooterPlan } from "./planSponsorFooter";

export const SponsorFooterView: React.FC<{
  plan: Extract<SponsorFooterPlan, { kind: "visible" }>;
}> = ({ plan }) => {
  const { logoBox, visibleSponsors, logoAnimations } = plan;

  return (
    <div
      className="flex h-full w-full flex-row items-center justify-center overflow-hidden px-16"
      style={{ gap: plan.logoGapPx }}
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
            animationDelay={idx * plan.animationDelayMultiplier}
            exitFrame={plan.exitFrame}
            exitAnimationDuration={plan.exitAnimationDuration}
          />
        </div>
      ))}
    </div>
  );
};
