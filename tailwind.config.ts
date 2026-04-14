// eslint-disable-next-line @typescript-eslint/no-require-imports
const remotionAssetsPreset = require("./src/package/tailwind-preset.cjs");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [remotionAssetsPreset],
  plugins: [],
};
