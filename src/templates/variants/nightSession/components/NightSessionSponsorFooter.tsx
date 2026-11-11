import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import type { SponsorFooterProps } from "../../../../compositions/cricket/sponsorFooter";
import { SponsorFooterChrome } from "../../../../compositions/cricket/sponsorFooter/SponsorFooterChrome";
import { csClass } from "../../../../compositions/cricket/utils/overlayFamily";

type NightSessionSponsorFooterProps = SponsorFooterProps & {
  height?: number;
  sponsorStripKey?: string;
};

export const NightSessionSponsorFooter: React.FC<
  NightSessionSponsorFooterProps
> = ({
  height,
  sponsorStripKey = "nightSessionSponsorStrip",
  ...sponsorProps
}) => {
  const { componentStyles } = useThemeContext();

  return (
    <SponsorFooterChrome
      height={height}
      sponsorStripClassName={csClass(componentStyles, sponsorStripKey)}
      decoration={<div className="footer-rule" aria-hidden />}
      {...sponsorProps}
    />
  );
};
