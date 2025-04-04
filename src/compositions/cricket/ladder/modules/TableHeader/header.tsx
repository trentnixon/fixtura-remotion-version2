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
      className="flex items-center p-2 border-b-2 border-white/20 mb-3 "
      style={{ height: `${headerHeight}px` }}
    >
      <div className="flex-1 text-left font-bold">
        <AnimatedText
          type="ladderGradeLabel"
          variant="onBackgroundMain"
          textAlign="left"
          letterAnimation="word"
          staggerDelay={5}
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

      <div className="w-10 text-center">
        <AnimatedText
          type="ladderGradeLabel"
          variant="onBackgroundMain"
          fontFamily={fontClasses.copy?.family}
        >
          P
        </AnimatedText>
      </div>
      <div className="w-10 text-center">
        <AnimatedText
          type="ladderGradeLabel"
          variant="onBackgroundMain"
          fontFamily={fontClasses.copy?.family}
        >
          W
        </AnimatedText>
      </div>
      <div className="w-10 text-center">
        <AnimatedText
          type="ladderGradeLabel"
          variant="onBackgroundMain"
          fontFamily={fontClasses.copy?.family}
        >
          L
        </AnimatedText>
      </div>
      <div className="w-10 text-center">
        <AnimatedText
          type="ladderGradeLabel"
          variant="onBackgroundMain"
          fontFamily={fontClasses.copy?.family}
        >
          B
        </AnimatedText>
      </div>
      <div className="w-20 text-center">
        <AnimatedText
          type="ladderGradeLabel"
          variant="onBackgroundMain"
          fontFamily={fontClasses.copy?.family}
        >
          PTS
        </AnimatedText>
      </div>
    </div>
  );
};

export default TableHeader;
