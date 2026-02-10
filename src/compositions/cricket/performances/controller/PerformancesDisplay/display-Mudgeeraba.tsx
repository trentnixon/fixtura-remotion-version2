import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
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
  // Static row height for mudgeeraba template
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
                <PerformanceRowMudgeeraba
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

export default PerformancesDisplayMudgeeraba;
