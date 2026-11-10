import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { MatchResult } from "../../results/_types/types";
import { ResultMetaData } from "../../utils/primitives/ResultMetaData";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";
import {
  LiteMatchCardCNSW,
  LiteMatchCardCNSWClubOnly,
} from "./LiteMatchCard-CNSW";

export const LiteMatchRowCNSW: React.FC<{
  match: MatchResult;
  index: number;
  teamsBlockHeight: number;
}> = ({ match, index, teamsBlockHeight }) => {
  const { animations } = useAnimationContext();
  const { data, isAccountClub } = useVideoDataContext();
  const { layout } = useThemeContext();
  const { timings } = data;
  const containerAnimation = animations.container.main.itemContainer;
  const copyIn = animations.text.main.copyIn;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

  return (
    <div className="flex h-full w-full flex-col">
      {match.status === "Abandoned" ? (
        <div className="mb-1 w-full shrink-0 px-8 py-1">
          <ResultMetaData
            value="ABANDONED"
            animation={{ ...copyIn, delay: delay + 1 }}
            className="w-full text-center"
            variant="onContainerCopyNoBg"
          />
        </div>
      ) : null}
      <div className="min-h-0 flex-1">
        <AnimatedContainer
          type="full"
          className={`${layout.borderRadius.container} h-full w-full`}
          backgroundColor="none"
          animation={containerAnimation.containerIn}
          animationDelay={delay}
          exitAnimation={containerAnimation.containerOut}
          exitFrame={animationOutFrame}
        >
          {isAccountClub ? (
            <LiteMatchCardCNSWClubOnly
              match={match}
              teamsBlockHeight={teamsBlockHeight}
              delay={delay}
            />
          ) : (
            <LiteMatchCardCNSW
              match={match}
              teamsBlockHeight={teamsBlockHeight}
              delay={delay}
            />
          )}
        </AnimatedContainer>
      </div>
    </div>
  );
};
