import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";

import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultScore } from "../../../../utils/primitives/ResultScore";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { HorizontalTeamsSectionProps } from "./type";

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const Horizontal_SingleTeam_LogoWithName_Score: React.FC<
  HorizontalTeamsSectionProps
> = ({ type, Team, TeamLogo: teamLogo, delay, outerContainer }) => {
  const { selectedPalette, layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get colors from theme
  const backgroundColor =
    selectedPalette.container.backgroundTransparent.strong;
  const primaryColor = selectedPalette.background.main;

  // Logo size - made larger to overlap the top edge
  const logoSize = `w-[100px] h-[100px]`;

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
        className={`flex w-full justify-between items-center  p-2 relative ${layout.borderRadius.container}`}
        style={{
          background: backgroundColor,
        }}
      >
        {/* Left side: Logo and Team Name */}
        <div className="flex items-center flex-1 relative">
          {/* Logo positioned absolutely to overlap top edge */}
          <div className={`${logoSize} absolute  left-0`}>
            <TeamLogo
              logo={teamLogo || null}
              teamName={Team.name}
              delay={delay + 5}
            />
          </div>

          {/* Team Name - positioned to account for logo space */}
          <div className="flex items-center ml-36">
            <ResultTeamName
              value={truncateText(Team.name, 50).toUpperCase()}
              animation={{ ...TextAnimations.copyIn, delay: delay + 2 }}
              className="text-black"
            />
          </div>
        </div>

        {/* Right side: Score in pink box */}
        <AnimatedContainer
          type="full"
          backgroundColor="none"
          className={`text-white px-4 py-2 font-bold text-lg flex items-center shadow-md ${layout.borderRadius.container}`}
          style={{ backgroundColor: primaryColor }}
          animation={animations.container.main.itemContainerInner.containerIn}
          animationDelay={delay + 15}
        >
          {type === "Two Day+" &&
            Team.homeScoresFirstInnings &&
            Team.homeScoresFirstInnings !== "1" && (
              <ResultScore
                value={Team.homeScoresFirstInnings}
                animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                className="mr-2"
                variant="onContainerCopyNoBg"
              />
            )}
          <ResultScore
            value={Team.score}
            animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
            variant="onContainerCopyNoBg"
          />
        </AnimatedContainer>
      </div>
    </AnimatedContainer>
  );
};

export default Horizontal_SingleTeam_LogoWithName_Score;
