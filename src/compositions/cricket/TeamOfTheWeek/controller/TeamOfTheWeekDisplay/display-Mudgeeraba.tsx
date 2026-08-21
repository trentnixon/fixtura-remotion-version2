import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowMudgeeraba from "../PlayerRow/row-Mudgeeraba";
import { SponsorFooter } from "../../../sponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { DEFAULT_ROW_HEIGHT_BASIC } from "./_utils/constants";

const TeamOfTheWeekDisplayMudgeeraba: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Mudgeeraba pattern: row height a little taller; two columns for many items
  const rowHeightMudgeeraba = DEFAULT_ROW_HEIGHT_BASIC * 0.95;

  const footerSponsors = buildSingleItemFooterSponsors({
    fallbackPrimary: sponsors,
  });


  return (
    <div className="flex flex-col h-full mx-6">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col overflow-hidden rounded-none"
        style={{ height: heights.asset }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <div className="grid grid-cols-2 gap-4 mx-4">
            {players.map((player, index) => (
              <PlayerRowMudgeeraba
                key={player.player}
                player={player}
                index={index}
                rowHeight={rowHeightMudgeeraba}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default TeamOfTheWeekDisplayMudgeeraba;
