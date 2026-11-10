import React from "react";
import type { ColorVariant } from "../../../../components/typography/AnimatedText";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../utils/primitives/ResultMetaData";

const GRADE_COPY_VARIANT: ColorVariant = "onContainerCopyNoBg";

/** Grade above fixtures — plain copy, centered (team names keep CNSW player-row bars). */
export const LiteGradeHeaderCNSW: React.FC<{
  gradeName: string;
  delay?: number;
}> = ({ gradeName, delay = 0 }) => {
  const { animations } = useAnimationContext();
  const copyIn = animations.text.main.copyIn;

  return (
    <div className="mb-1 w-full shrink-0 box-border px-8 py-2">
      <ResultMetaData
        value={gradeName.toUpperCase()}
        animation={{ ...copyIn, delay: delay + 1 }}
        className="w-full text-center"
        variant={GRADE_COPY_VARIANT}
      />
    </div>
  );
};
