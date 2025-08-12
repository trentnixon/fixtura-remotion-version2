import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { TeamsSectionProps } from "./type";
import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import TeamLogo from "../../../../utils/primitives/TeamLogo";
import { ResultSyntax } from "../../../../utils/primitives/ResultSyntax";

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
  const backgroundColor = selectedPalette.container.backgroundTransparent.high;

  // Logo size based on height - larger for single match display
  const logoSize = `w-[120px] h-[120px]`;

  // Normalizes scores so that "N/A" renders as "Yet to Bat"
  const normalizeScore = (rawScore?: string | null): string => {
    const score = (rawScore || "").trim();
    if (score.length === 0 || score.toUpperCase() === "N/A") {
      return "Yet to Bat";
    }
    return score;
  };

  // Only render a legitimate first-innings string (not placeholders)
  const getFirstInningsDisplay = (
    matchType: string,
    inningsValue?: string | null,
  ): { show: boolean; value: string } => {
    if (matchType !== "Two Day+") {
      return { show: false, value: "" };
    }
    const value = (inningsValue || "").trim();
    if (value.length === 0) return { show: false, value: "" };
    const lowered = value.toLowerCase();
    if (lowered === "1" || lowered === "n/a" || lowered === "yet to bat") {
      return { show: false, value: "" };
    }
    const looksLikeScore =
      /\d+\s*\/\s*\d+/.test(value) ||
      /\bd\//i.test(value) ||
      value.includes("&");
    if (!looksLikeScore) return { show: false, value: "" };
    return { show: true, value };
  };

  // Normalize overs: hide when value is missing or "N/A"
  const normalizeOvers = (raw?: string | null): string | null => {
    const value = (raw || "").trim();
    if (value.length === 0) return null;
    if (value.toUpperCase() === "N/A") return null;
    return value;
  };

  const homeOvers = normalizeOvers(homeTeam.overs);
  const awayOvers = normalizeOvers(awayTeam.overs);

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
        {/* Home team section */}
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
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-end">
              <div className="flex flex-col items-end">
                {getFirstInningsDisplay(type, homeTeam.homeScoresFirstInnings)
                  .show && (
                  <ResultScoreFirstInnings
                    value={
                      getFirstInningsDisplay(
                        type,
                        homeTeam.homeScoresFirstInnings,
                      ).value
                    }
                    animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
                  />
                )}
                <ResultScore
                  value={normalizeScore(homeTeam.score)}
                  animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                />
              </div>
              {homeOvers && (
                <ResultSyntax
                  value={`${homeOvers}`}
                  animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                />
              )}
            </div>
            <ResultTeamName
              value={homeTeam.name.toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className="text-center"
            />
          </div>
        </div>

        {/* VS or match status in the middle */}
        <div className="flex flex-col items-center px-4 col-span-1">
          <ResultTeamName
            value={`VS`}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-center"
          />
        </div>

        {/* Away team section */}
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
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-end">
              <div className="flex flex-col items-end">
                {getFirstInningsDisplay(type, awayTeam.awayScoresFirstInnings)
                  .show && (
                  <ResultScoreFirstInnings
                    value={
                      getFirstInningsDisplay(
                        type,
                        awayTeam.awayScoresFirstInnings,
                      ).value
                    }
                    animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
                  />
                )}
                <ResultScore
                  value={normalizeScore(awayTeam.score)}
                  animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                />
              </div>
              {awayOvers && (
                <ResultSyntax
                  value={`${awayOvers}`}
                  animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                />
              )}
            </div>
            <ResultTeamName
              value={awayTeam.name.toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className="text-center"
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

// Add default export
export default LogoWithScoreOverName;
