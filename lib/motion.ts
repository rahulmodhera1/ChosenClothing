// Strong custom easing curves. Built-in CSS/Framer easings are too weak.
// Sourced from Emil Kowalski's design engineering standards (animations.dev).

// Strong ease-out for entering/exiting UI. Starts fast, feels responsive.
export const easeOut = [0.23, 1, 0.32, 1] as const;

// Strong ease-in-out for on-screen movement (natural accel/decel).
export const easeInOut = [0.77, 0, 0.175, 1] as const;

// iOS-like drawer curve (from Ionic). For drawers and slide-in panels.
export const easeDrawer = [0.32, 0.72, 0, 1] as const;
