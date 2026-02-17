import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../../../utils/primitives/ResultScore";

import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { TeamsSectionProps } from "./_types/TeamsSectionProps";
import { getFirstInningsDisplay, normalizeScore } from "./_utils/helpers";

/**
 * Brickwork-template-specific teams section (logos + scores).
 * Duplicated from TeamsSectionLogoAndScore for Brickwork-only customisation.
 */
export const TeamsSectionLogoAndScoreBrickWork: React.FC<TeamsSectionProps> = ({
  type,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  delay,
  outerContainer,
  height: containerHeight,
  backgroundColor,
}) => {
  const { animations } = useAnimationContext();
  const { fontClasses, fonts } = useThemeContext();
  const TextAnimations = animations.text.main;
  // Use Brickwork title font (Climate Crisis) - from theme.ts fonts.title.family
  const scoreFontFamily =
    fontClasses?.title?.family ??
    fontClasses?.heading?.family ??
    fonts?.title?.family ??
    "Climate Crisis";

  // Logo fits container height (square, capped at container)
  const logoSize = containerHeight
    ? Math.min(containerHeight, 120)
    : 90;

  const homeFirstInnings = getFirstInningsDisplay(
    type,
    homeTeam.homeScoresFirstInnings,
  );
  const awayFirstInnings = getFirstInningsDisplay(
    type,
    awayTeam.awayScoresFirstInnings,
  );

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center"
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex flex-row w-full h-full items-center justify-between gap-2">
        {/* Logos row */}

        <div
          className="flex flex-row items-center justify-between flex-2 rounded h-full"
          style={backgroundColor ? { backgroundColor } : undefined}
        >
          <div className="flex flex-1 flex-col items-center justify-center px-2 h-full">
            {homeFirstInnings.show && (
              <ResultScoreFirstInnings
                value={homeFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
                variant="onContainerCopy"
                fontFamily={scoreFontFamily}
                className="font-normal"
              />
            )}

            <ResultScore
              value={normalizeScore(homeTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              variant="onContainerCopy"
              fontFamily={scoreFontFamily}
              className="font-normal"
            />
          </div>
          <div
            className="shrink-0 overflow-hidden flex items-center justify-center"
            style={{ width: logoSize, height: logoSize }}
          >
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 15}
              imgStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
        <div
          className="flex flex-row items-center justify-between flex-2 rounded h-full"
          style={backgroundColor ? { backgroundColor } : undefined}
        >
          <div
            className="shrink-0 overflow-hidden flex items-center justify-center"
            style={{ width: logoSize, height: logoSize }}
          >
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 20}
              imgStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-2 h-full">
            {awayFirstInnings.show && (
              <ResultScoreFirstInnings
                value={awayFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
                variant="onContainerCopy"
                fontFamily={scoreFontFamily}
              />
            )}
            <ResultScore
              value={normalizeScore(awayTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              variant="onContainerCopy"
              fontFamily={scoreFontFamily}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionLogoAndScoreBrickWork;
