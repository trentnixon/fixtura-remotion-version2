import type { ThemeLayoutHeights } from "../../../../core/utils/layoutHeights";
import { getMainContentSectionHeight } from "../../../../core/utils/layoutHeights";
import type { MatchResult } from "../../results/_types/types";
import type { Sponsor } from "../../../../core/types/data/sponsors";
import {
  buildResultsFooterSponsors,
  calculateDisplayedResults,
} from "../../results/controller/ResultsDisplay/_utils/calculations";
import type { OverlayTemplateFamily } from "./overlayTemplateFamily";
import {
  resolveResultsLedgerThemeKeys,
  type ResultsLedgerThemeKeys,
} from "./resultsLedgerThemeKeys";

export type ResultsLedgerLayoutPlan = {
  mainContentHeight: number;
  columnHeight: number;
};

export const planResultsLedgerLayout = (
  heights: Pick<ThemeLayoutHeights, "asset" | "footer">,
): ResultsLedgerLayoutPlan => {
  const mainContentHeight = getMainContentSectionHeight(heights);
  return {
    mainContentHeight,
    columnHeight: mainContentHeight + heights.footer,
  };
};

export type ResultsLedgerScreenPlan = {
  family: OverlayTemplateFamily;
  themeKeys: ResultsLedgerThemeKeys;
  layout: ResultsLedgerLayoutPlan;
  displayedResults: MatchResult[];
  footerSponsors: Sponsor[];
  startIndex: number;
  endIndex: number;
};

export const planResultsLedgerScreen = (input: {
  family: OverlayTemplateFamily;
  results: MatchResult[];
  resultsPerScreen: number;
  screenIndex: number;
  heights: Pick<ThemeLayoutHeights, "asset" | "footer">;
}): ResultsLedgerScreenPlan => {
  const { family, results, resultsPerScreen, screenIndex, heights } = input;
  const paging = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );

  return {
    family,
    themeKeys: resolveResultsLedgerThemeKeys(family),
    layout: planResultsLedgerLayout(heights),
    displayedResults: paging.displayedResults,
    footerSponsors: buildResultsFooterSponsors(paging.displayedResults),
    startIndex: paging.startIndex,
    endIndex: paging.endIndex,
  };
};
