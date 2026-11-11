import React from "react";
import { ScorelineCreaseMarkup } from "../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";

export type SponsorFooterChromeKind = "scoreline" | "nightSession";

export type SponsorFooterChromeDefinition = {
  defaultSponsorStripKey: string;
  decoration: React.ReactNode;
};

const SCORELINE_CHROME: SponsorFooterChromeDefinition = {
  defaultSponsorStripKey: "scorelineSponsorStrip",
  decoration: (
    <div className="footer-crease" aria-hidden>
      <ScorelineCreaseMarkup />
    </div>
  ),
};

const NIGHT_SESSION_CHROME: SponsorFooterChromeDefinition = {
  defaultSponsorStripKey: "nightSessionSponsorStrip",
  decoration: <div className="footer-rule" aria-hidden />,
};

const SPONSOR_FOOTER_CHROME: Record<
  SponsorFooterChromeKind,
  SponsorFooterChromeDefinition
> = {
  scoreline: SCORELINE_CHROME,
  nightSession: NIGHT_SESSION_CHROME,
};

export function resolveSponsorFooterChrome(
  kind: SponsorFooterChromeKind | undefined,
): SponsorFooterChromeDefinition | null {
  if (!kind) {
    return null;
  }
  return SPONSOR_FOOTER_CHROME[kind] ?? null;
}
