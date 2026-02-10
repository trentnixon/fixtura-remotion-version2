/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AssignSponsors } from "../../../_types/composition-types";
import { SponsorFooter } from "../../../sponsorFooter";
import { Top5PlayerName } from "../../../utils/primitives/Top5PlayerName";
import PlayerRowCNSWPrivate from "../PlayerRow/row-CNSW-private";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { DEFAULT_CONTAINER_ANIMATION_DELAY, DEFAULT_ROW_HEIGHT_CNSW } from "./_utils/constants";

const PlayersDisplayCNSWPrivate: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
  title,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  //const { rowHeight } = calculateRowDimensions(heights.asset, players.length);

  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-32 "
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={DEFAULT_CONTAINER_ANIMATION_DELAY}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-0 grid grid-cols-1 gap-1 px-16">
          <Top5PlayerName
            value={title || ""}
            animation={null as any}
            className=""
            variant="onContainerMain"
          />
        </div>
        <div className="flex-0 grid grid-cols-1 gap-1 px-16">
          {players.map((player, index) => (
            <PlayerRowCNSWPrivate
              key={player.name}
              player={player}
              index={index}
              rowHeight={DEFAULT_ROW_HEIGHT_CNSW}
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

export default PlayersDisplayCNSWPrivate;
