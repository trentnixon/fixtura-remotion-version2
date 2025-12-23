import React from "react";
import { TeamOfTheWeekPlayer } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowCNSW from "../PlayerRow/row-CNSW";
import { SponsorFooter } from "../../../sponsorFooter";
import { Sponsor } from "../../../../../core/types/data/sponsors";
import { AssignSponsors } from "../../../composition-types";
//import { Top5PlayerName } from "../../../utils/primitives/Top5PlayerName";
import { PLAYER_STAGGER_DELAY } from "../../types";

interface TeamOfTheWeekDisplayProps {
  players: TeamOfTheWeekPlayer[];
  sponsors: Sponsor[];
  title?: string;
}

const TeamOfTheWeekDisplayCNSW: React.FC<TeamOfTheWeekDisplayProps> = ({
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
        className="flex-1 flex flex-col mx-4 overflow-hidden py-4"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        {/*     {title && (
          <div className="flex-0 grid grid-cols-1 gap-1 px-16">
            <Top5PlayerName
              value={title}
              animation={null as any}
              className=""
              variant="onContainerCopyNoBg"
            />
          </div>
        )} */}
        <div className="flex-0 grid grid-cols-1 gap-0 px-16">
          {players.map((player, index) => (
            <PlayerRowCNSW
              key={player.player}
              player={player}
              index={index}
              rowHeight={70}
              delay={index * PLAYER_STAGGER_DELAY}
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

export default TeamOfTheWeekDisplayCNSW;
