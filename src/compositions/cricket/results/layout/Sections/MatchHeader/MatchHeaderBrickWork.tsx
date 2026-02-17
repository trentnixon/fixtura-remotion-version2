import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";
import { MatchHeaderProps } from "./_types/MatchHeaderProps";
import { truncateText, formatMatchHeaderLeftText } from "./_utils/helpers";

/**
 * Brickwork-template-specific match header.
 * Metadata (type, round, grade) with Brickwork font, no container background.
 */
export const MatchHeaderBrickWork: React.FC<MatchHeaderProps> = ({
  date,
  type,
  round,
  grade,
  height,
  delay,
  className,
  backgroundColor: _backgroundColor, // Not used - Brickwork has no container bg
}) => {
  const { animations } = useAnimationContext();
  const { fontClasses, fonts } = useThemeContext();
  const TextAnimations = animations.text.main;

  const metadataFontFamily =
    fontClasses?.copy?.family ??
    fontClasses?.body?.family ??
    fonts?.copy?.family ??
    "Roboto";

  const leftText = formatMatchHeaderLeftText(type, date, round);

  return (
    <AnimatedContainer
      type="full"
      className={`w-full flex justify-between items-center px-2 ${className || ""}`}
      backgroundColor="none"
      style={{
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <ResultMetaData
        value={leftText}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        variant="onBackgroundMain"
        fontFamily={metadataFontFamily}
      />

      <ResultMetaData
        value={truncateText(grade ?? "", 50)}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className="text-right"
        variant="onBackgroundMain"
        fontFamily={metadataFontFamily}
      />
    </AnimatedContainer>
  );
};

export default MatchHeaderBrickWork;
