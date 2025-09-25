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

interface ExtendedTeamsSectionProps extends TeamsSectionProps {
  backgroundColor?: string;
  alignment?: "start" | "end" | "alternate";
  CopyVariant?: string;
}

export const TeamsSectionScoreOverTeamNameOnly: React.FC<
  ExtendedTeamsSectionProps
> = ({
  homeTeam,
  awayTeam,
  height = 200,
  delay,
  type,
  backgroundColor,
  alignment = "start",
  CopyVariant = "onContainerCopy",
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get background color from theme or use provided backgroundColor
  const containerBackgroundColor =
    backgroundColor || selectedPalette.container.backgroundTransparent.medium;

  // Determine alignment classes based on alignment prop
  const getAlignmentClasses = (team: "home" | "away") => {
    switch (alignment) {
      case "end":
        return team === "home" ? "items-end" : "items-start";
      case "alternate":
        return team === "home" ? "items-start" : "items-end";
      case "start":
      default:
        return team === "home" ? "items-start" : "items-end";
    }
  };

  const getTextAlignment = (team: "home" | "away") => {
    switch (alignment) {
      case "end":
        return team === "home" ? "text-right" : "text-left";
      case "alternate":
        return team === "home" ? "text-left" : "text-right";
      case "start":
      default:
        return team === "home" ? "text-left" : "text-right";
    }
  };

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
      className="w-full flex justify-center items-center p-2"
      backgroundColor="none"
      style={{
        background: containerBackgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex flex-col w-full">
        {/* Scores row */}
        <div className="grid grid-cols-2 gap-6 justify-center items-start">
          <div
            className={`flex flex-col ${getAlignmentClasses("home")} justify-end`}
          >
            {homeFirstInnings.show && (
              <ResultScoreFirstInnings
                value={homeFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
                variant={CopyVariant}
              />
            )}
            <ResultScore
              value={normalizeScore(homeTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
              className={`flex-1 ${getTextAlignment("home")}`}
              variant={CopyVariant}
            />
          </div>
          <div
            className={`flex flex-col ${getAlignmentClasses("away")} justify-end`}
          >
            {awayFirstInnings.show && (
              <ResultScoreFirstInnings
                value={awayFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}
            <ResultScore
              value={normalizeScore(awayTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
              className={`flex-1 ${getTextAlignment("away")}`}
              variant={CopyVariant}
            />
          </div>
        </div>

        {/* Team names row */}
        <div className="flex justify-center items-start space-x-6">
          <div className={`flex-1 ${getTextAlignment("home")}`}>
            <ResultTeamName
              value={truncateText(homeTeam.name, 30).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              variant={CopyVariant}
            />
          </div>
          <div className={`flex-1 ${getTextAlignment("away")}`}>
            <ResultTeamName
              value={truncateText(awayTeam.name, 30).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              variant={CopyVariant}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionScoreOverTeamNameOnly;
