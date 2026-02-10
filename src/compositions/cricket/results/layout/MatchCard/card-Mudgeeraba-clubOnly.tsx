import React from "react";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateDelays } from "./_utils/calculations";
import MudgeerabaSingleTeamHeader from "../Sections/MatchHeader/MudgeerabaSingleTeamHeader";
import { computePartialTwoDayVisibility } from "../Sections/PlayerStats/_utils/visibility";
import PlayerStatsSingleTeamOnlyMudgeerabaClubOnly from "../Sections/PlayerStats/PlayerStats-SingleTeamOnly-Mudgeeraba-clubOnly";
import MudgeerabaStatusFooter from "../Sections/MatchStatus/MudgeerabaStatusFooter";

const TEAM_HEADER_HEIGHT = 60;
const RESULT_FOOTER_MIN_HEIGHT = 52;

/**
 * Club-only layout (matches classic two-column pattern):
 * - Club team score header → club batting only (under club).
 * - Opposition team score header → club bowling only (under opposition).
 */
const MatchCardMudgeerabaClubOnly: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const clubTeam = match.homeTeam.isClubTeam ? match.homeTeam : match.awayTeam.isClubTeam ? match.awayTeam : null;
  const oppositionTeam = match.homeTeam.isClubTeam ? match.awayTeam : match.awayTeam.isClubTeam ? match.homeTeam : null;
  const clubLogo = match.homeTeam.isClubTeam ? match.teamHomeLogo : match.teamAwayLogo;
  const oppositionLogo = match.homeTeam.isClubTeam ? match.teamAwayLogo : match.teamHomeLogo;

  if (!clubTeam || !oppositionTeam) {
    return null;
  }

  const teamStatsHeight = (rowHeight - TEAM_HEADER_HEIGHT * 2 - RESULT_FOOTER_MIN_HEIGHT) / 2;
  const { baseDelay } = calculateDelays(delay);
  const clubHeaderDelay = baseDelay;
  const clubStatsDelay = baseDelay + 10;
  const oppositionHeaderDelay = baseDelay + 20;
  const oppositionStatsDelay = baseDelay + 30;
  const resultSectionDelay = baseDelay + 40;

  const clubBatted = (clubTeam.battingPerformances ?? []).length > 0;
  const { flags } = computePartialTwoDayVisibility({
    matchType: match.type,
    matchStatus: match.status,
    homeBatted: clubBatted,
    awayBatted: false,
  });

  return (
    <div className="w-auto mx-0 overflow-hidden h-full">
      {/* Club team score */}
      <MudgeerabaSingleTeamHeader
        team={clubTeam}
        teamLogo={clubLogo}
        delay={clubHeaderDelay}
        outerContainer={{ height: TEAM_HEADER_HEIGHT }}
      />

      {/* Under club: club batting only */}
      <PlayerStatsSingleTeamOnlyMudgeerabaClubOnly
        Team={clubTeam}
        height={Math.max(0, teamStatsHeight)}
        delay={clubStatsDelay}
        maxPlayersPerStat={2}
        showBatting={flags.homeShowBatting}
        showBowling={false}
      />

      {/* Opposition team score */}
      <MudgeerabaSingleTeamHeader
        team={oppositionTeam}
        teamLogo={oppositionLogo}
        delay={oppositionHeaderDelay}
        outerContainer={{ height: TEAM_HEADER_HEIGHT }}
      />

      {/* Under opposition: club bowling only */}
      <PlayerStatsSingleTeamOnlyMudgeerabaClubOnly
        Team={clubTeam}
        height={Math.max(0, teamStatsHeight)}
        delay={oppositionStatsDelay}
        maxPlayersPerStat={2}
        showBatting={false}
        showBowling={flags.homeShowBowling}
      />

      <MudgeerabaStatusFooter
        result={match.result}
        delay={resultSectionDelay}
        outerContainer={{ minHeight: RESULT_FOOTER_MIN_HEIGHT }}
      />
    </div>
  );
};

export default MatchCardMudgeerabaClubOnly;
