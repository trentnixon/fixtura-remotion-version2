import React from "react";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TableHeaderProps } from "./_types/TableHeaderProps";
import {
  PADDING_SHALLOW_LEFT,
  SHALLOW_HEADER_TOP,
} from "../../../../../templates/variants/mudgeeraba/design";

export const TableHeaderMudgeeraba: React.FC<TableHeaderProps> = ({
  title,
  headerHeight,
  compact = false,
}) => {
  const { fontClasses, selectedPalette } = useThemeContext();
  const rowBg = selectedPalette.container.backgroundTransparent.high;

  // Header stays fixed: same text size and padding regardless of compact (only table rows resize)
  return (
    <div
      className={`flex items-center overflow-hidden ${PADDING_SHALLOW_LEFT}`}
      style={{
        height: `${headerHeight}px`,
        backgroundColor: rowBg,
        clipPath: SHALLOW_HEADER_TOP,
      }}
    >
      <div
        className="flex items-center mr-3 flex-1 min-w-0"
        style={{ width: "70%" }}
      >
        <AnimatedText
          type="ladderGradeLabel"
          variant="onContainerCopy"
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
          className="pl-4"
          fontFamily={fontClasses.title?.family ?? fontClasses.copy?.family}
        >
          {title}
        </AnimatedText>
      </div>

      {/* Match row layout: same flex and column widths as row stats (w-10, w-10, w-10, w-10, w-16) */}
      <div className="flex flex-1 justify-evenly shrink-0">
        <div className="w-10 text-center whitespace-nowrap">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            P
          </AnimatedText>
        </div>
        <div className="w-10 text-center whitespace-nowrap">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            W
          </AnimatedText>
        </div>
        <div className="w-10 text-center whitespace-nowrap">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            L
          </AnimatedText>
        </div>
        <div className="w-10 text-center whitespace-nowrap">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            B
          </AnimatedText>
        </div>
        <div className="w-16 text-center whitespace-nowrap">
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

export default TableHeaderMudgeeraba;
