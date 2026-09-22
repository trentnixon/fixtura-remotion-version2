import type { ColorVariant } from "../../../components/typography/AnimatedText";

export type BroadcastProRoundedCopySurface = "container" | "background";
export type BroadcastProRoundedCopyRole = "copy" | "title";

export const resolveBroadcastProRoundedCopyVariant = ({
  surface,
  role,
}: {
  surface: BroadcastProRoundedCopySurface;
  role: BroadcastProRoundedCopyRole;
}): ColorVariant => {
  if (surface === "container") {
    return "onContainerCopy";
  }
  return role === "title" ? "onContainerTitle" : "onContainerCopyNoBg";
};
