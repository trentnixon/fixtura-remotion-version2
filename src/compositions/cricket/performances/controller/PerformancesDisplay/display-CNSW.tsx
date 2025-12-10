import React from "react";
import { PerformanceData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PerformanceRowCNSW from "../PlayerRow/row-CNSW";
import { Top5PlayerName } from "../../../utils/primitives/Top5PlayerName";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

interface PerformancesDisplayProps {
  performances: PerformanceData[];
  itemsPerScreen: number;
  screenIndex: number;
}

const PerformancesDisplayCNSW: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const ContainerAnimations = animations.container;

  // Get items for this specific screen
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );

  // Get title from video metadata (groupingCategory)
  const title = data.videoMeta?.video?.groupingCategory || "";

  // Static row height for CNSW template (matching top5)
  const rowHeight = 110;

  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-32 "
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-0 grid grid-cols-1 gap-1 px-16">
          <Top5PlayerName
            value={title}
            animation={null as any}
            className=""
            variant="onContainerCopyNoBg"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-start gap-2 w-full">
          {displayedPerformances.map((performance, index) => {
            // Calculate the actual index number accounting for screen pagination
            const actualIndex = screenIndex * itemsPerScreen + index;
            return (
              <div
                key={`${performance.name}-${screenIndex}-${index}`}
                className="w-full"
              >
                <PerformanceRowCNSW
                  performance={performance}
                  index={actualIndex}
                  rowHeight={rowHeight}
                />
              </div>
            );
          })}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PerformancesDisplayCNSW;
