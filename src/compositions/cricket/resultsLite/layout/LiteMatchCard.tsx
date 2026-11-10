import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { MatchResult } from "../../results/_types/types";
import { ResultMetaData } from "../../utils/primitives/ResultMetaData";
import { ResultTeamName } from "../../utils/primitives/ResultTeamName";
import { TeamLogo } from "../../utils/primitives/TeamLogo";
import { resolveTeamMatchScore } from "../../utils/teamMatchScore";
import { TeamScoreStack } from "../../utils/TeamScoreStack";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";

const LOGO_SIZE = 88;

/** Names, scores, and fixture status tags sit on the page background — not container copy. */
const ON_BACKGROUND_COPY: ColorVariant = "onBackgroundMain";

/** Centered fixture status labels (e.g. Abandoned). */
const FIXTURE_STATUS_TAG_CLASS = "text-center w-full";

type SideAlign = "start" | "end";

const MatchSide: React.FC<{
  align: SideAlign;
  name: string;
  logo: MatchResult["teamHomeLogo"];
  scores: ReturnType<typeof resolveTeamMatchScore>;
  delay: number;
  copyIn: AnimationConfig;
}> = ({ align, name, logo, scores, delay, copyIn }) => {
  const isEnd = align === "end";
  const logoMark = (
    <div
      className="shrink-0 overflow-hidden"
      style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
    >
      <TeamLogo
        logo={logo || null}
        teamName={name}
        delay={delay}
        size={LOGO_SIZE}
        fit="cover"
        imgStyle={{
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          maxWidth: LOGO_SIZE,
          maxHeight: LOGO_SIZE,
          objectFit: "cover",
          aspectRatio: "1 / 1",
        }}
      />
    </div>
  );
  const scoreMark = (
    <TeamScoreStack
      scores={scores}
      delay={delay}
      align={isEnd ? "start" : "end"}
      textAnimations={{ copyIn }}
      variant={ON_BACKGROUND_COPY}
      scoreClassName="leading-none shrink-0"
      currentScoreClassName="!text-6xl"
    />
  );

  return (
    <div className="flex flex-col flex-1 w-full min-w-0 gap-0 leading-none">
      <div
        className={`flex w-full items-center gap-3 ${
          isEnd ? "justify-start" : "justify-end"
        }`}
      >
        {isEnd ? (
          <>
            {logoMark}
            {scoreMark}
          </>
        ) : (
          <>
            {scoreMark}
            {logoMark}
          </>
        )}
      </div>
      <ResultTeamName
        value={name.toUpperCase()}
        animation={{ ...copyIn, delay: delay + 2 }}
        className={`w-full !leading-tight ${isEnd ? "text-left" : "text-right"}`}
        variant={ON_BACKGROUND_COPY}
      />
    </div>
  );
};

export const LiteMatchCard: React.FC<{
  match: MatchResult;
  index: number;
  gradeHeader?: string;
}> = ({ match, index, gradeHeader }) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const copyIn = animations.text.main.copyIn;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );
  const containerAnimation = animations.container.main.itemContainer;
  const homeScores = resolveTeamMatchScore(
    match.type,
    match.homeTeam.score,
    match.homeTeam.homeScoresFirstInnings,
  );
  const awayScores = resolveTeamMatchScore(
    match.type,
    match.awayTeam.score,
    match.awayTeam.awayScoresFirstInnings,
  );

  return (
    <div className="w-full flex flex-col">
      {gradeHeader ? (
        <div className="w-full py-2" style={{ marginBottom: 12 }}>
          <ResultMetaData
            value={gradeHeader.toUpperCase()}
            animation={{ ...copyIn, delay: delay + 1 }}
            className="text-center w-full"
            variant={ON_BACKGROUND_COPY}
          />
        </div>
      ) : null}
      <div className="w-full flex flex-col gap-2">
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
          className="w-full"
          backgroundColor="none"
          style={{ width: "100%", height: "auto" }}
          animation={containerAnimation.containerIn}
          animationDelay={delay}
          exitAnimation={containerAnimation.containerOut}
          exitFrame={animationOutFrame}
        >
          <div className="flex w-full items-stretch">
            <div className="flex-1 min-w-0 pr-2 py-0 flex">
              <div className="flex-1 flex items-center p-2 overflow-hidden">
                <MatchSide
                  align="start"
                  name={match.homeTeam.name}
                  logo={match.teamHomeLogo}
                  scores={homeScores}
                  delay={delay + 4}
                  copyIn={copyIn}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 pl-2 py-0 flex border-l border-gray-700">
              <div className="flex-1 flex items-center p-2 overflow-hidden">
                <MatchSide
                  align="end"
                  name={match.awayTeam.name}
                  logo={match.teamAwayLogo}
                  scores={awayScores}
                  delay={delay + 8}
                  copyIn={copyIn}
                />
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};
