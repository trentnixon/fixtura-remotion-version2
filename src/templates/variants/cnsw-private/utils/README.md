# CNSW Utils

This directory contains utility functions and configuration objects for the CNSW template variant.

## Files

- `compositionConfig.ts`: Centralized configuration for composition-based term swapping

## Usage

The composition configuration system allows dynamic text swapping based on the composition ID. This is used by both the intro and header components to ensure consistent terminology across the template.

### Key Features

- **Type Safety**: Full TypeScript interfaces for configuration objects
- **Fallback System**: Defaults to `CricketResultSingle` if composition ID not found
- **Utility Functions**: Helper functions for easy configuration retrieval
- **Theme Integration**: Support for dynamic color theming

### Example Usage

```typescript
import {
  getCompositionConfig,
  getLeagueTitleConfig,
} from "./utils/compositionConfig";

// Get composition-specific configuration
const config = getCompositionConfig("CricketLadder");
// Returns: { topLine: { value: "LEAGUE", spacing: "0.25em" }, ... }

// Get league title configuration
const titleConfig = getLeagueTitleConfig("Men's Premier Cricket");
// Returns: { value: "MEN'S PREMIER CRICKET", spacing: "0.22em" }
```
