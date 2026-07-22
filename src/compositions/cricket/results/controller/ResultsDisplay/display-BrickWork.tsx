import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowBrickWork from "../MatchRow/row-Brickwork";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  mergeAssignSponsors,
} from "./_utils/calculations";
import {
  BRICKWORK_ROW_STACK_CLASS,
  calculateBrickworkStackItemHeight,
} from "../../../../../templates/variants/brickwork/design";

const ResultsDisplayBrickWork: React.FC<ResultsDisplayProps> = ({
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
  const rowHeight = calculateBrickworkStackItemHeight(
    availableHeight,
    displayedResults.length,
  );

  const mergedAssignSponsors = mergeAssignSponsors(displayedResults);

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className={BRICKWORK_ROW_STACK_CLASS}
        style={{ height: `${availableHeight}px` }}
      >
        {displayedResults.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full flex-shrink-0"
            style={{ height: `${rowHeight}px` }}
          >
            <MatchRowBrickWork
              match={match}
              index={index}
              rowHeight={rowHeight}
            />
          </div>
        ))}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={mergedAssignSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayBrickWork;
