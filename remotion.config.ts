// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
// Webpack 5.105 writes a filesystem cache entry with a missing symlink hash.
// The next Studio render or `lambda sites create` then crashes in WasmHash.
Config.setCachingEnabled(false);
// WebGL2 effects-solid presets (light-leak, future @remotion/effects stacks).
// Lambda renders must pass chromiumOptions.gl = "swangle" on the render API instead.
Config.setChromiumOpenGlRenderer("angle");
Config.overrideWebpackConfig((currentConfiguration) => {
  return enableTailwind(currentConfiguration);
});
