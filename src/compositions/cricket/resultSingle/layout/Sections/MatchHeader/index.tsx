import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";

interface MatchHeaderProps {
  date?: string;
  type?: string;
  round: string;
  ground: string;
  height: number;
  delay: number;
  className?: string;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const MatchHeader: React.FC<MatchHeaderProps> = ({
  date,
  type,
  round,
  ground,
  height,
  delay,
  className,
}) => {
  const { selectedPalette, layout } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Background color from theme
  const backgroundColor = selectedPalette.container.backgroundTransparent.high;

  // Format the left side text - use type and round, or date and round
  const leftText = type
    ? `${type} - ${round}`
    : date
      ? `${date} - ${round}`
      : round;

  return (
    <AnimatedContainer
      type="full"
      className={`w-full flex justify-between items-center p-4 ${layout.borderRadius.container}   ${className}`}
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
      />

      <ResultMetaData
        value={truncateText(ground, 50)}
        animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
        className="text-right"
      />
    </AnimatedContainer>
  );
};

export default MatchHeader;
