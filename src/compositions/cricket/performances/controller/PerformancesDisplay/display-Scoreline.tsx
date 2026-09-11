import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import ScorelineLeaderRow from "../../../top5/layout/ScorelineLeaderRow";
import {
  calculateExitFrame,
  calculatePlayerDelay,
} from "../../../top5/controller/PlayerRow/_utils/calculations";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { performanceAsLeaderPlayer } from "../../../utils/scoreline/performances/performanceAsLeaderPlayer";
import { resolvePerformanceScreenDensity } from "../../../utils/scoreline/performances/resolvePerformanceScreenDensity";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";

const PerformancesDisplayScoreline: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const { data, video } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const containerAnimation = animations.container.main.itemContainer;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const exitFrame = calculateExitFrame(timings);
  const categoryLabel = video.fixtureCategory?.trim() ?? "";

  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );
  const density = resolvePerformanceScreenDensity(displayedPerformances.length);
  const rankOffset = screenIndex * itemsPerScreen;

  return (
    <div
      className={csClass(componentStyles, "scorelineDisplayColumn")}
      style={{
        position: "absolute",
        inset: 0,
        height: `${mainContentHeight}px`,
      }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, "scorelineAnimatedShell")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className={`leaderboard-ledger ${csClass(componentStyles, "scorelineTop5Ledger")}`}
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
              className="leaderboard-rows"
              {...(density ? { "data-density": density } : {})}
            >
              {displayedPerformances.map((performance, index) => (
                <ScorelineLeaderRow
                  key={`${performance.name}-${screenIndex}-${index}`}
                  player={performanceAsLeaderPlayer(performance)}
                  rank={rankOffset + index + 1}
                  showCrease={index < displayedPerformances.length - 1}
                  animation={containerAnimation.containerIn}
                  animationDelay={calculatePlayerDelay(index)}
                  exitAnimation={containerAnimation.containerOut}
                  exitFrame={exitFrame}
                />
              ))}
            </div>
          </div>
        </main>
      </AnimatedContainer>
    </div>
  );
};

export default PerformancesDisplayScoreline;
