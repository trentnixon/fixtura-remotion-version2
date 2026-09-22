import React from "react";
import { AnimatedContainer } from "../../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../../core/context/AnimationContext";
import { TeamsSectionProps } from "../_types/TeamsSectionProps";
import { ResultTeamName } from "../../../../../utils/primitives/ResultTeamName";
import TeamLogo from "../../../../../utils/primitives/TeamLogo";
import { ResultSyntax } from "../../../../../utils/primitives/ResultSyntax";
import { normalizeOvers } from "../_utils/helpers";
import { resolveTeamMatchScore } from "../../../../../utils/teamMatchScore";
import { TeamScoreStack } from "../../../../../utils/TeamScoreStack";

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

  const backgroundColor = selectedPalette.container.backgroundTransparent.high;
  const logoSize = `w-[120px] h-[120px]`;

  const homeOvers = normalizeOvers(homeTeam.overs);
  const awayOvers = normalizeOvers(awayTeam.overs);

  const homeScores = resolveTeamMatchScore(
    type,
    homeTeam.score,
    homeTeam.homeScoresFirstInnings,
  );
  const awayScores = resolveTeamMatchScore(
    type,
    awayTeam.score,
    awayTeam.awayScoresFirstInnings,
  );

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
      <div className="grid grid-cols-5 gap-12 justify-center items-center w-full">
        <div className="flex flex-col items-center space-y-3 col-span-2">
          <div
            className={`${logoSize} flex justify-center items-center overflow-hidden`}
          >
            <TeamLogo
              logo={homeTeamLogo || null}
              teamName={homeTeam.name}
              delay={delay + 3}
            />
          </div>
          <div className="flex flex-col items-center space-y-1">
            <ResultTeamName
              value={homeTeam.name.toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className="text-center"
            />
            <div className="flex flex-row items-end justify-center">
              <TeamScoreStack
                scores={homeScores}
                delay={delay}
                align="end"
                textAnimations={TextAnimations}
              />
              {homeOvers ? (
                <ResultSyntax
                  value={`${homeOvers}`}
                  animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-4 col-span-1">
          <ResultTeamName
            value={`VS`}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-center"
          />
        </div>

        <div className="flex flex-col items-center space-y-3 col-span-2">
          <div
            className={`${logoSize} flex justify-center items-center overflow-hidden`}
          >
            <TeamLogo
              logo={awayTeamLogo || null}
              teamName={awayTeam.name}
              delay={delay + 5}
            />
          </div>
          <div className="flex flex-col items-center space-y-1">
            <ResultTeamName
              value={awayTeam.name.toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className="text-center"
            />
            <div className="flex flex-row items-end justify-center">
              <TeamScoreStack
                scores={awayScores}
                delay={delay}
                align="end"
                textAnimations={TextAnimations}
              />
              {awayOvers ? (
                <ResultSyntax
                  value={`${awayOvers}`}
                  animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default LogoWithScoreOverName;
