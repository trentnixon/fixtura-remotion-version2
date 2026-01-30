import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { MatchHeaderProps } from "./_types/MatchHeaderProps";
import { MetadataLarge } from "../../../../utils/primitives/metadataLarge";

export const Type_Round_Ground_stacked: React.FC<MatchHeaderProps> = ({
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

    return (
        <AnimatedContainer
            type="full"
            className={`w-full flex flex-col justify-start gap-2 p-4 ${layout.borderRadius.container}   ${className}`}
            backgroundColor="none"
            style={{
                background: backgroundColor,
                height: `${height}px`,
            }}
            animation={animations.container.main.itemContainer.containerIn}
            animationDelay={delay}
        >
            <MetadataLarge
                value={type ? `${type} - ${round}` : round}
                animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                className="text-left"
                variant={CopyVariant}
            />
            <MetadataLarge
                value={ground}
                animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                className="text-left"
                variant={CopyVariant}
            />

        </AnimatedContainer>
    );
};

export default Type_Round_Ground_stacked;
