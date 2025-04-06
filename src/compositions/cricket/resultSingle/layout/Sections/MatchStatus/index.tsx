import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultFixtureResult } from "../../../../utils/primitives/ResultFixtureResult";

interface MatchStatusProps {
  status: string;
  result: string;
  height: number;
  delay: number;
}

const MatchStatus: React.FC<MatchStatusProps> = ({ result, height, delay }) => {
  const { selectedPalette, componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();

  // Get background color from theme
  const backgroundColor = selectedPalette.container.muted;
  const textColor = selectedPalette.text.primary;

  const TextAnimations = animations.text.main;
  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-center items-center p-2"
      backgroundColor="none"
      style={{
        height: `${height}px`,
        color: textColor,
        background: backgroundColor,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <div className="flex flex-col items-center justify-center">
        <ResultFixtureResult
          value={result}
          animation={{ ...TextAnimations.copyIn, delay: 0 }}
        />
      </div>
    </AnimatedContainer>
  );
};

export default MatchStatus;
