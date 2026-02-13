import React from "react";
import PlayerRowMudgeeraba from "../PlayerRow/row-Mudgeeraba";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";
import { DEFAULT_CONTAINER_ANIMATION_DELAY } from "./_utils/constants";

const PlayersDisplayMudgeeraba: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const { rowHeight } = calculateRowDimensions(heights.asset, players.length);
  const rowHeightMudgeeraba = rowHeight * 0.85;

  return (
    <div className="flex flex-col h-full mx-8">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col overflow-hidden rounded-none"
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={DEFAULT_CONTAINER_ANIMATION_DELAY}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 flex flex-col gap-4 my-4 mx-4 min-h-0 justify-center">
          {players.map((player, index) => (
            <PlayerRowMudgeeraba
              key={player.name}
              player={player}
              index={index}
              rowHeight={rowHeightMudgeeraba}
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

export default PlayersDisplayMudgeeraba;
