import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
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

export const ScoreOverNameWithLogo: React.FC<TeamsSectionProps> = ({
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  height,
  delay,
  backgroundColor,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Logo size based on height
  const logoSize = `w-[110px] h-[110px]`;

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-4"
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full justify-between items-center">
        {/* Home team score and name */}
        <div className="flex-1 flex flex-col items-end">
          <ResultScore
            value={homeTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />

          <ResultTeamName
            value={truncateText(homeTeam.name, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-right"
          />
        </div>

        <div className="flex justify-center items-center mx-8 space-x-6">
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 5}
            />
          </div>
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 10}
            />
          </div>
        </div>

        {/* Away team score and name */}
        <div className="flex-1 flex flex-col items-start">
          <ResultScore
            value={awayTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />
          <ResultTeamName
            value={truncateText(awayTeam.name, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-left"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default ScoreOverNameWithLogo;
