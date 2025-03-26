import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { HEADER_ANIMATION_DURATION } from "../../types";
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
  const frame = useCurrentFrame();
  const { fontClasses } = useThemeContext();
  const opacity = interpolate(
    frame,
    [HEADER_ANIMATION_DURATION, HEADER_ANIMATION_DURATION + 15],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  return (
    <div
      className="flex items-center p-2 border-b-2 border-white/20 mb-3 font-bold text-sm text-gray-400"
      style={{ height: `${headerHeight}px` }}
    >
      <div className="flex-1 text-left font-bold">
        <AnimatedText
          type="label"
          textAlign="left"
          variant="onBackgroundDark"
          letterAnimation="word"
          staggerDelay={5}
          animation={{
            type: "typewriter",
            duration: 15,
            easing: "linear",
            delay: 10,
            custom: { distance: 500 },
          }}
          fontFamily={fontClasses.title?.family}
        >
          {title}
        </AnimatedText>
      </div>

      <div className="w-8 text-center">
        <AnimatedText type="label" fontFamily={fontClasses.title?.family}>
          P
        </AnimatedText>
      </div>
      <div className="w-8 text-center">
        <AnimatedText type="label" fontFamily={fontClasses.title?.family}>
          W
        </AnimatedText>
      </div>
      <div className="w-8 text-center">
        <AnimatedText type="label" fontFamily={fontClasses.title?.family}>
          L
        </AnimatedText>
      </div>
      <div className="w-8 text-center">
        <AnimatedText type="label" fontFamily={fontClasses.title?.family}>
          B
        </AnimatedText>
      </div>
      <div className="w-16 text-center">
        <AnimatedText type="label" fontFamily={fontClasses.title?.family}>
          PTS
        </AnimatedText>
      </div>
    </div>
  );
};

export default TableHeader;
