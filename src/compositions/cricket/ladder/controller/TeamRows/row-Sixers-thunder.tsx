import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import StandardLadderRow from "../../layout/TableRowLayout";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SixersLadderRow } from "../../layout/TableSixersRow";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  parseTeamPosition,
} from "./_utils/calculations";
import { OverflowHiddenWrapper } from "./_utils/components";

export const StandardRowSixers: React.FC<TeamRowProps> = ({
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

export default StandardRowSixers;

export const StandardRowSixersThunderWrapped: React.FC<TeamRowProps> = ({
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

  // Stagger the animation of each row
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  // Determine background color based on position and bias team
  let bgColorClass = "";
  const position = parseTeamPosition(team.position);

  if (isBiasTeam) {
    bgColorClass = "bg-blue-900/70";
  } else if (position <= 1) {
    bgColorClass = selectedPalette.container.backgroundTransparent.strong;
  } else if (position > totalTeams - 1) {
    bgColorClass = selectedPalette.container.backgroundTransparent.high;
  } else {
    bgColorClass =
      index % 2 === 0
        ? selectedPalette.container.backgroundTransparent.medium
        : selectedPalette.container.backgroundTransparent.high;
  }

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
        <SixersLadderRow
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
//
