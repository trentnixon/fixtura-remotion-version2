import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import PlayerRowClassicTwoColumn from "../PlayerRow/row-ClassicTwoCoulmn";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION_DELAY,
  DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN,
} from "./_utils/constants";

const PlayersDisplayClassicTwoColumn: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const footerSponsors = buildSingleItemFooterSponsors({
    primaryForScreen: players[0]?.primaryForScreen,
    assignSponsors: players[0]?.assignSponsors,
    fallbackPrimary: sponsors,
  });


  return (
    <div className="flex flex-col h-full w-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-32 "
        style={{
          minHeight: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={DEFAULT_CONTAINER_ANIMATION_DELAY}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex flex-col h-full gap-2 justify-center ">
          {players.map((player, index) => (
            <PlayerRowClassicTwoColumn
              key={player.name}
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

export default PlayersDisplayClassicTwoColumn;
