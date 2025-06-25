import React from "react";
import TeamLogo from "../../../../utils/primitives/TeamLogo";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../../utils/primitives/metadataMedium";
import { LOGO_SIZES, TeamLayoutProps, useLayoutAnimations } from "./common";

export const LogoAndName: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = useLayoutAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-center w-full bg-black/20 p-2"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1 mb-2`}
        >
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={LOGO_SIZES.large.size}
          />
        </div>
        <div className="w-full px-8 text-center">
          <MetadataMedium
            value={`${teamHome}`}
            animation={metaDataAnimation}
            className="text-center"
            variant="onBackgroundMain"
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
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1 mb-2`}
        >
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={LOGO_SIZES.large.size}
          />
        </div>
        <div className="w-full px-8 text-center">
          <MetadataMedium
            value={`${teamAway}`}
            animation={metaDataAnimation}
            className="text-center"
            variant="onBackgroundMain"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
