import React from "react";
import { AbsoluteFill } from "remotion";
import { PlayerData } from "../../types";
import PlayerRow from "../PlayerRow/row";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface PlayersDisplayProps {
  players: PlayerData[];
  title?: string; // Optional title to display
}

const PlayersDisplay: React.FC<PlayersDisplayProps> = ({ players, title }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const { rowHeight } = calculateRowDimensions(heights.asset, players.length);

  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 overflow-hidden"
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        {/* Title (if provided) */}
        {/* {title && (
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
          </div>
        )} */}
        <div className="flex-1 grid grid-cols-1 gap-2">
          {players.map((player, index) => (
            <PlayerRow
              key={player.name}
              player={player}
              index={index}
              rowHeight={rowHeight}
            />
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};

// Utility function to calculate row dimensions
const calculateRowDimensions = (totalHeight: number, playerCount: number) => {
  const VERTICAL_GAP = 16; // 8rem gap between rows
  const PADDING = 16; // 8rem padding top and bottom
  const TITLE_HEIGHT = 48; // Height for the title if present

  const totalVerticalGaps = (playerCount - 1) * VERTICAL_GAP;
  const availableHeight = totalHeight - PADDING * 2 - TITLE_HEIGHT;
  const rowHeight = (availableHeight - totalVerticalGaps) / playerCount;

  return {
    rowHeight,
  };
};

export default PlayersDisplay;
