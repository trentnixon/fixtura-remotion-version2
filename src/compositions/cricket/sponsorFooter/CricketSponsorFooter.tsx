import React, { useMemo } from "react";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { csClass } from "../utils/overlayFamily";
import { planSponsorFooterChrome } from "./planSponsorFooterChrome";
import {
  resolveSponsorFooterChrome,
  type SponsorFooterChromeKind,
} from "./chromeRegistry";
import { SponsorFooterChrome } from "./SponsorFooterChrome";
import type { SponsorFooterProps } from "./index";

export type CricketSponsorFooterProps = SponsorFooterProps & {
  height?: number;
  sponsorStripKey?: string;
  /** Override theme chrome (tests / story isolation). */
  chromeKind?: SponsorFooterChromeKind;
};

/**
 * Composition-layer sponsor footer: strip + exit timing from sport module;
 * variant decoration from active template theme ({@link sponsorFooterChrome}).
 */
export const CricketSponsorFooter: React.FC<CricketSponsorFooterProps> = ({
  height,
  sponsorStripKey,
  chromeKind,
  ...sponsorProps
}) => {
  const theme = useThemeContext();
  const { layout, componentStyles, sponsorFooterChrome } = theme;

  const chromePlan = useMemo(
    () =>
      planSponsorFooterChrome({
        themeChromeKind: sponsorFooterChrome,
        chromeKindOverride: chromeKind,
        sponsorStripKey,
        layoutFooterHeight: layout.heights.footer,
        heightOverride: height,
      }),
    [
      chromeKind,
      height,
      layout.heights.footer,
      sponsorFooterChrome,
      sponsorStripKey,
    ],
  );

  if (chromePlan.kind === "hidden") {
    return null;
  }

  const chrome = resolveSponsorFooterChrome(chromePlan.chromeKind);
  if (!chrome) {
    return null;
  }

  return (
    <SponsorFooterChrome
      height={chromePlan.footerHeight}
      sponsorStripClassName={csClass(
        componentStyles,
        chromePlan.sponsorStripKey,
      )}
      decoration={chrome.decoration}
      {...sponsorProps}
    />
  );
};
