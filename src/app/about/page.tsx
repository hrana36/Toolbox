'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function About() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = t('about.tab_title');
  }, [lang, t]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/about', label: t('nav.about'), active: true },

    { href: '/toolbox', label: t('nav.toolbox') },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-base font-bold tracking-widest text-slate-200">
            RANA
          </span>
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

      {/* Body */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 md:py-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold font-mono tracking-wider border-b border-slate-900 pb-2 mb-4 text-white uppercase text-cyber-glow">
          {t('about.title')}
        </h1>

        <div className="space-y-4 leading-relaxed text-slate-300 text-sm">
          {/* Profile Section */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 md:p-5 cyber-glow">
            <h2 className="text-lg font-bold font-mono text-cyan-400 mb-3 uppercase tracking-wider">{t('about.section_profile')}</h2>
            <p className="text-slate-400">{t('about.profile_desc')}</p>
          </section>

          {/* Mission Section */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 md:p-5 cyber-glow">
            <h2 className="text-lg font-bold font-mono text-emerald-400 mb-3 uppercase tracking-wider">{t('about.section_mission')}</h2>
            <p className="text-slate-400">{t('about.mission_desc')}</p>
          </section>

          {/* Action Link */}
          <div className="text-center pt-2">
            <Link 
              href="/portfolio" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs px-6 py-3 rounded border border-cyan-500/30 transition-colors tracking-widest uppercase inline-block cyber-glow"
            >
              {t('about.view_portfolio')}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-sm font-mono mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500">&copy; {new Date().getFullYear()} RANA // SYS_OPS. {t('footer.copyright')}</div>
          <div className="flex space-x-6 text-xs">
            <a href="https://www.linkedin.com/in/hrana36/" className="text-slate-400 hover:text-white">LinkedIn</a>
            <a href="https://github.com/hrana36" className="text-slate-400 hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
