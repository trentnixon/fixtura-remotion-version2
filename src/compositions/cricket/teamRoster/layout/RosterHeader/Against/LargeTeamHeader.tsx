import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { truncateText, getTeamPerspective } from "../../utils";
import { AccountTeamProps } from "./_types/AccountTeamProps";
import {
  DEFAULT_TEAM_HEADER_VARIANT,
  DEFAULT_LARGE_TEAM_LOGO_SIZE,
  DEFAULT_TEAM_HEADER_ANIMATION_DELAY,
  MAX_TEAM_NAME_LENGTH,
} from "./_utils/constants";
import {
  parseLogoSize,
  getLogoSizeClass,
  shouldApplyBackgroundColor,
} from "./_utils/helpers";

export const LargeTeamHeader: React.FC<AccountTeamProps> = ({
  roster,
  variant = DEFAULT_TEAM_HEADER_VARIANT,
  logoSize = DEFAULT_LARGE_TEAM_LOGO_SIZE,
  backgroundColor = "none",
}) => {
  // Get against team details (this component shows against team as the main team)
  const { against } = getTeamPerspective(roster);
  const teamName = against.name;
  const teamLogoUrl = against.logoUrl;
  const logoSizeNumber = parseLogoSize(logoSize);
  const logoSizeClass = getLogoSizeClass(logoSize);

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center p-2"
      backgroundColor="none"
      style={{
        background: shouldApplyBackgroundColor(backgroundColor)
          ? backgroundColor
          : undefined,
      }}
      animation={undefined}
      animationDelay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
    >
      <div className="flex flex-col items-center">
        {/* Team logo */}
        <div className={`${logoSizeClass} my-2 rounded-full p-4`}>
          <TeamLogo
            logo={{
              url: teamLogoUrl,
              width: logoSizeNumber,
              height: logoSizeNumber,
            }}
            teamName={teamName}
            delay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
          />
        </div>
        {/* Team name */}
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(teamName, MAX_TEAM_NAME_LENGTH).toUpperCase()}
            animation={undefined}
            variant={variant}
            className="text-center"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default LargeTeamHeader;
