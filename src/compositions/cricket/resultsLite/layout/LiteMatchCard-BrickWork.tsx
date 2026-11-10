import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { AnimationConfig } from "../../../../components/typography/config/animations";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import {
  getBrickworkColourRoles,
  LogoPlate,
  useBrickworkTypography,
} from "../../../../templates/variants/brickwork/design";
import { MatchResult } from "../../results/_types/types";
import { ResultMetaData } from "../../utils/primitives/ResultMetaData";
import { ResultTeamName } from "../../utils/primitives/ResultTeamName";
import { resolveTeamMatchScore } from "../../utils/teamMatchScore";
import { TeamScoreStack } from "../../utils/TeamScoreStack";
import {
  calculateAnimationOutFrame,
  calculateDelay,
} from "../../results/controller/MatchRow/_utils/calculations";

const FIXTURE_STATUS_TAG_CLASS = "text-center w-full mx-8";
const LOGO_SIZE = 104;

/** `separator` = inner edge toward the centre divider. */
const TeamHalf: React.FC<{
  teamName: string;
  logo: MatchResult["teamHomeLogo"];
  scores: ReturnType<typeof resolveTeamMatchScore>;
  delay: number;
  copyIn: AnimationConfig;
  logoDelay: number;
  separator: "leading" | "trailing";
  surfaceSubtle: string;
  displayFont: string;
  ruleColor: string;
}> = ({
  teamName,
  logo,
  scores,
  delay,
  copyIn,
  logoDelay,
  separator,
  surfaceSubtle,
  displayFont,
  ruleColor,
}) => {
  const scoreMark = (
    <TeamScoreStack
      scores={scores}
      delay={delay}
      align={separator === "trailing" ? "end" : "start"}
      textAnimations={{ copyIn }}
      variant="onContainerCopy"
      fontFamily={displayFont}
      scoreClassName="font-normal !leading-none shrink-0"
      currentScoreClassName="!text-7xl"
    />
  );
  const logoMark = (
    <LogoPlate
      mode="preserve"
      logo={logo || null}
      teamName={teamName}
      delay={logoDelay}
      size={LOGO_SIZE}
    />
  );

  const scoreRowClass =
    separator === "trailing"
      ? "flex w-full flex-row items-center justify-end gap-8"
      : "flex w-full flex-row items-center justify-start gap-8";

  return (
    <div
      className="flex flex-1 min-w-0 flex-col gap-0 leading-none rounded-none overflow-hidden p-4"
      style={{
        backgroundColor: surfaceSubtle,
        borderLeft:
          separator === "leading" ? `1px solid ${ruleColor}` : undefined,
      }}
    >
      <ResultTeamName
        value={teamName.toUpperCase()}
        animation={{ ...copyIn, delay: delay + 2 }}
        className={`w-full pb-4 !leading-tight !tracking-wide ${
          separator === "trailing" ? "text-right" : "text-left"
        }`}
        variant="onContainerCopy"
      />
      <div className={scoreRowClass}>
        {separator === "trailing" ? (
          <>
            {scoreMark}
            {logoMark}
          </>
        ) : (
          <>
            {logoMark}
            {scoreMark}
          </>
        )}
      </div>
    </div>
  );
};

export const LiteMatchCardBrickWork: React.FC<{
  match: MatchResult;
  index: number;
}> = ({ match, index }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const { data } = useVideoDataContext();
  const { displayFont, copyFont } = useBrickworkTypography();
  const roles = getBrickworkColourRoles(selectedPalette);
  const copyIn = animations.text.main.copyIn;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(
    data.timings?.FPS_SCORECARD,
  );
  const containerAnimation = animations.container.main.itemContainer;
  const surfaceSubtle = roles.neutral.surfaceSubtle;
  const ruleColor = roles.primary.rule;

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
      {match.status === "Abandoned" ? (
        <ResultMetaData
          value="ABANDONED"
          animation={{ ...copyIn, delay: delay + 1 }}
          className={FIXTURE_STATUS_TAG_CLASS}
          variant="onBackgroundMain"
          fontFamily={copyFont}
        />
      ) : null}
      <AnimatedContainer
        type="full"
        className="rounded-none w-full mx-8 overflow-hidden"
        backgroundColor="none"
        style={{ width: "100%", height: "auto" }}
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <div className="flex w-full items-stretch">
          <TeamHalf
            teamName={match.homeTeam.name}
            logo={match.teamHomeLogo}
            scores={homeScores}
            delay={delay + 4}
            copyIn={copyIn}
            logoDelay={delay + 15}
            separator="trailing"
            surfaceSubtle={surfaceSubtle}
            displayFont={displayFont}
            ruleColor={ruleColor}
          />
          <TeamHalf
            teamName={match.awayTeam.name}
            logo={match.teamAwayLogo}
            scores={awayScores}
            delay={delay + 8}
            copyIn={copyIn}
            logoDelay={delay + 20}
            separator="leading"
            surfaceSubtle={surfaceSubtle}
            displayFont={displayFont}
            ruleColor={ruleColor}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};
