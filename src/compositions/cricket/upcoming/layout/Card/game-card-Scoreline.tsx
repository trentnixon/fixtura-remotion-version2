import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import type { ContainerAnimationConfig } from "../../../../../components/containers/animations";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  calculateScorelineInnerDelay,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import { dedupeVenueLabel } from "../../../utils/scoreline/results/dedupeVenueLabel";
import { resolveScorelineUpcomingClubSides } from "../../../utils/scoreline/fixture/resolveScorelineUpcomingClubSides";
import {
  ScorelineFixtureCentre,
  ScorelineFixtureGrade,
  ScorelineFixtureTeamBand,
} from "../../../utils/scoreline/fixture/ScorelineFixturePrimitives";

const ScorelineFixtureMatchupCell: React.FC<{
  animationIn: ContainerAnimationConfig;
  animationOut: ContainerAnimationConfig;
  animationDelay: number;
  animationOutFrame: number;
  children: React.ReactNode;
}> = ({
  animationIn,
  animationOut,
  animationDelay,
  animationOutFrame,
  children,
}) => (
  <div className="fixture-matchup__cell">
    <AnimatedContainer
      type="full"
      size="full"
      className="fixture-matchup__anim"
      backgroundColor="none"
      animation={animationIn}
      animationDelay={animationDelay}
      exitAnimation={animationOut}
      exitFrame={animationOutFrame}
    >
      {children}
    </AnimatedContainer>
  </div>
);

export const GameCardScoreline: React.FC<GameCardProps> = ({ game, index }) => {
  const { data, club } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const rowAnimation = animations.container.main.itemContainer;
  const innerAnimation = animations.container.main.itemContainerInner;
  const secondaryAnimation = animations.container.main.itemContainerSecondary;

  const rowDelay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const { homeIsClub, awayIsClub } = resolveScorelineUpcomingClubSides(
    game.teamHome,
    game.teamAway,
    club?.name,
  );

  return (
    <section className="fixture-card">
      <AnimatedContainer
        type="full"
        size="auto"
        className="flex w-full flex-col rounded-none"
        backgroundColor="none"
        animation={rowAnimation.containerIn}
        animationDelay={rowDelay}
        exitAnimation={rowAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <AnimatedContainer
          type="full"
          size="auto"
          className="w-full min-w-0"
          backgroundColor="none"
          animation={innerAnimation.containerIn}
          animationDelay={calculateScorelineInnerDelay(rowDelay, "grade")}
          exitAnimation={innerAnimation.containerOut}
          exitFrame={animationOutFrame}
        >
          <ScorelineFixtureGrade
            gradeName={game.gradeName}
            metaChips={[game.type, game.round ?? "", game.ageGroup ?? ""]}
          />
        </AnimatedContainer>
        <div className="fixture-matchup">
          <ScorelineFixtureMatchupCell
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={calculateScorelineInnerDelay(rowDelay, "home")}
            animationOutFrame={animationOutFrame}
          >
            <ScorelineFixtureTeamBand
              side="home"
              sideLabel="Home"
              teamName={game.teamHome}
              logoUrl={game.teamHomeLogo?.url}
              isClubTeam={homeIsClub}
            />
          </ScorelineFixtureMatchupCell>
          <ScorelineFixtureMatchupCell
            animationIn={secondaryAnimation.containerIn}
            animationOut={secondaryAnimation.containerOut}
            animationDelay={calculateScorelineInnerDelay(rowDelay, "centre")}
            animationOutFrame={animationOutFrame}
          >
            <ScorelineFixtureCentre
              date={game.date}
              time={game.time ?? ""}
              ground={dedupeVenueLabel(game.ground)}
            />
          </ScorelineFixtureMatchupCell>
          <ScorelineFixtureMatchupCell
            animationIn={secondaryAnimation.containerIn}
            animationOut={secondaryAnimation.containerOut}
            animationDelay={calculateScorelineInnerDelay(rowDelay, "away")}
            animationOutFrame={animationOutFrame}
          >
            <ScorelineFixtureTeamBand
              side="away"
              sideLabel="Away"
              teamName={game.teamAway}
              logoUrl={game.teamAwayLogo?.url}
              isClubTeam={awayIsClub}
            />
          </ScorelineFixtureMatchupCell>
        </div>
      </AnimatedContainer>
    </section>
  );
};

export default GameCardScoreline;
