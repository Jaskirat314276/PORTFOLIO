'use client';

// Soft ambient gradient orbs (orange + blue) layered over the 3D background.
export default function GlowField() {
  return (
    <div aria-hidden="true">
      <div
        className="glow-orb"
        style={{
          top: '6%', left: '-14%', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(255,107,61,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="glow-orb"
        style={{
          bottom: '4%', right: '-15%', width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(91,158,255,0.12) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
