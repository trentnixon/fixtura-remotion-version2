import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../../compositions/cricket/sponsorFooter";
import type { SponsorFooterProps } from "../../../../compositions/cricket/sponsorFooter";
import { ScorelineCreaseMarkup } from "./crease/ScorelineCreaseMarkup";

type ScorelineSponsorFooterProps = SponsorFooterProps & {
  height?: number;
};

export const ScorelineSponsorFooter: React.FC<ScorelineSponsorFooterProps> = ({
  height,
  ...sponsorProps
}) => {
  const { layout } = useThemeContext();
  const footerHeight = height ?? layout.heights.footer;

  return (
    <footer
      className="asset-footer"
      style={{
        height: `${footerHeight}px`,
        maxHeight: `${footerHeight}px`,
      }}
    >
      <div className="footer-crease" aria-hidden>
        <ScorelineCreaseMarkup />
      </div>
      <div className="sponsor-strip">
        <SponsorFooter {...sponsorProps} />
      </div>
    </footer>
  );
};
