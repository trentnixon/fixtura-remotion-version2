import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";
import { mergeWithPriority } from "../../../../../../core/utils/classNames";
import { MatchHeaderProps } from "./_types/MatchHeaderProps";
import { truncateText, formatMatchHeaderLeftText } from "./_utils/helpers";

export const MatchHeader: React.FC<MatchHeaderProps> = ({
  date,
  type,
  round,
  ground,
  height,
  delay,
  backgroundColor,
  className,
  CopyVariant = "onContainerCopy",
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Format the left side text - use type and round, or date and round
  const leftText = formatMatchHeaderLeftText(type, date, round);

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
        variant={CopyVariant}
      />

      <ResultMetaData
        value={truncateText(ground, 50)}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className="text-right"
        variant={CopyVariant}
      />
    </AnimatedContainer>
  );
};

export default MatchHeader;
