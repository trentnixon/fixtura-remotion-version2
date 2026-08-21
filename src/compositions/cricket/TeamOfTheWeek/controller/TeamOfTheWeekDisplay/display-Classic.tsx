import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowClassic from "../PlayerRow/row-Classic";
import { SponsorFooter } from "../../../sponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { DEFAULT_ROW_HEIGHT_CLASSIC } from "./_utils/constants";

const TeamOfTheWeekDisplayClassic: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const footerSponsors = buildSingleItemFooterSponsors({
    fallbackPrimary: sponsors,
  });

  return (
    <div className="flex flex-col h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-visible py-8 justify-center"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="grid grid-cols-2 gap-2">
          {players.map((player, index) => (
            <PlayerRowClassic
              key={player.player}
              player={player}
              index={index}
              rowHeight={DEFAULT_ROW_HEIGHT_CLASSIC}
            />
          ))}
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default TeamOfTheWeekDisplayClassic;
