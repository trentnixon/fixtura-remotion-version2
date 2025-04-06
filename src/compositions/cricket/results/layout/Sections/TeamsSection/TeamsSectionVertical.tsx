import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultScore } from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "./type";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const TeamsSectionVertical: React.FC<TeamsSectionProps> = ({
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
        {/* Logos row */}
        <div className="flex justify-center items-center space-x-10 mb-2">
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 3}
            />
          </div>
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 3}
            />
          </div>
        </div>

        {/* Scores row */}
        <div className="flex justify-center items-center space-x-20">
          <ResultScore
            value={homeTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />
          <ResultScore
            value={awayTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />
        </div>

        {/* Team names row */}
        <div className="flex justify-center items-center space-x-6">
          <div className="flex-1 text-center">
            <ResultTeamName
              value={truncateText(homeTeam.name, 30).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className="text-center"
            />
          </div>
          <div className="flex-1 text-center">
            <ResultTeamName
              value={truncateText(awayTeam.name, 30).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className="text-center"
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionVertical;
