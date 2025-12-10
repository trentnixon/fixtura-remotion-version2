import React from "react";
import { PerformanceData } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import StandardPerformanceRowBrickWork from "../../layout/StandardPerformanceRowBrickWork";

interface PerformanceRowProps {
  performance: PerformanceData;
  index: number;
  rowHeight: number;
}

const PerformanceRowBrickWork: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * 5; // Stagger the animation of each row
  const animationOutFrame = (timings?.FPS_PREFORMANCECARD || 180) - 30;

  return (
    <div className="overflow-hidden w-full">
      <AnimatedContainer
        type="full"
        className="rounded-lg w-full"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <StandardPerformanceRowBrickWork
          performance={performance}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={{ nameLength: 20, teamLength: 35 }}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PerformanceRowBrickWork;
