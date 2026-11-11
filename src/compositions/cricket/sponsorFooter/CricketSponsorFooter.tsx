import React from "react";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { csClass } from "../utils/overlayFamily";
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
  const kind = chromeKind ?? theme.sponsorFooterChrome;
  const chrome = resolveSponsorFooterChrome(kind);
  const { componentStyles } = theme;

  if (!chrome) {
    return null;
  }

  const stripKey = sponsorStripKey ?? chrome.defaultSponsorStripKey;

  return (
    <SponsorFooterChrome
      height={height}
      sponsorStripClassName={csClass(componentStyles, stripKey)}
      decoration={chrome.decoration}
      {...sponsorProps}
    />
  );
};
