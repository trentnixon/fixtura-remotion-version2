# TeamsSection Cleanup Summary

Refactored all TeamsSection components by extracting shared types (`TeamsSectionProps`, `HorizontalTeamsSectionProps`) into `_types/TeamsSectionProps.ts` and utility functions (`truncateText`, `normalizeScore`, `getFirstInningsDisplay`) into `_utils/helpers.ts` (both `_types` and `_utils` folders are in the current TeamsSection directory - create them if they don't exist). Updated all component imports to use the new folder structure, removing the old `type.ts` and `utils.ts` files from the root directory.
