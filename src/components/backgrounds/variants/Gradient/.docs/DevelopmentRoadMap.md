# Development Roadmap – Gradient Background Variant

## ✅ Completed

- [x] Hardened `GradientBackground.tsx` to handle both string and css-map gradients with robust direction fallback
- [x] Updated `README.md` with valid gradient keys, direction keys, and fallback behavior
- [x] Implemented palette-aware override: for palettes containing `OnBlack/OnWhite`, map `type: "primary"` → `"primaryToSecondary"` and `type: "secondary"` → `"secondaryToPrimary"` before resolution; added dev-only warning if resolution fails

## ⏳ To Do (easy → hard)

1. Align JSON for `*OnBlack`/`*OnWhite` palettes to use `gradient.type: "primaryToSecondary"` (or `secondaryToPrimary` if reversed)
2. Emit a console warning when requested `gradient.type` or `direction` is missing; include available keys in the message
3. Add stories/tests covering `OnBlack/OnWhite` palettes across all `gradient.type` and direction keys to prevent regressions
4. Centralize gradient selection mapping upstream (single source of truth) and remove component-level override once in place

## 💡 Notes / Findings

- JSON (e.g., Ladder): `"palette": "secondaryOnBlack"`, `"gradient": { "type": "primary", "direction": "VERTICAL" }`
- Palette `secondaryOnBlack` is built from `[secondary, black]`.
- Gradient presets:
  - `primary` = `main → lighter(main)` (for `secondaryOnBlack`: secondary → lighter secondary)
  - `primaryToSecondary` = `main → secondary` (for `secondaryOnBlack`: secondary → black)
- Rendering resolves `selectedPalette.background.gradient[gradient.type]` and the direction key (`HORIZONTAL`, `VERTICAL`, etc.), with fallback to `secondaryToPrimary` and then a hardcoded default.
- Therefore, using `type: "primary"` with `secondaryOnBlack` yields secondary→lighter secondary (can look red→white-ish), not the intended secondary→black.

## 💡 Recommendations

- Prefer the data fix: set `gradient.type` to `"primaryToSecondary"` for `*OnBlack/*OnWhite` palettes to explicitly target the two-color intent.
- The palette-aware override now protects legacy JSON by mapping `primary/secondary` to the two-color presets when `OnBlack/OnWhite` palettes are active.
- Centralize the mapping upstream so UI selection → palette-aware gradient type + direction resolves in one place.

## 🔬 How gradients are created (component pipeline)

- Video data → `ThemeContext`:
  - `ThemeContext` reads `video.appearance.theme.{primary,secondary}` and `video.templateVariation.palette`.
  - It creates a color system via `createColorSystem(primary, secondary, mode)` and selects `selectedPalette` by name (e.g., `secondaryOnBlack`).
- Palette construction:
  - `createPaletteConfigurations` defines named variants like `secondaryOnBlack` as `[secondary, "black"]`.
  - `createStandardizedPalettes` calls `standardPaletteFactory(name, [main, secondary], options, mode)`.
- Gradient generation in `standardPaletteFactory`:
  - Basic presets use `generateGradientOptions`:
    - `primary` = `generateGradientOptions(main)` → css map of directions using `GRADIENT_DIRECTIONS`.
    - `secondary` = `generateGradientOptions(secondary)`.
    - `primaryToSecondary` = `generateGradientOptions(main, secondary)`.
    - `secondaryToPrimary` = `generateGradientOptions(secondary, main)`.
  - Advanced presets use `createAdvancedGradient` (and helpers):
    - `primaryAdvanced`, `secondaryAdvanced` (multi-stop linear), `primaryRadial`, `secondaryRadial` (radial), `conicGradient` (conic), `meshGradient`, `hardStopGradient`.
  - All advanced presets also emit a `css` map keyed by direction names from `GRADIENT_DIRECTIONS` plus `DEFAULT`.
- Direction mapping:
  - `GRADIENT_DIRECTIONS` keys: `HORIZONTAL`, `HORIZONTAL_REVERSE`, `VERTICAL`, `VERTICAL_REVERSE`, `DIAGONAL`, `DIAGONAL_REVERSE`, `CONIC`.
  - Values are CSS directions (e.g., `HORIZONTAL` → `to right`, `VERTICAL` → `to bottom`). The generator builds a `css` map with these keys.
- Component resolution in `GradientBackground`:
  - Reads `type` and `direction` from `video.templateVariation.gradient`.
  - Applies palette-aware type override for `OnBlack/OnWhite` palettes (temporary until upstream mapping is in place).
  - Resolves `selectedPalette.background.gradient[type]`, then selects `css[direction]`, falling back to `DEFAULT` or the first map entry, then `secondaryToPrimary`, then a hardcoded default.
- Shape differences:
  - Some legacy palette shapes might provide a plain `string` gradient (e.g., `radial`). The component now supports both `string` and `css` map forms.

## 📋 Upstream UI gradient selection (for mapping review)

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Primary Vertical",
        "type": "primary",
        "direction": "VERTICAL"
      }
    },
    {
      "id": 2,
      "attributes": {
        "name": "Primary Vertical Reverse",
        "type": "primary",
        "direction": "VERTICAL_REVERSE"
      }
    },
    {
      "id": 3,
      "attributes": {
        "name": "Primary Horizontal",
        "type": "primary",
        "direction": "HORIZONTAL"
      }
    },
    {
      "id": 4,
      "attributes": {
        "name": "Primary Horizontal Reverse",
        "type": "primary",
        "direction": "HORIZONTAL_REVERSE"
      }
    },
    {
      "id": 5,
      "attributes": {
        "name": "Primary Diagonal",
        "type": "primary",
        "direction": "DIAGONAL"
      }
    },
    {
      "id": 6,
      "attributes": {
        "name": "Primary Diagonal Reverse",
        "type": "primary",
        "direction": "DIAGONAL_REVERSE"
      }
    },
    {
      "id": 7,
      "attributes": {
        "name": "Secondary Vertical ",
        "type": "secondary",
        "direction": "VERTICAL"
      }
    },
    {
      "id": 8,
      "attributes": {
        "name": "Secondary Vertical Reverse",
        "type": "secondary",
        "direction": "VERTICAL_REVERSE"
      }
    },
    {
      "id": 9,
      "attributes": {
        "name": "Secondary Horizontal ",
        "type": "secondary",
        "direction": "HORIZONTAL"
      }
    },
    {
      "id": 10,
      "attributes": {
        "name": "Secondary Horizontal Reverse",
        "type": "secondary",
        "direction": "HORIZONTAL_REVERSE"
      }
    },
    {
      "id": 11,
      "attributes": {
        "name": "Secondary Diagonal",
        "type": "secondary",
        "direction": "DIAGONAL"
      }
    },
    {
      "id": 12,
      "attributes": {
        "name": "Secondary Diagonal Reverse",
        "type": "secondary",
        "direction": "DIAGONAL_REVERSE"
      }
    },
    {
      "id": 13,
      "attributes": {
        "name": "Primary To Secondary  Vertical ",
        "type": "primaryToSecondary",
        "direction": "VERTICAL"
      }
    },
    {
      "id": 14,
      "attributes": {
        "name": "Primary To Secondary  Vertical  Reverse",
        "type": "primaryToSecondary",
        "direction": "VERTICAL_REVERSE"
      }
    },
    {
      "id": 15,
      "attributes": {
        "name": "Primary To Secondary  Horizontal ",
        "type": "primaryToSecondary",
        "direction": "HORIZONTAL"
      }
    },
    {
      "id": 16,
      "attributes": {
        "name": "Primary To Secondary  Horizontal Reverse",
        "type": "primaryToSecondary",
        "direction": "HORIZONTAL_REVERSE"
      }
    },
    {
      "id": 17,
      "attributes": {
        "name": "Primary To Secondary Diagonal",
        "type": "primaryToSecondary",
        "direction": "DIAGONAL"
      }
    },
    {
      "id": 18,
      "attributes": {
        "name": "Primary To Secondary  Diagonal Reverse",
        "type": "primaryToSecondary",
        "direction": "DIAGONAL_REVERSE"
      }
    },
    {
      "id": 19,
      "attributes": {
        "name": "Primary To Secondary  Diagonal Reverse",
        "type": "primaryToSecondary",
        "direction": "DIAGONAL_REVERSE"
      }
    },
    {
      "id": 20,
      "attributes": {
        "name": "Radial Primary",
        "type": "primaryRadial",
        "direction": "DEFAULT"
      }
    },
    {
      "id": 21,
      "attributes": {
        "name": "Radial Secondary",
        "type": "secondaryRadial",
        "direction": "DEFAULT"
      }
    },
    {
      "id": 22,
      "attributes": {
        "name": "Conic Gradient",
        "type": "conicGradient",
        "direction": "DEFAULT"
      }
    },
    {
      "id": 23,
      "attributes": {
        "name": "Conic Gradient Horizontal",
        "type": "conicGradient",
        "direction": "HORIZONTAL"
      }
    },
    {
      "id": 24,
      "attributes": {
        "name": "Conic Gradient Vertical",
        "type": "conicGradient",
        "direction": "VERTICAL"
      }
    },
    {
      "id": 25,
      "attributes": {
        "name": "Conic Gradient Diagonal",
        "type": "conicGradient",
        "direction": "DIAGONAL"
      }
    },
    {
      "id": 26,
      "attributes": {
        "name": "Mesh Gradient",
        "type": "meshGradient",
        "direction": "DEFAULT"
      }
    },
    {
      "id": 27,
      "attributes": {
        "name": "hardStop Gradient",
        "type": "hardStopGradient",
        "direction": "VERTICAL"
      }
    },
    {
      "id": 28,
      "attributes": {
        "name": "hardStop Gradient Horizontal",
        "type": "hardStopGradient",
        "direction": "HORIZONTAL"
      }
    },
    {
      "id": 29,
      "attributes": {
        "name": "hardStop Gradient Diagonal",
        "type": "hardStopGradient",
        "direction": "DIAGONAL"
      }
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 100, "pageCount": 1, "total": 29 }
  }
}
```

- Mapping proposal (to centralize upstream):
  - Values 1–6 → `type: "primary"`, directions: `VERTICAL`, `VERTICAL_REVERSE`, `HORIZONTAL`, `HORIZONTAL_REVERSE`, `DIAGONAL`, `DIAGONAL_REVERSE`.
  - Values 7–12 → `type: "secondary"`, same direction mapping.
  - Values 13–19 → `type: "primaryToSecondary"`, direction mapping as above (note: duplicate label at 18/19 to review).
  - 20 → `type: "primaryRadial"`; 21 → `"secondaryRadial"`.
  - 22–25 → `type: "conicGradient"` with variant-specific direction/angle handling.
  - 26 → `type: "meshGradient"`.
  - 27–29 → `type: "hardStopGradient"` with respective directions.

## 🚀 Implementation Phases and Steps

- Phase 1 — Single Source of Truth

  - Create `src/core/utils/colorSystem/gradientResolver.ts`:
    - `determineGradientTypeForPalette(paletteName: string, baseType: string): string`
    - `resolvePaletteGradient(palette: DesignPalette, type: string, direction: string): string`
  - Always source from `palette.background.gradient`.

- Phase 2 — Wire Upstream (UI/Data)

  - When turning UI selection into JSON: map selection → `{type, direction}`.
  - Run `determineGradientTypeForPalette(selectedPaletteName, type)` to coerce for `OnBlack/OnWhite`.
  - Save corrected `{type, direction}` to `video.templateVariation.gradient`.

- Phase 3 — Refactor Renderer

  - Update `GradientBackground.tsx` to use `resolvePaletteGradient(...)`.
  - Remove temporary component-level override logic.
  - Keep graceful fallbacks (direction → DEFAULT → first entry → safe default).

- Phase 4 — Data Hygiene

  - Update `testData/samples/**` JSON to use palette-correct `type` values.
  - Optional: write a migration script for existing content.

- Phase 5 — Tests & Validation

  - Unit tests for `gradientResolver.ts`:
    - Palettes: `primary`, `secondary`, `*OnBlack`, `*OnWhite`.
    - Directions: all keys + DEFAULT fallback.
    - Edge cases: missing type/direction.
  - Visual spot-check in common compositions.

- Phase 6 — Documentation

  - Update `Gradient/README.md` and this roadmap to point to the resolver as the single source of truth.

- Phase 7 — Rollout
  - Merge resolver + renderer refactor.
  - Switch UI/data to use resolver.
  - Remove warnings once upstream mapping is in place.

## References

- `src/components/backgrounds/variants/Gradient/GradientBackground.tsx`
- `src/components/backgrounds/variants/Gradient/README.md`
- `src/core/context/ThemeContext.tsx`
- `src/core/utils/colorSystem/config/paletteConfigurations.ts`
- `src/core/utils/colorSystem/generators/standardPaletteFactory.ts`
- `src/core/utils/colorSystem/generators/gradientGenerator.ts`
- `src/core/utils/colorSystem/config/constants.ts`
- `testData/samples/Cricket/Cricket_Ladder.json`
