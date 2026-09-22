import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { BroadcastProCrestWell } from "../../../../../templates/variants/broadcastPro/components/crest";
import { BroadcastProStatMatrixTriple } from "../../../../../templates/variants/broadcastPro/components/stat";
import {
  BroadcastProGlassPanel,
  BroadcastProPlayerRankBadge,
  useBroadcastProPlayerRankingTheme,
  buildBroadcastProPerformanceStatMatrixCells,
} from "../../../utils/broadcastPro";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";
import { PerformanceData } from "../../_types/types";
import { truncateText } from "../../layout/_utils/helpers";
import { getDefaultRestrictions } from "../../../top5/controller/PlayerRow/_utils/helpers";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "../../../top5/controller/PlayerRow/_utils/calculations";
import { calculateBroadcastProPerformanceGridLayout } from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

/** Full-height crest column on the right (matches Top 5 grid cards). */
const CREST_WIDTH_PX = 96;
const CREST_CONTENT_GAP_PX = 12;

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
  const { fontClasses } = useThemeContext();
  const { glass, text, accent, cs, selectedPalette } =
    useBroadcastProPlayerRankingTheme();
  const copyFont =
    fontClasses.body?.family ?? fontClasses.subheading?.family ?? "Rajdhani";
  const restrictions = getDefaultRestrictions();
  const statCells = buildBroadcastProPerformanceStatMatrixCells(performance);

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
        className="h-full rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={exitFrame}
      >
        <BroadcastProGlassPanel
          glass={glass}
          className={`${cs("broadcastProPlayerRankingGridCard")} h-full !gap-0`}
          style={{
            height: cardHeight,
            minHeight: cardHeight,
            maxHeight: cardHeight,
          }}
        >
          <BroadcastProPlayerRankBadge
            rank={globalRank}
            placement="left"
            isFeatured={false}
            className={cs("broadcastProPlayerRankingRankBadgeGridLeft")}
            glass={glass}
            text={text}
            accent={accent}
            selectedPalette={selectedPalette}
            headingFont={copyFont}
          />
          <div
            className="flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden"
            style={{
              paddingRight: CREST_WIDTH_PX + CREST_CONTENT_GAP_PX,
            }}
          >
            <h3
              className={`${cs("broadcastProPlayerRankingNameGridTop5")} shrink-0`}
              style={{
                color: text.copy,
                fontFamily: copyFont,
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {name}
            </h3>
            <p
              className={cs("broadcastProPlayerRankingTeamGridTop5")}
              style={{ color: text.muted, fontFamily: copyFont }}
            >
              {team}
            </p>
            <BroadcastProStatMatrixTriple
              cells={statCells}
              tier="performancesTriple"
              headingFont={copyFont}
              text={text}
              glass={glass}
              accent={accent}
            />
          </div>
          <BroadcastProCrestWell
            tier="grid"
            logo={performance.teamLogo}
            teamName={performance.playedFor}
            delay={delay + 5}
            glass={glass}
            containerHeight={cardHeight}
            showBorder
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: CREST_WIDTH_PX,
              minWidth: CREST_WIDTH_PX,
              height: "100%",
              minHeight: "100%",
            }}
          />
        </BroadcastProGlassPanel>
      </AnimatedContainer>
    </div>
  );
};

const PerformancesDisplayBroadcastPro: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { cs } = useBroadcastProPlayerRankingTheme();

  const exitFrame = calculateExitFrame(timings);
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );
  const offset = screenIndex * itemsPerScreen;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const { cardHeight, rows } = calculateBroadcastProPerformanceGridLayout(
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
        className={cs("broadcastProPlayerRankingAnimatedContainer")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div
          className={`${cs("broadcastProPlayerRankingScrollShell")} justify-center`}
        >
          <div
            className={`${cs("broadcastProPlayerRankingGridPerformances")} min-h-0 shrink-0 overflow-hidden`}
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

export default PerformancesDisplayBroadcastPro;
