import React from "react";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { truncateText, getTeamPerspective } from "../../utils";
import { AgainstTeamProps } from "./_types/AgainstTeamProps";
import {
  DEFAULT_TEAM_HEADER_VARIANT,
  DEFAULT_SMALL_OPPONENT_LOGO_SIZE,
  DEFAULT_TEAM_HEADER_ANIMATION_DELAY,
  MAX_TEAM_NAME_LENGTH,
} from "./_utils/constants";
import { parseLogoSize, getLogoSizeClass } from "./_utils/helpers";

export const SmallOpponentCard: React.FC<AgainstTeamProps> = ({
  roster,
  variant = DEFAULT_TEAM_HEADER_VARIANT,
  logoSize = DEFAULT_SMALL_OPPONENT_LOGO_SIZE,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get against team details (opponent of account holder)
  const { against } = getTeamPerspective(roster);
  const opponentTeamName = against.name;
  const opponentTeamLogoUrl = against.logoUrl;
  const logoSizeNumber = parseLogoSize(logoSize);
  const logoSizeClass = getLogoSizeClass(logoSize);

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center p-2"
      backgroundColor="none"
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
    >
      <div className="flex flex-col items-center">
        {/* Opponent team logo */}
        <div className={`${logoSizeClass} mb-2 rounded-full p-4 bg-gray-300`}>
          <TeamLogo
            logo={{
              url: opponentTeamLogoUrl,
              width: logoSizeNumber,
              height: logoSizeNumber,
            }}
            teamName={opponentTeamName}
            delay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
          />
        </div>

        {/* Opponent team name */}
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(
              opponentTeamName,
              MAX_TEAM_NAME_LENGTH,
            ).toUpperCase()}
            animation={{
              ...TextAnimations.copyIn,
              delay: DEFAULT_TEAM_HEADER_ANIMATION_DELAY,
            }}
            variant={variant}
            className="text-center"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default SmallOpponentCard;
