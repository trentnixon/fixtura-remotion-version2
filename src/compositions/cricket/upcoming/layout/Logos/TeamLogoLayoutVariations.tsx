import React from "react";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { TeamLogo as TeamLogoType } from "../../types";
import { AnimationConfig } from "../../../../../components/typography/config/animations/types";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { ContainerAnimationConfig } from "../../../../../components/containers/animations";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

// Base props interface for all layout variants
interface TeamLayoutProps {
  teamHome: string;
  teamAway: string;
  teamHomeLogo: TeamLogoType | null;
  teamAwayLogo: TeamLogoType | null;
  delay: number;
  vsAdditionalInfo?: string; // Optional string to display under VS
}

// Common animation configurations
const getAnimations = (delay: number) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;

  const metaDataAnimation: AnimationConfig = {
    ...TextAnimations.copyIn,
    delay: delay + 10,
  };

  const containerAnimation: ContainerAnimationConfig =
    ContainerAnimations.main.itemContainerSecondary.containerIn;

  return {
    metaDataAnimation,
    containerAnimation,
  };
};

// Original Layout (Logo Above Name) - Base implementation
export const LogoAndName: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = getAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-center w-full bg-black/20 p-4"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-20 h-20 overflow-hidden rounded-full   p-1 mb-2">
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={20}
          />
        </div>
        <MetadataMedium
          value={`${teamHome}`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
      </div>
      {/* VS */}
      <div className="mx-6 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onBackgroundMain"
          />
        )}
      </div>
      {/* Away Team */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-20 h-20 overflow-hidden rounded-full   p-1 mb-2">
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={20}
          />
        </div>
        <MetadataMedium
          value={`${teamAway}`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
      </div>
    </AnimatedContainer>
  );
};

// Variation 1: Name Above Logo
export const NameAboveLogo: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = getAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-center w-full bg-black/20 p-4"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex-1 flex flex-col items-center">
        <MetadataMedium
          value={`${teamHome}`}
          animation={metaDataAnimation}
          className="text-center mb-2"
          variant="onBackgroundMain"
        />
        <div className="w-20 h-20 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={20}
          />
        </div>
      </div>
      {/* VS */}
      <div className="mx-6 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onBackgroundMain"
          />
        )}
      </div>
      {/* Away Team */}
      <div className="flex-1 flex flex-col items-center">
        <MetadataMedium
          value={`${teamAway}`}
          animation={metaDataAnimation}
          className="text-center mb-2"
          variant="onBackgroundMain"
        />
        <div className="w-20 h-20 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={20}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

// Variation 2: Centered Vertical Stack
export const CenteredVerticalStack: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = getAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex flex-col items-center justify-center w-full bg-black/20 p-4"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1 mr-3">
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={16}
          />
        </div>
        <MetadataMedium
          value={`${teamHome}`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
      </div>

      {/* VS */}
      <div className="my-2 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onBackgroundMain"
          />
        )}
      </div>

      {/* Away Team */}
      <div className="flex items-center mt-4">
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1 mr-3">
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={16}
          />
        </div>
        <MetadataMedium
          value={`${teamAway}`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
      </div>
    </AnimatedContainer>
  );
};

// Variation 3: Opposite Alignment
export const OppositeAlignment: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = getAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-between w-full bg-black/20 p-4"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex flex-col items-start">
        <MetadataMedium
          value={`${teamHome}`}
          animation={metaDataAnimation}
          className="mb-2"
          variant="onBackgroundMain"
        />
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={16}
          />
        </div>
      </div>

      {/* VS */}
      <div className="mx-4 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onBackgroundMain"
          />
        )}
      </div>

      {/* Away Team */}
      <div className="flex flex-col items-end">
        <MetadataMedium
          value={`${teamAway}`}
          animation={metaDataAnimation}
          className="mb-2"
          variant="onBackgroundMain"
        />
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={16}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

// Variation 4: Mirrored Alignment (Name-Logo and Logo-Name)
export const MirroredAlignment: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = getAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-between w-full bg-black/20 p-4"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex items-center">
        <MetadataMedium
          value={`${teamHome}`}
          animation={metaDataAnimation}
          className="mr-3"
          variant="onBackgroundMain"
        />
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={16}
          />
        </div>
      </div>

      {/* VS */}
      <div className="mx-4 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onBackgroundMain"
          />
        )}
      </div>

      {/* Away Team */}
      <div className="flex items-center">
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={16}
          />
        </div>
        <MetadataMedium
          value={`${teamAway}`}
          animation={metaDataAnimation}
          className="ml-3"
          variant="onBackgroundMain"
        />
      </div>
    </AnimatedContainer>
  );
};

// Variation 5: Reversed Mirrored Alignment (Logo-Name and Name-Logo)
export const ReversedMirrored: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = getAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-between w-full bg-black/20 p-4"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex items-center">
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={16}
          />
        </div>
        <MetadataMedium
          value={`${teamHome}`}
          animation={metaDataAnimation}
          className="ml-3"
          variant="onBackgroundMain"
        />
      </div>

      {/* VS */}
      <div className="mx-4 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onBackgroundMain"
          />
        )}
      </div>

      {/* Away Team */}
      <div className="flex items-center">
        <MetadataMedium
          value={`${teamAway}`}
          animation={metaDataAnimation}
          className="mr-3"
          variant="onBackgroundMain"
        />
        <div className="w-16 h-16 overflow-hidden rounded-full   p-1">
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={16}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

// Export all layouts
/* export {
  LogoAndName as Default,
  NameAboveLogo,
  CenteredVerticalStack,
  OppositeAlignment,
  MirroredAlignment,
  ReversedMirrored
}; */
