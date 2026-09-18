import React, { useMemo } from "react";
import { Img } from "remotion";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";
import { isBatter, isBowler, type PlayerData } from "../_types/types";
import { csClass } from "../../utils/scoreline/componentStyles";
import { truncateText } from "./_utils/helpers";
import { getDefaultRestrictions } from "../controller/PlayerRow/_utils/helpers";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { NightSessionAnimatedCopy } from "../../utils/nightSession/NightSessionAnimatedCopy";
import type { NightSessionRowEnterTiming } from "../../utils/nightSession/nightSessionEnterTiming";
import { NightSessionInnerEnterAnim } from "../../utils/nightSession/NightSessionInnerEnterAnim";
import {
  withNightSessionFixtureInnerDistance,
  withNightSessionFixtureRowDistance,
} from "../../utils/nightSession/nightSessionFixtureAnimation";

export const NightSessionLeaderRow: React.FC<{
  player: PlayerData;
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
  exitFrame,
  enterTiming,
}) => {
  const rowExitFrame = enterTiming.rowExitFrameForIndex(rowIndex);
  const { componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const innerAnimation = animations.container.main.itemContainerInner;
  const statsAnimation = animations.container.main.itemContainerSecondary;
  const rowEnter = useMemo(
    () => withNightSessionFixtureRowDistance(animation),
    [animation],
  );
  const rowExit = useMemo(
    () => withNightSessionFixtureRowDistance(exitAnimation),
    [exitAnimation],
  );
  const statsEnter = useMemo(
    () => withNightSessionFixtureInnerDistance(statsAnimation.containerIn),
    [statsAnimation.containerIn],
  );
  const statsExit = useMemo(
    () => withNightSessionFixtureInnerDistance(statsAnimation.containerOut),
    [statsAnimation.containerOut],
  );
  const copyEnter = useMemo(
    () => withNightSessionFixtureInnerDistance(innerAnimation.containerIn),
    [innerAnimation.containerIn],
  );
  const copyExit = useMemo(
    () => withNightSessionFixtureInnerDistance(innerAnimation.containerOut),
    [innerAnimation.containerOut],
  );
  const restrictions = getDefaultRestrictions();
  const name = truncateText(player.name, restrictions.nameLength);
  const team = truncateText(player.playedFor, restrictions.teamLength);
  const logoUrl = player.teamLogo?.url;
  const hasName = Boolean(name.trim());

  return (
    <div
      className="leader-entry leader-unit"
      data-empty={hasName ? "false" : "true"}
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
          className="leader-rank-bridge-wrap w-full min-w-0"
        >
          <div className="leader-rank-bridge schedule-bridge">
            <div className="schedule-bridge__rule" aria-hidden />
            <span
              className="leader-rank leader-rank-tag schedule-lockup"
              aria-hidden
            >
              {rank}
            </span>
          </div>
        </NightSessionInnerEnterAnim>
        <article className="leader-row">
          <NightSessionInnerEnterAnim
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(animationDelay, "mark")}
            exitFrame={rowExitFrame}
            className="leader-mark leader-cell min-h-0"
          >
            <div
              className="leader-mark__surface"
              data-has-crest={logoUrl ? "true" : "false"}
            >
              <span className="mark-fallback" aria-hidden />
              {logoUrl ? <Img src={logoUrl} alt="" /> : null}
            </div>
          </NightSessionInnerEnterAnim>
          <NightSessionAnimatedCopy
            className="leader-copy leader-cell"
            animationIn={copyEnter}
            animationOut={copyExit}
            animationDelay={enterTiming.innerDelay(animationDelay, "team")}
            exitFrame={rowExitFrame}
          >
            <p className="leader-name">{name}</p>
            <p className="leader-team">{team}</p>
          </NightSessionAnimatedCopy>
          {isBatter(player) ? (
            <NightSessionAnimatedCopy
              className="leader-figure"
              animationIn={statsEnter}
              animationOut={statsExit}
              animationDelay={enterTiming.innerDelay(animationDelay, "stats")}
              exitFrame={rowExitFrame}
            >
              <span>{player.runs}</span>
              {player.notOut ? <span>*</span> : null}
              <span className="leader-balls">
                (<span>{player.balls}</span>)
              </span>
            </NightSessionAnimatedCopy>
          ) : null}
          {isBowler(player) ? (
            <NightSessionAnimatedCopy
              className="leader-figure"
              animationIn={statsEnter}
              animationOut={statsExit}
              animationDelay={enterTiming.innerDelay(animationDelay, "stats")}
              exitFrame={rowExitFrame}
            >
              <span>{player.wickets}</span>/<span>{player.runs}</span>
              <span className="leader-overs">
                (<span>{player.overs}</span>)
              </span>
            </NightSessionAnimatedCopy>
          ) : null}
        </article>
      </AnimatedContainer>
    </div>
  );
};

export default NightSessionLeaderRow;
