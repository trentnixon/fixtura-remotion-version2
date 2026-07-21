import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { AnimatedText } from "../../../../../../components/typography/AnimatedText";
import { formatScoreWithOvers } from "./_utils/mudgeeraba-helpers";
import { TeamLogo as TeamLogoType } from "../../../../utils/primitives/_types/TeamLogoProps";
import { Team } from "../../../_types/types";
import { STEEP_HERO_TOP_LEFT, LogoWell } from "../../../../../../templates/variants/mudgeeraba/design";

export interface MudgeerabaSingleTeamHeaderProps {
  team: Team;
  teamLogo: TeamLogoType | null;
  delay: number;
  outerContainer?: React.CSSProperties;
}

export const MudgeerabaSingleTeamHeader: React.FC<MudgeerabaSingleTeamHeaderProps> = ({
  team,
  teamLogo,
  delay,
  outerContainer,
}) => {
  const { animations } = useAnimationContext();
  const { fontClasses, colors, selectedPalette } = useThemeContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container.main.itemContainer;
  const primaryColor = colors.primary;

  // Theme colors for backgrounds
  const backgroundColorMain = selectedPalette.background.main;
  const backgroundColorContainer = selectedPalette.container.backgroundTransparent.strong;

  // Format score with overs
  const scoreDisplay = formatScoreWithOvers(team.score, team.overs);

  // Logo size - circular container
  const logoSize = 70; // pixels
  const stripeHeight = 60; // Height for each white/black stripe

  return (
    <AnimatedContainer
      type="full"
      className="w-full relative flex flex-col"
      backgroundColor="none"
      style={{
        ...outerContainer,
        backgroundColor: backgroundColorMain,
      }}
      animation={ContainerAnimations.containerIn}
      animationDelay={delay}
    >
      {/* Team Row (Name, Logo, Score) */}
      <div
        className="w-full flex items-center relative"
        style={{
          height: `${stripeHeight}px`,
          backgroundColor: backgroundColorContainer,
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        {/* Team Name - Left Side */}
        <div className="flex-1 px-6 py-4 min-w-0">
          <AnimatedText
            type="ResultTeamName"
            animation={{ ...TextAnimations.copyIn, delay: delay + 15 }}
            variant="onContainerCopy"
            className="truncate"
            style={{ fontFamily: fontClasses.copy?.family }}
          >
            {team.name}
          </AnimatedText>
        </div>

        {/* Logo and Score Section - Right Side */}
        <div className="flex items-center relative h-full" style={{ paddingRight: "12px" }}>
          <LogoWell
            variant="circle"
            size={logoSize}
            emphasisBorder
            className="z-30 relative self-center shrink-0"
            style={{ marginRight: "-10px" }}
          >
            <TeamLogo
              logo={teamLogo || null}
              teamName={team.name}
              delay={delay + 20}
              size={20}
              fit="cover"
            />
          </LogoWell>

          {/* Solid primary angled score bar - angle matches PlayerStats (10% slope) */}
          <div
            className="font-bold relative z-20 overflow-hidden h-full flex items-center"
            style={{
              backgroundColor: primaryColor,
              // Steep hero wedge aligned to official angle system
              clipPath: STEEP_HERO_TOP_LEFT,
              marginLeft: "-8px", // Overlap with logo border
              paddingLeft: "32px",
              paddingRight: "64px",
            }}
          >
            <AnimatedText
              type="ResultScore"
              animation={{ ...TextAnimations.copyIn, delay: delay + 25 }}
              variant="onContainerCopyNoBg"
              className="text-3xl font-bold whitespace-nowrap"
              style={{ fontFamily: fontClasses.title?.family }}
            >
              {scoreDisplay}
            </AnimatedText>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default MudgeerabaSingleTeamHeader;
