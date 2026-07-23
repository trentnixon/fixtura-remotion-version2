import React from "react";
import { Horizontal_SingleTeam_LogoWithName_ScoreClassic } from "../Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score-Classic";
import SingleDataPointHeader from "../Sections/MatchHeader/SingleDataPointHeader";
import { PlayerStatsSingleTeamOnlyClassic } from "../Sections/PlayerStats/PlayerStats-SingleTeamOnly-Classic";
import { MatchCardProps } from "./_types/MatchCardProps";
import {
  calculateSectionHeights,
  calculateDelays,
} from "./_utils/calculations";

const MatchCardClassic: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const { teamsHeight, statsHeight, headerHeight } =
    calculateSectionHeights(rowHeight);
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  return (
    <div className="w-auto mx-8 overflow-hidden h-full">
      <SingleDataPointHeader
        grade={`${match.result} | ${match.gradeName}`}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
      />

      <Horizontal_SingleTeam_LogoWithName_ScoreClassic
        type={match.type}
        Team={match.homeTeam}
        TeamLogo={match.teamHomeLogo}
        firstInningsScore={match.homeTeam.homeScoresFirstInnings || ""}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />

      <PlayerStatsSingleTeamOnlyClassic
        Team={match.homeTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
      />

      <Horizontal_SingleTeam_LogoWithName_ScoreClassic
        type={match.type}
        Team={match.awayTeam}
        firstInningsScore={match.awayTeam.awayScoresFirstInnings || ""}
        TeamLogo={match.teamAwayLogo}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
          marginTop: "10px",
        }}
      />

      <PlayerStatsSingleTeamOnlyClassic
        Team={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
      />
    </div>
  );
};

export default MatchCardClassic;
