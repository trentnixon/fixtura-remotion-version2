import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultScore } from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "./type";

export const TeamsSectionLogoAbove: React.FC<TeamsSectionProps> = ({
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
  const backgroundColor = selectedPalette.container.main;

  // Logo size based on height
  const logoSize = `w-[100px] h-[100px]`;

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex flex-col justify-center items-center py-2 px-4"
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      {/* Logos row at the top */}
      <div className="flex justify-center items-center  w-full">
        <div className="flex items-center space-x-4 mr-6">
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
        <div className="flex items-center space-x-4 ml-6">
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
      <div className="flex w-full justify-around items-center">
        {/* Home team score and name */}
        <div className="flex items-end">
          <ResultScore
            value={homeTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            className="text-right"
          />
        </div>

        {/* Away team score and name */}
        <div className="flex items-start">
          <ResultScore
            value={awayTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            className="text-left"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionLogoAbove;
