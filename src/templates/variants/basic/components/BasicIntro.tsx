import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { useFontContext } from "../../../../core/context/FontContext";
import { MainTitle } from "../../../../components/typography";
import {
  Container,
  BasicContainer,
  GradientContainer,
  BorderContainer,
  CardContainer,
} from "../../../../components/containers";

/**
 * BasicIntro Component
 *
 * A basic introduction template that showcases enhanced spring animations.
 * This template demonstrates how spring physics affects animations in Remotion.
 */
export const BasicIntro: React.FC = () => {
  const { Club } = useVideoDataContext();
  const { fontsLoaded } = useFontContext();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation configuration
  const exitFrame = 90;
  const entryDuration = 45;
  const exitDuration = 30;
  const exitEndFrame = exitFrame + exitDuration;
  const animationPhase =
    frame < exitFrame
      ? "Entry Phase"
      : frame <= exitEndFrame
        ? "Exit Phase"
        : "Completed";

  return (
    <AbsoluteFill className="flex flex-col justify-center items-center bg-gray-900">
      {!fontsLoaded ? (
        <div className="text-white text-2xl">Loading fonts...</div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full px-12 py-8 overflow-auto">
          <div className="text-white text-sm mb-2">
            Current Frame: {frame} | Phase: {animationPhase} | Exit Frame:{" "}
            {exitFrame} | Exit End: {exitEndFrame}
          </div>

          {/* Main Title */}
          <MainTitle
            variant="primary"
            animation="fadeIn"
            animationDuration={entryDuration / 2}
            animationEasing="easeInOut"
            className="mb-4 text-center"
          >
            Enhanced Spring Animations Test
          </MainTitle>

          {/* Basic Spring Animations Row */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-white text-xl mb-4">Basic Spring Animations</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* springIn */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#2563eb"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springIn",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 10,
                      stiffness: 100,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">springIn</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Basic Spring In Animation
                </div>
              </div>

              {/* springScale */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#2563eb"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springScale",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 10,
                      stiffness: 100,
                    },
                    custom: {
                      startScale: 0.2,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">springScale</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Spring Scale Animation
                </div>
              </div>

              {/* springOut */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#2563eb"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "fadeIn",
                    duration: entryDuration / 2,
                    easing: "easeInOut",
                  }}
                  exitAnimation={{
                    type: "springOut",
                    duration: exitDuration,
                    springConfig: {
                      mass: 1,
                      damping: 10,
                      stiffness: 100,
                    },
                    custom: {
                      endScale: 0.2,
                    },
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">springOut</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Spring Out Animation
                </div>
              </div>
            </div>
          </div>

          {/* Spring Translation Animations Row */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-white text-xl mb-4">
              Spring Translation Animations
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* springTranslateX */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#7c3aed"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springTranslateX",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 8,
                      stiffness: 120,
                    },
                    custom: {
                      distance: 300,
                      includeOpacity: true,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">springTranslateX</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Spring Horizontal Translation
                </div>
              </div>

              {/* springTranslateY */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#7c3aed"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springTranslateY",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 8,
                      stiffness: 120,
                    },
                    custom: {
                      distance: 200,
                      includeOpacity: true,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">springTranslateY</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Spring Vertical Translation
                </div>
              </div>
            </div>
          </div>

          {/* Spring Rotation Animation Row */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-white text-xl mb-4">
              Spring Rotation Animation
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {/* springRotate */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="50%"
                  height="100px"
                  backgroundColor="#10b981"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springRotate",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 8,
                      stiffness: 100,
                    },
                    custom: {
                      startAngle: -180,
                      includeOpacity: true,
                      transformOrigin: "center center",
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">springRotate</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Spring Rotation Animation
                </div>
              </div>
            </div>
          </div>

          {/* Spring Configuration Comparison Row */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-white text-xl mb-4">
              Spring Configuration Comparison
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Default Spring */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#f59e0b"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springIn",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 10,
                      stiffness: 100,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">Default</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  mass: 1, damping: 10, stiffness: 100
                </div>
              </div>

              {/* Bouncy Spring */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#f59e0b"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springIn",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 5,
                      stiffness: 200,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">Bouncy</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  mass: 1, damping: 5, stiffness: 200
                </div>
              </div>

              {/* Heavy Spring */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#f59e0b"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springIn",
                    duration: entryDuration,
                    springConfig: {
                      mass: 5,
                      damping: 15,
                      stiffness: 80,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">Heavy</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  mass: 5, damping: 15, stiffness: 80
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Spring Options Row */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-white text-xl mb-4">Advanced Spring Options</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Overshoot Clamping */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#ef4444"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springIn",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 5,
                      stiffness: 200,
                      overshootClamping: true,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">Overshoot Clamping</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Prevents overshooting the target value
                </div>
              </div>

              {/* Custom From/To Values */}
              <div className="flex flex-col items-center">
                <BasicContainer
                  width="100%"
                  height="100px"
                  backgroundColor="#ef4444"
                  padding="1rem"
                  borderRadius="8px"
                  animation={{
                    type: "springIn",
                    duration: entryDuration,
                    springConfig: {
                      mass: 1,
                      damping: 8,
                      stiffness: 120,
                    },
                    custom: {
                      from: -0.5,
                      to: 1,
                      startScale: 0.3,
                    },
                  }}
                  exitAnimation={{
                    type: "fadeOut",
                    duration: exitDuration,
                    easing: "easeInOut",
                  }}
                  exitFrame={exitFrame}
                  className="flex items-center justify-center"
                >
                  <div className="text-white font-bold">Custom From/To</div>
                </BasicContainer>
                <div className="text-white text-sm mt-2">
                  Custom range values for spring
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
