import React from "react";
import { PlayerData } from "../../types";
import PlayerRowSixersThunder from "../PlayerRow/row-SixersThunder";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

import { VerticalHeaderLogoOnly } from "../../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../../components/images/AnimatedImage";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

interface PlayersDisplayProps {
  players: PlayerData[];
  title?: string; // Optional title to display
}

const PlayersDisplaySixersThunder: React.FC<PlayersDisplayProps> = ({
  players,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { club } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.main.title.logo;
  const ContainerAnimations = animations.container;

  const { rowHeight } = calculateRowDimensions(heights.asset, players.length);

  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 overflow-hidden py-32 "
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 grid grid-cols-1 gap-2">
          {players.map((player, index) => (
            <PlayerRowSixersThunder
              key={player.name}
              player={player}
              index={index}
              rowHeight={rowHeight}
            />
          ))}
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <VerticalHeaderLogoOnly
          height={heights.header}
          alignment="center"
          Logo={
            <div className="w-full h-full flex justify-center items-center ">
              <div className="w-full h-full flex items-center rounded-none max-h-[120px] ">
                <AnimatedImage
                  src={club.logo?.url}
                  width={"auto"}
                  height={"auto"}
                  fit="contain"
                  className="rounded-none"
                  animation={LogoAnimations.introIn}
                  exitAnimation={LogoAnimations.introOut}
                  exitFrame={50000}
                />
              </div>
            </div>
          }
          Title={null}
          Name={null}
        />
      </div>
    </div>
  );
};

// Utility function to calculate row dimensions
const calculateRowDimensions = (totalHeight: number, playerCount: number) => {
  const VERTICAL_GAP = 8; // 8rem gap between rows
  const PADDING = 8; // 8rem padding top and bottom
  const TITLE_HEIGHT = 48; // Height for the title if present

  const totalVerticalGaps = (playerCount - 1) * VERTICAL_GAP;
  const availableHeight = totalHeight / 1.3 - PADDING * 2 - TITLE_HEIGHT;
  const rowHeight = (availableHeight - totalVerticalGaps) / playerCount;

  return {
    rowHeight,
  };
};

export default PlayersDisplaySixersThunder;
