import React from "react";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useBrickworkTypography } from "../../../../templates/variants/brickwork/design";
import { ResultMetaData } from "../../utils/primitives/ResultMetaData";

const ON_BACKGROUND_COPY: ColorVariant = "onBackgroundMain";

/** Grade label only — no panel fill (same idea as Brickwork Results match header meta). */
export const LiteGradeHeaderBrickWork: React.FC<{
  gradeName: string;
  delay?: number;
}> = ({ gradeName, delay = 0 }) => {
  const { animations } = useAnimationContext();
  const { copyFont } = useBrickworkTypography();
  const copyIn = animations.text.main.copyIn;

  return (
    <div className="w-full shrink-0 py-2 mx-8 mb-1">
      <ResultMetaData
        value={gradeName.toUpperCase()}
        animation={{ ...copyIn, delay: delay + 1 }}
        className="text-center w-full"
        variant={ON_BACKGROUND_COPY}
        fontFamily={copyFont}
      />
    </div>
  );
};
