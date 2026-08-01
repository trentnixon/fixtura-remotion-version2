import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { csClass, useBroadcastProTheme } from "../../../utils/broadcastPro";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { CardBroadcastPro } from "../PlayerRow/card-BroadcastPro";
import {
  getCompositionSectionHeight,
  getMainContentSectionHeight,
} from "../../../../../core/utils/layoutHeights";

const TeamOfTheWeekDisplayBroadcastPro: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { glass, text } = useBroadcastProTheme();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const { club } = useVideoDataContext();
  const isAccountClub = club.IsAccountClub || false;
  const ContainerAnimations = animations.container;

  const compact = players.length >= 11;

  const rootClass = csClass(componentStyles, "broadcastProTeamOfTheWeekRoot");
  const animatedClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekAnimatedContainer",
  );
  const gridClass = csClass(componentStyles, "broadcastProTeamOfTheWeekGrid");
  const mainContentHeight = getMainContentSectionHeight(heights);
  const compositionHeight = getCompositionSectionHeight(heights);

  return (
    <div className="flex flex-col" style={{ height: `${compositionHeight}px` }}>
      <AnimatedContainer
        type="full"
        className={animatedClass}
        style={{ height: mainContentHeight }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className={rootClass}>
          <div className={gridClass}>
            {players.map((player, index) => (
              <CardBroadcastPro
                key={`${player.player}-${player.categoryDetail.position}-${index}`}
                player={player}
                staggerIndex={index}
                isAccountClub={isAccountClub}
                glass={glass}
                text={text}
                compact={compact}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={sponsors as unknown as AssignSponsors} />
      </div>
    </div>
  );
};

export default TeamOfTheWeekDisplayBroadcastPro;
