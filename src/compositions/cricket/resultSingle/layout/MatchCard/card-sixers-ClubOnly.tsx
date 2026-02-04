import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import MatchHeader from "../Sections/MatchHeader/index";
import { SingleDataPointHeader } from "../../../results/layout/Sections/MatchHeader/SingleDataPointHeader";
import { Horizontal_SingleTeam_LogoWithName_Score } from "../../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score";
import { ResultStatementClassic } from "../Sections/ResultStatement/index";
import PlayerStatsSingleTeamOnly from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays, getClubTeamPlayers } from "./_utils/calculations";

const SixersMatchCardClubOnly: React.FC<MatchCardProps> = ({ match }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Get club team players
  const clubTeamPlayers = getClubTeamPlayers(match);

  // Determine which team is the club team
  const clubTeam = match.homeTeam.isClubTeam ? match.homeTeam : match.awayTeam.isClubTeam ? match.awayTeam : null;
  const oppositionTeam = match.homeTeam.isClubTeam ? match.awayTeam : match.awayTeam.isClubTeam ? match.homeTeam : null;

  if (!clubTeamPlayers || !clubTeam || !oppositionTeam) {
    return null; // Don't render if no club team found
  }

  // For single result, use full asset height available
  const rowHeight = heights.asset;
  const baseDelay = 0;

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay: calculatedBaseDelay, statsDelay, headerDelay } = calculateDelays(baseDelay);

  // Determine if club team is home or away
  const isHomeTeam = match.homeTeam.isClubTeam;

  // Extract optional result statement fields
  const { resultShort, resultSummary } = match;

  return (
    <div className={`${layout.borderRadius.container} w-auto mx-8 overflow-hidden h-full flex flex-col justify-center`}>


      {/* Match result and grade headers */}
      {/* Result statement - priority: resultSummary > resultShort */}
      <ResultStatementClassic
        resultShort={resultShort}
        resultSummary={resultSummary}
        height={headerHeight}
        delay={headerDelay}
      />
      <SingleDataPointHeader
        grade={match.gradeName}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
      />



      {/* Section 1: Team scores and names */}
      {/* Club team */}
      <Horizontal_SingleTeam_LogoWithName_Score
        type={match.type}
        Team={clubTeam}
        TeamLogo={isHomeTeam ? match.teamHomeLogo : match.teamAwayLogo}
        firstInningsScore={isHomeTeam
          ? (match.homeTeam.homeScoresFirstInnings || "")
          : (match.awayTeam.awayScoresFirstInnings || "")}
        delay={calculatedBaseDelay}
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
          maxPlayersPerStat={5}
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
        delay={calculatedBaseDelay}
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
          maxPlayersPerStat={5}
          showBatting={false}
          showBowling={true}
        />
      </div>



      {/* Match info footer */}
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

export default SixersMatchCardClubOnly;
