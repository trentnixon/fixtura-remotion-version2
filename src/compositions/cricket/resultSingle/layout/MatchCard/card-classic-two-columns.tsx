import React from "react";
import { MatchResult } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

// Import sections for match layout
import MatchHeader from "../Sections/MatchHeader/index";
import { SingleDataPointHeader } from "../../../results/layout/Sections/MatchHeader/SingleDataPointHeader";
import { Horizontal_SingleTeam_LogoWithName_Score } from "../../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score";
import PlayerStatsSingleTeamOnly from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";

interface MatchCardProps {
  match: MatchResult;
}

const ClassicTwoColumnsMatchCard: React.FC<MatchCardProps> = ({ match }) => {
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
      className="rounded-lg w-auto mx-8 overflow-hidden h-full flex flex-col justify-center "
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
      />

      <SingleDataPointHeader
        grade={match.gradeName}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor={"transparent"}
        align="right"
      />
      <Horizontal_SingleTeam_LogoWithName_Score
        type={match.type}
        Team={match.homeTeam}
        TeamLogo={match.teamHomeLogo}
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
        maxPlayersPerStat={3}
      />
      <Horizontal_SingleTeam_LogoWithName_Score
        type={match.type}
        Team={match.awayTeam}
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
        maxPlayersPerStat={3}
      />

      {/* Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        className="rounded-lg"
      />
    </AnimatedContainer>
  );
};

export default ClassicTwoColumnsMatchCard;
