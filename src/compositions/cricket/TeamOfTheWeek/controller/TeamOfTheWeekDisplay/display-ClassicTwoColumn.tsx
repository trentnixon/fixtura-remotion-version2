import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowClassicTwoColumn from "../PlayerRow/row-ClassicTwoColumn";
import { SponsorFooter } from "../../../sponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN } from "./_utils/constants";

const TeamOfTheWeekDisplayClassicTwoColumn: React.FC<
  TeamOfTheWeekDisplayProps
> = ({ players, sponsors }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const footerSponsors = buildSingleItemFooterSponsors({
    fallbackPrimary: sponsors,
  });

  return (
    <div className="flex flex-col h-full w-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-8"
        style={{
          minHeight: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex flex-col h-full gap-1 justify-center">
          {players.map((player, index) => (
            <PlayerRowClassicTwoColumn
              key={player.player}
              player={player}
              index={index}
              rowHeight={DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN}
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

export default TeamOfTheWeekDisplayClassicTwoColumn;
