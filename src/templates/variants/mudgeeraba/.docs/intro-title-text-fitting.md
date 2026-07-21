# Mudgeeraba Intro Title-Screen Text Fitting

## Context

Long asset titles (e.g. "Batting Performances") and association names (e.g. "Goulburn District Cricket Association") overflowed the intro frame because Mudgeeraba theme uses fixed `text-[10em]` / `text-[4em]` sizes and the title-screen `Name` slot had no width constraint.

## Solution

- **Asset title**: `MudgeerabaIntro` uses `useFittedFontSize` from `src/components/typography/utils/useFittedFontSize.ts` with `@remotion/layout-utils` `fitText()`. Short titles keep the existing `10em` cap (160px at 16px root); longer titles shrink to fit the composition width minus horizontal padding.
- **Association name**: Wrapper constrained to the same content width; `text-balance` on `AnimatedText` for even line breaks; existing `titleSmall` styling and word animation preserved.

## Scope

Mudgeeraba intro only. Other template variants unchanged.

## Verification

Preview `/Mudgeeraba-Graphics-CricketBattingPerformances` with `testData/samples/Cricket/Cricket_BattingPerformances.json`.
