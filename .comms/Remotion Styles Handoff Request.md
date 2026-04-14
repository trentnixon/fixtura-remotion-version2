# Remotion Styles Handoff Request

## Summary

The Remotion preview package is now installed into the application and the Remotion player is working.

Current status:

- package import is working
- `Player` is rendering
- test data is rendering
- video playback is working

Current blocker:

- the visual styles used by the Remotion templates are not being applied in the consuming app

This is not a player issue. It is a package styling delivery issue.

## What We Found

The installed package currently ships only JavaScript and type output:

- `dist/preview.js`
- `dist/preview.mjs`
- `dist/preview.d.ts`

There is no compiled CSS asset in the package output.

The package export currently exposes:

```json
"exports": {
  "./preview": {
    "types": "./dist/preview.d.ts",
    "import": "./dist/preview.mjs",
    "require": "./dist/preview.js"
  }
}
```

There is no exported stylesheet such as:

```json
"./styles.css": "./dist/preview.css"
```

Also:

- `src/package/preview.ts` does not import any stylesheet
- the package build currently emits JS only
- the app therefore has no package stylesheet to import

## Important Technical Detail

The Remotion templates use utility-class-based styling extensively.

That means the consuming app needs one of these:

1. prebuilt CSS shipped by the package
2. or a build integration that compiles the package source through the app's Tailwind pipeline

For this integration, the recommended path is:

**ship prebuilt CSS from the Remotion package**

This is the safer and cleaner approach for:

- package consumers
- Vercel builds
- keeping the package self-contained

## Request To Remotion Repo Team

Please update `fixtura-remotion-version2` so the package ships its required styles as a compiled CSS file and exports that stylesheet for consumers.

## Required Outcome

We need the package to support this kind of import in the app:

```ts
import "@fixtura/remotion-assets/styles.css";
```

## Proposed Package-Side Changes

### 1. Add a package stylesheet entry

Create a package-level stylesheet entry, for example:

```text
src/package/styles.css
```

This should be the stylesheet entry specifically intended for package consumers.

### 2. Build compiled CSS into `dist`

During package build, emit a compiled CSS file, for example:

```text
dist/preview.css
```

This file should contain the styles required for the preview runtime in the consuming app.

### 3. Export the stylesheet from `package.json`

Update package exports to include a stylesheet entry:

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

### 4. Ensure `files` includes the emitted CSS

The package already uses:

```json
"files": ["dist"]
```

That is fine as long as the CSS is actually emitted into `dist`.

### 5. Create a new tag / version

Once updated:

1. build the package
2. commit the CSS export changes
3. tag a new package version
4. we will update the app to that new tag

## Why This Is Needed

Right now the app can render the composition tree, but the package is not delivering its style layer.

That means:

- layout is incomplete
- template visuals are not representative
- any Tailwind/utility-driven styling used in the Remotion package is missing in the consuming app

The consuming app should not need to reverse-engineer or recreate package styling manually.

The package should provide its own consumable style artifact.

## App-Side Expectation After Package Update

Once the Remotion package exports CSS, the app team will import it into the app layout or preview layout, for example:

```ts
import "@fixtura/remotion-assets/styles.css";
```

After that, the preview should render with the intended package styling.

## Current Conclusion

The integration is functionally working.

The remaining issue is:

**the package needs to ship and export its compiled CSS for consumers**

