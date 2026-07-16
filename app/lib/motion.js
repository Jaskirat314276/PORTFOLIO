// ============================================================
// Motion tokens — single source. Every component imports these
// so there are no magic numbers scattered around the codebase.
// transform + opacity only (+ SVG pathLength / dashoffset).
// ============================================================

export const ease = {
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',        // reveal / slideDock
  mask: 'cubic-bezier(0.65, 0, 0.35, 1)',       // headline mask lines
  back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',    // stamps / chips / ticks
};

export const dur = {
  reveal: 560,
  slideDock: 650,
  maskLine: 700,
  scramble: 900,
  stamp: 500,
  hover: 180,
};

export const slideDock = {
  distance: 96,       // desktop lateral travel (px)
  distanceMobile: 24, // mobile lateral travel (px)
  settleRotate: 1.5,  // degrees, settles to 0
};

export const stagger = {
  siblings: 70,
  headlineLines: 90,
  chips: 30,
};

// Rail dock thresholds (scroll progress through the Project Rail)
export const RAIL_THRESHOLDS = [0.08, 0.24, 0.4, 0.56, 0.72, 0.88];

export const spring = { stiffness: 500, damping: 30 };
