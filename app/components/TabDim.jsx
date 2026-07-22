'use client';

import { useEffect } from 'react';

// The board dims when you leave the room: hidden tab swaps the title to a
// power glyph and the favicon to a dimmed dot; both restore on return.
const DIM_ICON = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#08080a"/><circle cx="32" cy="32" r="10" fill="#7a3418"/></svg>'
);

export default function TabDim() {
  useEffect(() => {
    const link = document.querySelector('link[rel="icon"]');
    const orig = { title: document.title, href: link ? link.href : null };
    const onVis = () => {
      if (document.hidden) {
        orig.title = document.title;
        document.title = '⏻ jaskirat singh';
        if (link) link.href = DIM_ICON;
      } else {
        document.title = orig.title;
        if (link && orig.href) link.href = orig.href;
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  return null;
}
