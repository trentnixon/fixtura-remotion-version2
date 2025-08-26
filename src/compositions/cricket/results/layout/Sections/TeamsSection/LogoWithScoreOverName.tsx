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

export const LogoWithScoreOverName: React.FC<TeamsSectionProps> = ({
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
  const logoSize = `w-[110px] h-[110px]`;

  // helpers imported from utils

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
      className="w-full flex justify-between items-center p-2"
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full justify-between items-start ">
        {/* Home team score and name */}
        <div className="flex justify-center items-center mr-4">
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 5}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start">
          {homeFirstInnings.show && (
            <ResultScoreFirstInnings
              value={homeFirstInnings.value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
            />
          )}
          <ResultScore
            value={normalizeScore(homeTeam.score)}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />

          <ResultTeamName
            value={truncateText(homeTeam.name, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
          />
        </div>

        {/* Away team score and name */}
        <div className="flex-1 flex flex-col items-end">
          {awayFirstInnings.show && (
            <ResultScoreFirstInnings
              value={awayFirstInnings.value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
            />
          )}
          <ResultScore
            value={normalizeScore(awayTeam.score)}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          />
          <ResultTeamName
            value={truncateText(awayTeam.name, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-right"
          />
        </div>
        <div className="flex justify-center items-center ml-4">
          <div className={`${logoSize}`}>
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 10}
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default LogoWithScoreOverName;
