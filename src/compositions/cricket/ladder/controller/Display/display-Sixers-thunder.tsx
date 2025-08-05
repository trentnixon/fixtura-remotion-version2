import React from "react";
import { LadderData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { StandardRowSixersThunderWrapped } from "../TeamRows/row-Sixers-thunder";
import TableHeaderSixersThunder from "../../modules/TableHeader/headerSixers";
import { AnimatedImage } from "../../../../../components/images/AnimatedImage";
import { VerticalHeaderLogoOnly } from "../../../../../components/layout/main/header/variants/VerticalStack";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface LadderDisplayProps {
  ladder: LadderData;
}

export const LadderDisplaySixersThunder: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { club } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const LogoAnimations = animations.image.main.title.logo;
  const { League, gradeName, bias } = ladder;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { headerHeight, rowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );

  return (
    <div className="p-0 flex flex-col w-full h-full">
      {/* <LadderHeader title={name} /> */}
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-8 p-4 rounded-none overflow-hidden"
        backgroundColor="none"
        animation={{
          type: "slideInRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1000,
          },
        }}
        animationDelay={0}
        exitAnimation={{
          type: "slideOutRight",
          easing: { type: "inOut", base: "ease" },
          duration: 15,
          custom: {
            distance: 1000,
          },
        }}
      >
        <div>
          <TableHeaderSixersThunder
            title={gradeName}
            headerHeight={headerHeight}
          />

          <div className="flex-1 overflow-hidden">
            {League.map((team, index) => (
              <StandardRowSixersThunderWrapped
                key={team.position}
                team={team}
                index={index}
                totalTeams={League.length}
                isBiasTeam={team.teamName === bias}
                LadderRowHeight={rowHeight}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <VerticalHeaderLogoOnly
          height={heights.header}
          alignment="center"
          Logo={
            <div className="w-full h-full flex justify-center items-center ">
              <div className="w-full h-full flex items-center rounded-none max-h-[110px] ">
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

export default LadderDisplaySixersThunder;

////Utilities////
const calculateRowDimensions = (totalHeight: number, teamCount: number) => {
  const headerHeight = 70;
  const VERTICAL_GAP = 4;
  const PADDING = 20;
  const HEADER_MARGIN = 10;

  const ladderHeight = totalHeight - headerHeight;
  const totalVerticalGaps = (teamCount - 1) * VERTICAL_GAP;
  const availableHeight = ladderHeight - PADDING * 2 - HEADER_MARGIN;
  const rowHeight = (availableHeight - totalVerticalGaps) / teamCount;

  return {
    headerHeight,
    rowHeight,
  };
};
