import React from "react";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PerformanceRowClassic from "../PlayerRow/row-Classic";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";

const PerformancesDisplayClassic: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Get items for this specific screen
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );

  // Static row height for classic template
  const rowHeight = 115;

  return (
    <div 
      className="flex items-center justify-center"
      style={{ 
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}>
      <div 
        className="flex flex-col flex-shrink-0"
        style={{ width: "100%", paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        <AnimatedContainer
          type="full"
          className="flex flex-col"
          style={{ width: "100%" }}
          backgroundColor="none"
          animation={ContainerAnimations.main.parent.containerIn}
          animationDelay={0}
          exitAnimation={ContainerAnimations.main.parent.containerOut}
        >
          <div className="flex flex-col items-center gap-1 w-full">
            {displayedPerformances.map((performance, index) => (
              <div
                key={`${performance.name}-${screenIndex}-${index}`}
                className="w-full flex-shrink-0"
              >
                <PerformanceRowClassic
                  performance={performance}
                  index={index}
                  rowHeight={rowHeight}
                />
              </div>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default PerformancesDisplayClassic;
