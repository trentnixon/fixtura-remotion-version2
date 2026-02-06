import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PerformanceRowClassicTwoColumn from "../PlayerRow/row-ClassicTwoColumn";
import { SponsorFooter } from "../../../sponsorFooter";
import {
  PerformancesDisplayWithSponsorsProps,
} from "./_types/PerformancesDisplayProps";

const PerformancesDisplayClassicTwoColumn: React.FC<
  PerformancesDisplayWithSponsorsProps
> = ({ performances, itemsPerScreen, screenIndex, assignSponsors }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Test: Log heights.asset to verify it's being used
  console.log("[PerformancesDisplayClassicTwoColumn] heights.asset:", heights.asset);

  // Get items for this specific screen
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );

  // Static row height for classicTwoColumn template (matching top5)
  const rowHeight = 140;

  return (
    <div className="flex flex-col h-full w-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-32 "
        style={{
          minHeight: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex flex-col h-full gap-2 justify-center">
          {displayedPerformances.map((performance, index) => (
            <PerformanceRowClassicTwoColumn
              key={`${performance.name}-${screenIndex}-${index}`}
              performance={performance}
              index={index}
              rowHeight={rowHeight}
            />
          ))}
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={assignSponsors} />
      </div>
    </div>
  );
};

export default PerformancesDisplayClassicTwoColumn;
