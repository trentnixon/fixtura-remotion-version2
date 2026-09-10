import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import ScorelineLadderRow from "../../layout/ScorelineLadderRow";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

export const RowScoreline: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
  compact,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  const delay = calculateAnimationDelay(index, 9);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <AnimatedContainer
      type="full"
      className="rounded-none"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={animationOutFrame}
    >
      <ScorelineLadderRow
        team={team}
        index={index}
        isBiasTeam={isBiasTeam}
        rowHeight={LadderRowHeight}
        compact={compact ?? false}
        showCrease={index < totalTeams - 1}
      />
    </AnimatedContainer>
  );
};

export default RowScoreline;
