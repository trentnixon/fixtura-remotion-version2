import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import {
  LogoPlate,
  useBrickworkTypography,
} from "../../../../../../templates/variants/brickwork/design";
import { TeamsSectionProps } from "./_types/TeamsSectionProps";
import { resolveTeamMatchScore } from "../../../../utils/teamMatchScore";
import { TeamScoreStack } from "../../../../utils/TeamScoreStack";

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
  const { displayFont } = useBrickworkTypography();
  const TextAnimations = animations.text.main;
  const scoreFontFamily = displayFont;

  // Logo fits container height (square, capped at container)
  const logoSize = containerHeight ? Math.min(containerHeight, 120) : 90;

  const homeScores = resolveTeamMatchScore(
    type,
    homeTeam.score,
    homeTeam.homeScoresFirstInnings,
  );
  const awayScores = resolveTeamMatchScore(
    type,
    awayTeam.score,
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
            <TeamScoreStack
              scores={homeScores}
              delay={delay}
              align="center"
              textAnimations={TextAnimations}
              variant="onContainerCopy"
              fontFamily={scoreFontFamily}
              scoreClassName="font-normal leading-none"
            />
          </div>
          <LogoPlate
            mode="preserve"
            size={logoSize}
            logo={homeTeamLogo || null}
            teamName={homeTeam.name}
            delay={delay + 15}
          />
        </div>
        <div
          className="flex flex-row items-center justify-between flex-2 rounded h-full"
          style={backgroundColor ? { backgroundColor } : undefined}
        >
          <LogoPlate
            mode="preserve"
            size={logoSize}
            logo={awayTeamLogo || null}
            teamName={awayTeam.name}
            delay={delay + 20}
          />
          <div className="flex flex-1 flex-col items-center justify-center px-2 h-full">
            <TeamScoreStack
              scores={awayScores}
              delay={delay}
              align="center"
              textAnimations={TextAnimations}
              variant="onContainerCopy"
              fontFamily={scoreFontFamily}
              scoreClassName="font-normal leading-none"
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionLogoAndScoreBrickWork;
