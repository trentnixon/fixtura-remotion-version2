import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";

import { ResultTeamName } from "../../../utils/primitives/ResultTeamName";
import { RosterDataItem } from "../../types";

interface RosterHeaderProps {
  roster: RosterDataItem;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const AgainstTeam: React.FC<RosterHeaderProps> = ({ roster }) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Determine opponent's team details based on isHomeTeam
  const isUserHomeTeam = roster.isHomeTeam;
  const opponentTeamName = isUserHomeTeam ? roster.teamAway : roster.teamHome;
  const opponentTeamLogoUrl = isUserHomeTeam
    ? roster.teamAwayLogo
    : roster.teamHomeLogo;

  // Logo size based on height
  const logoSize = `w-[80px] h-[80px]`;

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
        <div className={`${logoSize} mb-2 rounded-full p-4 bg-gray-300`}>
          <TeamLogo
            logo={{ url: opponentTeamLogoUrl, width: 80, height: 80 }}
            teamName={opponentTeamName}
            delay={5}
          />
        </div>

        {/* Opponent team name */}
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(opponentTeamName, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: 0 }}
            className="text-center"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default AgainstTeam;
