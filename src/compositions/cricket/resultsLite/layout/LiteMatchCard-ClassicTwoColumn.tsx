import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { Horizontal_SingleTeam_LogoWithName_ScoreClassic } from "../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score-Classic";
import { MatchResult } from "../../results/_types/types";
import { ResultMetaData } from "../../utils/primitives/ResultMetaData";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";

const ON_BACKGROUND_COPY: ColorVariant = "onBackgroundMain";
const FIXTURE_STATUS_TAG_CLASS = "text-right w-full";

export const LiteMatchCardClassicTwoColumn: React.FC<{
  match: MatchResult;
  index: number;
}> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { data } = useVideoDataContext();
  const copyIn = animations.text.main.copyIn;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );
  const containerAnimation = animations.container.main.itemContainer;
  const baseDelay = delay + 4;

  return (
    <div className="w-full flex flex-col">
      {match.status === "Abandoned" ? (
        <ResultMetaData
          value="ABANDONED"
          animation={{ ...copyIn, delay: delay + 1 }}
          className={FIXTURE_STATUS_TAG_CLASS}
          variant={ON_BACKGROUND_COPY}
        />
      ) : null}
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} w-full`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <div className="w-full overflow-hidden flex flex-col gap-6">
          <Horizontal_SingleTeam_LogoWithName_ScoreClassic
            type={match.type}
            Team={match.homeTeam}
            TeamLogo={match.teamHomeLogo}
            firstInningsScore={match.homeTeam.homeScoresFirstInnings || ""}
            delay={baseDelay}
            outerContainer={{}}
          />
          <Horizontal_SingleTeam_LogoWithName_ScoreClassic
            type={match.type}
            Team={match.awayTeam}
            TeamLogo={match.teamAwayLogo}
            firstInningsScore={match.awayTeam.awayScoresFirstInnings || ""}
            delay={baseDelay}
            outerContainer={{}}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};
