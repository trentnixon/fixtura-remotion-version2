import React from "react";
import { PerformanceData } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { StandardPerformanceRowCNSWPrivate } from "../../layout/StandardPerformanceRowCNSW-private";

interface PerformanceRowProps {
  performance: PerformanceData;
  index: number;
  rowHeight: number;
}

const PerformanceRowCNSWPrivate: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { layout } = useThemeContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = index * 5; // Stagger the animation of each row
  const animationOutFrame = (timings?.FPS_PREFORMANCECARD || 180) - 30;

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
        <StandardPerformanceRowCNSWPrivate
          performance={performance}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PerformanceRowCNSWPrivate;
