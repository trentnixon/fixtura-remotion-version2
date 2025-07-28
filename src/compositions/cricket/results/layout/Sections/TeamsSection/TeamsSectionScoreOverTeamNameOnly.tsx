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
  type,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get background color from theme
  const backgroundColor =
    selectedPalette.container.backgroundTransparent.medium;

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
            {type === "Two Day+" && (
              <ResultScoreFirstInnings
                value={homeTeam.homeScoresFirstInnings || "Yet to Bat"}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}
            <ResultScore
              value={homeTeam.score}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
              className="flex-1 text-left"
            />
          </div>
          <div className="flex flex-col items-end justify-end">
            {type === "Two Day+" && (
              <ResultScoreFirstInnings
                value={awayTeam.awayScoresFirstInnings || "Yet to Bat"}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}
            <ResultScore
              value={awayTeam.score}
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
