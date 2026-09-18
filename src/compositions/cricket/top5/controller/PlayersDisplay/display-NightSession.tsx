import React, { useMemo } from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import NightSessionLeaderRow from "../../layout/NightSessionLeaderRow";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../../utils/nightSession/nightSessionAnimationTiming";

const PlayersDisplayNightSession: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { animations } = useAnimationContext();
  const { video } = useVideoDataContext();
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const containerAnimation = animations.container.main.itemContainer;
  const top5EnterTimingOptions = useMemo(
    () => ({ rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES }),
    [],
  );
  const enterTiming = useNightSessionEnterTiming(
    players.length,
    "FPS_MAIN",
    undefined,
    top5EnterTimingOptions,
  );
  const categoryLabel = video.fixtureCategory?.trim() ?? "";

  const footerSponsors = buildSingleItemFooterSponsors({
    primaryForScreen: players[0]?.primaryForScreen,
    assignSponsors: players[0]?.assignSponsors,
    fallbackPrimary: sponsors,
  });

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
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
            <div className="leaderboard-rows">
              {players.map((player, index) => (
                <NightSessionLeaderRow
                  key={`${player.name}-${index}`}
                  player={player}
                  rank={index + 1}
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
      <NightSessionSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="nightSessionTop5SponsorStrip"
      />
    </div>
  );
};

export default PlayersDisplayNightSession;
