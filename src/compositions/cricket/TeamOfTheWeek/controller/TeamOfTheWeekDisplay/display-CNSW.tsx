import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowCNSW from "../PlayerRow/row-CNSW";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { DEFAULT_ROW_HEIGHT_CNSW } from "./_utils/constants";
import { calculatePlayerDelay } from "./_utils/calculations";

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
              rowHeight={DEFAULT_ROW_HEIGHT_CNSW}
              delay={calculatePlayerDelay(index)}
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
