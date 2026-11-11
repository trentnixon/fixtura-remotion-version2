import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import type { SponsorFooterProps } from "../../../../compositions/cricket/sponsorFooter";
import { SponsorFooterChrome } from "../../../../compositions/cricket/sponsorFooter/SponsorFooterChrome";
import { csClass } from "../../../../compositions/cricket/utils/scoreline/componentStyles";
import { ScorelineCreaseMarkup } from "./crease/ScorelineCreaseMarkup";

type ScorelineSponsorFooterProps = SponsorFooterProps & {
  height?: number;
  sponsorStripKey?: string;
};

export const ScorelineSponsorFooter: React.FC<ScorelineSponsorFooterProps> = ({
  height,
  sponsorStripKey = "scorelineSponsorStrip",
  ...sponsorProps
}) => {
  const { componentStyles } = useThemeContext();

  return (
    <SponsorFooterChrome
      height={height}
      sponsorStripClassName={csClass(componentStyles, sponsorStripKey)}
      decoration={
        <div className="footer-crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
      }
      {...sponsorProps}
    />
  );
};
