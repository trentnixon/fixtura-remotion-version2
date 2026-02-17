import React from "react";
import { MatchHeaderBrickWork } from "../../../results/layout/Sections/MatchHeader/MatchHeaderBrickWork";
import { TeamsSectionLogoAndScoreBrickWork } from "../../../results/layout/Sections/TeamsSection/index";
import { ResultStatementBrickWork } from "../Sections/ResultStatement/index";
import { MatchStatus } from "../Sections/MatchStatus/index";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PlayerStatsClubOnlyBrickWork from "../../../results/layout/Sections/PlayerStats/PlayerStats-clubOnly-BrickWork";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";
import { MatchResult as ResultsMatchResult } from "../../../results/_types/types";

const BrickWorkMatchCardClubOnly: React.FC<MatchCardProps> = ({ match }) => {
  const { selectedPalette, layout } = useThemeContext();
  const { heights } = layout;

  // For single result, use full asset height available
  const rowHeight = heights.asset;
  const baseDelay = 0;

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay: calculatedBaseDelay, statsDelay, headerDelay } = calculateDelays(baseDelay);

  // Extract optional result fields
  const { resultShort, resultSummary } = match;

  return (
    <div className="rounded-none w-auto mx-8 overflow-hidden h-full flex flex-col justify-center">


      {/* Section 1: Team scores and names */}
      <TeamsSectionLogoAndScoreBrickWork
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={calculatedBaseDelay}
        height={teamsHeight}
        outerContainer={{
          height: `${teamsHeight}px`,
        }}
        backgroundColor={selectedPalette.container.backgroundTransparent.medium}
      />

      {/* Metadata under scores */}
      <MatchHeaderBrickWork
        type={match.type}
        round={match.round}
        grade={match.gradeName}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor="transparent"
      />

      {match.status === "Abandoned" && (
        <MatchStatus
          status={`${match.status}`}
          result={match.result}
          delay={headerDelay}
          outerContainer={{
            backgroundColor: selectedPalette.container.backgroundTransparent.medium,
            height: `${teamsHeight}px`,
          }}
        />
      )}

      {/* Section 2: Player statistics - club team only */}
      <PlayerStatsClubOnlyBrickWork
        match={match as unknown as ResultsMatchResult}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={5}
        matchType={match.type}
        matchStatus={match.status}
      />


      {/* Result statement */}
      <ResultStatementBrickWork
        resultShort={resultShort}
        resultSummary={resultSummary}
        height={headerHeight}
        delay={headerDelay}
      />
    </div>
  );
};

export default BrickWorkMatchCardClubOnly;
