import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { HorizontalTeamsSectionProps } from "./type";
import { MetadataMedium } from "../../../../utils/primitives/metadataMedium";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const Horizontal_SingleTeam_CNSWPrivate: React.FC<
  HorizontalTeamsSectionProps
> = ({ type, Team, delay, outerContainer, firstInningsScore }) => {
  const { selectedPalette, layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main; // Get colors from theme
  const backgroundColor = selectedPalette.background.userSecondary;
  const primaryColor = selectedPalette.background.userPrimary;

  // Normalizes scores so that "N/A" renders as "Yet to Bat"
  const normalizeScore = (rawScore?: string | null): string => {
    const score = (rawScore || "").trim();
    if (score.length === 0 || score.toUpperCase() === "N/A") {
      return "Yet to Bat";
    }
    return score;
  };

  // Only show legitimate first-innings strings
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

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-2 relative"
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      {/* Main white bar container */}
      <div
        className={`flex w-full justify-between items-center py-2 px-4 relative ${layout.borderRadius.container}`}
        style={{
          background: backgroundColor,
        }}
      >
        {/* Left side: Logo and Team Name */}
        <div className="flex items-center flex-1 relative">
          {/* Team Name - positioned to account for logo space */}
          <div className="flex items-center ">
            <ResultTeamName
              value={truncateText(Team.name, 50).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className=""
              variant="onBackgroundMain"
            />
          </div>
        </div>

        {/* Right side: Score in pink box */}
        <AnimatedContainer
          type="full"
          backgroundColor="none"
          className={`text-white px-6 py-1 font-bold text-lg flex items-center shadow-md ${layout.borderRadius.container}`}
          style={{ backgroundColor: primaryColor }}
          animation={animations.container.main.itemContainerInner.containerIn}
          animationDelay={delay + 15}
        >
          {getFirstInningsDisplay(type, firstInningsScore).show && (
            <MetadataMedium
              value={getFirstInningsDisplay(type, firstInningsScore).value}
              animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
              className="mr-2"
              variant="onBackgroundMain"
            />
          )}
          <MetadataMedium
            value={normalizeScore(Team.score)}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            variant="onBackgroundMain"
          />
        </AnimatedContainer>
      </div>
    </AnimatedContainer>
  );
};

export default Horizontal_SingleTeam_CNSWPrivate;
