# Fixtura Remotion Preview Handoff

This document explains how the preview package is structured, what data it expects, how templates and variations work, and how to hand assets and props to the Remotion team.

## 1. What This Package Is

This repo is a Remotion-based preview/render package for Fixtura social assets.

There are two main ways it is used:

- Development preview via Remotion Studio:
  - `src/DevelopmentRoot.tsx`
  - Builds a browser tree of every template, every background type, and every test dataset.
- Production render / app preview:
  - `src/ProductionRoot.tsx`
  - `src/package/FixturaTemplateScene.tsx`
  - Both take a single prop: `data`

The package export the app should consume is:

```ts
import { FixturaTemplateScene } from "@fixtura/remotion-assets/preview";
```

The app passes:

```tsx
<Player
  component={FixturaTemplateScene}
  inputProps={{ data }}
  durationInFrames={...}
  compositionWidth={1080}
  compositionHeight={1350}
  fps={30}
/>
```

## 2. Core Composition Settings

These are the base settings used across the preview/render system:

- Resolution: `1080 x 1350`
- FPS: `30`
- Root prop contract: `data`
- Root dataset type in source: `FixturaDataset`
- Public package typing: loose `Record<string, unknown>` but runtime expects the Fixtura dataset structure used in this repo

### Duration rules

Total duration is calculated from the dataset:

```ts
durationInFrames =
  FPS_INTRO +
  FPS_MAIN +
  (includeSponsors ? FPS_OUTRO : 30);
```

That means:

- `timings.FPS_INTRO` controls the intro section
- `timings.FPS_MAIN` controls the main section
- `timings.FPS_OUTRO` is only used when `videoMeta.video.metadata.includeSponsors` is `true`
- if sponsors are not included, the outro falls back to `30` frames

### Composition ID rules

Production compositions are resolved from:

- `videoMeta.video.appearance.template`
- `videoMeta.video.templateVariation.useBackground`
- `videoMeta.video.metadata.compositionId`

The final Remotion composition id is:

```ts
`${templateId}-${useBackground}-${compositionId}`
```

Example:

```txt
Basic-Gradient-CricketResults
```

## 3. How the Template Runtime Is Structured

Every template variant is a wrapper around the shared `BaseTemplate`.

The shared pipeline is:

1. `GlobalProvider`
2. `VideoDataProvider`
3. `ThemeProvider`
4. `StyleProvider`
5. `FontProvider`
6. `LayoutProvider`
7. `AnimationProvider`
8. `BaseTemplateLayout`

`BaseTemplateLayout` then renders:

1. Intro sequence
2. Main sequence
3. Outro sequence
4. Background layer
5. Audio layer

Inside the main sequence, the template shell does not hardcode a ladder/results/upcoming layout directly. Instead, it routes to the correct composition based on:

- sport
- composition id
- template id

That routing happens in `src/core/utils/routing.tsx`.

## 4. The Dataset / Props Contract

The root dataset shape is:

```ts
interface FixturaDataset<T = unknown> {
  id?: string;
  data: T[];
  asset: Asset;
  render: Render;
  account: Account;
  timings: Timings;
  frames: number[];
  videoMeta: VideoMeta;
  errors: unknown[];
}
```

For handoff purposes, the important parts are below.

### 4.1 Required top-level sections

- `data`
  - the actual rows/items shown in the composition
- `timings`
  - frame lengths for intro/main/outro
- `videoMeta`
  - all template, theme, media, and variation configuration

### 4.2 Required `videoMeta.video` sections

```ts
videoMeta.video = {
  metadata,
  appearance,
  media,
  contentLayout,
  templateVariation,
  fixtureCategory,
  groupingCategory
}
```

### 4.3 Most important metadata fields

```json
{
  "metadata": {
    "title": "Results",
    "titleSplit": ["Results"],
    "videoTitle": "Weekend Results",
    "compositionId": "CricketResults",
    "assetId": 4,
    "assetTypeId": 2,
    "frames": [],
    "includeSponsors": true
  }
}
```

Key fields:

- `compositionId`
  - decides which composition controller is rendered
- `includeSponsors`
  - controls whether the real outro length is used
- `title`, `titleSplit`, `videoTitle`
  - used by template headers and title treatments

### 4.4 Appearance fields

```json
{
  "appearance": {
    "theme": {
      "dark": "#111",
      "white": "#FFF",
      "primary": "#020202",
      "secondary": "#ff0000"
    },
    "template": "Basic"
  }
}
```

Key fields:

- `appearance.template`
  - the selected template shell
- `appearance.theme.primary`
  - main brand color
- `appearance.theme.secondary`
  - secondary/accent brand color

### 4.5 Template variation fields

This is where most of the preview configuration lives.

Typical shape:

```json
{
  "templateVariation": {
    "useBackground": "Gradient",
    "mode": "lightAlt",
    "palette": "primary",
    "gradient": {
      "type": "primary",
      "direction": "VERTICAL"
    },
    "image": {
      "url": null,
      "type": "pan",
      "direction": "left",
      "overlayStyle": "vignette",
      "overlayOpacity": 0.3
    },
    "video": {
      "url": null,
      "size": "cover",
      "muted": true,
      "position": "left",
      "overlay": {
        "color": "rgba(0,0,0,0.5)",
        "opacity": 0.7
      }
    },
    "texture": {
      "url": null,
      "name": null,
      "scale": "100%",
      "repeat": "cover",
      "overlay": {
        "opacity": 0.5,
        "blendMode": "multiply"
      }
    }
  }
}
```

## 5. How We Handle and Deliver Props

The consuming app should treat the whole preview as a single-scene component with one prop:

```ts
{ data: FixturaDataset }
```

### Delivery rule

Always deliver the entire dataset object, not sliced fragments.

Do not pass:

- separate `theme`
- separate `template`
- separate `rows`
- separate `background`

Those are already expected to live inside `data.videoMeta.video` and `data.data`.

### Why

The runtime reads from context providers that expect the full dataset. Splitting props upstream will create drift and duplicate mapping logic.

### In production

Use:

```ts
getProductionCompositionFromData(data)
```

This gives:

- `TemplateComponent`
- `remoteCompositionId`
- `durationInFrames`

### In preview/dev

Development preview mutates the dataset per template/background variant using `processDatasetForTemplate()`. That is only for studio browsing.

The app team should not recreate that logic unless they are intentionally building a development browser.

## 6. Asset Setup Guide

## 6.1 Club-level assets

These live under:

```json
videoMeta.club
```

Important fields:

- `club.logo.url`
- `club.name`
- `club.sport`
- `club.sponsors`
- `club.IsAccountClub`

Use this for:

- account/association branding
- club-level logo treatments
- sponsor footer fallback pool

## 6.2 Team logos

Most cricket compositions expect team logos directly on each row/item:

- `teamHomeLogo.url`
- `teamAwayLogo.url`

Some richer payloads also include:

- `homeTeam.logo.url`
- `awayTeam.logo.url`

Best practice:

- include both top-level match logo objects and nested team logo objects if available
- always provide `width` and `height` with each logo

## 6.3 Hero images

Hero images live at:

- `videoMeta.video.media.heroImage`
- legacy support also exists for `videoMeta.video.media.HeroImage`

Fields:

```json
{
  "url": "https://...",
  "ratio": "landscape",
  "width": 830,
  "height": 400
}
```

How it is used:

- primarily by the image background system
- if present, hero image is preferred over `templateVariation.image.url`

## 6.4 Audio

Audio lives at:

```json
videoMeta.video.media.audio
```

Supported fields:

- `url`
- `audioOption`

Runtime behavior:

- if `audioOption` exists, it is used first
- otherwise `url` is used
- if no audio URL exists, no audio track is rendered

## 6.5 Sponsor assets

Sponsors are pulled from two places:

1. Global sponsor pool:
   - `videoMeta.club.sponsors`
2. Per-item sponsor assignments:
   - `row.assignSponsors.team`
   - `row.assignSponsors.grade`
   - `row.assignSponsors.competition`

The sponsor footer merges these lists and deduplicates by sponsor id.

Sponsor logos should include:

- `logo.url`
- ideally `logo.width`
- ideally `logo.height`

## 6.6 Background assets

Background assets live inside `videoMeta.video.templateVariation`.

By type:

- Image background:
  - `templateVariation.image.url`
- Video background:
  - `templateVariation.video.url`
  - optionally `templateVariation.video.videoIntro.url`
  - optionally `templateVariation.video.videoBackground.url`
- Texture background:
  - `templateVariation.texture.url`
  - or `templateVariation.texture.name`

### Asset delivery rules

- Prefer fully qualified remote URLs
- Ensure the asset is publicly readable to the render environment
- Always send image/video dimensions where possible
- Keep field names stable; the preview runtime relies on exact keys

## 7. Templates and Variations

## 7.1 Registered templates

These are the template shells in the registry:

- `Basic`
- `Brickwork`
- `Classic`
- `CNSW`
- `CNSWPrivate`
- `Sixers`
- `Thunder`
- `TwoColumnClassic`
- `Mudgeeraba`
- `BroadcastPro`

### Important note

In this repo, `Thunder` is mostly an alias to the `Sixers` composition implementations for cricket content. It exists as a distinct template in the template registry, but the composition routing layer maps many `thunder` composition implementations to the same modules as `sixers`.

## 7.2 What a template actually does

A template provides:

- intro component
- main header/layout shell
- outro component
- background wrapper
- animation config
- theme config

A template does not define every sport/composition itself from scratch. The actual content body is chosen later by the routing layer.

## 7.3 Background variations

The preview browser shows the following background variants for every template:

- `Graphics`
- `Solid`
- `Image`
- `Gradient`
- `Video`
- `Particle`
- `Pattern`
- `Texture`

These are not separate templates.

They are values for:

```json
"templateVariation": {
  "useBackground": "Gradient"
}
```

## 7.4 Cricket composition families

The active cricket composition families in this repo are:

- `CricketLadder`
- `CricketUpcoming`
- `CricketTop5`
- `CricketResults`
- `CricketResultSingle`
- `CricketRoster`
- `CricketPerformances`
- `CricketTeamOfTheWeek`

### Composition mapping note

Some external composition ids are normalized into shared families:

- `CricketTop5Batting` -> `CricketTop5`
- `CricketTop5Bowling` -> `CricketTop5`
- `CricketBattingPerformances` -> `CricketPerformances`
- `CricketBowlingPerformances` -> `CricketPerformances`

## 7.5 Template support notes

Not every template supports every composition family equally.

Current repo-level notes:

- `BroadcastPro`
  - implemented for ladder, upcoming, top5, performances, roster
  - not wired for results, result single, or team of the week in the cricket export map
- `CNSWPrivate`
  - supported for several cricket composition families
- `Thunder`
  - mostly reuses Sixers composition implementations
- If a template/composition pair is missing, the routing layer falls back to a placeholder component

This matters for handoff:

- template selection is not only a design choice
- it must also be valid for the selected composition family

## 8. How Colors Work

Color setup starts from:

```json
videoMeta.video.appearance.theme
```

with:

- `primary`
- `secondary`
- optional `dark`
- optional `white`

The runtime then creates a larger palette system from these two user colors.

### Source of truth

The team should treat these as the source brand colors:

- `appearance.theme.primary`
- `appearance.theme.secondary`

Everything else is derived from them.

### Generated palettes

The color system generates named palettes such as:

- `primary`
- `primaryOnWhite`
- `primaryOnBlack`
- `secondary`
- `secondaryOnWhite`
- `secondaryOnBlack`
- `accentPrimary`
- `accentSecondary`
- `complementary`
- `analogous`
- `triadic`
- `monochromatic`
- `highContrast`

The active palette is selected by:

```json
"templateVariation": {
  "palette": "primary"
}
```

If no palette is supplied, it falls back to `primary`.

## 9. How Modes Work

Modes come from:

```json
"templateVariation": {
  "mode": "lightAlt"
}
```

All templates define a `mode` map in their theme config. The common mode names used across the repo are:

- `light`
- `lightAlt`
- `dark`
- `darkAlt`

### What mode controls

Mode primarily controls base UI surfaces:

- container background
- alternate container background
- transparent surface styling
- title text color
- copy text color

### Practical interpretation

- `light`
  - light surfaces, dark text
- `lightAlt`
  - light surfaces, but some title/accent treatments can flip to white
- `dark`
  - dark surfaces, light text
- `darkAlt`
  - dark surfaces, with alternate title contrast behavior

### Important distinction

- `mode` controls light/dark behavior and text/surface defaults
- `palette` controls which derived color family is used
- `useBackground` controls the actual background renderer

These three settings are related, but separate.

## 10. How Backgrounds Work

Background selection is controlled by:

```json
"templateVariation": {
  "useBackground": "Texture"
}
```

The centralized background switcher supports:

- `Solid`
- `Gradient`
- `Image`
- `Video`
- `Texture`
- `Graphics`
- `Noise`
- `Pattern`
- `Particle`
- `Animated`

Note that the development registry exposes a curated set of variants, while the centralized renderer supports a slightly broader internal set.

## 10.1 Solid

Uses the active palette/theme colors and simply fills the frame.

Use when:

- no media asset is available
- the design needs a clean branded fill

## 10.2 Gradient

Uses:

```json
"gradient": {
  "type": "primary",
  "direction": "VERTICAL"
}
```

Typical directions:

- `HORIZONTAL`
- `VERTICAL`
- diagonal/custom values depending on renderer support

Use when:

- brand colors are enough
- motionless but richer-than-solid background is needed

## 10.3 Image

Configured via:

```json
"image": {
  "url": "...",
  "type": "pan",
  "direction": "left",
  "overlayStyle": "vignette",
  "overlayOpacity": 0.3
}
```

Important behavior:

- if `media.heroImage` or `media.HeroImage` exists, it is preferred
- legacy image config is adapted internally to the newer image background config

Supported image effect types include:

- `zoom`
- `pan`
- `kenburns`
- `breathing`
- `blur`

Overlay styles include:

- `solid`
- `gradient`
- `vignette`
- `duotone`
- `pattern`
- `colorFilter`

## 10.4 Video

Configured via:

```json
"video": {
  "url": "...",
  "position": "center",
  "size": "cover",
  "loop": true,
  "muted": true,
  "overlay": {
    "color": "rgba(0,0,0,0.5)",
    "opacity": 0.35
  }
}
```

Extra supported fields:

- `fallbackUrl`
- `useOffthreadVideo`
- `volume`
- `playbackRate`
- `videoIntro.url`
- `videoBackground.url`
- `introFrames`

Behavior:

- the renderer can play an intro segment first
- then switch to the looping/main video
- overlay sits above the video

## 10.5 Texture

Configured via:

```json
"texture": {
  "url": "...",
  "name": "Stone 2",
  "position": "center",
  "size": "auto",
  "repeat": "cover",
  "scale": "100%",
  "overlay": {
    "opacity": 0.7,
    "blendMode": "multiply"
  }
}
```

Behavior:

- if `url` is present, it is used directly
- if not, `name` can resolve to a public texture asset
- an overlay layer is then applied
- if `templateVariation.gradient` exists, the texture overlay can become gradient-based instead of solid

## 10.6 Pattern

Configured via:

```json
"pattern": {
  "type": "dots",
  "scale": 0.75,
  "opacity": 0.35,
  "rotation": 0,
  "animation": "none",
  "animationSpeed": 0.8
}
```

Use when:

- decorative branded texture is needed without external media

## 10.7 Particle

Configured via:

```json
"particle": {
  "type": "lines",
  "particleCount": 300,
  "speed": 0.8,
  "direction": "up",
  "animation": "scale"
}
```

Use when:

- motion and energy are needed
- fileless procedural backgrounds are preferred

## 10.8 Graphics / Noise

Configured via:

```json
"noise": {
  "type": "floatingParticles"
}
```

Supported internal variants include examples like:

- `subtle`
- `grain`
- `wave`
- `fog`
- `static`
- `floatingParticles`
- `dynamicParticles`
- `triangleSwarm`
- `pulsingCircles`
- `digitalRain`
- `gradientGrid`
- `geometric`
- `spokes`

## 11. Content Layout Rules

`videoMeta.video.contentLayout.divideFixturesBy` controls how many items are grouped per view for each composition family.

Example:

```json
{
  "divideFixturesBy": {
    "CricketLadder": 1,
    "CricketRoster": 1,
    "CricketResults": 2,
    "CricketUpcoming": 3,
    "CricketResultSingle": 1,
    "CricketTeamOfTheWeek": 2
  }
}
```

This is important because:

- the same dataset can page differently per composition family
- screen density is not only template-driven, it is also data-config-driven

## 12. Recommended Payload Setup Checklist

For every asset sent to preview/render, make sure the dataset includes:

- `data`
- `timings.FPS_INTRO`
- `timings.FPS_MAIN`
- `timings.FPS_OUTRO`
- `videoMeta.video.metadata.compositionId`
- `videoMeta.video.metadata.includeSponsors`
- `videoMeta.video.appearance.template`
- `videoMeta.video.appearance.theme.primary`
- `videoMeta.video.appearance.theme.secondary`
- `videoMeta.video.templateVariation.useBackground`
- `videoMeta.video.templateVariation.mode`
- `videoMeta.video.templateVariation.palette`

Then include background-specific config only for the chosen background type:

- image: `templateVariation.image`
- video: `templateVariation.video`
- texture: `templateVariation.texture`
- gradient: `templateVariation.gradient`
- pattern: `templateVariation.pattern`
- particle: `templateVariation.particle`
- graphics/noise: `templateVariation.noise`

Then include media assets as needed:

- `videoMeta.video.media.audio`
- `videoMeta.video.media.heroImage` or `HeroImage`
- row-level team logos
- club logo
- sponsor logos

## 13. Team Guidance for Setup

If the team is wiring the preview in another app, the safest setup is:

1. Build the full dataset server-side.
2. Pass it unchanged into `FixturaTemplateScene`.
3. Use `getProductionCompositionFromData(data)` to derive duration and composition id.
4. Do not rebuild the template/color/background logic in the consuming app.
5. Treat template selection, palette selection, mode selection, and background selection as data fields, not hardcoded UI state.

## 14. Known Caveats

- Public package types are intentionally loose, so runtime payload shape matters more than TypeScript help in the consuming app.
- Some payloads still use legacy casing such as `HeroImage`; the runtime supports that.
- Not every template is implemented for every cricket composition family.
- Development preview enumerates template/background combinations aggressively; production should only use valid dataset/template pairs.

## 15. Working Example

This is the minimum practical shape the team should think in:

```json
{
  "data": [...],
  "timings": {
    "FPS_INTRO": 90,
    "FPS_MAIN": 405,
    "FPS_OUTRO": 30
  },
  "videoMeta": {
    "club": {
      "name": "Club Name",
      "sport": "Cricket",
      "logo": { "url": "https://..." },
      "sponsors": {
        "default": {},
        "primary": []
      }
    },
    "video": {
      "metadata": {
        "title": "Fixtures",
        "videoTitle": "Upcoming Fixtures",
        "compositionId": "CricketUpcoming",
        "includeSponsors": false
      },
      "appearance": {
        "template": "CNSW",
        "theme": {
          "primary": "#de0000",
          "secondary": "#ffa300",
          "dark": "#111111",
          "white": "#ffffff"
        }
      },
      "media": {
        "audio": {
          "url": "https://..."
        },
        "heroImage": {
          "url": "https://...",
          "width": 1200,
          "height": 800,
          "ratio": "landscape"
        }
      },
      "contentLayout": {
        "divideFixturesBy": {
          "CricketUpcoming": 3
        }
      },
      "templateVariation": {
        "useBackground": "Texture",
        "mode": "lightAlt",
        "palette": "secondary",
        "texture": {
          "url": "https://...",
          "repeat": "cover",
          "overlay": {
            "opacity": 0.7,
            "blendMode": "multiply"
          }
        }
      }
    }
  }
}
```

That payload shape is the handoff contract the team should follow.
