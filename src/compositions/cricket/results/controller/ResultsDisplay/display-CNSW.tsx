import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowCNSW from "../MatchRow/row-CNSW";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  calculateRowHeight,
  mergeAssignSponsors,
} from "./_utils/calculations";

const ResultsDisplayCNSW: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Calculate which results to show on this screen
  const { displayedResults } = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );
  const availableHeight = heights.asset;

  // Calculate exactly half of the available height for each row
  const rowHeight = calculateRowHeight(availableHeight);

  // Merge all assignSponsors objects from displayedResults into one object
  const mergedAssignSponsors = mergeAssignSponsors(displayedResults);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Results container */}
      <div
        className="w-full flex flex-col justify-center"
        style={{ height: `${availableHeight}px` }}
      >
        {displayedResults.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full"
            style={{
              marginBottom: index === 0 ? "10px" : 0,
            }}
          >
            <MatchRowCNSW match={match} index={index} rowHeight={rowHeight} />
          </div>
        ))}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={mergedAssignSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayCNSW;
