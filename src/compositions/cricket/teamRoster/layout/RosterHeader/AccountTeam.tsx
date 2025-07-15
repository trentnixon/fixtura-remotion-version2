import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
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

export const AccountTeam: React.FC<RosterHeaderProps> = ({ roster }) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  console.log("[roster]", roster);

  // Determine user's team details based on isHomeTeam
  const isUserHomeTeam = roster.isHomeTeam;
  const userTeamName = isUserHomeTeam ? roster.teamHome : roster.teamAway;
  const userTeamLogoUrl = isUserHomeTeam
    ? roster.teamHomeLogo
    : roster.teamAwayLogo;

  // Get background color from theme
  const backgroundColor =
    selectedPalette.container.backgroundTransparent.medium;

  // Logo size based on height
  const logoSize = `w-[150px] h-[150px]`;

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center p-2"
      backgroundColor="none"
      style={{
        background: backgroundColor,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={0}
    >
      <div className="flex flex-col items-center">
        {/* User team logo */}
        <div className={`${logoSize} my-2`}>
          <TeamLogo
            logo={{ url: userTeamLogoUrl, width: 150, height: 150 }}
            teamName={userTeamName}
            delay={5}
          />
        </div>

        {/* User team name */}
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(userTeamName, 50).toUpperCase()}
            animation={{ ...TextAnimations.copyIn, delay: 0 }}
            variant="onContainerCopy"
            className="text-center"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default AccountTeam;
