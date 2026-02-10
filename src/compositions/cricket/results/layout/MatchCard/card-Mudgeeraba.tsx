import React from "react";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateDelays } from "./_utils/calculations";
import MudgeerabaSingleTeamHeader from "../Sections/MatchHeader/MudgeerabaSingleTeamHeader";
import { computePartialTwoDayVisibility } from "../Sections/PlayerStats/_utils/visibility";
import PlayerStatsSingleTeamOnlyMudgeeraba from "../Sections/PlayerStats/PlayerStats-SingleTeamOnly-Mudgeeraba";
import MudgeerabaStatusFooter from "../Sections/MatchStatus/MudgeerabaStatusFooter";

const MatchCardMudgeeraba: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  // Calculate section heights
  // Split height between two teams (header + stats for each)
  const teamHeaderHeight = 60; // Height for each team header
  const teamStatsHeight = (rowHeight - (teamHeaderHeight * 2)) / 2; // Split remaining height between two teams' stats

  // Calculate delays
  const { baseDelay } = calculateDelays(delay);
  const homeHeaderDelay = baseDelay;
  const homeStatsDelay = baseDelay + 10;
  const awayHeaderDelay = baseDelay + 20;
  const awayStatsDelay = baseDelay + 30;
  const resultSectionDelay = baseDelay + 40;

  // Determine visibility for each team
  const homeBatted = (match.homeTeam.battingPerformances || []).length > 0;
  const awayBatted = (match.awayTeam.battingPerformances || []).length > 0;

  // Get visibility flags for both teams
  const visibility = computePartialTwoDayVisibility({
    matchType: match.type,
    matchStatus: match.status,
    homeBatted,
    awayBatted,
  });

  return (
    <div className="w-auto mx-0 overflow-hidden h-full">
      {/* Home Team Header */}
      <MudgeerabaSingleTeamHeader
        team={match.homeTeam}
        teamLogo={match.teamHomeLogo}
        delay={homeHeaderDelay}
        outerContainer={{
          height: teamHeaderHeight,
        }}
      />

      {/* Home Team Stats */}
      <PlayerStatsSingleTeamOnlyMudgeeraba
        Team={match.homeTeam}
        height={teamStatsHeight}
        delay={homeStatsDelay}
        maxPlayersPerStat={2}
        showBatting={visibility.flags.homeShowBatting}
        showBowling={visibility.flags.homeShowBowling}
      />

      {/* Away Team Header */}
      <MudgeerabaSingleTeamHeader
        team={match.awayTeam}
        teamLogo={match.teamAwayLogo}
        delay={awayHeaderDelay}
        outerContainer={{
          height: teamHeaderHeight,
        }}
      />

      {/* Away Team Stats */}
      <PlayerStatsSingleTeamOnlyMudgeeraba
        Team={match.awayTeam}
        height={teamStatsHeight}
        delay={awayStatsDelay}
        maxPlayersPerStat={2}
        showBatting={visibility.flags.awayShowBatting}
        showBowling={visibility.flags.awayShowBowling}
      />

      {/* Game result section – primary bg, angled left/right, white centered text */}
      <MudgeerabaStatusFooter
        result={match.result}
        delay={resultSectionDelay}
        outerContainer={{ minHeight: 52 }}
      />
    </div>
  );
};

export default MatchCardMudgeeraba;
