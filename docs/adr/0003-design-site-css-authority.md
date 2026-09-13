# Design-site CSS is authoritative during exploration

During design prototype work, overlay CSS is edited only under the design site (`design/_shared/{variant}-*.css` and starters in `design/_templates/`).

Remotion variant styles under `src/templates/variants/` are updated at **handoff**, not on every design iteration.

Handoff requires **deliberate reconciliation and visual comparison** in Remotion Studio (same fixture, 1080×1350, settled frame). Copying CSS files alone does not prove parity.

Trade-off: design and Remotion styles may drift until handoff; exploration speed is preferred over continuous dual-tree sync.
