import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/locales/i18n';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rana | Systems & Security Operations Center',
  description: 'Enterprise systems administration, cyber security engineering, endpoint compliance auditing, and proactive infrastructure monitoring.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <I18nProvider>
      <html lang="en" className={inter.className}>
        <body>{children}</body>
      </html>
    </I18nProvider>
  );
}