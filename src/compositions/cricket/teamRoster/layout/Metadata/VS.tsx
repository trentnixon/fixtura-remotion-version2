import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../../components/typography/AnimatedText";
import { VSProps } from "./_types/VSProps";
import {
  DEFAULT_METADATA_VARIANT,
  DEFAULT_METADATA_ANIMATION_DELAY,
} from "./_utils/constants";

export const VS = ({
  variant = DEFAULT_METADATA_VARIANT,
}: {
  variant?: ColorVariant;
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <>
      <AnimatedText
        type="metadataLarge"
        animation={{
          ...TextAnimations.copyIn,
          delay: DEFAULT_METADATA_ANIMATION_DELAY,
        }}
        className={`text-center`}
        variant={variant}
      >
        vs
      </AnimatedText>
    </>
  );
};
