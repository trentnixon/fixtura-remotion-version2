import React from "react";
import { cellBlur } from "../glass";
import type { BroadcastProGlassStyle } from "../glass";

/**
 * @deprecated Use {@link BroadcastProCrestWell} from `templates/variants/broadcastPro/components/crest`.
 * Shell-only wrapper retained for backward compatibility during migration.
 */
export interface BroadcastProPlayerLogoWellProps {
  className: string;
  glass: BroadcastProGlassStyle;
  children: React.ReactNode;
}

/** @deprecated Use `BroadcastProCrestWell` with `tier="grid"` or `tier="featured"`. */
export const BroadcastProPlayerLogoWell: React.FC<
  BroadcastProPlayerLogoWellProps
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
