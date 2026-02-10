# Folder Overview

Handles sponsor branding display in cricket compositions. Renders primary and assigned sponsors with consistent animations and layout.

## Files

- `index.tsx`: main SponsorFooter component with unified sponsor rendering and deduplication
- `hooks/useSponsorValidation.ts`: consolidated validation logic

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `AnimatedImage` component, animation/theme/video data contexts
- Consumed by: cricket compositions requiring sponsor branding

## Dependencies

- Internal: `../../../components/images/AnimatedImage`, `../../../core/context/*`, `../composition-types`
- External: React, Remotion
