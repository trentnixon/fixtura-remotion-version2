import React from "react";
import { MatchHeaderBrickWork } from "../../../results/layout/Sections/MatchHeader/MatchHeaderBrickWork";
import { TeamsSectionLogoAndScoreBrickWork } from "../../../results/layout/Sections/TeamsSection/index";
import { MatchStatus } from "../Sections/MatchStatus/index";
import { ResultStatementBrickWork } from "../Sections/ResultStatement/index";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PlayerStatsBrickWork from "../../../results/layout/Sections/PlayerStats/PlayerStats-BrickWork";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

const BrickWorkMatchCard: React.FC<MatchCardProps> = ({ match }) => {
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
    <div className="rounded-none w-auto mx-8 overflow-hidden h-full">
      {/* Result statement - priority: resultSummary > resultShort */}
      <ResultStatementBrickWork
        resultShort={resultShort}
        resultSummary={resultSummary}
        height={headerHeight}
        delay={headerDelay}
      />

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

      {/* Section 2: Player statistics */}
      <PlayerStatsBrickWork
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={5}
        matchType={match.type}
        matchStatus={match.status}
      />
    </div>
  );
};

export default BrickWorkMatchCard;
