# Remotion video compositions

Domain language for Fixtura Remotion video assets and sponsor presentation.

## Language

**Sponsor footer**:
The sponsor logo strip shown during the main asset sequence of a composition.
_Avoid_: Outro, sponsor bar (unless referring to layout chrome only)

**Sponsor outro**:
The separate end-of-video sponsor sequence after the main asset. Not the footer.
_Avoid_: Footer, closing credits

**Main duration (`FPS_MAIN`)**:
The allocated length in frames of the main asset sequence for the current composition. The sponsor footer’s clock runs on this sequence.
_Avoid_: Total video length (that includes intro/outro), per-screen card duration

**Footer exit frame**:
The local main-sequence frame where the sponsor footer’s exit animation starts. Defined as `FPS_MAIN - 15`.
_Avoid_: Hardcoded absolute frame (e.g. 300), outro page exit frame
