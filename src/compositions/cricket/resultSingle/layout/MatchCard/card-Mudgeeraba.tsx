import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

import MatchStatus from "../Sections/MatchStatus/index";
import { Type_Round_Ground_stacked } from "../Sections/MatchHeader/index";
import { MatchCardProps } from "./_types/MatchCardProps";

import MudgeerabaSingleTeamHeader from "../Sections/MatchHeader/MudgeerabaSingleTeamHeader";
import PlayerStatsMudgeeraba from "../Sections/PlayerStats/PlayerStats-Mudgeeraba";
import { computePartialTwoDayVisibility } from "../Sections/PlayerStats/_utils/visibility";

const MatchCardMudgeeraba: React.FC<MatchCardProps> = ({ match }) => {
  const { animations } = useAnimationContext();

  const containerAnimation = animations.container.main.itemContainer;
  const baseDelay = 0;
  const homeHeaderDelay = baseDelay + 5;
  const homeStatsDelay = baseDelay + 10;
  const awayHeaderDelay = baseDelay + 20;
  const awayStatsDelay = baseDelay + 30;
  const headerDelay = baseDelay + 40;

  const statusHeight = 80;
  const teamHeaderHeight = 60;
  const statsHeight = 520;
  const matchHeaderHeight = 80;

  const homeBatted = (match.homeTeam.battingPerformances || []).length > 0;
  const awayBatted = (match.awayTeam.battingPerformances || []).length > 0;
  const visibility = computePartialTwoDayVisibility({
    matchType: match.type,
    matchStatus: match.status,
    homeBatted,
    awayBatted,
  });

  return (
    <AnimatedContainer
      type="full"
      className="rounded-none w-auto mx-6 overflow-hidden h-full flex flex-col"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={baseDelay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={250}
    >
      {/* Result at top – unchanged */}
      <MatchStatus
        status={match.status}
        result={match.result}
        height={statusHeight}
        delay={baseDelay}
      />

      {/* Home team – Mudgeeraba style (name, logo, score in angled bar) */}
      <MudgeerabaSingleTeamHeader
        team={match.homeTeam}
        teamLogo={match.teamHomeLogo}
        delay={homeHeaderDelay}
        outerContainer={{ height: teamHeaderHeight }}
      />

      {/* Home team stats – Mudgeeraba angled rows */}
      <div style={{ height: `${statsHeight / 2}px` }}>
        <PlayerStatsMudgeeraba
          Team={match.homeTeam}
          delay={homeStatsDelay}
          maxPlayersPerStat={3}
          showBatting={visibility.flags.homeShowBatting}
          showBowling={visibility.flags.homeShowBowling}
        />
      </div>

      {/* Away team – Mudgeeraba style */}
      <MudgeerabaSingleTeamHeader
        team={match.awayTeam}
        teamLogo={match.teamAwayLogo}
        delay={awayHeaderDelay}
        outerContainer={{ height: teamHeaderHeight }}
      />

      {/* Away team stats – Mudgeeraba angled rows */}
      <div style={{ height: `${statsHeight / 2}px` }}>
        <PlayerStatsMudgeeraba
          Team={match.awayTeam}
          delay={awayStatsDelay}
          maxPlayersPerStat={3}
          showBatting={visibility.flags.awayShowBatting}
          showBowling={visibility.flags.awayShowBowling}
        />
      </div>

      {/* Match info footer – stacked list, no truncation (like Basic/BrickWork) */}
      <Type_Round_Ground_stacked
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={matchHeaderHeight}
        delay={headerDelay}
        backgroundColor="transparent"
      />
    </AnimatedContainer>
  );
};

export default MatchCardMudgeeraba;
