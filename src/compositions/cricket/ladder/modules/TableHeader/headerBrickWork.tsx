import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TableHeaderProps } from "./_types/TableHeaderProps";

/**
 * Brickwork ladder header – layout matched to BalancedLadderRowBrickWork
 * (70% title, flex-1 stats with w-10/w-10/w-10/w-10/w-20 cells).
 */
export const TableHeaderBrickWork: React.FC<TableHeaderProps> = ({
  title,
  headerHeight,
}) => {
  const { fontClasses, selectedPalette, layout } = useThemeContext();

  return (
    <div
      className={`flex items-center ${layout.borderRadius.container}`}
      style={{ height: `${headerHeight}px` }}
    >
      <div
        className="flex items-center pr-2"
        style={{ width: "70%" }}
      >
        <AnimatedText
          type="ladderGradeLabel"
          variant="onContainerCopyNoBg"
          textAlign="left"
          letterAnimation="word"
          animationDelay={5}
          animation={{
            type: "typewriter",
            duration: 15,
            easing: "linear",
            delay: 10,
            custom: { distance: 500 },
          }}
          fontFamily={fontClasses.copy?.family}
        >
          {title}
        </AnimatedText>
      </div>

      <div
        className="flex flex-1 justify-evenly self-stretch items-center"
        style={{
          background: selectedPalette.container.backgroundTransparent.medium,
        }}
      >
        <div className="w-10 mx-px text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            P
          </AnimatedText>
        </div>
        <div className="w-10 mx-px text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            W
          </AnimatedText>
        </div>
        <div className="w-10 mx-px text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            L
          </AnimatedText>
        </div>
        <div className="w-10 mx-px text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            B
          </AnimatedText>
        </div>
        <div className="w-20 mx-px text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            PTS
          </AnimatedText>
        </div>
      </div>
    </div>
  );
};

export default TableHeaderBrickWork;
