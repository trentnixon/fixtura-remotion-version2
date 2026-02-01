import React from "react";
import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import { TeamsSectionLogoAndScore } from "../Sections/TeamsSection/index";
import { ResultStatementShort } from "../Sections/ResultStatement/index";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PlayerStatsClubOnlyBrickWork from "../Sections/PlayerStats/PlayerStats-clubOnly-BrickWork";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

const MatchCardBrickWorkClubOnly: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  return (
    <div className="rounded-none w-auto mx-8 overflow-hidden h-full">
      {/* Section 3: Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
      />
      {/* Section 1: Team scores and names */}
      <TeamsSectionLogoAndScore
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={baseDelay}
        outerContainer={{
          backgroundColor: selectedPalette.container.backgroundTransparent.low,
          height: `${teamsHeight}px`,
          borderBottom: `2px solid ${selectedPalette.container.primary}`,
        }}
      />

      {match.status === "Abandoned" && (
        <MatchStatus
          status={`${match.status}`}
          result={match.result}
          delay={headerDelay}
          outerContainer={{
            backgroundColor:
              selectedPalette.container.backgroundTransparent.low,
            height: `${teamsHeight}px`,
            borderBottom: `2px solid ${selectedPalette.container.primary}`,
          }}
        />
      )}



      {/* Section 2: Player statistics */}
      <PlayerStatsClubOnlyBrickWork
        match={match}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
        matchType={match.type}
        matchStatus={match.status}
      />
      {
        match.resultShort && (
          <ResultStatementShort
            resultShort={match.resultShort}
            delay={headerDelay}
            outerContainer={{
              height: headerHeight,
            }}
            variant="onContainerCopy"
          />
        )
      }
    </div>
  );
};

export default MatchCardBrickWorkClubOnly;
