import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import StandardLadderRow from "../../layout/TableRowLayout";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CNSWLadderRowPrivate } from "../../layout/TableCNSWRow-private";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  parseTeamPosition,
} from "./_utils/calculations";
import { OverflowHiddenWrapper } from "./_utils/components";

export const StandardRowCNSWPrivate: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
  wrapperClass = "rounded-lg",
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();

  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  // Stagger the animation of each row
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  // Determine background color based on position and bias team
  let bgColorClass = "";
  const position = parseTeamPosition(team.position);

  if (isBiasTeam) {
    bgColorClass = "bg-blue-900/70";
  } else if (position <= 1) {
    bgColorClass = "bg-green-500/50";
  } else if (position > totalTeams - 1) {
    bgColorClass = "bg-red-500/50";
  } else {
    bgColorClass = index % 2 === 0 ? "bg-black/30" : "bg-black/10";
  }

  return (
    <OverflowHiddenWrapper>
      <AnimatedContainer
        type="full"
        className={`${wrapperClass}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <StandardLadderRow
          team={team}
          delay={delay}
          bgColorClass={bgColorClass}
          LadderRowHeight={LadderRowHeight}
          place={position}
        />
      </AnimatedContainer>
    </OverflowHiddenWrapper>
  );
};

export default StandardRowCNSWPrivate;

export const StandardRowCNSWPrivateWrapped: React.FC<TeamRowProps> = ({
  team,
  index,

  LadderRowHeight,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  // Stagger the animation of each row
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  // Determine background color based on position and bias team

  const position = parseTeamPosition(team.position);

  return (
    <OverflowHiddenWrapper>
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <CNSWLadderRowPrivate
          team={team}
          delay={delay}
          LadderRowHeight={LadderRowHeight}
          place={position}
        />
      </AnimatedContainer>
    </OverflowHiddenWrapper>
  );
};
//
