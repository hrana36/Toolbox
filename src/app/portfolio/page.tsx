'use client';

import TerminalConsole from './components/TerminalConsole';
import ComplianceGauge from './components/ComplianceGauge';
import UtilityWidgets from './components/UtilityWidgets';
import { useTranslation } from '@/locales/i18n';

export default function Portfolio() {
  const { t, lang, toggleLang } = useTranslation();

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none">
      {/* Title Header */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h1 className="font-mono text-base font-bold tracking-widest text-slate-200">
            RANA // SYS_OPS
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>{t('portfolio.header.system_status')}:</span>
            <span className="text-emerald-400 font-bold">{t('portfolio.header.nominal')}</span>
          </div>
          <button 
            onClick={toggleLang} 
            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono text-slate-300 px-3 py-1.5 rounded transition-all"
          >
            {lang === 'en' ? 'বাং' : 'EN'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 min-h-0">
        {/* Terminal Column */}
        <div className="flex-1 flex flex-col min-h-0">
          <TerminalConsole />
        </div>

        {/* Right Dashboard Column */}
        <div className="w-full md:w-80 flex flex-col justify-between space-y-4">
          <ComplianceGauge />
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 font-mono text-xs text-slate-400 cyber-glow flex-1 flex flex-col justify-center">
            <span className="text-slate-500 uppercase tracking-wider mb-2 block">{t('portfolio.instructions.title')}</span>
            <p className="leading-relaxed">
              {t('portfolio.instructions.body').split("'help'").map((text, idx, arr) => (
                <span key={idx}>
                  {text}
                  {idx < arr.length - 1 && <span className="text-cyan-400">help</span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Utility Bar */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 pb-4 pt-1">
        <UtilityWidgets />
      </footer>
    </div>
  );
}