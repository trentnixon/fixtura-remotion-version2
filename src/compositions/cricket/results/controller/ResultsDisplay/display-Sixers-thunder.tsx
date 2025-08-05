import React from "react";
import { MatchResult } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

import { VerticalHeaderLogoOnly } from "../../../../../components/layout/main/header";
import { AnimatedImage } from "../../../../../components/images/AnimatedImage";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import MatchRowSixersThunder from "../MatchRow/row-Sixers-thunder";

interface ResultsDisplayProps {
  results: MatchResult[];
  resultsPerScreen: number;
  screenIndex: number;
}

const ResultsDisplaySixersThunder: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { club } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.main.title.logo;
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Calculate which results to show on this screen
  const startIndex = screenIndex * resultsPerScreen;
  const endIndex = Math.min(startIndex + resultsPerScreen, results.length);
  const displayedResults = results.slice(startIndex, endIndex);

  const availableHeight = heights.asset;

  // Calculate exactly half of the available height for each row
  const rowHeight = Math.floor(availableHeight / 2);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Results container */}
      <div
        className="w-full flex flex-col justify-between"
        style={{ height: `${availableHeight}px` }}
      >
        {displayedResults.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full"
            style={{
              height: `${rowHeight}px`,
              marginBottom: index === 0 ? "10px" : 0,
            }}
          >
            <MatchRowSixersThunder
              match={match}
              index={index}
              rowHeight={rowHeight}
            />
          </div>
        ))}
      </div>
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

export default ResultsDisplaySixersThunder;
