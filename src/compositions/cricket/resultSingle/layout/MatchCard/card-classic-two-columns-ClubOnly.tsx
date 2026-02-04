import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

// Import sections for match layout
import MatchHeader from "../Sections/MatchHeader/index";
import { SingleDataPointHeader } from "../../../results/layout/Sections/MatchHeader/SingleDataPointHeader";
import { Horizontal_SingleTeam_LogoWithName_Score } from "../../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score";
import PlayerStatsSingleTeamOnly from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";
import { MatchCardProps } from "./_types/MatchCardProps";
import { getClubTeamPlayers } from "./_utils/calculations";

const ClassicTwoColumnsMatchCardClubOnly: React.FC<MatchCardProps> = ({ match }) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();

  // Animation setup
  const containerAnimation = animations.container.main.itemContainer;
  const baseDelay = 0;
  const teamsSectionDelay = baseDelay + 5;
  const statsDelay = teamsSectionDelay + 5;
  const headerDelay = statsDelay + 5;

  // Calculate section heights for single match display
  const headerHeight = 80;
  const teamsHeight = 240;
  const statsHeight = 560;

  // Get club team and opposition team
  const clubTeamPlayers = getClubTeamPlayers(match);
  const isHomeTeam = match.homeTeam.isClubTeam;
  const clubTeam = isHomeTeam ? match.homeTeam : match.awayTeam;
  const oppositionTeam = isHomeTeam ? match.awayTeam : match.homeTeam;

  if (!clubTeamPlayers || !clubTeam) {
    return null; // Don't render if no club team found
  }

  // Extract optional result statement fields
  //const { resultShort, resultSummary } = match;

  return (
    <AnimatedContainer
      type="full"
      className={`${layout.borderRadius.container} w-auto mx-8 overflow-hidden h-full flex flex-col justify-center`}
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={baseDelay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={250}
    >

      <SingleDataPointHeader
        grade={match.gradeName}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
      />

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
      <PlayerStatsSingleTeamOnly
        Team={clubTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={5}
        showBatting={true}
        showBowling={false}
      />

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
      <PlayerStatsSingleTeamOnly
        Team={clubTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={5}
        showBatting={false}
        showBowling={true}
      />

      {/* Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        className={layout.borderRadius.container}
      />
    </AnimatedContainer>
  );
};

export default ClassicTwoColumnsMatchCardClubOnly;
