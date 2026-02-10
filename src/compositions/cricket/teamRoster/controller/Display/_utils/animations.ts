/**
 * Default container animation configuration
 */
export const DEFAULT_CONTAINER_ANIMATION = {
  type: "none" as const,
  easing: { type: "inOut" as const, base: "ease" as const },
  duration: 25,
  custom: {
    distance: 200,
  },
};

/**
 * Default container exit animation configuration
 */
export const DEFAULT_CONTAINER_EXIT_ANIMATION = {
  type: "none" as const,
  easing: { type: "inOut" as const, base: "ease" as const },
  duration: 15,
  custom: {
    distance: 100,
  },
};
