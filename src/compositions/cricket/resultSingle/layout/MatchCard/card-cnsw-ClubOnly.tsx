import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SingleDataPointHeader } from "../../../results/layout/Sections/MatchHeader/SingleDataPointHeader";
import PlayerStatsSingleTeamOnly from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";
import Horizontal_SingleTeam_CNSW from "../../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_CNSW";
import Round_Ground from "../Sections/MatchHeader/Round_Ground";
import { MatchCardProps } from "./_types/MatchCardProps";
import { getClubTeamPlayers } from "./_utils/calculations";

const CNSWMatchCardClubOnly: React.FC<MatchCardProps> = ({ match }) => {
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
      {/* Match result and grade headers */}
      <SingleDataPointHeader
        grade={match.result}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
        variant="onContainerCopyNoBg"
      />

      <SingleDataPointHeader
        grade={match.gradeName}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
        variant="onContainerCopyNoBg"
      />

      {/* Club team */}
      <Horizontal_SingleTeam_CNSW
        type={match.type}
        Team={clubTeam}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />

      {/* Club team batting statistics */}
      <div className="mx-4">
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
      <Horizontal_SingleTeam_CNSW
        type={match.type}
        Team={oppositionTeam}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
          marginTop: "10px",
        }}
      />

      {/* Club team bowling statistics */}
      <div className="mx-4">
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
      <Round_Ground
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        userBackgroundColor={"transparent"}
        variant="onContainerCopyNoBg"
        className="py-0 px-6"
      />
    </AnimatedContainer>
  );
};

export default CNSWMatchCardClubOnly;
