import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";
import type { AnimationConfig } from "../../../../components/typography/config/animations";
import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../utils/primitives/ResultTeamName";
import { MatchResult } from "../../results/_types/types";
import {
  resolveTeamMatchScore,
  type ResolvedTeamMatchScore,
} from "../../utils/teamMatchScore";

const SCORE_COPY_VARIANT: ColorVariant = "onContainerCopy";
const NAME_COPY_VARIANT: ColorVariant = "onContainerCopyNoBg";

const CNSW_SCORE_OUTER_ROW_CLASS =
  "mb-1 flex w-full min-w-0 items-center overflow-hidden p-2";
const CNSW_SCORE_INNER_BOX_CLASS = "p-4";
const CNSW_SCORE_INNER_MIN_WIDTH_PX = 160;

const CNSW_TEAM_NAME_CLASS = "whitespace-nowrap";

/** Single size for current + first-innings lines in CNSW lite (theme sizes unchanged elsewhere). */
const CNSW_LITE_SCORE_CLASS = "leading-none !text-[calc(3rem+5pt)]";

const TeamScoreRow: React.FC<{
  scores: ResolvedTeamMatchScore;
  delay: number;
  rowClassName: string;
  copyIn: AnimationConfig;
}> = ({ scores, delay, rowClassName, copyIn }) => (
  <div
    className={`flex flex-row flex-wrap items-baseline leading-none ${rowClassName}`}
  >
    {scores.prior ? (
      <ResultScoreFirstInnings
        value={scores.prior}
        animation={{ ...copyIn, delay: delay + 30 }}
        variant={SCORE_COPY_VARIANT}
        className={`${CNSW_LITE_SCORE_CLASS} mr-2`}
      />
    ) : null}
    <ResultScore
      value={scores.current}
      animation={{ ...copyIn, delay: delay + 1 }}
      variant={SCORE_COPY_VARIANT}
      className={CNSW_LITE_SCORE_CLASS}
    />
  </div>
);

const CNSWTeamScoreBar: React.FC<{
  team: "home" | "away";
  scores: ResolvedTeamMatchScore;
  delay: number;
  copyIn: AnimationConfig;
  outerBackground: string;
  innerBackground: string;
}> = ({ team, scores, delay, copyIn, outerBackground, innerBackground }) => {
  const outerJustify = team === "home" ? "justify-end" : "justify-start";
  const textAlign = team === "home" ? "right" : "left";
  const rowClassName = team === "home" ? "text-right" : "text-left";

  return (
    <div
      className={`${CNSW_SCORE_OUTER_ROW_CLASS} ${outerJustify}`}
      style={{ background: outerBackground }}
    >
      <div
        className={CNSW_SCORE_INNER_BOX_CLASS}
        style={{
          background: innerBackground,
          minWidth: `${CNSW_SCORE_INNER_MIN_WIDTH_PX}px`,
          textAlign,
        }}
      >
        <TeamScoreRow
          scores={scores}
          delay={delay}
          rowClassName={rowClassName}
          copyIn={copyIn}
        />
      </div>
    </div>
  );
};

/** CNSW lite — plain names (top); scores in high + strong nested bars like PlayerStatsCNSW. */
export const LiteTeamsSectionCNSW: React.FC<{
  match: MatchResult;
  teamsBlockHeight: number;
  delay: number;
}> = ({ match, teamsBlockHeight, delay }) => {
  const { selectedPalette, layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const copyIn = animations.text.main.copyIn;
  const scoreOuterBackground =
    selectedPalette.container.backgroundTransparent.high;
  const scoreInnerBackground =
    selectedPalette.container.backgroundTransparent.strong;

  const getAlignmentClasses = (team: "home" | "away") =>
    team === "home" ? "items-end" : "items-start";

  const getTextAlignment = (team: "home" | "away") =>
    team === "home" ? "text-right" : "text-left";

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
    <AnimatedContainer
      type="full"
      className={`${layout.borderRadius.container} flex w-full items-center justify-center p-2`}
      backgroundColor="none"
      style={{
        background: "none",
        height: `${teamsBlockHeight}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-start justify-center space-x-6">
          <div className={`flex-1 ${getTextAlignment("home")}`}>
            <ResultTeamName
              value={match.homeTeam.name.toUpperCase()}
              animation={{ ...copyIn, delay: delay + 2 }}
              variant={NAME_COPY_VARIANT}
              className={CNSW_TEAM_NAME_CLASS}
            />
          </div>
          <div className={`flex-1 ${getTextAlignment("away")}`}>
            <ResultTeamName
              value={match.awayTeam.name.toUpperCase()}
              animation={{ ...copyIn, delay: delay + 2 }}
              variant={NAME_COPY_VARIANT}
              className={CNSW_TEAM_NAME_CLASS}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-start justify-center gap-6">
          <div
            className={`flex flex-col ${getAlignmentClasses("home")} justify-start`}
          >
            <CNSWTeamScoreBar
              team="home"
              scores={homeScores}
              delay={delay}
              copyIn={copyIn}
              outerBackground={scoreOuterBackground}
              innerBackground={scoreInnerBackground}
            />
          </div>
          <div
            className={`flex flex-col ${getAlignmentClasses("away")} justify-start`}
          >
            <CNSWTeamScoreBar
              team="away"
              scores={awayScores}
              delay={delay}
              copyIn={copyIn}
              outerBackground={scoreOuterBackground}
              innerBackground={scoreInnerBackground}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
