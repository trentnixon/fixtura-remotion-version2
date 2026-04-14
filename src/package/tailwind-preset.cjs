/**
 * Tailwind CSS preset: theme tokens shared with @fixtura/remotion-assets source.
 * Consumers should add: presets: [require("@fixtura/remotion-assets/tailwind-preset")]
 * so utilities like font-teko / font-rajdhani match the package.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        teko: ["Teko", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
    },
  },
};
