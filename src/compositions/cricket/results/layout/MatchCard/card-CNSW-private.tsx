import React from "react";
import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import { TeamsSectionScoreOverTeamNameOnly } from "../Sections/TeamsSection/index";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PlayerStatsCNSWPrivate from "../Sections/PlayerStats/PlayerStats-CNSW-private";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

const MatchCardCNSWPrivate: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const { layout } = useThemeContext();

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  return (
    <div
      className={`${layout.borderRadius.container} w-auto mx-8 overflow-hidden h-full`}
    >
      {/* Section 1: Team scores and names */}

      <TeamsSectionScoreOverTeamNameOnly
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={baseDelay}
        alignment="end"
        backgroundColor={"none"}
        outerContainer={{
          height: teamsHeight,
        }}
        CopyVariant="onBackgroundMain"
      />

      {/* Section 2: Player statistics */}
      <PlayerStatsCNSWPrivate
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
        className="py-0 px-4"
        CopyVariant="onBackgroundMain"
      />
    </div>
  );
};

export default MatchCardCNSWPrivate;
