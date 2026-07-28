import { config } from "@remotion/eslint-config-flat";

export default [
  ...config,
  {
    ignores: [".agents/**", ".claude/**"],
  },
  {
    files: ["scripts/**/*.{js,mjs,cjs}", "src/package/**/*.{js,cjs}"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        structuredClone: "readonly",
        module: "writable",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
      },
    },
  },
  {
    files: ["src/templates/variants/**/animations.ts"],
    rules: {
      // Static animation config objects use a `transition` key, not CSS transitions.
      "@remotion/non-pure-animation": "off",
    },
  },
];
