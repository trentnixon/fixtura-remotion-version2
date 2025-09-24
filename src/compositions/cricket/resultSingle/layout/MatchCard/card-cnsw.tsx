import React from "react";
import { MatchResult } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

// Import sections for match layout
import { SingleDataPointHeader } from "../../../results/layout/Sections/MatchHeader/SingleDataPointHeader";
import PlayerStatsSingleTeamOnly from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";
import Horizontal_SingleTeam_CNSW from "../../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_CNSW";
import Round_Ground from "../Sections/MatchHeader/Round_Ground";

interface MatchCardProps {
  match: MatchResult;
}

const CNSWMatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { animations } = useAnimationContext();

  // Animation setup
  const containerAnimation = animations.container.main.itemContainer;
  const baseDelay = 0;
  const teamsSectionDelay = baseDelay + 5;
  const statsDelay = teamsSectionDelay + 5;
  const headerDelay = statsDelay + 5;

  // Calculate section heights for a more detailed single match display
  // More space for team info and player stats since we're showing only one match
  const headerHeight = 80; // Fixed height for header
  const teamsHeight = 240; // More space for team info
  const statsHeight = 560; // More space for player stats

  return (
    <AnimatedContainer
      type="full"
      className="rounded-lg w-auto mx-8 overflow-hidden h-full"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={baseDelay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={250} // Adjust based on your needs
    >
      {/* Section 3: Match info footer */}

      <SingleDataPointHeader
        grade={match.result}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
        variant="onBackgroundMain"
      />

      <SingleDataPointHeader
        grade={match.gradeName}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
        variant="onBackgroundMain"
      />
      <Horizontal_SingleTeam_CNSW
        type={match.type}
        Team={match.homeTeam}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />
      {/* Section 2: Player statistics */}
      <div className="mx-4">
        <PlayerStatsSingleTeamOnly
          Team={match.homeTeam}
          height={statsHeight}
          delay={statsDelay}
          maxPlayersPerStat={3}
        />
      </div>
      <Horizontal_SingleTeam_CNSW
        type={match.type}
        Team={match.awayTeam}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
          marginTop: "10px",
        }}
      />

      <div className="mx-4">
        <PlayerStatsSingleTeamOnly
          Team={match.awayTeam}
          height={statsHeight}
          delay={statsDelay}
          maxPlayersPerStat={3}
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
        variant="onBackgroundMain"
        className="py-0 px-6"
      />
    </AnimatedContainer>
  );
};

export default CNSWMatchCard;
