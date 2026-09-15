import React from "react";
import { Img } from "remotion";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";
import { isBatter, isBowler, type PlayerData } from "../_types/types";
import { csClass } from "../../utils/scoreline/componentStyles";
import { truncateText } from "./_utils/helpers";
import { getDefaultRestrictions } from "../controller/PlayerRow/_utils/helpers";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const NightSessionLeaderRow: React.FC<{
  player: PlayerData;
  rank: number;
  animation: ContainerAnimationConfig;
  animationDelay: number;
  exitAnimation: ContainerAnimationConfig;
  exitFrame: number;
}> = ({
  player,
  rank,
  animation,
  animationDelay,
  exitAnimation,
  exitFrame,
}) => {
  const { componentStyles } = useThemeContext();
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
        animation={animation}
        animationDelay={animationDelay}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
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
        <article className="leader-row">
          <div
            className="leader-mark leader-cell"
            data-has-crest={logoUrl ? "true" : "false"}
          >
            <span className="mark-fallback" aria-hidden />
            {logoUrl ? <Img src={logoUrl} alt="" /> : null}
          </div>
          <div className="leader-copy leader-cell">
            <p className="leader-name">{name}</p>
            <p className="leader-team">{team}</p>
          </div>
          {isBatter(player) ? (
            <p className="leader-figure">
              <span>{player.runs}</span>
              {player.notOut ? <span>*</span> : null}
              <span className="leader-balls">
                (<span>{player.balls}</span>)
              </span>
            </p>
          ) : null}
          {isBowler(player) ? (
            <p className="leader-figure">
              <span>{player.wickets}</span>/<span>{player.runs}</span>
              <span className="leader-overs">
                (<span>{player.overs}</span>)
              </span>
            </p>
          ) : null}
        </article>
      </AnimatedContainer>
    </div>
  );
};

export default NightSessionLeaderRow;
