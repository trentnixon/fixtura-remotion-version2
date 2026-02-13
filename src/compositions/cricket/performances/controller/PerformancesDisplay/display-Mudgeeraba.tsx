import React from "react";
import PerformanceRowMudgeeraba from "../PlayerRow/row-Mudgeeraba";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";

const PerformancesDisplayMudgeeraba: React.FC<PerformancesDisplayProps> = ({
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
  // Static row height for mudgeeraba template
  const rowHeight = 115;

  return (
    <div
      className="flex flex-col h-full "
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col overflow-hidden rounded-none mx-8"
        style={{ width: "100%" }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 flex flex-col gap-4 my-4 mx-4 min-h-0 justify-center">
          {displayedPerformances.map((performance, index) => (
            <PerformanceRowMudgeeraba
              key={`${performance.name}-${screenIndex}-${index}`}
              performance={performance}
              index={index}
              rowHeight={rowHeight}
            />
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PerformancesDisplayMudgeeraba;
