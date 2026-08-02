import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { BroadcastProRoundedCrestWell } from "../../../../../templates/variants/broadcastProRounded/components/crest";
import { BroadcastProRoundedStatMatrixTriple } from "../../../../../templates/variants/broadcastProRounded/components/stat";
import {
  BroadcastProRoundedGlassPanel,
  BroadcastProRoundedPlayerRankBadge,
  useBroadcastProRoundedPlayerRankingTheme,
  buildBroadcastProRoundedPerformanceStatMatrixCells,
} from "../../../utils/broadcastProRounded";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";
import { PerformanceData } from "../../_types/types";
import { truncateText } from "../../layout/_utils/helpers";
import { getDefaultRestrictions } from "../../../top5/controller/PlayerRow/_utils/helpers";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "../../../top5/controller/PlayerRow/_utils/calculations";
import { calculateBroadcastProRoundedPerformanceGridLayout } from "./_utils/broadcastProRoundedCalculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const PerformanceGridCard: React.FC<{
  performance: PerformanceData;
  globalRank: number;
  indexOnScreen: number;
  exitFrame: number;
  cardHeight: number;
}> = ({ performance, globalRank, indexOnScreen, exitFrame, cardHeight }) => {
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(indexOnScreen);
  const { layout } = useThemeContext();
  const { glass, text, accent, headingFont, cs, selectedPalette } =
    useBroadcastProRoundedPlayerRankingTheme();
  const restrictions = getDefaultRestrictions();
  const statCells =
    buildBroadcastProRoundedPerformanceStatMatrixCells(performance);

  const name = truncateText(
    performance.name,
    restrictions.nameLength,
  ).toUpperCase();
  const team = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  return (
    <div
      className="min-h-0 overflow-hidden"
      style={{
        height: cardHeight,
        minHeight: cardHeight,
        maxHeight: cardHeight,
      }}
    >
      <AnimatedContainer
        type="full"
        className={`h-full ${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={exitFrame}
      >
        <BroadcastProRoundedGlassPanel
          glass={glass}
          className={`${cs("broadcastProRoundedPlayerRankingGridCard")} h-full`}
          style={{
            height: cardHeight,
            minHeight: cardHeight,
            maxHeight: cardHeight,
          }}
        >
          <BroadcastProRoundedPlayerRankBadge
            rank={globalRank}
            placement="left"
            isFeatured={false}
            className={cs("broadcastProRoundedPlayerRankingRankBadgeGridLeft")}
            glass={glass}
            text={text}
            accent={accent}
            selectedPalette={selectedPalette}
            headingFont={headingFont}
          />
          <BroadcastProRoundedCrestWell
            tier="grid"
            logo={performance.teamLogo}
            teamName={performance.playedFor}
            delay={delay + 5}
            glass={glass}
            showBorder
          />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden">
            <h3
              className={`${headingFont} ${cs("broadcastProRoundedPlayerRankingNameGridTop5")} shrink-0`}
              style={{
                color: text.copy,
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {name}
            </h3>
            <p
              className={cs("broadcastProRoundedPlayerRankingTeamGridTop5")}
              style={{ color: text.muted }}
            >
              {team}
            </p>
            <BroadcastProRoundedStatMatrixTriple
              cells={statCells}
              tier="performancesTriple"
              headingFont={headingFont}
              text={text}
              glass={glass}
              accent={accent}
            />
          </div>
        </BroadcastProRoundedGlassPanel>
      </AnimatedContainer>
    </div>
  );
};

const PerformancesDisplayBroadcastProRounded: React.FC<
  PerformancesDisplayProps
> = ({ performances, itemsPerScreen, screenIndex }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { cs } = useBroadcastProRoundedPlayerRankingTheme();

  const exitFrame = calculateExitFrame(timings);
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );
  const offset = screenIndex * itemsPerScreen;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const { cardHeight, rows } =
    calculateBroadcastProRoundedPerformanceGridLayout(
      mainContentHeight,
      itemsPerScreen,
    );

  return (
    <div
      className="flex w-full flex-col overflow-hidden p-0"
      style={{ height: `${mainContentHeight}px` }}
    >
      <AnimatedContainer
        type="full"
        className={cs("broadcastProRoundedPlayerRankingAnimatedContainer")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div
          className={`${cs("broadcastProRoundedPlayerRankingScrollShell")} justify-center`}
        >
          <div
            className={`${cs("broadcastProRoundedPlayerRankingGridPerformances")} min-h-0 shrink-0 overflow-hidden`}
            style={{
              gridTemplateRows:
                rows > 0 ? `repeat(${rows}, ${cardHeight}px)` : undefined,
              height: rows * cardHeight + Math.max(0, rows - 1) * 8,
            }}
          >
            {displayedPerformances.map((performance, index) => (
              <PerformanceGridCard
                key={`${performance.name}-${screenIndex}-${index}`}
                performance={performance}
                globalRank={offset + index + 1}
                indexOnScreen={index}
                exitFrame={exitFrame}
                cardHeight={cardHeight}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PerformancesDisplayBroadcastProRounded;
