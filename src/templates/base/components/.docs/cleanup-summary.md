# Cleanup Summary - Base Components Folder

## Overview
This cleanup extracted hardcoded constants from component files into a centralized `_utils` folder.

## Changes Made

### Created Files

#### `_utils/constants.ts`
Extracted hardcoded constants used in component files:
- `DEFAULT_AUDIO_VOLUME` - Default audio volume value (0.5) used in BaseAudioTrack
- `BACKGROUND_Z_INDEX` - Z-index value (-1) for background layer used in BaseBackground

### Modified Files

Both component files were updated to:
1. Import constants from `./_utils/constants`
2. Replace hardcoded values with named constants

**Files Updated:**
- `BaseAudioTrack.tsx` - Replaced hardcoded `volume={0.5}` with `DEFAULT_AUDIO_VOLUME`
- `BaseBackground.tsx` - Replaced hardcoded `zIndex: -1` with `BACKGROUND_Z_INDEX`

## Benefits

1. **Maintainability**: Constants are now centralized and can be easily modified
2. **Readability**: Named constants make the code more self-documenting
3. **Consistency**: Follows the modularization pattern used across the codebase
4. **Future-Proofing**: If these values need to be changed or made configurable, they're in one place

## Folder Structure

```
components/
├── _utils/
│   └── constants.ts              # Shared constants
├── .docs/
│   └── cleanup-summary.md        # This file
├── BaseAudioTrack.tsx             # Updated to use shared constants
└── BaseBackground.tsx             # Updated to use shared constants
```

## Notes

- The `_utils` folder should be created if it doesn't exist (already created during cleanup)
- These components are simple and don't share interfaces or complex logic
- The constants extracted are configuration values that could potentially be made configurable in the future
- Both components are used as default implementations in the base template and can be overridden by variants
