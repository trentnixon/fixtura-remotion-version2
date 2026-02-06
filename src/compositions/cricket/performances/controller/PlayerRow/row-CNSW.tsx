import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { StandardPerformanceRowCNSW } from "../../layout/StandardPerformanceRowCNSW";
import { PerformanceRowProps } from "./_types/PerformanceRowProps";
import {
  calculateAnimationDelayModulo,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

const PerformanceRowCNSW: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { layout } = useThemeContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateAnimationDelayModulo(index, 7, 2.5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <div className="overflow-hidden mb-2">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} ${index !== 0 ? "px-8" : ""} `}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <StandardPerformanceRowCNSW
          performance={performance}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PerformanceRowCNSW;
