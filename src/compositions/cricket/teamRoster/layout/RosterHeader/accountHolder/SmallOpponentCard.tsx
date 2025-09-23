import React from "react";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { RosterDataItem } from "../../types";
import { ColorVariant } from "../../../../../../components/typography/AnimatedText";
import { truncateText, getTeamPerspective } from "../../utils";

interface AgainstTeamProps {
  roster: RosterDataItem;
  variant?: ColorVariant;
  logoSize?: string;
}

export const SmallOpponentCard: React.FC<AgainstTeamProps> = ({
  roster,
  variant = "onContainerCopy",
  logoSize = "80",
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Get against team details (opponent of account holder)
  const { against } = getTeamPerspective(roster);
  const opponentTeamName = against.name;
  const opponentTeamLogoUrl = against.logoUrl;

  const logoSizeNumber = parseInt(logoSize);
  const logoSizeClass = `w-[${logoSize}px] h-[${logoSize}px]`;

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center p-2"
      backgroundColor="none"
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={0}
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
            delay={0}
          />
        </div>

        {/* Opponent team name */}
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(opponentTeamName, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: 0 }}
            variant={variant}
            className="text-center"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default SmallOpponentCard;
