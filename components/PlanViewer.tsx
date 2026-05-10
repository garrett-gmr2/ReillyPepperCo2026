'use client';

import { useEffect } from 'react';

export default function PlanViewer({ html }: { html: string }) {
  useEffect(() => {
    // The HTML fragment uses onclick="toggleSection(id)" which expects a global.
    // We define it here so the expand/collapse buttons work as authored.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).toggleSection = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const btn = el.previousElementSibling as HTMLElement | null;
      const icon = btn?.querySelector?.('i') as HTMLElement | null;
      el.classList.toggle('open');
      if (icon) {
        icon.style.transform = el.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
