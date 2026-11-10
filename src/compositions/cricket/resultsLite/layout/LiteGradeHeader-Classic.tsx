import React from "react";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../utils/primitives/ResultMetaData";

const ON_BACKGROUND_COPY: ColorVariant = "onBackgroundMain";

/** Grade on page background, centered above the fixture stack. */
export const LiteGradeHeaderClassic: React.FC<{
  gradeName: string;
  delay?: number;
}> = ({ gradeName, delay = 0 }) => {
  const { animations } = useAnimationContext();
  const copyIn = animations.text.main.copyIn;

  return (
    <div className="w-full shrink-0 py-2 mx-8 mb-1">
      <ResultMetaData
        value={gradeName.toUpperCase()}
        animation={{ ...copyIn, delay: delay + 1 }}
        className="text-center w-full"
        variant={ON_BACKGROUND_COPY}
      />
    </div>
  );
};
