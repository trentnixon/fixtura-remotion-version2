import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { LogoPlate } from "../../../../../../templates/variants/brickwork/design";
import { truncateText, getTeamPerspective } from "../../utils";
import { AccountTeamProps } from "../accountHolder/_types/AccountTeamProps";
import {
  DEFAULT_TEAM_HEADER_VARIANT,
  DEFAULT_TEAM_HEADER_ANIMATION_DELAY,
  MAX_TEAM_NAME_LENGTH,
} from "../accountHolder/_utils/constants";
import {
  parseLogoSize,
  shouldApplyBackgroundColor,
} from "../accountHolder/_utils/helpers";

export const AccountTeamHeaderBrickWork: React.FC<AccountTeamProps> = ({
  roster,
  variant = DEFAULT_TEAM_HEADER_VARIANT,
  logoSize = "150",
  backgroundColor = "none",
  compact = false,
}) => {
  const { accountHolder } = getTeamPerspective(roster);
  const teamName = accountHolder.name;
  const logoSizeNumber = parseLogoSize(logoSize);

  return (
    <AnimatedContainer
      type="full"
      className={`w-full flex justify-center items-center ${compact ? "" : "p-2"}`}
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
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(teamName, MAX_TEAM_NAME_LENGTH).toUpperCase()}
            animation={null}
            variant={variant}
            className="text-center"
          />
        </div>
        <div className={compact ? "" : "my-2"}>
          <LogoPlate
            mode="preserve"
            size={logoSizeNumber}
            logo={{
              url: accountHolder.logoUrl,
              width: logoSizeNumber,
              height: logoSizeNumber,
            }}
            teamName={teamName}
            delay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default AccountTeamHeaderBrickWork;
