import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
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
  backgroundColor,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

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
      <div className="flex flex-row w-full items-center justify-between">
        {/* Logos row */}
        <div className="flex flex-row items-center justify-between flex-2">
          <ResultScore
            value={homeTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
          />
          <div className={`${logoSize} mr-4 overflow-hidden`}>
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 15}
            />
          </div>
        </div>
        <div className="text-3xl font-bold flex-1 text-center">VS</div>
        <div className="flex flex-row items-center justify-between flex-2">
          <div className={`${logoSize} ml-4 overflow-hidden`}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 20}
            />
          </div>
          <ResultScore
            value={awayTeam.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionLogoAndScore;
