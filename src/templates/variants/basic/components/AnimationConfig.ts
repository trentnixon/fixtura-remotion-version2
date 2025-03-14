// BasicIntro Animation Config

import { ContainerAnimationConfig } from "../../../../components/containers/animations";
import { AnimationConfig as TextAnimationConfig } from "../../../../components/typography/config/animations";

/**
 * BasicIntro Animation Configuration
 *
 * This file defines animation configurations for the BasicIntro component.
 */

// ===== INTRO ANIMATIONS =====

// Image Animation Export
export const ImageAnimationInConfig: ContainerAnimationConfig = {
  type: "springScale",
  duration: 30,
  delay: 5,
  easing: "easeInOut",
  custom: { distance: 200 },
};

// Title Animation Export
export const TitleAnimationInConfig: TextAnimationConfig = {
  type: "scaleIn",
  duration: 30,
  easing: "linear",
  delay: 10,
  custom: { distance: 500 },
};

// Club Name Animation Export
export const ClubNameAnimationInConfig: TextAnimationConfig = {
  type: "typewriter",
  duration: 30,
  easing: "linear",
  delay: 20,
  custom: { distance: 500 },
};

// Intro Animation Out Export
export const IntroAnimationOutConfig: ContainerAnimationConfig = {
  type: "fadeOut",
  duration: 15,
  easing: "easeInOut",
};

// Intro Exit Frame Export
export const IntroExitFrame = 60;

// ===== OUTRO ANIMATIONS =====

// Outro Animation Export
export const BasicOutroAnimationConfig: ContainerAnimationConfig = {
  type: "fadeIn",
  duration: 15,
  easing: "easeInOut",
};
