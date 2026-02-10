import React from "react";
import { Type_Round_Ground_stacked } from "../Sections/MatchHeader/index";
import { ScoreOverNameWithLogo } from "../Sections/TeamsSection/index";
import { ResultStatementShort, ResultStatementText } from "../Sections/ResultStatement/index";
import { MatchStatus } from "../Sections/MatchStatus/index";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { PlayerStatsClubOnlyBasic } from "../Sections/PlayerStats/index";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

const MatchCardMudgeerabaClubOnly: React.FC<MatchCardProps> = ({ match }) => {
  const { selectedPalette, layout } = useThemeContext();
  const { heights } = layout;

  // For single result, use full asset height available
  const rowHeight = heights.asset;
  const baseDelay = 0;

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay: calculatedBaseDelay, statsDelay, headerDelay } = calculateDelays(baseDelay);

  // Extract optional result statement fields
  const { resultShort, resultSummary } = match;
  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full flex flex-col justify-center ">
      {resultSummary && (
        <div className="w-full flex justify-center items-center mb-16">
          <ResultStatementText
            resultSummary={resultSummary}
            delay={headerDelay}
            outerContainer={{
              height: headerHeight,
            }}
          />
        </div>
      )}
      {resultShort && !resultSummary && (
        <div className="w-full flex justify-center items-center mb-8">
          <ResultStatementShort
            resultShort={resultShort}
            delay={headerDelay}
            outerContainer={{
              height: headerHeight,
            }}
          />
        </div>
      )}
      {/* Section 1: Team scores and names */}
      <ScoreOverNameWithLogo
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={calculatedBaseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />

      {match.status === "Abandoned" && (
        <MatchStatus
          status={`${match.status}`}
          result={match.result}
          delay={headerDelay}
          outerContainer={{
            background: selectedPalette.container.backgroundTransparent.high,
            height: headerHeight,
          }}
        />
      )}

      {/* Section 2: Player statistics */}
      <PlayerStatsClubOnlyBasic
        match={match}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={5}
        matchType={match.type}
        matchStatus={match.status}
      />

      {/* Section 3: Match info footer */}
      <Type_Round_Ground_stacked
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        CopyVariant="onContainerCopyNoBg"
      />
    </div>
  );
};

export default MatchCardMudgeerabaClubOnly;
