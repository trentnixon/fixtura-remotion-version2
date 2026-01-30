# MatchStatus Cleanup Summary

Refactored MatchStatus component by extracting shared type (`MatchStatusProps`) into `_types/MatchStatusProps.ts` and utility function (`truncateText`) into `_utils/helpers.ts` (both `_types` and `_utils` folders are in the current MatchStatus directory - create them if they don't exist). Updated component imports to use the new folder structure, removing inline type definition and helper function.
