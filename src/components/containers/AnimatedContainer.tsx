import React from "react";
import { useCurrentFrame } from "remotion";
import { applyAnimation } from "./config/animationUtils";

interface ContainerAnimation {
  type: string;
  duration: number;
  easing?: string;
  delay?: number;
}

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation: ContainerAnimation;
  exitAnimation?: ContainerAnimation;
  exitFrame?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation,
  exitAnimation,
  exitFrame = 0,
  className = "",
  style = {},
}) => {
  const frame = useCurrentFrame();

  // Determine if we should use entry or exit animation
  const isExiting = exitFrame > 0 && frame >= exitFrame;
  const currentAnimation = isExiting ? exitAnimation : animation;

  // If no animation is provided, render without animation
  if (!currentAnimation) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Calculate animation progress
  const { type, duration, easing = "linear", delay = 0 } = currentAnimation;
  const startFrame = isExiting ? exitFrame : delay;
  const animationFrame = frame - startFrame;

  // Apply animation based on type and progress
  const animatedStyle = applyAnimation(
    type,
    animationFrame,
    duration,
    easing,
    style,
  );

  return (
    <div className={className} style={animatedStyle}>
      {children}
    </div>
  );
};
