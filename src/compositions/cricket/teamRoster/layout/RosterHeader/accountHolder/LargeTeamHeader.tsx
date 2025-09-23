import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { RosterDataItem } from "../../types";
import { ColorVariant } from "../../../../../../components/typography/AnimatedText";
import { truncateText, getTeamPerspective } from "../../utils";

interface AccountTeamProps {
  roster: RosterDataItem;
  variant?: ColorVariant;
  logoSize?: string;
  backgroundColor?: string;
}

export const LargeTeamHeader: React.FC<AccountTeamProps> = ({
  roster,
  variant = "onContainerCopy",
  logoSize = "150",
  backgroundColor = "none",
}) => {
  // Get account holder team details
  const { accountHolder } = getTeamPerspective(roster);
  const teamName = accountHolder.name;
  const teamLogoUrl = accountHolder.logoUrl;

  return (
    <AnimatedContainer
      type="full"
      className={`w-full flex justify-center items-center p-2 `}
      backgroundColor="none"
      style={{
        background: backgroundColor !== "none" ? backgroundColor : undefined,
      }}
      animation={undefined}
      animationDelay={0}
    >
      <div className="flex flex-col items-center">
        {/* Team name */}
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(teamName, 50).toUpperCase()}
            animation={undefined}
            variant={variant}
            className="text-center"
          />
        </div>
        {/* Team logo */}
        <div
          className={`w-[${logoSize}px] h-[${logoSize}px] my-2 rounded-full p-4`}
        >
          <TeamLogo
            logo={{
              url: teamLogoUrl,
              width: parseInt(logoSize),
              height: parseInt(logoSize),
            }}
            teamName={teamName}
            delay={0}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default LargeTeamHeader;
