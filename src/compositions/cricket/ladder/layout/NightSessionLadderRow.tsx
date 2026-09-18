import React from "react";
import { Img } from "remotion";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations";
import type { TeamData } from "../types";
import { csClass } from "../../utils/scoreline/componentStyles";
import type { NightSessionRowEnterTiming } from "../../utils/nightSession/nightSessionEnterTiming";
import { parseTeamPosition } from "../controller/TeamRows/_utils/calculations";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { ScorelineLadderRowCell } from "./ScorelineLadderRowCell";

const resolveLogo = (team: TeamData): string | undefined => {
  const candidate = team.clubLogo ?? team.playHQLogo ?? team.teamLogo;
  if (!candidate) {
    return undefined;
  }

  return typeof candidate === "string" ? candidate : candidate.url;
};

export const NightSessionLadderRow: React.FC<{
  team: TeamData;
  isBiasTeam: boolean;
  animation: ContainerAnimationConfig;
  animationDelay: number;
  exitAnimation: ContainerAnimationConfig;
  exitFrame: number;
  teamIndex: number;
  enterTiming: NightSessionRowEnterTiming;
}> = ({
  team,
  isBiasTeam,
  animation,
  animationDelay,
  exitAnimation,
  exitFrame,
  teamIndex,
  enterTiming,
}) => {
  const { componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const innerAnimation = animations.container.main.itemContainerInner;
  const secondaryAnimation = animations.container.main.itemContainerSecondary;
  const position = parseTeamPosition(team.position);
  const logoUrl = resolveLogo(team);
  const teamName = team.teamName?.trim() ?? "";
  const hasTeam = Boolean(teamName);

  return (
    <div
      className="ladder-entry"
      data-team-index={teamIndex}
      data-empty={hasTeam ? "false" : "true"}
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
        <div className="ladder-row" data-bias={isBiasTeam ? "true" : "false"}>
          <ScorelineLadderRowCell
            className="ladder-cell ladder-row__cell--rank"
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(animationDelay, "rank")}
            animationOutFrame={exitFrame}
          >
            <span className="ladder-rank ladder-cell">{position}</span>
          </ScorelineLadderRowCell>
          <ScorelineLadderRowCell
            className="ladder-cell ladder-row__cell--mark"
            animationIn={innerAnimation.containerIn}
            animationOut={innerAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(animationDelay, "mark")}
            animationOutFrame={exitFrame}
          >
            <div
              className="ladder-mark ladder-cell"
              data-has-crest={logoUrl ? "true" : "false"}
            >
              <span className="mark-fallback" aria-hidden />
              {logoUrl ? <Img src={logoUrl} alt="" /> : null}
            </div>
          </ScorelineLadderRowCell>
          <ScorelineLadderRowCell
            className="ladder-cell ladder-row__cell--team"
            animationIn={secondaryAnimation.containerIn}
            animationOut={secondaryAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(animationDelay, "team")}
            animationOutFrame={exitFrame}
          >
            <p className="ladder-team ladder-cell">{teamName}</p>
          </ScorelineLadderRowCell>
          <ScorelineLadderRowCell
            className="ladder-cell ladder-row__cell--stats"
            animationIn={secondaryAnimation.containerIn}
            animationOut={secondaryAnimation.containerOut}
            animationDelay={enterTiming.innerDelay(animationDelay, "stats")}
            animationOutFrame={exitFrame}
          >
            <div className="ladder-stats ladder-cell">
              <span className="ladder-stat">{team.P}</span>
              <span className="ladder-stat">{team.W}</span>
              <span className="ladder-stat">{team.L}</span>
              <span className="ladder-stat">{team.BYE}</span>
              <span className="ladder-stat ladder-stat--pts">{team.PTS}</span>
            </div>
          </ScorelineLadderRowCell>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default NightSessionLadderRow;
