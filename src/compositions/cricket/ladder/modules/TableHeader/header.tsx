import React from "react";

import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

interface TableHeaderProps {
  title: string;
  headerHeight: number;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  headerHeight,
}) => {
  const { fontClasses } = useThemeContext();

  return (
    <div
      className="flex items-center p-2 "
      style={{ height: `${headerHeight}px` }}
    >
      {/* Title (team info) */}
      <div className="flex items-center mr-3 px-2" style={{ width: "70%" }}>
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
          fontFamily={fontClasses.copy?.family}
        >
          {title}
        </AnimatedText>
      </div>

      {/* Stat columns */}
      <div className="flex flex-1 justify-evenly">
        <div className="w-10 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            P
          </AnimatedText>
        </div>
        <div className="w-10 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            W
          </AnimatedText>
        </div>
        <div className="w-10 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            L
          </AnimatedText>
        </div>
        <div className="w-10 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            B
          </AnimatedText>
        </div>
        <div className="w-20 bg-gray-700/50 rounded-md text-center">
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

export default TableHeader;

export const TableHeaderWrapped: React.FC<TableHeaderProps> = ({
  title,
  headerHeight,
}) => {
  const { fontClasses, selectedPalette } = useThemeContext();

  return (
    <div
      className="flex items-center p-2 border-b-2 border-white/20 mb-3"
      style={{ height: `${headerHeight}px` }}
    >
      {/* Title (team info) */}
      <div className="flex items-center mr-3 px-2" style={{ width: "70%" }}>
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
          fontFamily={fontClasses.copy?.family}
        >
          {title}
        </AnimatedText>
      </div>

      {/* Stat columns */}
      <div
        className="flex flex-1 justify-evenly p-2"
        style={{
          background: selectedPalette.container.backgroundTransparent.high,
        }}
      >
        <div className="w-8 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            P
          </AnimatedText>
        </div>
        <div className="w-8 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            W
          </AnimatedText>
        </div>
        <div className="w-8 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            L
          </AnimatedText>
        </div>
        <div className="w-8 text-center">
          <AnimatedText
            type="ladderGradeLabel"
            variant="onContainerCopy"
            fontFamily={fontClasses.copy?.family}
          >
            B
          </AnimatedText>
        </div>
        <div className="w-16  text-center">
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
