import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Reilly Pepper Co.',
  description: 'Family recipes, made with love.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.11.0/dist/tabler-icons.min.css"
        />
      </head>
      <body>
        <header style={{ backgroundColor: 'var(--color-brand)' }}>
          <div className="max-w-3xl mx-auto px-5 py-4">
            <Link href="/" className="flex items-center gap-3 no-underline w-fit">
              <span className="text-2xl select-none" aria-hidden="true">🌶️</span>
              <div>
                <div
                  className="text-white font-semibold text-xl leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Reilly Pepper Co.
                </div>
                <div className="text-red-200 text-xs leading-tight">Family recipes, made with love</div>
              </div>
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-5 py-8">{children}</main>

        <footer className="text-center py-10 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          Made with love for Mom 🧡
        </footer>
      </body>
    </html>
  );
}
