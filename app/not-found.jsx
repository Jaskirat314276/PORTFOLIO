'use client';

import Link from 'next/link';
import ScrambleText from './components/ScrambleText';

// THE 404 — a lone trace draws from the top and SNAPS mid-path: an open
// circuit. danger tint only at the break; everything else stays in-palette.
export default function NotFound() {
  return (
    <div className="nf-board">
      <div className="nf-circuit" aria-hidden="true">
        <svg width="2" height="150" viewBox="0 0 2 150" style={{ overflow: 'visible' }}>
          <line x1="1" y1="0" x2="1" y2="150" className="trace-path trace-dim" />
          <line x1="1" y1="0" x2="1" y2="150" className="nf-line" pathLength="1" strokeDasharray="1" />
        </svg>
        <span className="nf-pad">
          <span className="nf-debris nf-d1" />
          <span className="nf-debris nf-d2" />
          <span className="nf-debris nf-d3" />
        </span>
      </div>
      <div className="mono nf-err">
        <ScrambleText text="ERR 404 — OPEN CIRCUIT" />
      </div>
      <h1 className="serif nf-head">
        This trace leads <span className="ital">nowhere</span>.
      </h1>
      <Link href="/" className="mono nf-back">← Back to the board</Link>
    </div>
  );
}
