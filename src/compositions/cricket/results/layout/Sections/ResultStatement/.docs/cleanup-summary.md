# ResultStatement Cleanup Summary

Refactored all ResultStatement components by extracting shared types (`ResultStatementShortProps`, `ResultStatementTextProps`) into `_types/ResultStatementProps.ts` and utility function (`buildResultStatementText`) into `_utils/helpers.ts` (both `_types` and `_utils` folders are in the current ResultStatement directory - create them if they don't exist). Updated component imports to use the new folder structure and extracted inline statement text building logic into a reusable helper function.
