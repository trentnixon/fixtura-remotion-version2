import React from "react";
import { Img } from "remotion";
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

const NightSessionFixtureAnim: React.FC<{
  animationIn: ContainerAnimationConfig;
  animationOut: ContainerAnimationConfig;
  animationDelay: number;
  animationOutFrame: number;
  className?: string;
  children: React.ReactNode;
}> = ({
  animationIn,
  animationOut,
  animationDelay,
  animationOutFrame,
  className = "w-full min-w-0",
  children,
}) => (
  <AnimatedContainer
    type="full"
    size="auto"
    className={className}
    backgroundColor="none"
    animation={animationIn}
    animationDelay={animationDelay}
    exitAnimation={animationOut}
    exitFrame={animationOutFrame}
  >
    {children}
  </AnimatedContainer>
);

const NightSessionOpponentSide: React.FC<{
  side: "home" | "away";
  sideLabel: string;
  teamName: string;
  logoUrl?: string;
  isClubTeam: boolean;
}> = ({ side, sideLabel, teamName, logoUrl, isClubTeam }) => {
  const hasCrest = Boolean(logoUrl?.trim());

  return (
    <div className={`fixture-side fixture-side--${side} gap-2`}>
      <div
        className={`fixture-opponent__cell fixture-opponent__cell--mark team-mark team-band team-band--${side}`}
        data-has-crest={hasCrest ? "true" : "false"}
      >
        <span className="mark-fallback" aria-hidden />
        {hasCrest ? <Img src={logoUrl!} alt="" /> : null}
      </div>
      <span className="team-side-label">{sideLabel}</span>
      <p
        className={`team-name fixture-opponent__cell fixture-opponent__cell--name team-band team-band--${side}`}
        data-club-team={isClubTeam ? "true" : "false"}
      >
        {teamName}
      </p>
    </div>
  );
};

export const GameCardNightSession: React.FC<GameCardProps> = ({
  game,
  index,
}) => {
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
  const gradeLabel = game.gradeName?.trim() ?? "";
  const venue = dedupeVenueLabel(game.ground);
  const roundLabel = game.round?.trim() ?? "";
  const ageLabel = game.ageGroup?.trim() ?? "";
  const timeLabel = game.time?.trim() ?? "";

  return (
    <section className="fixture-card fixture-unit">
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
        <NightSessionFixtureAnim
          animationIn={innerAnimation.containerIn}
          animationOut={innerAnimation.containerOut}
          animationDelay={calculateScorelineInnerDelay(rowDelay, "grade")}
          animationOutFrame={animationOutFrame}
        >
          <header
            className="fixture-unit__rail"
            data-empty={gradeLabel ? "false" : "true"}
          >
            <h2 className="fixture-grade-name">{gradeLabel}</h2>
          </header>
        </NightSessionFixtureAnim>

        <div className="fixture-unit__frame gap-2">
          <NightSessionFixtureAnim
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={calculateScorelineInnerDelay(rowDelay, "centre")}
            animationOutFrame={animationOutFrame}
          >
            <div className="schedule-bridge">
              <div className="schedule-bridge__rule" aria-hidden />
              <div className="schedule-lockup">
                <p className="fixture-date">{game.date}</p>
                <p
                  className="fixture-time"
                  data-empty={timeLabel ? "false" : "true"}
                >
                  {timeLabel}
                </p>
              </div>
            </div>
          </NightSessionFixtureAnim>

          <NightSessionFixtureAnim
            animationIn={secondaryAnimation.containerIn}
            animationOut={secondaryAnimation.containerOut}
            animationDelay={calculateScorelineInnerDelay(rowDelay, "home")}
            animationOutFrame={animationOutFrame}
          >
            <div className="fixture-opponents gap-2">
              <NightSessionOpponentSide
                side="home"
                sideLabel="Home"
                teamName={game.teamHome}
                logoUrl={game.teamHomeLogo?.url}
                isClubTeam={homeIsClub}
              />
              <div className="fixture-opponents__spine" aria-hidden />
              <NightSessionOpponentSide
                side="away"
                sideLabel="Away"
                teamName={game.teamAway}
                logoUrl={game.teamAwayLogo?.url}
                isClubTeam={awayIsClub}
              />
            </div>
          </NightSessionFixtureAnim>

          <NightSessionFixtureAnim
            animationIn={secondaryAnimation.containerIn}
            animationOut={secondaryAnimation.containerOut}
            animationDelay={calculateScorelineInnerDelay(rowDelay, "context")}
            animationOutFrame={animationOutFrame}
          >
            <div className="match-context gap-2">
              <p className="context-left">
                <span>{game.type}</span>
                <span className="context-separator" aria-hidden />
                <span>{roundLabel}</span>
                <span className="context-separator" aria-hidden />
                <span>{ageLabel}</span>
              </p>
              <p className="context-venue">{venue}</p>
            </div>
          </NightSessionFixtureAnim>
        </div>

        <div className="fixture-close" aria-hidden>
          <span className="fixture-close__rule" />
        </div>
      </AnimatedContainer>
    </section>
  );
};

export default GameCardNightSession;
