import React from "react";
import { MatchResult } from "../../types";

import { Horizontal_SingleTeam_LogoWithName_Score } from "../Sections/TeamsSection/index";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import SingleDataPointHeader from "../Sections/MatchHeader/SingleDataPointHeader";
import { PlayerStatsSingleTeamOnly } from "../Sections/PlayerStats/PlayerStats-SingleTeamOnly";

interface MatchCardProps {
  match: MatchResult;
  index: number;
  rowHeight: number;
  delay: number;
}

const MatchCardClassicTwoColumn: React.FC<MatchCardProps> = ({
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
        {/* Section 1: Team scores and names */}
        {match.status === "Abandoned" ? (
          <div className="mt-8">
            <MatchStatus
              status={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
              result={match.result}
              delay={headerDelay}
              outerContainer={{
                background:
                  selectedPalette.container.backgroundTransparent.high,
                height: headerHeight,
              }}
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MatchCardClassicTwoColumn;
