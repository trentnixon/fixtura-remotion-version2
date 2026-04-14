# Remotion Package Styles Implementation Note

> **Integration strategy (2026):** Relying on `styles.css` alone is **no longer the primary** way to match Remotion markup in host apps. The main approach is for the consuming app to **scan this package’s published source** in its Tailwind pipeline and align theme tokens (see [Remotion Tailwind Alignment Handoff.md](./Remotion%20Tailwind%20Alignment%20Handoff.md) and the **Consuming this package** section in the repository [README.md](../README.md)). The `./styles.css` export remains useful as a **supplementary** baseline. The document below is retained for history and for teams still wiring the CSS export.

## Goal

Update `fixtura-remotion-version2` so the published package ships a compiled stylesheet that the consuming app can import.

Target consumer usage:

```ts
import "@fixtura/remotion-assets/styles.css";
```

## Current Problem

The package currently builds and exports only:

- `dist/preview.js`
- `dist/preview.mjs`
- `dist/preview.d.ts`

There is no CSS asset in `dist`.

That means the consuming app can render the Remotion component tree but does not receive the package’s style layer.

## Requested Outcome

The package should emit:

- `dist/preview.css`

and expose it in `package.json`:

```json
{
  "exports": {
    "./preview": {
      "types": "./dist/preview.d.ts",
      "import": "./dist/preview.mjs",
      "require": "./dist/preview.js"
    },
    "./styles.css": "./dist/preview.css"
  }
}
```

## Recommended Implementation

### 1. Add a package stylesheet entry

Create:

```text
src/package/styles.css
```

This file should represent the stylesheet intended for package consumers.

If there is existing shared styling in:

```text
src/index.css
```

move or duplicate the relevant package-consumer-safe styles into `src/package/styles.css`.

Important:

- do not rely on the consuming app to know about internal studio-only stylesheet paths
- keep the package stylesheet intentionally public and stable

## 2. Compile CSS during package build

The current package build uses `tsup` for JS output only.

That means CSS needs a parallel build step.

One acceptable approach is:

1. keep `tsup` for JS output
2. add a CSS build command that compiles `src/package/styles.css` into `dist/preview.css`

Possible tools:

- Tailwind CLI
- PostCSS CLI
- existing Tailwind/PostCSS project tooling if already available in the repo

The exact tool choice is less important than the result:

```text
dist/preview.css
```

## 3. Update package build scripts

Example direction:

```json
{
  "scripts": {
    "build:package:js": "tsup && node scripts/copy-preview-dts.mjs",
    "build:package:css": "tailwindcss -i ./src/package/styles.css -o ./dist/preview.css --minify",
    "build:package": "npm run build:package:js && npm run build:package:css"
  }
}
```

If Tailwind CLI is not the right tool for the current repo setup, use the equivalent PostCSS/Tailwind pipeline already established in the Remotion repo.

## 4. Export the stylesheet

Update `package.json` exports:

```json
{
  "exports": {
    "./preview": {
      "types": "./dist/preview.d.ts",
      "import": "./dist/preview.mjs",
      "require": "./dist/preview.js"
    },
    "./styles.css": "./dist/preview.css"
  }
}
```

This gives consumers a stable import surface and avoids deep imports into internal package paths.

## 5. Make sure CSS ships in the package

The package already has:

```json
"files": ["dist"]
```

That is sufficient if `dist/preview.css` is emitted during package build.

## 6. Verify consumer install behavior

After building, verify the published/installable package contains:

- `dist/preview.js`
- `dist/preview.mjs`
- `dist/preview.d.ts`
- `dist/preview.css`

And verify the consuming app can do:

```ts
import "@fixtura/remotion-assets/styles.css";
```

without using any internal path.

## Important Notes

### Do not make the app compile package source Tailwind as the primary solution

That would tightly couple the consumer build pipeline to the package internals.

It is possible, but it is not the preferred contract for this integration.

The package should behave like a proper dependency and ship its own consumable style output.

### Keep the stylesheet public API narrow

The only public style path should be something stable like:

```text
@fixtura/remotion-assets/styles.css
```

Do not require consumers to import from:

```text
@fixtura/remotion-assets/dist/...
@fixtura/remotion-assets/src/...
```

## Suggested Acceptance Criteria

- [ ] `src/package/styles.css` exists
- [ ] package build emits `dist/preview.css`
- [ ] `package.json` exports `./styles.css`
- [ ] package install includes the CSS file
- [ ] consuming app can import `@fixtura/remotion-assets/styles.css`
- [ ] preview renders with intended styles applied

## Delivery

Once implemented:

1. build package
2. commit changes
3. tag new version
4. notify app team of new tag

The app team will then update the dependency and import the exported stylesheet.

