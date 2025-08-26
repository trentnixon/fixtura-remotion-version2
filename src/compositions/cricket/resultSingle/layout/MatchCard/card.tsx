import React from "react";
import { MatchResult } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

// Import sections for match layout
import PlayerStats from "../Sections/PlayerStats/index";
import MatchHeader from "../Sections/MatchHeader/index";
import MatchStatus from "../Sections/MatchStatus/index";
import { LogoWithScoreOverName } from "../Sections/TeamsSection/LogoWithScoreOverName";

interface MatchCardProps {
  match: MatchResult;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
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
  const statusHeight = 80; // Fixed height for status
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
      {/* Match status (result info) */}
      <MatchStatus
        status={match.status}
        result={match.result}
        height={statusHeight}
        delay={baseDelay}
      />
      {/* Teams section with logos, names and scores */}
      <LogoWithScoreOverName
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        height={teamsHeight}
        delay={teamsSectionDelay}
      />

      {/* Player statistics */}
      <PlayerStats
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={3} // Show more player stats for single match view
        matchType={match.type}
        matchStatus={match.status}
      />

      {/* Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
      />
    </AnimatedContainer>
  );
};

export default MatchCard;
