# MatchRow Cleanup Summary

Refactored all MatchRow components by extracting shared type (`MatchRowProps`) into `_types/MatchRowProps.ts` and utility functions (`calculateDelay`, `calculateAnimationOutFrame`) into `_utils/calculations.ts` (both `_types` and `_utils` folders are in the current MatchRow directory - create them if they don't exist). Updated all component imports to use the new folder structure, removing duplicate type definitions and calculation logic across 6 row component files.
