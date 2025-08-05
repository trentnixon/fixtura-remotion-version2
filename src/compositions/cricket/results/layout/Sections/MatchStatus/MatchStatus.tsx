import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { AnimatedText } from "../../../../../../components/typography/AnimatedText";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";

interface MatchStatusProps {
  status: string;
  result: string;

  delay: number;

  outerContainer: object;
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

export const MatchStatus: React.FC<MatchStatusProps> = ({
  status,
  result,
  delay,
  outerContainer,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const { layout } = useThemeContext();
  // Format result status color

  // Truncate the result
  const truncatedResult = truncateText(result, 50);

  return (
    <AnimatedContainer
      type="full"
      className={`w-full flex justify-between items-center p-3 ${layout.borderRadius.container}`}
      backgroundColor="none"
      style={outerContainer}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay + 10}
    >
      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: delay + 12 }}
        className={`text-2xl`}
        variant="onContainerCopy"
      >
        {status}
      </AnimatedText>

      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: delay + 13 }}
        className="text-4xl text-right"
        variant="onContainerCopy"
      >
        {truncatedResult}
      </AnimatedText>
    </AnimatedContainer>
  );
};

export default MatchStatus;
