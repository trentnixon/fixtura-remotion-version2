import React from "react";
import { Img } from "remotion";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";
import { isBatter, type PlayerData } from "../_types/types";
import { ScorelineCreaseMarkup } from "../../../../templates/variants/scoreline/components/crease/ScorelineCreaseMarkup";
import { csClass } from "../../utils/scoreline/componentStyles";
import { formatTop5Stats } from "../../utils/scoreline/top5/formatTop5Stats";
import { truncateText } from "./_utils/helpers";
import { getDefaultRestrictions } from "../controller/PlayerRow/_utils/helpers";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const ScorelineLeaderRow: React.FC<{
  player: PlayerData;
  rank: number;
  showCrease: boolean;
  animation: ContainerAnimationConfig;
  animationDelay: number;
  exitAnimation: ContainerAnimationConfig;
  exitFrame: number;
}> = ({
  player,
  rank,
  showCrease,
  animation,
  animationDelay,
  exitAnimation,
  exitFrame,
}) => {
  const { componentStyles } = useThemeContext();
  const restrictions = getDefaultRestrictions();
  const stats = formatTop5Stats(player);
  const name = truncateText(player.name, restrictions.nameLength);
  const team = truncateText(player.playedFor, restrictions.teamLength);
  const logoUrl = player.teamLogo?.url;
  const hasName = Boolean(name.trim());

  return (
    <div className="leader-entry" data-empty={hasName ? "false" : "true"}>
      <AnimatedContainer
        type="full"
        size="auto"
        className={csClass(componentStyles, "scorelineAnimatedItem")}
        backgroundColor="none"
        animation={animation}
        animationDelay={animationDelay}
        exitAnimation={exitAnimation}
        exitFrame={exitFrame}
      >
        <article className="leader-row">
          <span className="leader-rank" aria-hidden>
            {rank}
          </span>
          <div
            className="leader-mark"
            data-has-crest={logoUrl ? "true" : "false"}
          >
            <span className="mark-fallback" aria-hidden />
            {logoUrl ? <Img src={logoUrl} alt="" /> : null}
          </div>
          <div className="leader-copy">
            <p className="leader-name">{name}</p>
            <div className="leader-team-block">
              <span className="leader-team-label">Played for</span>
              <p className="leader-team">{team}</p>
            </div>
          </div>
          <div className="leader-stats">
            {stats.figureLabel ? (
              <span className="leader-figure-label">{stats.figureLabel}</span>
            ) : null}
            <p className="leader-figure">
              {stats.main}
              {stats.suffix && stats.suffixClassName ? (
                <span className={stats.suffixClassName}>{stats.suffix}</span>
              ) : null}
            </p>
            {isBatter(player) ? (
              <p
                className="leader-sr"
                data-empty={stats.subline ? "false" : "true"}
              >
                SR{" "}
                <span>
                  {stats.subline ? stats.subline.replace(/^SR\s+/, "") : "0"}
                </span>
              </p>
            ) : null}
          </div>
        </article>
      </AnimatedContainer>
      {showCrease ? (
        <div className="leader-crease" aria-hidden>
          <ScorelineCreaseMarkup />
        </div>
      ) : null}
    </div>
  );
};

export default ScorelineLeaderRow;
