import React from "react";
import { MatchResult } from "../../types";

import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import { TeamsSectionLogoAndScore } from "../Sections/TeamsSection/index";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PlayerStatsBrickWork from "../Sections/PlayerStats/PlayerStats-BrickWork";

interface MatchCardProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
  delay: number;
}

const MatchCardBrickWork: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();
  // Calculate section heights
  const teamsHeight = Math.floor(rowHeight * 0.4); // 40% for team scores
  const statsHeight = Math.floor(rowHeight * 0.5); // 50% for player stats
  const headerHeight = Math.floor(rowHeight * 0.1); // 10% for match info

  // Calculate delays
  const baseDelay = delay;
  const statsDelay = baseDelay + 4;
  const headerDelay = statsDelay + 5;

  return (
    <div className="rounded-none w-auto mx-8 overflow-hidden h-full">
      {/* Section 1: Team scores and names */}

      {/* Section 3: Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
      />
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
