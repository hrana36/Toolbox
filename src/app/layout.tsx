import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/locales/i18n';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BD Toolbox - Multi-tool Utility for Bangladeshi Users',
  description: 'A bilingual (English/Bengali) multi-tool utility platform with 20+ client-side tools for document processing, image manipulation, calculators, and more.',
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