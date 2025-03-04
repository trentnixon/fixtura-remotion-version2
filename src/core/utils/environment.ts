// src/utils/environment.ts
/**
 * Detects if the current execution is a Remotion render (production)
 */

export const isRemotionRender = () => {
  try {
    // Try to import and use Remotion's isRemotionPlayer if available
    const { isRemotionPlayer } = require("remotion");
    if (typeof isRemotionPlayer === "function") {
      return isRemotionPlayer();
    }
  } catch (e) {
    // If Remotion API isn't available that way, fall back to environment checks
  }

  return (
    process.env.NODE_ENV === "production" ||
    process.env.REMOTION_RENDER === "true" ||
    !!process.env.REMOTION_SITE
  );
};
