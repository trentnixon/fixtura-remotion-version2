import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";
import { PerformanceData } from "../../_types/types";
import { formatPlayerName, truncateText } from "../../layout/_utils/helpers";
import { SMALL_LOGO_SIZE } from "../../../top5/layout/_utils/constants";
import { getDefaultRestrictions } from "../../../top5/controller/PlayerRow/_utils/helpers";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "../../../top5/controller/PlayerRow/_utils/calculations";
import {
  getPerformanceBroadcastProTripleStats,
  type BroadcastProPerformanceTripleStat,
} from "./_utils/broadcastProPerformanceStats";

const glassPanelClass =
  "border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl";

const GRID_CARD_HEIGHT_PX = 220;

const statLabelClass =
  "font-rajdhani mb-0.5 text-[9px] font-bold uppercase tracking-widest text-white/55 sm:text-[10px]";

const TripleStatsRow: React.FC<{
  triple: BroadcastProPerformanceTripleStat;
  headingFont: string;
}> = ({ triple, headingFont }) => {
  const valueClass = `${headingFont} text-2xl font-semibold leading-none text-white sm:text-3xl`;
  const gapClass = "mt-2 grid grid-cols-3 border-t border-white/5 pt-3";
  return (
    <div className={gapClass}>
      <div>
        <p className={statLabelClass}>{triple.label1}</p>
        <p className={valueClass}>{triple.value1}</p>
      </div>
      <div className="border-l border-white/5 pl-3 sm:pl-4">
        <p className={statLabelClass}>{triple.label2}</p>
        <p className={valueClass}>{triple.value2}</p>
      </div>
      <div className="border-l border-white/5 pl-3 sm:pl-4">
        <p className={statLabelClass}>{triple.label3}</p>
        <p className={valueClass}>{triple.value3}</p>
      </div>
    </div>
  );
};

const PerformanceGridCard: React.FC<{
  performance: PerformanceData;
  globalRank: number;
  indexOnScreen: number;
  exitFrame: number;
}> = ({ performance, globalRank, indexOnScreen, exitFrame }) => {
  const { fontClasses } = useThemeContext();
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(indexOnScreen);
  const restrictions = getDefaultRestrictions();
  const triple = getPerformanceBroadcastProTripleStats(performance);
  const headingFont = fontClasses.heading?.family ?? "font-teko";

  const formatted = formatPlayerName(performance.name);
  const name = truncateText(formatted, restrictions.nameLength).toUpperCase();
  const team = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  const isFirstOverall = globalRank === 1;
  const rankBadgeClass = isFirstOverall
    ? "bg-[#00e5ff] text-[#041329]"
    : "bg-white/10 text-white/50";

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-none"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={exitFrame}
      >
        <div
          className={`relative flex shrink-0 items-stretch gap-3 overflow-hidden p-4 pt-9 sm:gap-4 sm:p-5 sm:pt-10 ${glassPanelClass}`}
          style={{
            height: GRID_CARD_HEIGHT_PX,
            minHeight: GRID_CARD_HEIGHT_PX,
            maxHeight: GRID_CARD_HEIGHT_PX,
          }}
        >
          <div
            className={`absolute right-0 top-0 px-3 py-1 text-lg font-bold italic tracking-wide ${headingFont} ${rankBadgeClass}`}
          >
            #{globalRank}
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center self-center border border-white/10 bg-white/5 sm:h-24 sm:w-24">
            <TeamLogo
              logo={performance.teamLogo}
              teamName={performance.playedFor}
              delay={delay + 5}
              size={SMALL_LOGO_SIZE}
              fit="contain"
              imgStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center pr-2">
            <h3
              className={`${headingFont} text-lift line-clamp-2 text-[28px] font-semibold uppercase leading-none text-white sm:text-[32px]`}
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {name}
            </h3>
            <p className="font-rajdhani mb-3 mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              {team}
            </p>
            <TripleStatsRow triple={triple} headingFont={headingFont} />
          </div>
        </div>
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

  const exitFrame = calculateExitFrame(timings);

  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );

  const offset = screenIndex * itemsPerScreen;

  return (
    <div className="flex h-full w-full flex-col p-0">
      <AnimatedContainer
        type="full"
        className="mx-6 flex flex-1 flex-col overflow-hidden rounded-none md:mx-10"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div
          className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overflow-x-hidden py-2"
          style={{
            height: heights.asset,
            maxHeight: heights.asset,
            minHeight: heights.asset,
          }}
        >
          <div className="grid w-full grid-cols-2 content-start gap-4">
            {displayedPerformances.map((performance, index) => (
              <PerformanceGridCard
                key={`${performance.name}-${screenIndex}-${index}`}
                performance={performance}
                globalRank={offset + index + 1}
                indexOnScreen={index}
                exitFrame={exitFrame}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PerformancesDisplayBroadcastPro;
