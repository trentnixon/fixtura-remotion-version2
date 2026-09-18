import React, { useMemo } from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import { csClass } from "../../../utils/scoreline/componentStyles";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { NightSessionTotwContent } from "../../../utils/nightSession/totw/NightSessionTotwContent";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { calculateExitFrame } from "../../../top5/controller/PlayerRow/_utils/calculations";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../../utils/nightSession/nightSessionAnimationTiming";

const TeamOfTheWeekDisplayNightSession: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
  title,
}) => {
  const { animations } = useAnimationContext();
  const { data, video } = useVideoDataContext();
  const { timings } = data;
  const containerAnimation = animations.container.main.itemContainer;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const mainContentHeight = getMainContentSectionHeight(heights);
  const exitFrame = calculateExitFrame(timings);
  const totwEnterTimingOptions = useMemo(
    () => ({ rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES }),
    [],
  );
  const enterTiming = useNightSessionEnterTiming(
    players.length,
    "FPS_MAIN",
    undefined,
    totwEnterTimingOptions,
  );
  const categoryLabel = title?.trim() || video.fixtureCategory?.trim() || "";

  const footerSponsors = buildSingleItemFooterSponsors({
    fallbackPrimary: sponsors,
  });

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        exitFrame={exitFrame}
        animateShell={false}
      >
        <NightSessionTotwContent
          players={players}
          categoryLabel={categoryLabel}
          availableHeight={mainContentHeight}
          animation={containerAnimation.containerIn}
          exitAnimation={containerAnimation.containerOut}
          exitFrame={exitFrame}
          animationDelayForIndex={enterTiming.rowDelayForIndex}
          enterTiming={enterTiming}
        />
      </NightSessionAnimatedShell>

      <NightSessionSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="nightSessionTotwSponsorStrip"
      />
    </div>
  );
};

export default TeamOfTheWeekDisplayNightSession;
