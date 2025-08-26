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
import { getFirstInningsDisplay, normalizeScore, truncateText } from "./utils";

export const TeamsSectionVertical: React.FC<TeamsSectionProps> = ({
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
  const logoSize = `w-[90px] h-[90px]`;

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
      <div className="grid w-full">
        {/* Logos row */}
        <div className="grid grid-cols-2 gap-12 justify-center items-center mb-2">
          <div className="flex justify-end w-full">
            <div className={`${logoSize}`}>
              <TeamLogo
                logo={homeTeamLogo || null}
                teamName={homeTeam.name}
                delay={delay + 3}
              />
            </div>
          </div>
          <div className={`${logoSize} items-start`}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 3}
            />
          </div>
        </div>

        {/* Scores row */}
        <div className="grid grid-cols-2 gap-12 justify-center items-center">
          <div className="flex flex-col items-end justify-end">
            {homeFirstInnings.show && (
              <ResultScoreFirstInnings
                value={homeFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}
            {"  "}
            <ResultScore
              value={normalizeScore(homeTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            />
          </div>
          <div className="flex flex-col items-start justify-end">
            {awayFirstInnings.show && (
              <ResultScoreFirstInnings
                value={awayFirstInnings.value}
                animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              />
            )}
            {"  "}
            <ResultScore
              value={normalizeScore(awayTeam.score)}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            />
          </div>
        </div>

        {/* Team names row */}
        <div className="grid grid-cols-2 gap-12 justify-center items-center">
          <ResultTeamName
            value={truncateText(homeTeam.name, 30).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-right"
          />
          <ResultTeamName
            value={truncateText(awayTeam.name, 30).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-left"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default TeamsSectionVertical;
