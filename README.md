# Fixtura Video Application

<p align="center">
  <a href="https://github.com/fixtura-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/fixtura-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Fixtura Logo" src="https://github.com/fixtura-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Fixtura Remotion Version 2 — published as **`@fixtura/remotion-assets`**.

## Commands

| Script                  | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| `npm run dev`           | Remotion Studio                                                           |
| `npm run build:package` | Build JS/CSS for npm (`dist/`) and run pack verification                  |
| `npm run verify:pack`   | Assert publish `files` and critical paths (e.g. `src/templates/variants`) |

---

## Package public API (semver)

Treat these as **stable contracts** unless noted in changelog:

| Export              | Purpose                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `./preview`         | Preview bundle (`FixturaTemplateScene`, composition helpers)                                                            |
| `./src/*`           | Published source subpaths for deep imports and **Tailwind content scanning**                                            |
| `./styles.css`      | Compiled CSS from the package build — **supplementary**; not sufficient alone for full utility parity in host apps      |
| `./tailwind-preset` | Shared `theme.extend.fontFamily` (`font-teko`, `font-rajdhani`) so hosts generate the same named utilities as this repo |

**Shipped source trees** (from `package.json` `files`): `src/components`, `src/compositions`, `src/config`, `src/core`, `src/package`, `src/templates` (includes **`src/templates/variants/**`**), `src/types`, plus `dist/`.

**Patch/minor/major:** additive exports or docs → minor; **removing or renaming** shipped paths or exports → **major**.

---

## Consuming this package (Tailwind alignment)

The preview must see the **same Tailwind utilities** as this package’s components (e.g. `text-9xl`, `font-teko`, `tracking-tight`). That requires two things in the **host app**:

1. **Scan published package source** so Tailwind sees all class strings (especially under `src/templates/variants`).
2. **Theme parity** for custom tokens: this repo defines `font-teko` and `font-rajdhani` in theme. Scanning finds the class names; your Tailwind config must define those **font families** or you will not get correct CSS. Use the published preset:

```js
// tailwind.config.js (Tailwind v3)
const remotion = require("@fixtura/remotion-assets/tailwind-preset");

module.exports = {
  presets: [remotion],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@fixtura/remotion-assets/src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...rest of app config
};
```

**Monorepo / pnpm:** resolve the package root once and reuse in `content`:

```js
const path = require("path");
const remotionRoot = path.dirname(
  require.resolve("@fixtura/remotion-assets/package.json"),
);

module.exports = {
  presets: [require("@fixtura/remotion-assets/tailwind-preset")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    path.join(remotionRoot, "src/**/*.{js,ts,jsx,tsx}"),
  ],
};
```

**Tailwind v4** in the host: point `@source` at the same published paths, for example:

```css
@import "tailwindcss";
@source "../node_modules/@fixtura/remotion-assets/src/**/*.{js,ts,jsx,tsx}";
```

(Adjust the relative path to match your app’s file layout.) Still apply **`./tailwind-preset`**-equivalent theme tokens (via preset or `@theme` in v4) so `font-teko` / `font-rajdhani` resolve correctly.

**Optional:** `import "@fixtura/remotion-assets/styles.css";` for a compiled baseline — use together with scanning + theme, not instead of them.

**Isolation:** Preventing host global CSS from leaking into the preview (wrapper, reset, containment) is a **separate** concern from generating utilities; handle both.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
