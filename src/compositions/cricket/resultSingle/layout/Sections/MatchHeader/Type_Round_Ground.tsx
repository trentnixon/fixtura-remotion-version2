import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";
import { MatchHeaderProps } from "./_types/MatchHeaderProps";
import { truncateText, formatLeftText } from "./_utils/helpers";

export const MatchHeader: React.FC<MatchHeaderProps> = ({
    date,
    type,
    round,
    ground,
    height,
    delay,
    className,
    backgroundColor: userBackgroundColor,
    CopyVariant = "onContainerCopy",
}) => {
    const { selectedPalette, layout } = useThemeContext();
    const { animations } = useAnimationContext();
    const TextAnimations = animations.text.main;

    // Background color - use provided or default from theme
    const backgroundColor = userBackgroundColor || selectedPalette.container.backgroundTransparent.high;

    // Format the left side text - use type and round, or date and round
    const leftText = formatLeftText(type, date, round);

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
