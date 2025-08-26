import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "./type";
import { getFirstInningsDisplay, normalizeScore, truncateText } from "./utils";

export const TeamsSectionScoreOverTeamNameOnly: React.FC<TeamsSectionProps> = ({
  homeTeam,
  awayTeam,
  height,
  delay,
  type,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get background color from theme
  const backgroundColor =
    selectedPalette.container.backgroundTransparent.medium;

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
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex flex-col w-full">
        {/* Scores row */}
        <div className="grid grid-cols-2 gap-6 justify-center items-start">
          <div className="flex flex-col items-start justify-end">
            {homeFirstInnings.show && (
              <ResultScoreFirstInnings
                value={homeFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}
            <ResultScore
              value={normalizeScore(homeTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
              className="flex-1 text-left"
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
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
              className="flex-1 text-right"
            />
          </div>
        </div>

        {/* Team names row */}
        <div className="flex justify-center items-start space-x-6">
          <div className="flex-1 text-left">
            <ResultTeamName
              value={truncateText(homeTeam.name, 30).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            />
          </div>
          <div className="flex-1 text-right">
            <ResultTeamName
              value={truncateText(awayTeam.name, 30).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionScoreOverTeamNameOnly;
