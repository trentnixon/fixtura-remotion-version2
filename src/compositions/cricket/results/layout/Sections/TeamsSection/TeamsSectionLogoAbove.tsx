import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "./type";
import { getFirstInningsDisplay, normalizeScore } from "./utils";

export const TeamsSectionLogoAbove: React.FC<TeamsSectionProps> = ({
  type,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  height,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get background color from theme
  const backgroundColor =
    selectedPalette.container.backgroundTransparent.medium;

  // Logo size based on height
  const logoSize = `w-[100px] h-[100px]`;

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
      className="w-full flex flex-col justify-center items-center py-2 px-4 rounded-lg "
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      {/* Logos row at the top */}
      <div className="grid grid-cols-2 gap-12 justify-center items-center w-full">
        <div className="flex items-center space-x-4 justify-end">
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 3}
            />
          </div>
          <ResultTeamName
            value={homeTeam.name.toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-left"
          />
        </div>
        <div className="flex items-center space-x-4 justify-start">
          <ResultTeamName
            value={awayTeam.name.toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-right"
          />
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 3}
            />
          </div>
        </div>
      </div>

      {/* Score and team names in a row */}
      <div className="grid grid-cols-2 gap-12 w-full justify-center items-center">
        {/* Home team score and name */}
        <div className="flex items-center space-x-2 justify-end">
          {homeFirstInnings.show && (
            <ResultScoreFirstInnings
              value={homeFirstInnings.value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
            />
          )}
          <ResultScore
            value={normalizeScore(homeTeam.score)}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            className="text-right"
          />
        </div>

        {/* Away team score and name */}
        <div className="flex items-center space-x-2 justify-start">
          {awayFirstInnings.show && (
            <ResultScoreFirstInnings
              value={awayFirstInnings.value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
            />
          )}
          <ResultScore
            value={normalizeScore(awayTeam.score)}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            className="text-left"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionLogoAbove;
