import React from "react";
import PlayerRowClassic from "../PlayerRow/row-Classic";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AssignSponsors } from "../../../_types/composition-types";
import { SponsorFooter } from "../../../sponsorFooter";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

const PlayersDisplayClassic: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const { rowHeight } = calculateRowDimensions(heights.asset, players.length);

  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-visible py-32 "
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 grid grid-cols-1 gap-2">
          {players.map((player, index) => (
            <PlayerRowClassic
              key={player.name}
              player={player}
              index={index}
              rowHeight={rowHeight}
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

export default PlayersDisplayClassic;
