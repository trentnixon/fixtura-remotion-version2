import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PerformanceRowBasic from "../PlayerRow/row-Basic";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";

const PerformancesDisplayBasic: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Test: Log heights.asset to verify it's being used
  console.log("[PerformancesDisplayBasic] heights.asset:", heights);
  // Parent (basic.tsx) already accounts for footer, so use full available height
  // The parent passes contentHeight = heights.asset - heights.footer
  // So we should use 100% of parent height, not a fixed pixel value
  console.log("[PerformancesDisplayBasic] Using full parent height");
  // Get items for this specific screen
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );
  // Static row height for basic template
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
    </div>
  );
};

export default PerformancesDisplayBasic;
