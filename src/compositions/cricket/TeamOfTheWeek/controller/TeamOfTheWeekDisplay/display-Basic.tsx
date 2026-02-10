import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowBasic from "../PlayerRow/row-Basic";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { DEFAULT_ROW_HEIGHT_BASIC } from "./_utils/constants";

const TeamOfTheWeekDisplayBasic: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Calculate row height dynamically based on player count
  //const { rowHeight } = calculateRowDimensions(heights.asset, players.length);

  return (
    <div className="flex flex-col h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-32 justify-center"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className=" grid grid-cols-2 gap-4">
          {players.map((player, index) => (
            <PlayerRowBasic
              key={player.player}
              player={player}
              index={index}
              rowHeight={DEFAULT_ROW_HEIGHT_BASIC}
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

// Utility function to calculate row dimensions for 2-column layout
/* const calculateRowDimensions = (totalHeight: number, playerCount: number) => {
  const VERTICAL_GAP = 16; // 16px gap between rows (gap-4)
  const PADDING = 16; // 16px padding top and bottom

  // Calculate rows needed (2 columns, so divide by 2 and round up)
  const rowsNeeded = Math.ceil(playerCount / 2);

  const totalVerticalGaps = (rowsNeeded - 1) * VERTICAL_GAP;
  const availableHeight = totalHeight - PADDING * 2;
  const rowHeight = (availableHeight - totalVerticalGaps) / rowsNeeded;

  return {
    rowHeight,
  };
}; */

export default TeamOfTheWeekDisplayBasic;
