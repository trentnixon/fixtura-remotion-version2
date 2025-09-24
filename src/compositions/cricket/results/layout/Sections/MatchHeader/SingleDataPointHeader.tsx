import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";

interface MatchHeaderProps {
  grade: string;
  height: number;
  delay: number;
  backgroundColor: string;
  align: string;
  variant?: string;
}

export const SingleDataPointHeader: React.FC<MatchHeaderProps> = ({
  grade,
  height,
  delay,
  backgroundColor,
  align,
  variant = "onContainerCopyNoBg",
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <AnimatedContainer
      type="full"
      className={`w-full flex items-center px-4 py-0 ${
        align === "right"
          ? "justify-end"
          : align === "center"
            ? "justify-center"
            : "justify-start"
      }`}
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <ResultMetaData
        value={grade}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className={`${align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"}`}
        variant={variant}
      />
    </AnimatedContainer>
  );
};

export default SingleDataPointHeader;
