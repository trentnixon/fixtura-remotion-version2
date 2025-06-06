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
  type: "typewriter",
  duration: 15,
  easing: "linear",
  delay: 10,
  custom: { distance: 500 },
};

// Club Name Animation Export
export const ClubNameAnimationInConfig: TextAnimationConfig = {
  type: "typewriter",
  duration: 15,
  easing: "linear",
  delay: 10,
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

// ===== MAIN ANIMATIONS =====

// Main Animation Export
export const MainAnimationInConfig: ContainerAnimationConfig = {
  type: "fadeIn",
  duration: 15,
  easing: "easeInOut",
};

export const MainTitleAnimationInConfig: TextAnimationConfig = {
  type: "typewriter",
  duration: 6,
  easing: "linear",
  delay: 10,
  custom: { distance: 500 },
};

// ===== OUTRO ANIMATIONS =====

// Outro Animation Export
export const BasicOutroAnimationConfig: ContainerAnimationConfig = {
  type: "fadeIn",
  duration: 15,
  easing: "easeInOut",
};
