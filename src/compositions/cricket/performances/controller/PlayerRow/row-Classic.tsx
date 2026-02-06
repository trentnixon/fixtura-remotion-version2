import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { StandardPerformanceRowClassic } from "../../layout/StandardPerformanceRowClassic";
import { PerformanceRowProps } from "./_types/PerformanceRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

const PerformanceRowClassic: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { layout } = useThemeContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <div className="overflow-hidden w-full flex-shrink-0" style={{ width: "100%" }}>
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} flex-shrink-0`}
        style={{ width: "100%" }}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <StandardPerformanceRowClassic
          performance={performance}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PerformanceRowClassic;
