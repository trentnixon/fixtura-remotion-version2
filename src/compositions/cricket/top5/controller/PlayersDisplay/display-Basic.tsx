import React from "react";
import PlayerRowBasic from "../PlayerRow/row-Basic";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { buildSingleItemFooterSponsors } from "../../../../../core/utils/sponsors";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";
import { DEFAULT_CONTAINER_ANIMATION_DELAY } from "./_utils/constants";

const PlayersDisplayBasic: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const { rowHeight } = calculateRowDimensions(heights.asset, players.length);

  const footerSponsors = buildSingleItemFooterSponsors({
    primaryForScreen: players[0]?.primaryForScreen,
    assignSponsors: players[0]?.assignSponsors,
    fallbackPrimary: sponsors,
  });


  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 overflow-hidden py-32"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={DEFAULT_CONTAINER_ANIMATION_DELAY}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 grid grid-cols-1 gap-2">
          {players.map((player, index) => (
            <PlayerRowBasic
              key={player.name}
              player={player}
              index={index}
              rowHeight={rowHeight}
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

export default PlayersDisplayBasic;
