import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { AnimatedText } from "../../../../../../components/typography/AnimatedText";
import { MudgeerabaClubHeaderProps } from "./_types/MudgeerabaClubHeaderProps";
import { formatScoreWithOvers } from "./_utils/mudgeeraba-helpers";
import { TeamLogo as TeamLogoType } from "../../../../utils/primitives/_types/TeamLogoProps";
import { STEEP_HERO_TOP_LEFT, LogoWell } from "../../../../../../templates/variants/mudgeeraba/design";

export const MudgeerabaClubHeader: React.FC<MudgeerabaClubHeaderProps> = ({
  match,
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
  const backgroundColorContainer = selectedPalette.container.backgroundTransparent.high;

  // Format scores with overs for both teams
  const homeScoreDisplay = formatScoreWithOvers(match.homeTeam.score, match.homeTeam.overs);
  const awayScoreDisplay = formatScoreWithOvers(match.awayTeam.score, match.awayTeam.overs);

  // Logo size - circular container
  const logoSize = 70; // pixels
  const stripeHeight = 60; // Height for each white/black stripe

  // Component to render a team row (name, logo, score only)
  const TeamRow = ({
    teamName,
    teamLogo,
    scoreDisplay,
    rowDelay,
    primaryColor,
    backgroundColorContainer,
  }: {
    teamName: string;
    teamLogo: TeamLogoType | null;
    scoreDisplay: string;
    rowDelay: number;
    primaryColor: string;
    backgroundColorContainer: string;
  }) => (
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
          animation={{ ...TextAnimations.copyIn, delay: rowDelay + 15 }}
          variant="onContainerCopy"
          className="truncate"
          style={{ fontFamily: fontClasses.copy?.family }}
        >
          {teamName}
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
            teamName={teamName}
            delay={rowDelay + 20}
            size={18}
          />
        </LogoWell>

        {/* Primary Color Angled Score Bar - Trapezoid shape */}
        <div
          className="font-bold relative z-20 overflow-hidden h-full flex items-center"
          style={{
            backgroundColor: primaryColor,
            clipPath: STEEP_HERO_TOP_LEFT,
            marginLeft: "-8px", // Overlap with logo border
            paddingLeft: "32px", // Increased horizontal padding for text
            paddingRight: "64px",
          }}
        >
          <AnimatedText
            type="ResultScore"
            animation={{ ...TextAnimations.copyIn, delay: rowDelay + 25 }}
            variant="onContainerCopyNoBg"
            className="text-3xl font-bold whitespace-nowrap"
            style={{ fontFamily: fontClasses.title?.family }}
          >
            {scoreDisplay}
          </AnimatedText>
        </div>
      </div>
    </div>
  );


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
      {/* Top Stripe with Grade Name */}
      {/*  <div
        className="w-full relative"
        style={{
          height: `${blackStripeHeight}px`,
          backgroundColor: backgroundColorMain,
        }}
      >
        {match.gradeName && (
          <div className="absolute top-0 right-0 z-10 px-4 py-2">
            <AnimatedText
              type="metadataMedium"
              animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
              variant="onBackground"
              style={{ fontFamily: fontClasses.copy?.family }}
            >
              {match.gradeName}
            </AnimatedText>
          </div>
        )}
      </div> */}

      {/* Home Team Row (Name, Logo, Score) */}
      <TeamRow
        teamName={match.homeTeam.name}
        teamLogo={match.teamHomeLogo}
        scoreDisplay={homeScoreDisplay}
        rowDelay={delay}
        primaryColor={primaryColor}
        backgroundColorContainer={backgroundColorContainer}
      />



      {/* Away Team Row (Name, Logo, Score) */}
      <TeamRow
        teamName={match.awayTeam.name}
        teamLogo={match.teamAwayLogo}
        scoreDisplay={awayScoreDisplay}
        rowDelay={delay + 5}
        primaryColor={primaryColor}
        backgroundColorContainer={backgroundColorContainer}
      />


    </AnimatedContainer>
  );
};

export default MudgeerabaClubHeader;
