'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import TerminalConsole from './components/TerminalConsole';
import ComplianceGauge from './components/ComplianceGauge';
import UtilityWidgets from './components/UtilityWidgets';
import { useTranslation } from '@/locales/i18n';

export default function Portfolio() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = lang === 'en' ? 'Rana | Systems Operations Hub' : 'রানা | সিস্টেমস অপারেশনস হাব';
  }, [lang]);

  return (
    <div className="min-h-screen md:h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-y-auto md:overflow-hidden">

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 min-h-0">
        {/* Terminal Column */}
        <div className="flex-1 flex flex-col min-h-0">
          <TerminalConsole />
        </div>

        {/* Right Dashboard Column */}
        <div className="w-full md:w-80 flex flex-col justify-start space-y-4">
          <ComplianceGauge />
        </div>
      </main>

      {/* Bottom Utility Bar */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 pb-4 pt-1">
        <UtilityWidgets />
      </footer>
    </div>
  );
}