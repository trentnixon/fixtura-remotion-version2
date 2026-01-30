import React from "react";
import { Horizontal_SingleTeam_LogoWithName_Score } from "../Sections/TeamsSection/index";
import SingleDataPointHeader from "../Sections/MatchHeader/SingleDataPointHeader";
import { PlayerStatsSingleTeamOnly } from "../Sections/PlayerStats/PlayerStats-SingleTeamOnly";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

const MatchCardClassicTwoColumn: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  return (
    <div className="w-full mx-0 overflow-hidden h-full flex flex-col justify-center ">
      <div>
        {/* Section 3: Match info footer */}
        <SingleDataPointHeader
          grade={`${match.result} | ${match.gradeName}`}
          height={headerHeight}
          delay={headerDelay}
          backgroundColor={"transparent"}
          align="right"
        />

        <div>
          <Horizontal_SingleTeam_LogoWithName_Score
            type={match.type}
            Team={match.homeTeam}
            TeamLogo={match.teamHomeLogo}
            firstInningsScore={match.homeTeam.homeScoresFirstInnings || ""}
            delay={baseDelay}
            outerContainer={{
              height: teamsHeight,
            }}
          />

          {/* Section 2: Player statistics */}
          <PlayerStatsSingleTeamOnly
            Team={match.homeTeam}
            height={statsHeight}
            delay={statsDelay}
            maxPlayersPerStat={2}
          />

          <Horizontal_SingleTeam_LogoWithName_Score
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

          <PlayerStatsSingleTeamOnly
            Team={match.awayTeam}
            height={statsHeight}
            delay={statsDelay}
            maxPlayersPerStat={2}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchCardClassicTwoColumn;
