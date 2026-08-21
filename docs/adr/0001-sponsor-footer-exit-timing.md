# Sponsor footer exit uses FPS_MAIN − 15

The sponsor footer previously exited at a hardcoded frame (300), which was early on longer main sequences. Exit now starts at `FPS_MAIN - 15` with a 15-frame exit duration so the out animation fits the end of the main asset. Row content may still use other offsets (e.g. 30); the footer is intentionally aligned with the outro’s 15-frame out window, not with row exits. If `FPS_MAIN` is missing, the footer does not force an exit.
