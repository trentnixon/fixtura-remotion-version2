import React from "react";
import MatchHeaderBrickWork from "../Sections/MatchHeader/MatchHeaderBrickWork";
import { TeamsSectionLogoAndScoreBrickWork } from "../Sections/TeamsSection/index";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PlayerStatsBrickWork from "../Sections/PlayerStats/PlayerStats-BrickWork";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

const MatchCardBrickWork: React.FC<MatchCardProps> = ({
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
      {/* Section 1: Team scores and names */}

      <TeamsSectionLogoAndScoreBrickWork
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={baseDelay}
        height={teamsHeight}
        outerContainer={{
          height: `${teamsHeight}px`,
        }}
        backgroundColor={selectedPalette.container.backgroundTransparent.low}
      />

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
            backgroundColor:
              selectedPalette.container.backgroundTransparent.low,
            height: `${teamsHeight}px`,
            borderBottom: `2px solid ${selectedPalette.container.primary}`,
          }}
        />
      )}

      {/* Section 2: Player statistics */}
      <PlayerStatsBrickWork
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
        matchType={match.type}
        matchStatus={match.status}
      />
    </div>
  );
};

export default MatchCardBrickWork;
