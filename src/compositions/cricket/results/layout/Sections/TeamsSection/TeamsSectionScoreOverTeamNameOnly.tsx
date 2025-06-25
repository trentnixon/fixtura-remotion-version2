import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { ResultScore } from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "./type";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const TeamsSectionScoreOverTeamNameOnly: React.FC<TeamsSectionProps> = ({
  homeTeam,
  awayTeam,
  height,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get background color from theme
  const backgroundColor = selectedPalette.container.main;

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
        <div className="flex justify-center items-start space-x-6">
          <ResultScore
            value={homeTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            className="flex-1 text-left"
          />
          <ResultScore
            value={awayTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            className="flex-1 text-right"
          />
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
