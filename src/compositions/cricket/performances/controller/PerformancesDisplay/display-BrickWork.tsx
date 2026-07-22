import React from "react";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PerformanceRowBrickWork from "../PlayerRow/row-BrickWork";
import {
  getFeaturedRowHeight,
  BRICKWORK_ROW_STACK_CLASS,
} from "../../../../../templates/variants/brickwork/design";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";

const PerformancesDisplayBrickWork: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );

  const rowHeight = 115;

  return (
    <div
      className="flex items-center justify-center"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="flex flex-col flex-shrink-0 mx-16 px-16"
        style={{ width: "100%", paddingTop: "8rem", paddingBottom: "8rem" }}
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
          <div className={`${BRICKWORK_ROW_STACK_CLASS} items-center`}>
            {displayedPerformances.map((performance, index) => (
              <div
                key={`${performance.name}-${screenIndex}-${index}`}
                className="w-full flex-shrink-0"
              >
                <PerformanceRowBrickWork
                  performance={performance}
                  index={index}
                  rowHeight={getFeaturedRowHeight(
                    rowHeight,
                    index,
                    displayedPerformances.length,
                  )}
                />
              </div>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default PerformancesDisplayBrickWork;
