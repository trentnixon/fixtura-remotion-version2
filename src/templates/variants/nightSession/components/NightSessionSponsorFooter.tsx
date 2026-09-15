import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../../compositions/cricket/sponsorFooter";
import type { SponsorFooterProps } from "../../../../compositions/cricket/sponsorFooter";
import { csClass } from "../../../../compositions/cricket/utils/scoreline/componentStyles";

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
  const { layout, componentStyles } = useThemeContext();
  const footerHeight = height ?? layout.heights.footer;

  return (
    <footer
      className="asset-footer"
      style={{
        height: `${footerHeight}px`,
        maxHeight: `${footerHeight}px`,
      }}
    >
      <div className="footer-rule" aria-hidden />
      <div
        className={`sponsor-strip ${csClass(componentStyles, sponsorStripKey)}`}
      >
        <SponsorFooter {...sponsorProps} />
      </div>
    </footer>
  );
};
