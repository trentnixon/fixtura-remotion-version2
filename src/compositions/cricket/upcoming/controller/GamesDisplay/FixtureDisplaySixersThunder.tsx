import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { GamesListSixersThunder } from "../GamesList/games-list-sixersThunder";
import { VerticalHeaderLogoOnly } from "../../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../../components/images/AnimatedImage";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  calculateGameCardHeight,
} from "./_utils/calculations";

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
  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  // Calculate game card heights
  const gameCardHeight = calculateGameCardHeight(
    heights.asset,
    gamesPerScreen,
  );

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
