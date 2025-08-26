import React from "react";
import { MatchResult } from "../../types";

import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import { ScoreOverNameWithLogo } from "../Sections/TeamsSection/index";
import PlayerStatsBasic from "../Sections/PlayerStats/PlayerStats-Basic";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface MatchCardProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
  delay: number;
}

const MatchCardBasic: React.FC<MatchCardProps> = ({
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

  console.log("[match]", match);

  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full">
      {/* Section 1: Team scores and names */}

      <ScoreOverNameWithLogo
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={baseDelay}
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
      <PlayerStatsBasic
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
        matchType={match.type}
        matchStatus={match.status}
      />

      {/* Section 3: Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
      />
    </div>
  );
};

export default MatchCardBasic;
