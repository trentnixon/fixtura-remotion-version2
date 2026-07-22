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
import { getBrickworkColourRoles } from "../../../../../templates/variants/brickwork/design";

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

  const roles = getBrickworkColourRoles(selectedPalette);
  const position = parseTeamPosition(team.position);

  let rowBackground: string;
  if (isBiasTeam) {
    rowBackground = roles.status.accountBias;
  } else if (position <= 1) {
    rowBackground = roles.status.ladderTop;
  } else if (position > totalTeams - 1) {
    rowBackground = roles.status.ladderBottom;
  } else {
    rowBackground =
      index % 2 === 0
        ? roles.neutral.surfaceFeatured
        : roles.neutral.surface;
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
          bgColorClass={rowBackground}
          LadderRowHeight={LadderRowHeight}
          place={position}
        />
      </AnimatedContainer>
    </div>
  );
};

export default RowBrickWork;
