import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

import { GamesListSixersThunder } from "../GamesList/games-list-sixersThunder";
import { VerticalHeaderLogoOnly } from "../../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../../components/images/AnimatedImage";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";

interface GamesDisplayProps {
  games: GameData[];
  gamesPerScreen: number;
  screenIndex: number;

  heights?: {
    asset: number;
    [key: string]: number;
  };
}

export const GamesDisplaySixersThunder: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
  heights = { asset: 1080 },
}) => {
  const { club } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.main.title.logo;
  const ContainerAnimations = animations.container;
  // Calculate which games to show on this screen
  const startIndex = screenIndex * gamesPerScreen;
  const endIndex = Math.min(startIndex + gamesPerScreen, games.length);
  const displayedGames = games.slice(startIndex, endIndex);

  // Calculate game card heights
  const headerHeight = 100;
  const contentPadding = 40;
  const cardSpacing = 20;
  const availableHeight = heights.asset - headerHeight - contentPadding;
  const gameCardHeight = Math.floor(
    availableHeight / gamesPerScreen - cardSpacing,
  );

  // Merge all assignSponsors objects from displayedGames into one object

  return (
    <div className="p-0 flex flex-col w-full h-full justify-center">
      <AnimatedContainer
        type="full"
        className=" flex flex-col mx-8 overflow-hidden "
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 overflow-hidden">
          <GamesListSixersThunder
            games={displayedGames}
            gameRowHeight={gameCardHeight}
          />
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <VerticalHeaderLogoOnly
          height={heights.header}
          alignment="center"
          Logo={
            <div className="w-full h-full flex justify-center items-center ">
              <div className="w-full h-full flex items-center rounded-none max-h-[130px] ">
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

export default GamesDisplaySixersThunder;
