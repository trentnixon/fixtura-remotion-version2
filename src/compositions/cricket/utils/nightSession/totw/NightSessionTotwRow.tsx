import React, { useMemo } from "react";
import { Img } from "remotion";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../../components/containers/animations";
import type { TeamOfTheWeekPlayer } from "../../../TeamOfTheWeek/types";
import { csClass } from "../../scoreline/componentStyles";
import {
  formatTotwStats,
  getTotwRoleLabel,
  resolveTotwTeamName,
} from "../../scoreline/totw/formatTotwStats";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionAnimatedCopy } from "../NightSessionAnimatedCopy";
import type { NightSessionRowEnterTiming } from "../nightSessionEnterTiming";
import { formatRosterPlayerName } from "../roster/formatRosterPlayerName";
import { NightSessionInnerEnterAnim } from "../NightSessionInnerEnterAnim";
import {
  withNightSessionFixtureInnerDistance,
  withNightSessionFixtureRowDistance,
} from "../nightSessionFixtureAnimation";

export const NightSessionTotwRow: React.FC<{
  player: TeamOfTheWeekPlayer;
  rank: number;
  rowIndex: number;
  animation: ContainerAnimationConfig;
  animationDelay: number;
  exitAnimation: ContainerAnimationConfig;
  exitFrame: number;
  enterTiming: NightSessionRowEnterTiming;
}> = ({
  player,
  rank,
  rowIndex,
  animation,
  animationDelay,
  exitAnimation,
  enterTiming,
}) => {
  const { componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const innerAnimation = animations.container.main.itemContainerInner;
  const statsAnimation = animations.container.main.itemContainerSecondary;
  const rowExitFrame = enterTiming.rowExitFrameForIndex(rowIndex);
  const rowEnter = useMemo(
    () => withNightSessionFixtureRowDistance(animation),
    [animation],
  );
  const rowExit = useMemo(
    () => withNightSessionFixtureRowDistance(exitAnimation),
    [exitAnimation],
  );
  const copyEnter = useMemo(
    () => withNightSessionFixtureInnerDistance(innerAnimation.containerIn),
    [innerAnimation.containerIn],
  );
  const copyExit = useMemo(
    () => withNightSessionFixtureInnerDistance(innerAnimation.containerOut),
    [innerAnimation.containerOut],
  );
  const statsEnter = useMemo(
    () => withNightSessionFixtureInnerDistance(statsAnimation.containerIn),
    [statsAnimation.containerIn],
  );
  const statsExit = useMemo(
    () => withNightSessionFixtureInnerDistance(statsAnimation.containerOut),
    [statsAnimation.containerOut],
  );
  const stats = formatTotwStats(player);
  const logoUrl = player.club?.logo?.url;
  const rawName = player.player?.trim() ?? "";
  const playerName = formatRosterPlayerName(rawName);
  const hasName = Boolean(playerName);
  const teamName = resolveTotwTeamName(player);

  return (
    <div
      className="totw-entry"
      data-empty={hasName ? "false" : "true"}
      data-rank={rank}
    >
      <AnimatedContainer
        type="full"
        size="auto"
        className={csClass(componentStyles, "nightSessionAnimatedItem")}
        backgroundColor="none"
        animation={rowEnter}
        animationDelay={animationDelay}
        exitAnimation={rowExit}
        exitFrame={rowExitFrame}
      >
        <NightSessionInnerEnterAnim
          animationIn={innerAnimation.containerIn}
          animationOut={innerAnimation.containerOut}
          animationDelay={enterTiming.innerDelay(animationDelay, "grade")}
          exitFrame={rowExitFrame}
          className="totw-role-rail totw-cell w-full min-w-0"
        >
          <span className="totw-role">{getTotwRoleLabel(player)}</span>
        </NightSessionInnerEnterAnim>
        <article className="totw-row gap-2">
          <NightSessionInnerEnterAnim
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(animationDelay, "mark")}
            exitFrame={rowExitFrame}
            className="totw-mark min-h-0"
          >
            <div
              className="totw-mark__surface"
              data-has-crest={logoUrl ? "true" : "false"}
            >
              <span className="mark-fallback" aria-hidden />
              {logoUrl ? <Img src={logoUrl} alt="" /> : null}
            </div>
          </NightSessionInnerEnterAnim>
          <NightSessionAnimatedCopy
            className="totw-copy totw-cell"
            animationIn={copyEnter}
            animationOut={copyExit}
            animationDelay={enterTiming.innerDelay(animationDelay, "team")}
            exitFrame={rowExitFrame}
          >
            <p className="totw-name" title={playerName}>
              {playerName}
            </p>
            <div className="totw-team-block">
              <span className="totw-team-label">Played for</span>
              <p className="totw-team">{teamName}</p>
            </div>
          </NightSessionAnimatedCopy>
          <NightSessionAnimatedCopy
            className="totw-stats totw-cell"
            animationIn={statsEnter}
            animationOut={statsExit}
            animationDelay={enterTiming.innerDelay(animationDelay, "stats")}
            exitFrame={rowExitFrame}
          >
            <p className="totw-figure">
              <span>{stats.main}</span>
              {stats.suffix ? (
                <span className="totw-balls">{stats.suffix}</span>
              ) : null}
            </p>
            <p
              className="totw-subline"
              data-empty={stats.subline ? "false" : "true"}
            >
              {stats.subline}
            </p>
          </NightSessionAnimatedCopy>
        </article>
      </AnimatedContainer>
    </div>
  );
};

export default NightSessionTotwRow;
