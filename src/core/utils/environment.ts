// src/utils/environment.ts

export const isRemotionRender = () => {
  return process.env.NODE_ENV === "production";
};
