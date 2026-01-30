import React from "react";
import { AnimatedContainer } from "../../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../../utils/primitives/TeamLogo";
import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "../_types/TeamsSectionProps";
import { truncateText, normalizeScore, getFirstInningsDisplay } from "../_utils/helpers";

export const ScoreOverNameWithLogo: React.FC<TeamsSectionProps> = ({
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
  const logoSize = `w-[110px] h-[110px]`;

  const homeNormalizedScore = normalizeScore(homeTeam.score);
  const awayNormalizedScore = normalizeScore(awayTeam.score);

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
      className="w-full flex justify-between items-center p-4"
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full justify-between items-center space-x-8">
        {/* Home team score and name */}
        <div className="flex-1 flex flex-col items-start space-y-4">
          <div className="flex flex-col items-start">
            {homeFirstInnings.show && (
              <ResultScoreFirstInnings
                value={homeFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
                variant="onContainerCopyNoBg"
              />
            )}
            <div className="flex flex-row items-center space-x-8 justify-start">
              <div className={`${logoSize}`}>

                <TeamLogo
                  logo={homeTeamLogo || null}
                  teamName={homeTeam.name}
                  delay={delay + 5}
                />
              </div>
              <ResultScore
                value={homeNormalizedScore}
                animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                variant="onContainerCopyNoBg"
              />

            </div>
          </div>
          <ResultTeamName
            value={truncateText(homeTeam.name, 30).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-left"
            variant="onContainerCopyNoBg"
          />
        </div>

        {/* Away team score and name */}
        <div className="flex-1 flex flex-col items-end space-y-4">
          {awayFirstInnings.show && (
            <ResultScoreFirstInnings
              value={awayFirstInnings.value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              variant="onContainerCopyNoBg"
            />
          )}
          <div className="flex flex-row items-center space-x-8 justify-end">

            <ResultScore
              value={awayNormalizedScore}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
              variant="onContainerCopyNoBg"
            />
            <div className={`${logoSize}`}>
              <TeamLogo
                logo={awayTeamLogo || null}
                teamName={awayTeam.name}
                delay={delay + 10}
              />
            </div>
          </div>
          <ResultTeamName
            value={truncateText(awayTeam.name, 30).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-right"
            variant="onContainerCopyNoBg"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default ScoreOverNameWithLogo;
