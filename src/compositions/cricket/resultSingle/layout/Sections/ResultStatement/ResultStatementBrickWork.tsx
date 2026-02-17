import React from "react";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";
import { ResultStatementShort } from "./ResultStatementShort";
import { swapResultWord } from "./_utils/helpers";
import { ResultStatementBrickWorkProps } from "./_types/ResultStatementProps";

export const ResultStatementBrickWork: React.FC<ResultStatementBrickWorkProps> = ({
    resultShort,
    resultSummary,
    height,
    delay,
}) => {
    const { animations } = useAnimationContext();
    const { selectedPalette, layout } = useThemeContext();
    const TextAnimations = animations.text.main;

    // Get background color from theme (matching stats section)
    const backgroundColor = selectedPalette.container.backgroundTransparent.medium;

    // Priority: resultSummary > resultShort
    if (resultSummary) {
        return (
            <div
                className={`w-full flex flex-col items-center px-16 py-4 my-4 justify-center gap-2 rounded-none ${layout.borderRadius.container}`}
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                {/* Home Team */}
                <ResultMetaData
                    value={resultSummary.homeTeam}
                    animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                    variant="onContainerCopy"
                    className="text-center text-4xl font-normal tracking-wider"
                />

                {/* Result Word */}
                <ResultMetaData
                    value={swapResultWord(resultSummary.resultWord).toUpperCase()}
                    animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                    variant="onContainerCopy"
                    className="text-center text-5xl font-semibold tracking-wider"
                />

                {/* Away Team */}
                <ResultMetaData
                    value={resultSummary.awayTeam}
                    animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
                    variant="onContainerCopy"
                    className="text-center text-4xl font-normal tracking-wider"
                />
            </div>
        );
    }

    if (resultShort) {
        return (
            <div
                className={`w-full flex justify-center items-center mb-4 rounded-none ${layout.borderRadius.container}`}
                style={{
                    backgroundColor: backgroundColor,
                    height: `${height}px`,
                }}
            >
                <ResultStatementShort
                    resultShort={resultShort}
                    delay={delay}
                    outerContainer={{
                        height: height,
                    }}
                />
            </div>
        );
    }

    return null;
};

export default ResultStatementBrickWork;
