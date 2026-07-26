import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { resolveBroadcastProGlass, csClass } from "../../../utils/broadcastPro";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { CardBroadcastPro } from "../PlayerRow/card-BroadcastPro";

const TeamOfTheWeekDisplayBroadcastPro: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
}) => {
  const {
    layout,
    selectedPalette,
    colors,
    componentStyles,
    broadcastProGlassOpacity,
    broadcastProTransparentLayers,
  } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const { club } = useVideoDataContext();
  const isAccountClub = club.IsAccountClub || false;
  const ContainerAnimations = animations.container;

  const compact = players.length >= 11;

  const accent = colors?.primary ?? selectedPalette.container.accent;
  const surfaceBase = selectedPalette.container.background;
  const glass = resolveBroadcastProGlass({
    surfaceBase,
    broadcastProGlassOpacity,
    broadcastProTransparentLayers,
  });

  const rootClass = csClass(componentStyles, "broadcastProTeamOfTheWeekRoot");
  const animatedClass = csClass(
    componentStyles,
    "broadcastProTeamOfTheWeekAnimatedContainer",
  );
  const gridClass = csClass(componentStyles, "broadcastProTeamOfTheWeekGrid");

  return (
    <div className="flex h-full flex-col">
      <AnimatedContainer
        type="full"
        className={animatedClass}
        style={{ height: heights.asset }}
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
                accent={accent}
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
