import React from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { ResultStatementShort } from "../../results/layout/Sections/ResultStatement/index";
import {
  calculateDelays,
  calculateSectionHeights,
} from "../../results/layout/MatchCard/_utils/calculations";
import { MatchResult } from "../../results/_types/types";
import { LiteTeamsSectionCNSW } from "./LiteTeamsSection-CNSW";

export const LiteMatchCardCNSW: React.FC<{
  match: MatchResult;
  teamsBlockHeight: number;
  delay: number;
  showClubResultStatement?: boolean;
}> = ({ match, teamsBlockHeight, delay, showClubResultStatement = false }) => {
  const { layout } = useThemeContext();
  const syntheticRowHeight = Math.max(
    teamsBlockHeight,
    Math.floor(teamsBlockHeight / 0.4),
  );
  const { headerHeight } = calculateSectionHeights(syntheticRowHeight);
  const { baseDelay, headerDelay } = calculateDelays(delay);

  return (
    <div
      className={`${layout.borderRadius.container} mx-8 h-full w-auto overflow-hidden`}
    >
      <LiteTeamsSectionCNSW
        match={match}
        teamsBlockHeight={teamsBlockHeight}
        delay={baseDelay}
      />
      {showClubResultStatement && match.resultShort ? (
        <ResultStatementShort
          resultShort={match.resultShort}
          delay={headerDelay}
          outerContainer={{
            height: headerHeight,
          }}
        />
      ) : null}
    </div>
  );
};

export const LiteMatchCardCNSWClubOnly: React.FC<{
  match: MatchResult;
  teamsBlockHeight: number;
  delay: number;
}> = (props) => <LiteMatchCardCNSW {...props} showClubResultStatement />;
