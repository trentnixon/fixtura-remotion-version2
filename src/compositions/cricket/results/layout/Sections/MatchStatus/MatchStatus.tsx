import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { AnimatedText } from "../../../../../../components/typography/AnimatedText";

interface MatchStatusProps {
  status: string;
  result: string;
  height: number;
  delay: number;
  backgroundColor: string;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const MatchStatus: React.FC<MatchStatusProps> = ({
  status,
  result,
  height,
  delay,
  backgroundColor,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Format result status color

  // Truncate the result
  const truncatedResult = truncateText(result, 50);

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      style={{
        background: backgroundColor,
        height: `${height}px`,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay + 10}
    >
      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: delay + 12 }}
        className={`text-4xl`}
        style={{ color: selectedPalette.text.onContainer.muted }}
      >
        {status}
      </AnimatedText>

      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: delay + 13 }}
        className="text-4xl text-right"
        style={{ color: selectedPalette.text.onContainer.muted }}
      >
        {truncatedResult}
      </AnimatedText>
    </AnimatedContainer>
  );
};

export default MatchStatus;
