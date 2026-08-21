import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import MatchRowSixersThunder from "../MatchRow/row-Sixers-thunder";
import { SponsorFooter } from "../../../sponsorFooter";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  calculateRowHeight,
  buildResultsFooterSponsors,
} from "./_utils/calculations";

const ResultsDisplaySixersThunder: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  const { displayedResults } = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );

  const availableHeight = heights.asset;
  const rowHeight = calculateRowHeight(availableHeight);
  const footerSponsors = buildResultsFooterSponsors(displayedResults);

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className="w-full flex flex-col justify-between"
        style={{ height: `${availableHeight}px` }}
      >
        {displayedResults.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full"
            style={{
              height: `${rowHeight}px`,
              marginBottom: index === 0 ? "10px" : 0,
            }}
          >
            <MatchRowSixersThunder
              match={match}
              index={index}
              rowHeight={rowHeight}
            />
          </div>
        ))}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplaySixersThunder;
