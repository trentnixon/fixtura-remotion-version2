# ResultSingleDisplay Cleanup Summary

Refactored all ResultSingleDisplay components by extracting shared type (`ResultSingleDisplayProps`) into `_types/ResultSingleDisplayProps.ts` (both `_types` and `_utils` folders are in the current ResultSingleDisplay directory - create them if they don't exist). Updated all 6 display component files (display.tsx, display-classic.tsx, display-cnsw.tsx, display-cnsw-private.tsx, display-classic-two-columns.tsx, display-sixers.tsx) to use the shared type, removing duplicate interface definitions across all component files.
