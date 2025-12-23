import React from "react";
import { TeamOfTheWeekPlayer } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowClassic from "../PlayerRow/row-Classic";
import { SponsorFooter } from "../../../sponsorFooter";
import { Sponsor } from "../../../../../core/types/data/sponsors";
import { AssignSponsors } from "../../../composition-types";

interface TeamOfTheWeekDisplayProps {
  players: TeamOfTheWeekPlayer[];
  sponsors: Sponsor[];
}

const TeamOfTheWeekDisplayClassic: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  return (
    <div className="flex flex-col h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-8 justify-center"
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
              rowHeight={110}
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

export default TeamOfTheWeekDisplayClassic;



