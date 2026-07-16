import { ImageResponse } from 'next/og';

// 1200×630 OG card, generated at build time — link previews on
// LinkedIn/WhatsApp/X show this instead of a bare card.
export const alt = "Jaskirat Singh — Engineer at the intersection of code & hardware.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 90px',
          background: '#1a1815',
          color: '#f0eee5',
          fontSize: 32,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'rgba(217,119,87,0.14)',
            filter: 'blur(90px)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 42 }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: '#d97757' }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: 'rgba(240,238,229,0.6)' }}>
            AVAILABLE FOR OPPORTUNITIES · 2026
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, fontWeight: 600, lineHeight: 1.06, letterSpacing: -2 }}>
          <span>Hi, I&apos;m</span>
          <span style={{ color: '#d97757' }}>Jaskirat Singh</span>
          <span>— I build things.</span>
        </div>
        <div style={{ marginTop: 44, fontSize: 28, color: 'rgba(240,238,229,0.7)', maxWidth: 900, lineHeight: 1.4 }}>
          Engineer at the intersection of code & hardware — full-stack web, GenAI, data, power electronics.
        </div>
      </div>
    ),
    { ...size }
  );
}
