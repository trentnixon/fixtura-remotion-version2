import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import ScorelineLadderRow from "../../layout/ScorelineLadderRow";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";
import { resolveScorelineLadderShowRowCrease } from "../../../utils/scoreline/ladder/resolveScorelineLadderLayout";

export const RowScoreline: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  const delay = calculateAnimationDelay(index, 9);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <ScorelineLadderRow
      team={team}
      isBiasTeam={isBiasTeam}
      showCrease={resolveScorelineLadderShowRowCrease(totalTeams, index)}
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={animationOutFrame}
    />
  );
};

export default RowScoreline;
