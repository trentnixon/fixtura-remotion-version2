import React from "react";
import TeamLogo from "../../../../utils/primitives/TeamLogo";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../../utils/primitives/metadataMedium";
import { LOGO_SIZES, TeamLayoutProps, useLayoutAnimations } from "./common";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";

export const LogosOnly: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
  backgroundColor,
  logoPosition = "center",
}) => {
  const { metaDataAnimation, containerAnimation } = useLayoutAnimations(delay);
  const { layout } = useThemeContext();
  const logoPositionClass: Record<string, { home: string; away: string }> = {
    center: {
      home: "flex-1 flex flex-col items-center",
      away: "flex-1 flex flex-col items-center",
    },
    split: {
      home: "flex-1 flex flex-col items-start px-4",
      away: "flex-1 flex flex-col items-end px-4",
    },
    together: {
      home: "flex-1 flex flex-col items-end px-4",
      away: "flex-1 flex flex-col items-start px-4",
    },
  };

  return (
    <AnimatedContainer
      type="full"
      className={`flex items-center justify-center w-full bg-black/20 p-1 ${layout.borderRadius.container}`}
      animation={containerAnimation}
      animationDelay={delay}
      style={{ background: backgroundColor }}
    >
      {/* Home Team */}
      <div className={logoPositionClass[logoPosition].home}>
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
        >
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 15}
            size={LOGO_SIZES.large.size}
          />
        </div>
      </div>
      {/* VS */}
      <div className="mx-6 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={{ ...metaDataAnimation, delay: delay + 20 }}
          className="text-center"
          variant="onContainerCopy"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={{ ...metaDataAnimation, delay: delay + 20 }}
            className="text-center mt-1"
            variant="onContainerCopy"
          />
        )}
      </div>
      {/* Away Team */}
      <div className={logoPositionClass[logoPosition].away}>
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
        >
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 20}
            size={LOGO_SIZES.large.size}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
