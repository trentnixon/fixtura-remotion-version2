import React from "react";
import { MatchResult } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AssignSponsors } from "../../../composition-types";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowBasic from "../MatchRow/row-Basic";

interface ResultsDisplayProps {
  results: MatchResult[];
  resultsPerScreen: number;
  screenIndex: number;
}

const ResultsDisplayBasic: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Calculate which results to show on this screen
  const startIndex = screenIndex * resultsPerScreen;
  const endIndex = Math.min(startIndex + resultsPerScreen, results.length);
  const displayedResults = results.slice(startIndex, endIndex);
  const availableHeight = heights.asset;

  // Calculate exactly half of the available height for each row
  const rowHeight = Math.floor(availableHeight / 2);

  // Merge all assignSponsors objects from displayedResults into one object
  const mergedAssignSponsors = displayedResults.reduce(
    (acc, result) => ({ ...acc, ...result.assignSponsors }),
    {},
  );

  return (
    <div className="flex flex-col h-full w-full">
      {/* Results container */}
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
            <MatchRowBasic match={match} index={index} rowHeight={rowHeight} />
          </div>
        ))}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

export default ResultsDisplayBasic;
