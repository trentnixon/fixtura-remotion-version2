import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultScore } from "../../../../utils/primitives/ResultScore";

import { TeamsSectionProps } from "./type";

export const TeamsSectionLogoAndScore: React.FC<TeamsSectionProps> = ({
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
  const logoSize = `w-[90px] h-[90px]`;

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center p-8"
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex flex-row w-full items-center justify-between">
        {/* Logos row */}
        <div className="flex flex-row items-center justify-between">
          <div className={`${logoSize} mr-4 `}>
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 3}
            />
          </div>
          <ResultScore
            value={homeTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />
        </div>
        <div className="text-2xl font-bold">VS</div>
        <div className="flex flex-row items-center justify-between">
          <ResultScore
            value={awayTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />
          <div className={`${logoSize} ml-4 `}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 3}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionLogoAndScore;
