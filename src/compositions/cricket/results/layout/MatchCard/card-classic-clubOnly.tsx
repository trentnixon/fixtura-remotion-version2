import React from "react";
import { Horizontal_SingleTeam_LogoWithName_ScoreClassic } from "../Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score-Classic";
import SingleDataPointHeader from "../Sections/MatchHeader/SingleDataPointHeader";
import { PlayerStatsSingleTeamOnlyClassic } from "../Sections/PlayerStats/PlayerStats-SingleTeamOnly-Classic";
import { MatchCardProps } from "./_types/MatchCardProps";
import {
  calculateSectionHeights,
  calculateDelays,
  getClubTeamPlayers,
} from "./_utils/calculations";

const MatchCardClassicClubOnly: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const clubTeamPlayers = getClubTeamPlayers(match);

  const clubTeam = match.homeTeam.isClubTeam
    ? match.homeTeam
    : match.awayTeam.isClubTeam
      ? match.awayTeam
      : null;
  const oppositionTeam = match.homeTeam.isClubTeam
    ? match.awayTeam
    : match.awayTeam.isClubTeam
      ? match.homeTeam
      : null;

  if (!clubTeamPlayers || !clubTeam || !oppositionTeam) {
    return null;
  }

  const { teamsHeight, statsHeight, headerHeight } =
    calculateSectionHeights(rowHeight);
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);
  const isHomeTeam = match.homeTeam.isClubTeam;

  return (
    <div className="w-auto mx-8 overflow-hidden h-full">
      {match.resultShort && (
        <SingleDataPointHeader
          grade={`${match.resultShort}`}
          height={headerHeight}
          delay={headerDelay}
          backgroundColor={"transparent"}
          align="right"
        />
      )}

      <Horizontal_SingleTeam_LogoWithName_ScoreClassic
        type={match.type}
        Team={clubTeam}
        TeamLogo={isHomeTeam ? match.teamHomeLogo : match.teamAwayLogo}
        firstInningsScore={
          isHomeTeam
            ? match.homeTeam.homeScoresFirstInnings || ""
            : match.awayTeam.awayScoresFirstInnings || ""
        }
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />

      <div className="ml-32">
        <PlayerStatsSingleTeamOnlyClassic
          Team={clubTeam}
          height={statsHeight}
          delay={statsDelay}
          maxPlayersPerStat={2}
          showBatting={true}
          showBowling={false}
        />
      </div>

      <Horizontal_SingleTeam_LogoWithName_ScoreClassic
        type={match.type}
        Team={oppositionTeam}
        TeamLogo={isHomeTeam ? match.teamAwayLogo : match.teamHomeLogo}
        firstInningsScore={
          isHomeTeam
            ? match.awayTeam.awayScoresFirstInnings || ""
            : match.homeTeam.homeScoresFirstInnings || ""
        }
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
          marginTop: "10px",
        }}
      />

      <div className="ml-32">
        <PlayerStatsSingleTeamOnlyClassic
          Team={clubTeam}
          height={statsHeight}
          delay={statsDelay}
          maxPlayersPerStat={2}
          showBatting={false}
          showBowling={true}
        />
      </div>
    </div>
  );
};

export default MatchCardClassicClubOnly;
