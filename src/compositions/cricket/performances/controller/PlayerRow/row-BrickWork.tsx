import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import StandardPerformanceRowBrickWork from "../../layout/StandardPerformanceRowBrickWork";
import { PerformanceRowProps } from "./_types/PerformanceRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

const PerformanceRowBrickWork: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <div className="overflow-hidden w-full flex-shrink-0" style={{ width: "100%" }}>
      <AnimatedContainer
        type="full"
        className="rounded-lg flex-shrink-0"
        style={{ width: "100%" }}
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
