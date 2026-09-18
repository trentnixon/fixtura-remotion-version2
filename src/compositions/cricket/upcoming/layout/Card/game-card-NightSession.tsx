import React, { useMemo } from "react";
import { Img } from "remotion";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import type { ContainerAnimationConfig } from "../../../../../components/containers/animations";
import { GameCardProps } from "./_types/GameCardProps";
import { calculateAnimationOutFrame } from "./_utils/calculations";
import { useNightSessionRowEnterTiming } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { dedupeVenueLabel } from "../../../utils/scoreline/results/dedupeVenueLabel";
import { resolveScorelineUpcomingClubSides } from "../../../utils/scoreline/fixture/resolveScorelineUpcomingClubSides";
import {
  NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX,
  NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX,
} from "../../../utils/nightSession/nightSessionAnimationTiming";

const withFixtureInnerDistance = (
  config: ContainerAnimationConfig,
): ContainerAnimationConfig => ({
  ...config,
  custom: { distance: NIGHT_SESSION_FIXTURE_INNER_ENTER_DISTANCE_PX },
});

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
}) => {
  const enter = useMemo(
    () => withFixtureInnerDistance(animationIn),
    [animationIn],
  );
  const exit = useMemo(
    () => withFixtureInnerDistance(animationOut),
    [animationOut],
  );

  return (
    <AnimatedContainer
      type="full"
      size="auto"
      className={className}
      backgroundColor="none"
      animation={enter}
      animationDelay={animationDelay}
      exitAnimation={exit}
      exitFrame={animationOutFrame}
    >
      {children}
    </AnimatedContainer>
  );
};

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

  const enterTiming = useNightSessionRowEnterTiming();
  const rowDelay = enterTiming.rowDelayForIndex(index);
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

  const fixtureRowEnter = useMemo(
    () => ({
      ...rowAnimation.containerIn,
      custom: { distance: NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX },
    }),
    [rowAnimation.containerIn],
  );
  const fixtureRowExit = useMemo(
    () => ({
      ...rowAnimation.containerOut,
      custom: { distance: NIGHT_SESSION_FIXTURE_ROW_ENTER_DISTANCE_PX },
    }),
    [rowAnimation.containerOut],
  );

  return (
    <section className="fixture-card fixture-unit">
      <AnimatedContainer
        type="full"
        size="auto"
        className="flex min-h-0 w-full flex-col rounded-none"
        backgroundColor="none"
        animation={fixtureRowEnter}
        animationDelay={rowDelay}
        exitAnimation={fixtureRowExit}
        exitFrame={animationOutFrame}
      >
        <div className="fixture-unit__frame gap-2">
          <NightSessionFixtureAnim
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(rowDelay, "home")}
            animationOutFrame={animationOutFrame}
          >
            <div className="schedule-bridge">
              <div className="schedule-bridge__rule" aria-hidden />
              <div className="schedule-lockup">
                <h2
                  className="fixture-grade-name"
                  data-empty={gradeLabel ? "false" : "true"}
                >
                  {gradeLabel}
                </h2>
                <p
                  className="fixture-time"
                  data-empty={timeLabel ? "false" : "true"}
                >
                  {timeLabel}
                </p>
                <p className="fixture-date">{game.date}</p>
              </div>
            </div>
          </NightSessionFixtureAnim>

          <NightSessionFixtureAnim
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(rowDelay, "centre")}
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
            animationDelay={enterTiming.innerDelay(rowDelay, "context")}
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
