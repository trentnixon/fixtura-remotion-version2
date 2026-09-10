import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import ScorelineLeaderRow from "../../layout/ScorelineLeaderRow";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "../PlayerRow/_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const calculateLeaderLayout = (
  availableHeight: number,
  playerCount: number,
): { rowHeight: number } => ({
  rowHeight: Math.floor(availableHeight / Math.max(playerCount, 1)),
});

const PlayersDisplayScoreline: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const containerAnimation = animations.container.main.itemContainer;
  const exitFrame = calculateExitFrame(timings);

  const compact = players.length >= 5;
  const { rowHeight } = calculateLeaderLayout(mainContentHeight, players.length);
  const gradeName = players[0]?.gradeName ?? "";

  const footerSponsors = buildSingleItemFooterSponsors({
    primaryForScreen: players[0]?.primaryForScreen,
    assignSponsors: players[0]?.assignSponsors,
    fallbackPrimary: sponsors,
  });

  return (
    <>
      <AnimatedContainer
        type="full"
        className="min-h-0 flex-1 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className="leaderboard-ledger"
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <div className="leaderboard-stack">
            {gradeName ? (
              <div className="leaderboard-category" data-empty="false">
                <span className="leaderboard-category-label">Grade</span>
                <p className="leaderboard-category-value">{gradeName}</p>
              </div>
            ) : null}
            <div className="leaderboard-rows">
              {players.map((player, index) => (
                <AnimatedContainer
                  key={`${player.name}-${index}`}
                  type="full"
                  className="rounded-none"
                  backgroundColor="none"
                  animation={containerAnimation.containerIn}
                  animationDelay={calculatePlayerDelay(index)}
                  exitAnimation={containerAnimation.containerOut}
                  exitFrame={exitFrame}
                >
                  <ScorelineLeaderRow
                    player={player}
                    rank={index + 1}
                    rowHeight={rowHeight}
                    compact={compact}
                    showCrease={index < players.length - 1}
                  />
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </main>
      </AnimatedContainer>
      <ScorelineSponsorFooter sponsors={footerSponsors} />
    </>
  );
};

export default PlayersDisplayScoreline;
