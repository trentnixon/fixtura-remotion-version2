import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardSixersThunder from "../../layout/MatchCard/card-Sixers-thunder";
import MatchCardSixersThunderClubOnly from "../../layout/MatchCard/card-Sixers-thunder-clubOnly";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MatchRowProps } from "./_types/MatchRowProps";
import { calculateDelay, calculateAnimationOutFrame } from "./_utils/calculations";

const MatchRowSixersThunder: React.FC<MatchRowProps> = ({
  match,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data, isAccountClub } = useVideoDataContext();
  const { timings } = data;
  const { layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

  return (
    <div className="h-full w-full">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} h-full w-full`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        {
          isAccountClub ? (
            <MatchCardSixersThunderClubOnly
              match={match}
              index={index}
              rowHeight={rowHeight}
              delay={delay}
            />
          ) : (
            <MatchCardSixersThunder
              match={match}
              index={index}
              rowHeight={rowHeight}
              delay={delay}
            />
          )
        }
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowSixersThunder;
