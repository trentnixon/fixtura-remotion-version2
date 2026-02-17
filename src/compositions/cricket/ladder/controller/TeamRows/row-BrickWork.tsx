import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { BalancedLadderRowBrickWork } from "../../layout/TableRowLayout";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  parseTeamPosition,
} from "./_utils/calculations";

/**
 * Brickwork ladder row – stronger transparent backgrounds on each row.
 */
export const RowBrickWork: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  const delay = calculateAnimationDelay(index, 9);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  let bgColorClass = "";
  const position = parseTeamPosition(team.position);

  if (isBiasTeam) {
    bgColorClass = "bg-blue-900/70";
  } else if (position <= 1) {
    bgColorClass = "bg-green-500/80";
  } else if (position > totalTeams - 1) {
    bgColorClass = "bg-red-500/80";
  } else {
    bgColorClass =
      index % 2 === 0
        ? selectedPalette.container.backgroundTransparent.strong
        : selectedPalette.container.backgroundTransparent.medium;
  }

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <BalancedLadderRowBrickWork
          team={team}
          delay={delay}
          bgColorClass={bgColorClass}
          LadderRowHeight={LadderRowHeight}
          place={position}
        />
        </AnimatedContainer>
    </div>
  );
};

export default RowBrickWork;
