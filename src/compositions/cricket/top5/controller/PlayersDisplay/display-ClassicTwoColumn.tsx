import React from "react";
import { PlayerData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { Sponsor } from "../../../../../core/types/data/sponsors";

import { AssignSponsors } from "../../../composition-types";
import { SponsorFooter } from "../../../sponsorFooter";
import PlayerRowClassicTwoColumn from "../PlayerRow/row-ClassicTwoCoulmn";

interface PlayersDisplayProps {
  players: PlayerData[];
  title?: string; // Optional title to display
  sponsors: Sponsor[];
}

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
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex flex-col h-full gap-2 justify-center ">
          {players.map((player, index) => (
            <PlayerRowClassicTwoColumn
              key={player.name}
              player={player}
              index={index}
              rowHeight={140}
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
