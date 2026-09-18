import React, { useMemo } from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import NightSessionLeaderRow from "../../../top5/layout/NightSessionLeaderRow";
import { calculateDisplayDurationPerScreen } from "../../_utils/calculations";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { performanceAsLeaderPlayer } from "../../../utils/scoreline/performances/performanceAsLeaderPlayer";
import { resolvePerformanceScreenDensity } from "../../../utils/scoreline/performances/resolvePerformanceScreenDensity";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../../utils/nightSession/nightSessionAnimationTiming";

const PerformancesDisplayNightSession: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const { data, video, metadata } = useVideoDataContext();
  const { timings } = data;
  const containerAnimation = animations.container.main.itemContainer;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const screenDurationFrames = calculateDisplayDurationPerScreen(
    timings,
    metadata.frames ?? [],
  );
  const categoryLabel = video.fixtureCategory?.trim() ?? "";

  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );
  const density = resolvePerformanceScreenDensity(displayedPerformances.length);
  const rankOffset = screenIndex * itemsPerScreen;
  const performanceTimingOptions = useMemo(
    () => ({
      rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES,
      minHoldAfterEnterFrames: 48,
      staggerRowExits: displayedPerformances.length > 5,
    }),
    [displayedPerformances.length],
  );
  const enterTiming = useNightSessionEnterTiming(
    displayedPerformances.length,
    "FPS_PREFORMANCECARD",
    screenDurationFrames,
    performanceTimingOptions,
  );

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{
        position: "absolute",
        inset: 0,
        height: `${mainContentHeight}px`,
      }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        exitFrame={enterTiming.shellExitFrame}
        animateShell={false}
      >
        <main
          className={`leaderboard-ledger ${csClass(componentStyles, "nightSessionTop5Ledger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <div className="leaderboard-stack">
            <div
              className="leaderboard-category"
              data-empty={categoryLabel ? "false" : "true"}
            >
              <span className="leaderboard-category-label">Grade</span>
              <p className="leaderboard-category-value">{categoryLabel}</p>
            </div>
            <div
              className="leaderboard-rows gap-2"
              {...(density ? { "data-density": density } : {})}
            >
              {displayedPerformances.map((performance, index) => (
                <NightSessionLeaderRow
                  key={`${performance.name}-${screenIndex}-${index}`}
                  player={performanceAsLeaderPlayer(performance)}
                  rank={rankOffset + index + 1}
                  rowIndex={index}
                  animation={containerAnimation.containerIn}
                  animationDelay={enterTiming.rowDelayForIndex(index)}
                  exitAnimation={containerAnimation.containerOut}
                  exitFrame={enterTiming.shellExitFrame}
                  enterTiming={enterTiming}
                />
              ))}
            </div>
          </div>
        </main>
      </NightSessionAnimatedShell>
    </div>
  );
};

export default PerformancesDisplayNightSession;
