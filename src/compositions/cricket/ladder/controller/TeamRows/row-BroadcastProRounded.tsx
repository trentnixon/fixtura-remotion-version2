import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { BroadcastProRoundedLadderRow } from "../../layout/TableBroadcastProRoundedRow";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  parseTeamPosition,
} from "./_utils/calculations";

/**
 * Broadcast Pro ladder row — glass layout; staggered container animation.
 */
export const RowBroadcastProRounded: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
  compact,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  const delay = calculateAnimationDelay(index, 9);
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const position = parseTeamPosition(team.position);

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={layout.borderRadius.container}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <BroadcastProRoundedLadderRow
          team={team}
          delay={delay}
          place={position}
          index={index}
          totalTeams={totalTeams}
          LadderRowHeight={LadderRowHeight}
          isBiasTeam={isBiasTeam}
          compact={compact}
        />
      </AnimatedContainer>
    </div>
  );
};

export default RowBroadcastProRounded;
