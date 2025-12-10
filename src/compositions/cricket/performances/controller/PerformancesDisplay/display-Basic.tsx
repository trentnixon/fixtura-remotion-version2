import React from "react";
import { PerformanceData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PerformanceRowBasic from "../PlayerRow/row-Basic";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface PerformancesDisplayProps {
  performances: PerformanceData[];
  itemsPerScreen: number;
  screenIndex: number;
}

const PerformancesDisplayBasic: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Get items for this specific screen
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );
  // Static row height for basic template
  const rowHeight = 140;

  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 overflow-hidden py-32"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full">
          {displayedPerformances.map((performance, index) => (
            <div
              key={`${performance.name}-${screenIndex}-${index}`}
              className="w-full"
            >
              <PerformanceRowBasic
                performance={performance}
                index={index}
                rowHeight={rowHeight}
              />
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PerformancesDisplayBasic;
