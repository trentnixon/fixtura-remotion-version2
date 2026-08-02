import React from "react";
import { cellBlur } from "../glass";
import type { BroadcastProRoundedGlassStyle } from "../glass";

/**
 * @deprecated Use {@link BroadcastProRoundedCrestWell} from `templates/variants/broadcastProRounded/components/crest`.
 * Shell-only wrapper retained for backward compatibility during migration.
 */
export interface BroadcastProRoundedPlayerLogoWellProps {
  className: string;
  glass: BroadcastProRoundedGlassStyle;
  children: React.ReactNode;
}

/** @deprecated Use `BroadcastProRoundedCrestWell` with `tier="grid"` or `tier="featured"`. */
export const BroadcastProRoundedPlayerLogoWell: React.FC<
  BroadcastProRoundedPlayerLogoWellProps
> = ({ className, glass, children }) => (
  <div
    className={className}
    style={{
      backgroundColor: glass.logoWell,
      border: glass.border,
      ...cellBlur,
    }}
  >
    {children}
  </div>
);
