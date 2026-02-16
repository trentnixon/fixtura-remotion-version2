# Folder Overview

Individual image effect components used by ImageBackground. Each implements a visual effect; ImageBackground selects by effectType.

## Files

- **`zoom.tsx`**: zoom in/out
- **`pan.tsx`**: horizontal/vertical pan
- **`kenBurns.tsx`**: combined zoom + pan
- **`breath.tsx`**: breathing in/out scale
- **`blur.tsx`**: focus/blur transition or pulse
- **`colorOverlay.tsx`**: color overlay
- **`combined.tsx`**: CombinedEffects orchestrator; aspect-ratio helpers
- **`index.tsx`**: exports effect components and ImageEffectType enum

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: Remotion (useCurrentFrame, interpolate)
- Consumed by: ImageBackground (index.tsx)

## Dependencies

- Internal: none
- External: React, Remotion
