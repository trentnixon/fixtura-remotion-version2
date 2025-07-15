import React from "react";
import TeamLogo from "../../../../utils/primitives/TeamLogo";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../../utils/primitives/metadataMedium";
import { LOGO_SIZES, TeamLayoutProps, useLayoutAnimations } from "./common";

export const LogosOnly: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
  backgroundColor,
}) => {
  const { metaDataAnimation, containerAnimation } = useLayoutAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-center w-full bg-black/20 p-2"
      animation={containerAnimation}
      animationDelay={delay + 5}
      style={{ background: backgroundColor }}
    >
      {/* Home Team */}
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
        >
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={LOGO_SIZES.large.size}
          />
        </div>
      </div>
      {/* VS */}
      <div className="mx-6 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onContainerCopy"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onContainerCopy"
          />
        )}
      </div>
      {/* Away Team */}
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
        >
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={LOGO_SIZES.large.size}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
