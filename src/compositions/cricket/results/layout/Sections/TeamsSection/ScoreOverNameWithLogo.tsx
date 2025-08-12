import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import {
  ResultScore,
  ResultScoreFirstInnings,
} from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { TeamsSectionProps } from "./type";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const ScoreOverNameWithLogo: React.FC<TeamsSectionProps> = ({
  type,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  delay,
  outerContainer,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Logo size based on height
  const logoSize = `w-[110px] h-[110px]`;

  // Normalizes scores so that "N/A" renders as "Yet to Bat"
  const normalizeScore = (rawScore?: string | null): string => {
    const score = (rawScore || "").trim();
    if (score.length === 0 || score.toUpperCase() === "N/A") {
      return "Yet to Bat";
    }
    return score;
  };

  // Computes whether to show the first-innings helper row and which value to show
  const getFirstInningsDisplay = (
    matchType: string,
    teamScore: string | undefined,
    inningsValue?: string | null,
  ): { show: boolean; value: string } => {
    if (matchType !== "Two Day+") {
      return { show: false, value: "" };
    }

    // Only show a legitimate first-innings score above the main score when the match is in second innings.
    // Never show placeholders like "1", "N/A" or "Yet to Bat".
    const value = (inningsValue || "").trim();
    if (value.length === 0) return { show: false, value: "" };

    const lowered = value.toLowerCase();
    if (lowered === "1" || lowered === "n/a" || lowered === "yet to bat") {
      return { show: false, value: "" };
    }

    // Heuristic: valid first-innings score strings often contain a wicket/runs pattern (e.g., 10/97),
    // a declaration marker (d/), or an ampersand '&' separating innings summaries.
    const looksLikeScore =
      /\d+\s*\/\s*\d+/.test(value) ||
      /\bd\//i.test(value) ||
      value.includes("&");
    if (!looksLikeScore) {
      return { show: false, value: "" };
    }

    return { show: true, value };
  };

  const homeNormalizedScore = normalizeScore(homeTeam.score);
  const awayNormalizedScore = normalizeScore(awayTeam.score);

  const homeFirstInnings = getFirstInningsDisplay(
    type,
    homeTeam.score,
    homeTeam.homeScoresFirstInnings,
  );
  const awayFirstInnings = getFirstInningsDisplay(
    type,
    awayTeam.score,
    awayTeam.awayScoresFirstInnings,
  );

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-4"
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex w-full justify-between items-center">
        {/* Home team score and name */}
        <div className="flex-1 flex flex-col items-end">
          {homeFirstInnings.show && (
            <ResultScoreFirstInnings
              value={homeFirstInnings.value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              variant="onContainerCopyNoBg"
            />
          )}

          <ResultScore
            value={homeNormalizedScore}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            variant="onContainerCopyNoBg"
          />

          <ResultTeamName
            value={truncateText(homeTeam.name, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-right"
            variant="onContainerCopyNoBg"
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
          {awayFirstInnings.show && (
            <ResultScoreFirstInnings
              value={awayFirstInnings.value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 30 }}
              variant="onContainerCopyNoBg"
            />
          )}
          <ResultScore
            value={awayNormalizedScore}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            variant="onContainerCopyNoBg"
          />
          <ResultTeamName
            value={truncateText(awayTeam.name, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
            className="text-left"
            variant="onContainerCopyNoBg"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default ScoreOverNameWithLogo;
