import React from "react";
import { Horizontal_SingleTeam_LogoWithName_Score } from "../Sections/TeamsSection/index";
import SingleDataPointHeader from "../Sections/MatchHeader/SingleDataPointHeader";
import { PlayerStatsSingleTeamOnly } from "../Sections/PlayerStats/PlayerStats-SingleTeamOnly";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";
import { getClubTeamPlayers } from "./_utils/calculations";

const MatchCardSixersThunderClubOnly: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  // Get club team players
  const clubTeamPlayers = getClubTeamPlayers(match);

  // Determine which team is the club team
  const clubTeam = match.homeTeam.isClubTeam ? match.homeTeam : match.awayTeam.isClubTeam ? match.awayTeam : null;
  const oppositionTeam = match.homeTeam.isClubTeam ? match.awayTeam : match.awayTeam.isClubTeam ? match.homeTeam : null;

  if (!clubTeamPlayers || !clubTeam || !oppositionTeam) {
    return null; // Don't render if no club team found
  }

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  // Determine if club team is home or away
  const isHomeTeam = match.homeTeam.isClubTeam;

  return (
    <div className="w-auto mx-8 overflow-hidden h-full">
      {/* Section 3: Match info footer */}
      {
        match.resultShort && (
          <SingleDataPointHeader
            grade={`${match.resultShort}`}
            height={headerHeight}
            delay={headerDelay}
            backgroundColor={"transparent"}
            align="right"
          />
        )
      }

      {/* Section 1: Team scores and names */}
      <>
        {/* Club team */}
        <Horizontal_SingleTeam_LogoWithName_Score
          type={match.type}
          Team={clubTeam}
          TeamLogo={isHomeTeam ? match.teamHomeLogo : match.teamAwayLogo}
          firstInningsScore={isHomeTeam
            ? (match.homeTeam.homeScoresFirstInnings || "")
            : (match.awayTeam.awayScoresFirstInnings || "")}
          delay={baseDelay}
          outerContainer={{
            height: teamsHeight,
          }}
        />

        {/* Club team batting statistics */}
        <div className="ml-32">
          <PlayerStatsSingleTeamOnly
            Team={clubTeam}
            height={statsHeight}
            delay={statsDelay}
            maxPlayersPerStat={2}
            showBatting={true}
            showBowling={false}
          />
        </div>
        {/* Opposition team (scores only) */}
        <Horizontal_SingleTeam_LogoWithName_Score
          type={match.type}
          Team={oppositionTeam}
          TeamLogo={isHomeTeam ? match.teamAwayLogo : match.teamHomeLogo}
          firstInningsScore={isHomeTeam
            ? (match.awayTeam.awayScoresFirstInnings || "")
            : (match.homeTeam.homeScoresFirstInnings || "")}
          delay={baseDelay}
          outerContainer={{
            height: teamsHeight,
            marginTop: "10px",
          }}
        />

        {/* Club team bowling statistics */}
        <div className="ml-32">
          <PlayerStatsSingleTeamOnly
            Team={clubTeam}
            height={statsHeight}
            delay={statsDelay}
            maxPlayersPerStat={2}
            showBatting={false}
            showBowling={true}
          />
        </div>
      </>
    </div>
  );
};

export default MatchCardSixersThunderClubOnly;
