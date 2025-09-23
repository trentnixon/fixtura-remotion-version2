import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../../components/typography/AnimatedText";

export const VS = ({
  variant = "onContainerCopy",
}: {
  variant: ColorVariant;
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <>
      <AnimatedText
        type="metadataLarge"
        animation={{ ...TextAnimations.copyIn, delay: 0 }}
        className={`text-center`}
        variant={variant}
      >
        vs
      </AnimatedText>
    </>
  );
};
