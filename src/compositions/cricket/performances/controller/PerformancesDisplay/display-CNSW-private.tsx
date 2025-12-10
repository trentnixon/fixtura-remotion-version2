import React from "react";
import { PerformanceData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PerformanceRowCNSWPrivate from "../PlayerRow/row-CNSW-private";
import { Top5PlayerName } from "../../../utils/primitives/Top5PlayerName";

interface PerformancesDisplayProps {
  performances: PerformanceData[];
  itemsPerScreen: number;
  screenIndex: number;
}

const PerformancesDisplayCNSWPrivate: React.FC<PerformancesDisplayProps> = ({
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

  // Get title from first performance's assignSponsors.grade.name (matching top5)
  const title =
    displayedPerformances.length > 0 &&
    displayedPerformances[0].assignSponsors?.grade?.name
      ? displayedPerformances[0].assignSponsors.grade.name
      : "";

  // Static row height for CNSW-private template (matching top5)
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
            animation={null as any} // eslint-disable-line @typescript-eslint/no-explicit-any
            className=""
            variant="onContainerMain"
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
                <PerformanceRowCNSWPrivate
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

export default PerformancesDisplayCNSWPrivate;
