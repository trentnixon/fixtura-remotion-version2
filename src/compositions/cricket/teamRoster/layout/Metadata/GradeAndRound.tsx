import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";
import { RosterDataItem } from "../../types";

interface RosterHeaderProps {
  roster: RosterDataItem;
}

export const GradeAndRound: React.FC<RosterHeaderProps> = ({ roster }) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  console.log("[selectedPalette]", selectedPalette);
  // Background color from theme
  const backgroundColor = selectedPalette.container.transparentMain;
  // Format result status color

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      style={{
        background: backgroundColor,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={0}
    >
      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: 0 }}
        className={`text-sm `}
        style={{ color: selectedPalette.text.onContainer.muted }}
      >
        {roster.gradeName}
      </AnimatedText>

      <AnimatedText
        type="metadataSmall"
        animation={{ ...TextAnimations.copyIn, delay: 0 }}
        className="text-sm text-right"
        style={{ color: selectedPalette.text.onContainer.muted }}
      >
        {roster.round}
      </AnimatedText>
    </AnimatedContainer>
  );
};

export default GradeAndRound;
