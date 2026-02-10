import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AssignSponsors } from "../../../_types/composition-types";
import { SponsorFooter } from "../../../sponsorFooter";
import PlayerRowClassicTwoColumn from "../PlayerRow/row-ClassicTwoCoulmn";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { DEFAULT_CONTAINER_ANIMATION_DELAY, DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN } from "./_utils/constants";

const PlayersDisplayClassicTwoColumn: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

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
        <SponsorFooter assignSponsors={sponsors as unknown as AssignSponsors} />
      </div>
    </div>
  );
};

export default PlayersDisplayClassicTwoColumn;
