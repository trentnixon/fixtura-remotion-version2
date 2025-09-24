import React from "react";
import { TeamData } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import StandardLadderRow from "../../layout/TableRowLayout";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CNSWLadderRow } from "../../layout/TableCNSWRow";
interface TeamRowProps {
  team: TeamData;
  index: number;
  totalTeams: number;
  isBiasTeam: boolean;
  LadderRowHeight: number;
  wrapperClass?: string;
}

export const StandardRowCNSW: React.FC<TeamRowProps> = ({
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
  const delay = index * 5;
  const animationOutFrame = timings?.FPS_LADDER ? timings.FPS_LADDER - 20 : 0;

  // Determine background color based on position and bias team
  let bgColorClass = "";
  const position = parseInt(team.position);

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

export default StandardRowCNSW;

export const StandardRowCNSWWrapped: React.FC<TeamRowProps> = ({
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
  const delay = index * 5;
  const animationOutFrame = timings?.FPS_LADDER ? timings.FPS_LADDER - 20 : 0;

  // Determine background color based on position and bias team

  const position = parseInt(team.position);

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
        <CNSWLadderRow
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

const OverflowHiddenWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="overflow-hidden">{children}</div>;
};
