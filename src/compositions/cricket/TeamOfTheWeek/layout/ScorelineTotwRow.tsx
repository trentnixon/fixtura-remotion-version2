import React from "react";
import { Img } from "remotion";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";
import type { TeamOfTheWeekPlayer } from "../types";
import { csClass } from "../../utils/scoreline/componentStyles";
import {
  formatTotwStats,
  getTotwRoleLabel,
  resolveTotwTeamName,
} from "../../utils/scoreline/totw/formatTotwStats";
import { useThemeContext } from "../../../../core/context/ThemeContext";

export const ScorelineTotwRow: React.FC<{
  player: TeamOfTheWeekPlayer;
  animation: ContainerAnimationConfig;
  animationDelay: number;
  exitAnimation: ContainerAnimationConfig;
  exitFrame: number;
}> = ({
  player,
  animation,
  animationDelay,
  exitAnimation,
  exitFrame,
}) => {
  const { componentStyles } = useThemeContext();
  const stats = formatTotwStats(player);
  const logoUrl = player.club?.logo?.url;
  const playerName = player.player?.trim() ?? "";
  const hasName = Boolean(playerName);
  const teamName = resolveTotwTeamName(player);

  return (
    <div className="totw-entry" data-empty={hasName ? "false" : "true"}>
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
        <article className="totw-row">
          <div
            className="totw-mark"
            data-has-crest={logoUrl ? "true" : "false"}
          >
            <span className="mark-fallback" aria-hidden />
            {logoUrl ? <Img src={logoUrl} alt="" /> : null}
          </div>
          <div className="totw-copy">
            <span className="totw-role">{getTotwRoleLabel(player)}</span>
            <p className="totw-name" title={playerName}>
              {playerName}
            </p>
            <div className="totw-team-block">
              <span className="totw-team-label">Played for</span>
              <p className="totw-team">{teamName}</p>
            </div>
          </div>
          <div className="totw-stats">
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
          </div>
        </article>
      </AnimatedContainer>
    </div>
  );
};

export default ScorelineTotwRow;
