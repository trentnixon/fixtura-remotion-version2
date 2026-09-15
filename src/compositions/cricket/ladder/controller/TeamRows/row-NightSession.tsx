import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import NightSessionLadderRow from "../../layout/NightSessionLadderRow";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

export const RowNightSession: React.FC<TeamRowProps> = ({
  team,
  index,
  isBiasTeam,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  const delay = calculateAnimationDelay(index, 9);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <NightSessionLadderRow
      team={team}
      isBiasTeam={isBiasTeam}
      teamIndex={index}
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={animationOutFrame}
    />
  );
};

export default RowNightSession;
