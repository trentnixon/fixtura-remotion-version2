import type { ColorVariant } from "../../../components/typography/AnimatedText";

export type BroadcastProCopySurface = "container" | "background";
export type BroadcastProCopyRole = "copy" | "title";

/**
 * Dynamic mode colour for Broadcast Pro type.
 * Container surfaces stay with on-container copy. Scene-background type uses
 * title / copy-without-background so Alt modes can flip it.
 */
export const resolveBroadcastProCopyVariant = ({
  surface,
  role,
}: {
  surface: BroadcastProCopySurface;
  role: BroadcastProCopyRole;
}): ColorVariant => {
  if (surface === "container") {
    return "onContainerCopy";
  }
  return role === "title" ? "onContainerTitle" : "onContainerCopyNoBg";
};
