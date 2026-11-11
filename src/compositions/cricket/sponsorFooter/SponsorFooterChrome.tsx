import React from "react";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { SponsorFooter, type SponsorFooterProps } from "./index";

export type SponsorFooterChromeProps = SponsorFooterProps & {
  height?: number;
  /** Variant decoration above the logo strip (crease, rule, etc.). */
  decoration?: React.ReactNode;
  sponsorStripClassName: string;
};

/**
 * Shared footer shell: fixed height, optional variant chrome, standard sponsor strip.
 * Variant-specific footers only supply decoration + strip styling.
 */
export const SponsorFooterChrome: React.FC<SponsorFooterChromeProps> = ({
  height,
  decoration,
  sponsorStripClassName,
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
      {decoration}
      <div className={`sponsor-strip ${sponsorStripClassName}`}>
        <SponsorFooter {...sponsorProps} />
      </div>
    </footer>
  );
};
