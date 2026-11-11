import type { OverlayTemplateFamily } from "./overlayTemplateFamily";

export type ResultsLedgerThemeKeys = {
  displayColumn: string;
  animatedShell: string;
  resultsLedger: string;
  sponsorStrip: string;
};

const RESULTS_LEDGER_THEME_KEYS: Record<
  OverlayTemplateFamily,
  ResultsLedgerThemeKeys
> = {
  scoreline: {
    displayColumn: "scorelineDisplayColumn",
    animatedShell: "scorelineAnimatedShell",
    resultsLedger: "scorelineResultsLedger",
    sponsorStrip: "scorelineResultsSponsorStrip",
  },
  nightSession: {
    displayColumn: "nightSessionDisplayColumn",
    animatedShell: "nightSessionAnimatedShell",
    resultsLedger: "nightSessionResultsLedger",
    sponsorStrip: "nightSessionResultsSponsorStrip",
  },
};

export const resolveResultsLedgerThemeKeys = (
  family: OverlayTemplateFamily,
): ResultsLedgerThemeKeys => RESULTS_LEDGER_THEME_KEYS[family];
