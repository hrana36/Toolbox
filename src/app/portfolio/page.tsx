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

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio'), active: true },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },

    { href: '/toolbox', label: t('nav.toolbox') },
  ];

  return (
    <div className="min-h-screen md:h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-y-auto md:overflow-hidden">
      {/* Title Header */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h1 className="font-mono text-base font-bold tracking-widest text-slate-200">
            RANA
          </h1>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-mono">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${link.active ? 'text-cyan-400 border-b border-cyan-400' : 'text-slate-400'}`}
            >
              {link.label}
              {link.href === '/toolbox' && (
                <img src="/hot.png" alt="hot" className="w-4 h-4 object-contain" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold px-4 py-1.5 rounded transition-all shadow-[0_0_12px_rgba(34,211,238,0.4)] hover:shadow-[0_0_18px_rgba(34,211,238,0.6)]"
          >
            Hire Me
          </Link>
          <button 
            onClick={toggleLang} 
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 px-3 py-1.5 rounded transition-all"
          >
            {lang === 'en' ? 'EN' : 'BN'}
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