# Remotion Tailwind Alignment Handoff

## Summary

We have clarified the actual requirement for the app integration.

The requirement is not simply:

- "ship some CSS so the preview looks roughly correct"

The requirement is:

- **the application must have access to the same Tailwind utility classes that the Remotion package uses**

This changes the preferred integration approach.

## Updated Requirement

The consuming application should generate the same Tailwind utilities used by the Remotion package source.

That means:

- if Remotion uses classes like `text-9xl`, `absolute`, `tracking-tight`, etc.
- those classes must exist in the application Tailwind output

The app should not depend on guessing or manually recreating missing utilities.

## Why We Are Changing Direction

Earlier, the integration focus was:

- package exports
- compiled CSS delivery
- app importing `@fixtura/remotion-assets/styles.css`

That work was useful, but it is not the full solution for the actual requirement.

The current issue is that Remotion markup is rendering inside the app with Tailwind class names that the app does not necessarily generate.

Example symptom:

- Remotion output contains a class such as `text-9xl`
- the consuming app does not have the corresponding Tailwind utility in its compiled CSS

That means the preview can render structurally, but not accurately.

## Core Requirement For Remotion Team

We need the package to support the app consuming the **source paths that Tailwind must scan**.

The app needs access to package source folders such as:

- `src/components`
- `src/compositions`
- `src/templates`
- `src/core`

In particular, template variant source is important:

```text
src/templates/variants
```

This is now part of the actual integration requirement.

## What We Need From The Package

### 1. Keep source paths available to consumers

The consuming app must be able to reference package source locations for Tailwind scanning.

The package is already moving in this direction by including source folders in:

```json
"files": [
  "dist",
  "src/components",
  "src/compositions",
  "src/config",
  "src/core",
  "src/package",
  "src/templates",
  "src/types"
]
```

and by exporting:

```json
"./src/*": "./src/*"
```

That direction is aligned with what the app now needs.

### 2. Ensure template variants remain included

We specifically need access to:

```text
src/templates/variants
```

including theme files and related template source.

This is necessary because the app’s Tailwind generation needs to see the classes used by those files.

### 3. Keep package JS preview export as-is

We still need:

```json
"./preview": {
  "types": "./dist/preview.d.ts",
  "import": "./dist/preview.mjs",
  "require": "./dist/preview.js"
}
```

The preview component export is still required.

## What From Previous Updates Is No Longer The Primary Requirement

### No longer the main solution

The following package work is no longer the primary solution to the styling issue:

- shipping prebuilt CSS as the main fix
- relying on `@fixtura/remotion-assets/styles.css` as the only style contract

That can still exist if useful, but it is no longer the core answer.

### Why

Compiled package CSS alone does not guarantee the app has the same Tailwind utility environment as the Remotion source.

The requirement now is stronger:

- the app must generate the same utility classes from the package source

## What Can Stay

These updates can stay if already implemented:

- `./styles.css` export
- compiled `dist/preview.css`
- package build scripts for CSS

They are not harmful.

They are just no longer the central integration mechanism.

If they remain, they should be treated as supplementary, not the core Tailwind alignment strategy.

## What The App Team Will Do

On the application side, we will update Tailwind configuration/source registration so the app scans the Remotion package source paths.

That means the app will generate Tailwind utilities used inside the package, rather than relying solely on prebuilt package CSS.

## Important Distinction

There are now two separate concerns:

### 1. Utility generation

Solved by:

- exposing package source for Tailwind scanning

### 2. Global app CSS leakage / override risk

Still handled separately by:

- wrapping the preview in a dedicated root
- adding scoped isolation/reset where needed

These are different problems.

## Package Expectations Going Forward

The Remotion package should continue to support:

- preview component consumption via `./preview`
- source visibility for app Tailwind scanning
- inclusion of template variant source and themes

The package does **not** need to solve host-app Tailwind generation by itself if the application is now intentionally taking responsibility for generating the utilities.

## Requested Stable Package Surface

Please keep these stable for the app team:

- `./preview`
- `./src/*`
- included `src/templates/variants/**`
- included `src/components/**`
- included `src/compositions/**`
- included `src/core/**`

## Final Direction

The styling integration should now be treated as:

1. app consumes Remotion preview component from package
2. app scans Remotion package source in its Tailwind pipeline
3. app generates the same utilities used by Remotion
4. app applies local isolation only for host global CSS conflicts

## Summary Of What We Need

- keep the source folders shipped in the package
- keep `src/templates/variants` included
- keep `./src/*` export available
- keep `./preview` export available

## Summary Of What Is No Longer Required As The Main Fix

- package CSS export as the sole styling solution
- relying on `styles.css` alone to solve missing Tailwind utilities
