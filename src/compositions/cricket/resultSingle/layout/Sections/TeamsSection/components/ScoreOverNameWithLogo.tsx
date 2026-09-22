import React from "react";
import { AnimatedContainer } from "../../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../../utils/primitives/TeamLogo";
import { ResultTeamName } from "../../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "../_types/TeamsSectionProps";
import { truncateText } from "../_utils/helpers";
import { resolveTeamMatchScore } from "../../../../../utils/teamMatchScore";
import { TeamScoreStack } from "../../../../../utils/TeamScoreStack";

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

  const logoSize = `w-[110px] h-[110px]`;

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
      className="w-full flex justify-between items-center p-4"
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full justify-between items-center space-x-8">
        <div className="flex-1 flex flex-col items-start space-y-4">
          <ResultTeamName
            value={truncateText(homeTeam.name, 30).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-left"
            variant="onContainerCopyNoBg"
          />
          <div className="flex flex-row items-center space-x-8 justify-start">
            <div className={logoSize}>
              <TeamLogo
                logo={homeTeamLogo || null}
                teamName={homeTeam.name}
                delay={delay + 5}
              />
            </div>
            <TeamScoreStack
              scores={homeScores}
              delay={delay}
              align="start"
              textAnimations={TextAnimations}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-end space-y-4">
          <ResultTeamName
            value={truncateText(awayTeam.name, 30).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-right"
            variant="onContainerCopyNoBg"
          />
          <div className="flex flex-row items-center space-x-8 justify-end">
            <TeamScoreStack
              scores={awayScores}
              delay={delay}
              align="end"
              textAnimations={TextAnimations}
            />
            <div className={logoSize}>
              <TeamLogo
                logo={awayTeamLogo || null}
                teamName={awayTeam.name}
                delay={delay + 10}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default ScoreOverNameWithLogo;
