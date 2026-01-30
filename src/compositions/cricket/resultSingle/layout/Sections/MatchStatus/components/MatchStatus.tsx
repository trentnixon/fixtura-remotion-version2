import React from "react";
import { AnimatedContainer } from "../../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { ResultFixtureResult } from "../../../../../utils/primitives/ResultFixtureResult";
import { MatchStatusProps } from "../_types/MatchStatusProps";

const MatchStatus: React.FC<MatchStatusProps> = ({ result, delay, height, outerContainer }) => {
    const { selectedPalette, layout } = useThemeContext();
    const { animations } = useAnimationContext();

    // Get background color from theme (use from outerContainer if provided, otherwise default)
    const defaultBackgroundColor = selectedPalette.container.backgroundTransparent.subtle;
    const containerStyle = outerContainer || {
        height: height ? `${height}px` : undefined,
        background: defaultBackgroundColor,
    };

    const TextAnimations = animations.text.main;
    return (
        <AnimatedContainer
            type="full"
            className={`w-full flex justify-center items-center p-2 ${layout.borderRadius.container}`}
            backgroundColor="none"
            style={containerStyle}
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
