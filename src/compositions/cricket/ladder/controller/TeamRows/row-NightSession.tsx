import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import NightSessionLadderRow from "../../layout/NightSessionLadderRow";
import { TeamRowProps } from "./_types/TeamRowProps";
import { calculateAnimationOutFrame } from "./_utils/calculations";
import { useNightSessionRowEnterTiming } from "../../../utils/nightSession/NightSessionEnterTimingContext";

export const RowNightSession: React.FC<TeamRowProps> = ({
  team,
  index,
  isBiasTeam,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  const enterTiming = useNightSessionRowEnterTiming();
  const delay = enterTiming.rowDelayForIndex(index);
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
      enterTiming={enterTiming}
    />
  );
};

export default RowNightSession;
