import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { MudgeerabaAngularDividerProps } from "./_types/MudgeerabaAngularDividerProps";

export const MudgeerabaAngularDivider: React.FC<MudgeerabaAngularDividerProps> = ({
  delay,
  outerContainer,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const ContainerAnimations = animations.container.main.itemContainer;
  
  // Theme colors for backgrounds
  const backgroundColorMain = selectedPalette.background.main;
  const backgroundColorContainer = selectedPalette.container.backgroundTransparent.high;

  // Height configuration for bands
  const bandHeight = 12; // pixels for each white band
  const separatorHeight = 2; // pixels for black separator lines
  const brokenBandHeight = 16; // pixels for central broken band (slightly taller)

  return (
    <AnimatedContainer
      type="full"
      className="w-full relative"
      backgroundColor="none"
      style={outerContainer}
      animation={ContainerAnimations.containerIn}
      animationDelay={delay}
    >
      <div className="w-full flex flex-col">
        {/* Top Band */}
        <div
          className="w-full"
          style={{
            height: `${bandHeight}px`,
            backgroundColor: backgroundColorContainer,
          }}
        />

        {/* Separator */}
        <div
          className="w-full"
          style={{
            height: `${separatorHeight}px`,
            backgroundColor: backgroundColorMain,
          }}
        />

        {/* Central Broken/Interrupted Band with Angular Cuts */}
        <div 
          className="w-full relative" 
          style={{ 
            height: `${brokenBandHeight}px`,
            backgroundColor: backgroundColorMain,
          }}
        >
          {/* Left segment of broken band */}
          <div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: "45%",
              height: "100%",
              backgroundColor: backgroundColorContainer,
              clipPath: "polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Right segment of broken band */}
          <div
            className="absolute"
            style={{
              right: 0,
              top: 0,
              width: "45%",
              height: "100%",
              backgroundColor: backgroundColorContainer,
              clipPath: "polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%, 5% 50%)",
            }}
          />

          {/* The negative space (chevron/hourglass) in the center shows through to main background */}
        </div>

        {/* Separator */}
        <div
          className="w-full"
          style={{
            height: `${separatorHeight}px`,
            backgroundColor: backgroundColorMain,
          }}
        />

        {/* Bottom Band */}
        <div
          className="w-full"
          style={{
            height: `${bandHeight}px`,
            backgroundColor: backgroundColorContainer,
          }}
        />
      </div>
    </AnimatedContainer>
  );
};

export default MudgeerabaAngularDivider;
