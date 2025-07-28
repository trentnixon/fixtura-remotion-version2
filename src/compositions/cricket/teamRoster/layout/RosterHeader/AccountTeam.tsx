import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../utils/primitives/TeamLogo";

import { ResultTeamName } from "../../../utils/primitives/ResultTeamName";
import { RosterDataItem } from "../../types";
import { ColorVariant } from "../../../../../components/typography/AnimatedText";
interface RosterHeaderProps {
  roster: RosterDataItem;
  variant?: ColorVariant;
  logoSize?: string;
  backgroundColor?: string;
}
// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const AccountLogoInSubtleWrapper: React.FC<RosterHeaderProps> = ({
  roster,
  variant = "onContainerCopy",
  logoSize = "150",
  backgroundColor = "none",
}) => {
  const { animations } = useAnimationContext();

  // Determine user's team details based on isHomeTeam
  const isUserHomeTeam = roster.isHomeTeam;
  const userTeamName = isUserHomeTeam ? roster.teamHome : roster.teamAway;
  const userTeamLogoUrl = isUserHomeTeam
    ? roster.teamHomeLogo
    : roster.teamAwayLogo;

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
      <AccountTeamLogoAndName
        userTeamLogoUrl={userTeamLogoUrl}
        userTeamName={userTeamName}
        logoSize={logoSize}
        variant={variant}
      />
    </AnimatedContainer>
  );
};

export const AccountLogoNoWrapper: React.FC<RosterHeaderProps> = ({
  roster,
  variant = "onContainerCopy",
  logoSize = "150",
}) => {
  const { animations } = useAnimationContext();

  // Determine user's team details based on isHomeTeam
  const isUserHomeTeam = roster.isHomeTeam;
  const userTeamName = isUserHomeTeam ? roster.teamHome : roster.teamAway;
  const userTeamLogoUrl = isUserHomeTeam
    ? roster.teamHomeLogo
    : roster.teamAwayLogo;

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center p-2"
      backgroundColor="none"
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={0}
    >
      <AccountTeamLogoAndName
        userTeamLogoUrl={userTeamLogoUrl}
        userTeamName={userTeamName}
        logoSize={logoSize}
        variant={variant}
      />
    </AnimatedContainer>
  );
};

export default AccountLogoInSubtleWrapper;

interface AccountTeamLogoAndNameProps {
  userTeamLogoUrl: string;
  userTeamName: string;
  variant?: ColorVariant;
  logoSize: string;
}
const AccountTeamLogoAndName: React.FC<AccountTeamLogoAndNameProps> = ({
  userTeamLogoUrl,
  userTeamName,
  variant = "onContainerCopy",
  logoSize,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const logoSizeNumber = parseInt(logoSize);
  return (
    <div className="flex flex-col items-center">
      {/* User team logo */}
      <div className={`w-[${logoSize}px] h-[${logoSize}px] my-2`}>
        <TeamLogo
          logo={{
            url: userTeamLogoUrl,
            width: logoSizeNumber,
            height: logoSizeNumber,
          }}
          teamName={userTeamName}
          delay={5}
        />
      </div>

      {/* User team name */}
      <div className="flex flex-col items-center">
        <ResultTeamName
          value={truncateText(userTeamName, 50).toUpperCase()}
          animation={{ ...TextAnimations.copyIn, delay: 0 }}
          variant={variant}
          className="text-center"
        />
      </div>
    </div>
  );
};
