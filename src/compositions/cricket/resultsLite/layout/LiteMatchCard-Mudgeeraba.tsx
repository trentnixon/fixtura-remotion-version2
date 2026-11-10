import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import MudgeerabaSingleTeamHeader from "../../results/layout/Sections/MatchHeader/MudgeerabaSingleTeamHeader";
import MudgeerabaStatusFooter from "../../results/layout/Sections/MatchStatus/MudgeerabaStatusFooter";
import { MatchResult } from "../../results/_types/types";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";
import { calculateDelays } from "../../results/layout/MatchCard/_utils/calculations";

const TEAM_HEADER_HEIGHT = 60;
const RESULT_FOOTER_MIN_HEIGHT = 48;
/** Space between home/away stripes and before the result bar (page background shows through). */
const TEAM_ROW_GAP_PX = 12;

export const LiteMatchCardMudgeeraba: React.FC<{
  match: MatchResult;
  index: number;
}> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );
  const { baseDelay } = calculateDelays(delay);
  const homeHeaderDelay = baseDelay;
  const awayHeaderDelay = baseDelay + 10;
  const resultSectionDelay = baseDelay + 20;

  const statusResult =
    match.status === "Abandoned" ? "ABANDONED" : match.result || "Match Status";

  return (
    <div className="w-full">
      <AnimatedContainer
        type="full"
        className="w-full overflow-hidden"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <div
          className="flex w-full flex-col"
          style={{ gap: `${TEAM_ROW_GAP_PX}px` }}
        >
          <MudgeerabaSingleTeamHeader
            team={match.homeTeam}
            teamLogo={match.teamHomeLogo}
            delay={homeHeaderDelay}
            outerContainer={{ height: TEAM_HEADER_HEIGHT }}
          />
          <MudgeerabaSingleTeamHeader
            team={match.awayTeam}
            teamLogo={match.teamAwayLogo}
            delay={awayHeaderDelay}
            outerContainer={{ height: TEAM_HEADER_HEIGHT }}
          />
          <MudgeerabaStatusFooter
            result={statusResult}
            delay={resultSectionDelay}
            outerContainer={{ minHeight: RESULT_FOOTER_MIN_HEIGHT }}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};
