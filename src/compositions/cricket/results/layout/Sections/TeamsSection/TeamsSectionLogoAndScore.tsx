import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../../../utils/primitives/ResultScore";

import { TeamsSectionProps } from "./type";
import { getFirstInningsDisplay, normalizeScore } from "./utils";
import { AnimatedText } from "../../../../../../components/typography";

export const TeamsSectionLogoAndScore: React.FC<TeamsSectionProps> = ({
  type,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  delay,
  outerContainer,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Logo size based on height
  const logoSize = `w-[90px] h-[90px]`;

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
      className="w-full flex justify-center items-center p-4"
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex flex-row w-full items-center justify-between">
        {/* Logos row */}

        <div className="flex flex-row items-center justify-between flex-2">
          <div className="flex flex-col items-end justify-end">
            {homeFirstInnings.show && (
              <ResultScoreFirstInnings
                value={homeFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}

            <ResultScore
              value={normalizeScore(homeTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
            />
          </div>
          <div className={`${logoSize} mr-4 overflow-hidden`}>
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 15}
            />
          </div>
        </div>
        <div className="text-3xl font-bold flex-1 text-center">
          <AnimatedText
            type="ResultVS"
            variant="onContainerCopy"
            animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
          >
            VS
          </AnimatedText>
        </div>
        <div className="flex flex-row items-center justify-between flex-2">
          <div className={`${logoSize} ml-4 overflow-hidden`}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 20}
            />
          </div>
          <div className="flex flex-col items-end justify-end">
            {awayFirstInnings.show && (
              <ResultScoreFirstInnings
                value={awayFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}
            <ResultScore
              value={normalizeScore(awayTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionLogoAndScore;
