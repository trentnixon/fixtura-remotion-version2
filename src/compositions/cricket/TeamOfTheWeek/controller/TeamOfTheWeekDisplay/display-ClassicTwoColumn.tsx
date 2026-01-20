import React from "react";
import { TeamOfTheWeekPlayer } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowClassicTwoColumn from "../PlayerRow/row-ClassicTwoColumn";
import { SponsorFooter } from "../../../sponsorFooter";
import { Sponsor } from "../../../../../core/types/data/sponsors";
import { AssignSponsors } from "../../../composition-types";

interface TeamOfTheWeekDisplayProps {
  players: TeamOfTheWeekPlayer[];
  sponsors: Sponsor[];
}

const TeamOfTheWeekDisplayClassicTwoColumn: React.FC<
  TeamOfTheWeekDisplayProps
> = ({ players, sponsors }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

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
          {players.map((player, index) => {
            const rowHeight = 85;

            return (
              <PlayerRowClassicTwoColumn
                key={player.player}
                player={player}
                index={index}
                rowHeight={rowHeight}
              />
            );
          })}
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={sponsors as unknown as AssignSponsors} />
      </div>
    </div>
  );
};

export default TeamOfTheWeekDisplayClassicTwoColumn;
