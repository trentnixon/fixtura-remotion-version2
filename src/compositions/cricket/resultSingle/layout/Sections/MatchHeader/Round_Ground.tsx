import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";
import { mergeWithPriority } from "../../../../../../core/utils/classNames";
import { RoundGroundProps } from "./_types/MatchHeaderProps";
import { truncateText, formatLeftText } from "./_utils/helpers";

export const Round_Ground: React.FC<RoundGroundProps> = ({
  date,
  type,
  round,
  ground,
  height,
  delay,
  className,
  userBackgroundColor,
  variant,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Background color from theme
  const backgroundColor =
    userBackgroundColor || selectedPalette.container.backgroundTransparent.high;

  // Format the left side text - use type and round, or date and round
  const leftText = formatLeftText(type, date, round);

  return (
    <AnimatedContainer
      type="full"
      className={mergeWithPriority(
        "w-full flex justify-between items-center p-4",
        className || "",
      )}
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <ResultMetaData
        value={leftText}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className=""
        variant={variant}
      />

      <ResultMetaData
        value={truncateText(ground, 50)}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className="text-right"
        variant={variant}
      />
    </AnimatedContainer>
  );
};

export default Round_Ground;
