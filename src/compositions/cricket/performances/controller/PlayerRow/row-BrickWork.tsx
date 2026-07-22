import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import {
  DiagonalEnergyAccent,
  isFeaturedRow,
  MasonryRow,
} from "../../../../../templates/variants/brickwork/design";
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
    <MasonryRow
      index={index}
      className="overflow-hidden flex-shrink-0"
    >
      <AnimatedContainer
        type="full"
        className="relative rounded-lg flex-shrink-0"
        style={{ width: "100%" }}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        {isFeaturedRow(index) && (
          <DiagonalEnergyAccent edge="trailing" shape="diagonalBand" />
        )}
        <div className="relative z-10">
        <StandardPerformanceRowBrickWork
          performance={performance}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={{ nameLength: 20, teamLength: 35 }}
        />
        </div>
      </AnimatedContainer>
    </MasonryRow>
  );
};

export default PerformanceRowBrickWork;
