import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import ScorelineLeaderRow from "../../layout/ScorelineLeaderRow";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "../PlayerRow/_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

const PlayersDisplayScoreline: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { animations } = useAnimationContext();
  const { data, video } = useVideoDataContext();
  const { timings } = data;
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const containerAnimation = animations.container.main.itemContainer;
  const exitFrame = calculateExitFrame(timings);
  const categoryLabel = video.fixtureCategory?.trim() ?? "";

  const footerSponsors = buildSingleItemFooterSponsors({
    primaryForScreen: players[0]?.primaryForScreen,
    assignSponsors: players[0]?.assignSponsors,
    fallbackPrimary: sponsors,
  });

  return (
    <div
      className={csClass(componentStyles, "scorelineDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
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
            <div className="leaderboard-rows">
              {players.map((player, index) => (
                <ScorelineLeaderRow
                  key={`${player.name}-${index}`}
                  player={player}
                  rank={index + 1}
                  showCrease={index < players.length - 1}
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
      <ScorelineSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="scorelineTop5SponsorStrip"
      />
    </div>
  );
};

export default PlayersDisplayScoreline;
