import { Sequence } from "remotion";
import { AnimatedContainer } from "../";
import { SPRING_CONFIGS } from "../animations";
import { AnimatedText as Typography } from "../../typography";
import { ContainerAnimationType } from "../animations/animationTypes";

/**
 * AnimatedContainerExamples
 *
 * This file contains examples of how to use the AnimatedContainer component
 * in different scenarios. These examples can be used as a reference for
 * implementing animations in your own compositions.
 */

/**
 * Basic container with no animation
 */
export const BasicContainer = () => (
  <AnimatedContainer
    type="basic"
    backgroundColor="primary"
    rounded="md"
    shadow="md"
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Basic Container (No Animation)</Typography>
  </AnimatedContainer>
);

/**
 * Container with fade in animation
 */
export const FadeInContainer = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="light"
    rounded="lg"
    shadow="lg"
    animation="fadeIn"
    animationDuration={30}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Fade In Animation</Typography>
  </AnimatedContainer>
);

/**
 * Container with fade in and fade out animations
 */
export const FadeInOutContainer = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="light"
    rounded="lg"
    shadow="lg"
    animation="fadeIn"
    animationDuration={30}
    exitAnimation="fadeOut"
    exitAnimationDuration={30}
    exitFrame={90}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Fade In and Out Animation</Typography>
  </AnimatedContainer>
);

/**
 * Container with slide in animation
 */
export const SlideInContainer = () => (
  <AnimatedContainer
    type="border"
    backgroundColor="secondary"
    rounded="md"
    animation="slideInLeft"
    animationDuration={25}
    animationEasing={{ type: "out", base: "ease" }}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Slide In Animation</Typography>
  </AnimatedContainer>
);

/**
 * Container with slide in and slide out animations
 */
export const SlideInOutContainer = () => (
  <AnimatedContainer
    type="border"
    backgroundColor="secondary"
    rounded="md"
    animation="slideInLeft"
    animationDuration={25}
    animationEasing={{ type: "out", base: "ease" }}
    exitAnimation="slideOutRight"
    exitAnimationDuration={25}
    exitAnimationEasing={{ type: "in", base: "ease" }}
    exitFrame={90}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Slide In and Out Animation</Typography>
  </AnimatedContainer>
);

/**
 * Container with scale animation
 */
export const ScaleContainer = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="accent"
    rounded="full"
    shadow="lg"
    animation="scaleIn"
    animationDuration={20}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Scale Animation</Typography>
  </AnimatedContainer>
);

/**
 * Container with spring animation
 */
export const SpringContainer = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="primary"
    rounded="lg"
    shadow="lg"
    animation="springIn"
    springConfig={SPRING_CONFIGS.BOUNCE}
    animationDuration={45}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Spring Animation</Typography>
  </AnimatedContainer>
);

/**
 * Container with 3D animation
 */
export const FlipContainer = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="primary"
    rounded="md"
    shadow="xl"
    animation="flipX"
    animationDuration={40}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>3D Flip Animation</Typography>
  </AnimatedContainer>
);

/**
 * Container with reveal animation
 */
export const RevealContainer = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="secondary"
    rounded="md"
    shadow="md"
    animation="revealLeft"
    animationDuration={30}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Reveal Animation</Typography>
  </AnimatedContainer>
);

/**
 * Multiple containers with sequenced animations
 */
export const SequencedContainers = () => (
  <>
    <Sequence durationInFrames={120}>
      <AnimatedContainer
        type="card"
        backgroundColor="primary"
        rounded="md"
        shadow="md"
        animation="fadeIn"
        animationDuration={30}
        exitAnimation="fadeOut"
        exitFrame={90}
        style={{
          padding: 20,
          width: 300,
          height: 200,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Typography>First Container</Typography>
      </AnimatedContainer>
    </Sequence>

    <Sequence from={30} durationInFrames={120}>
      <AnimatedContainer
        type="card"
        backgroundColor="secondary"
        rounded="md"
        shadow="md"
        animation="slideInRight"
        animationDuration={30}
        exitAnimation="slideOutRight"
        exitFrame={120}
        style={{
          padding: 20,
          width: 300,
          height: 200,
          position: "absolute",
          top: 50,
          left: 50,
        }}
      >
        <Typography>Second Container</Typography>
      </AnimatedContainer>
    </Sequence>

    <Sequence from={60} durationInFrames={120}>
      <AnimatedContainer
        type="card"
        backgroundColor="accent"
        rounded="md"
        shadow="md"
        animation="scaleIn"
        animationDuration={30}
        style={{
          padding: 20,
          width: 300,
          height: 200,
          position: "absolute",
          top: 100,
          left: 100,
        }}
      >
        <Typography>Third Container</Typography>
      </AnimatedContainer>
    </Sequence>
  </>
);

/**
 * Container with custom animation configuration
 */
export const CustomAnimationContainer = () => (
  <AnimatedContainer
    type="card"
    backgroundColor="light"
    rounded="lg"
    shadow="lg"
    animation={{
      type: "fadeIn",
      duration: 45,
      easing: "bounce",
      delay: 15,
    }}
    style={{ padding: 20, width: 300, height: 200 }}
  >
    <Typography>Custom Animation Configuration</Typography>
  </AnimatedContainer>
);

/**
 * Container with staggered children animations
 * Note: This example shows how to create a staggered effect by using
 * multiple AnimatedContainers with different delays
 */
export const StaggeredAnimationContainer = () => (
  <AnimatedContainer
    type="basic"
    backgroundColor="transparent"
    style={{ display: "flex", flexDirection: "column", gap: 10 }}
  >
    {[0, 1, 2, 3, 4].map((index) => (
      <AnimatedContainer
        key={index}
        type="card"
        backgroundColor="primary"
        rounded="md"
        shadow="md"
        animation="slideInRight"
        animationDelay={index * 5} // Stagger the animations
        animationDuration={20}
        style={{ padding: 10, width: 300 }}
      >
        <Typography>{`Item ${index + 1}`}</Typography>
      </AnimatedContainer>
    ))}
  </AnimatedContainer>
);

/**
 * Example composition that demonstrates all animation types
 */
export const AnimationShowcase = () => {
  // Animation types grouped by category
  const animationGroups: Record<string, ContainerAnimationType[]> = {
    fade: ["fadeIn", "fadeOut"],
    slide: [
      "slideInLeft",
      "slideInRight",
      "slideInTop",
      "slideInBottom",
      "slideOutLeft",
      "slideOutRight",
      "slideOutTop",
      "slideOutBottom",
    ],
    scale: [
      "scaleIn",
      "scaleOut",
      "scaleInX",
      "scaleInY",
      "scaleOutX",
      "scaleOutY",
    ],
    reveal: [
      "revealLeft",
      "revealRight",
      "revealTop",
      "revealBottom",
      "collapseLeft",
      "collapseRight",
      "collapseTop",
      "collapseBottom",
    ],
    spring: [
      "springIn",
      "springOut",
      "springScale",
      "springTranslateX",
      "springTranslateY",
      "springRotate",
    ],
    threeD: [
      "flipX",
      "flipY",
      "rotate3D",
      "swing",
      "zoomPerspective",
      "glitch",
      "blur",
    ],
  };

  // Render a grid of animations
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 40, padding: 20 }}
    >
      {Object.entries(animationGroups).map(([groupName, animations]) => (
        <div key={groupName}>
          <Typography type="title">{`${groupName} Animations`}</Typography>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {animations.map((animationType) => (
              <AnimatedContainer
                key={animationType}
                type="card"
                backgroundColor="light"
                rounded="md"
                shadow="md"
                animation={animationType}
                animationDuration={60}
                style={{
                  padding: 10,
                  width: 200,
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>{animationType}</Typography>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Example of using different spring configurations
 */
export const SpringConfigShowcase = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 40, padding: 20 }}
    >
      <Typography type="title">Spring Configurations</Typography>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {Object.entries(SPRING_CONFIGS).map(([configName, config]) => (
          <AnimatedContainer
            key={configName}
            type="card"
            backgroundColor="light"
            rounded="md"
            shadow="md"
            animation="springIn"
            springConfig={config}
            animationDuration={90}
            style={{
              padding: 10,
              width: 200,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>{configName}</Typography>
          </AnimatedContainer>
        ))}
      </div>
    </div>
  );
};
