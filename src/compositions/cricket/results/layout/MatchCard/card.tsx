import React from "react";
import { MatchResult } from "../../types";

import PlayerStats from "../Sections/PlayerStats/PlayerStats";
import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { LogoWithScoreOverName } from "../Sections/TeamsSection/index";

interface MatchCardProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
  delay: number;
}

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  index,
  rowHeight,
  delay,
}) => {
  // Calculate section heights
  const teamsHeight = Math.floor(rowHeight * 0.4); // 40% for team scores
  const statsHeight = Math.floor(rowHeight * 0.5); // 50% for player stats
  const headerHeight = Math.floor(rowHeight * 0.1); // 10% for match info

  // Calculate delays
  const baseDelay = delay;
  const statsDelay = baseDelay + 4;
  const headerDelay = statsDelay + 5;

  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full">
      {/* Section 1: Team scores and names */}
      <MatchStatus
        status={match.status}
        result={match.result}
        height={headerHeight}
        delay={headerDelay}
      />
      <LogoWithScoreOverName
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        height={teamsHeight}
        delay={baseDelay}
      />

      {/* Section 2: Player statistics */}
      <PlayerStats
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
      />

      {/* Section 3: Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
      />
    </div>
  );
};

export default MatchCard;
