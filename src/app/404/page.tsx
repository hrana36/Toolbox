'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function NotFound() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = lang === 'en' ? 'Rana | 404 - Not Found' : 'রানা | ৪০৪ - পাওয়া যায়নি';
  }, [lang]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },

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
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-400"
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
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-4 md:py-6 flex flex-col justify-center text-center">
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6 md:p-8 cyber-glow space-y-4 font-mono">
          <span className="text-red-400 text-3xl font-bold block mb-2">[ 404: NOT_FOUND ]</span>
          <h1 className="text-lg text-white font-mono uppercase mb-4">
            {t('notFound.title') || 'Requested Resource Offline'}
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            {t('notFound.message') || 'The virtual path specified does not resolve to an active system node or operation advisory.'}
          </p>
          <div className="pt-2">
            <Link 
              href="/" 
              className="inline-block bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-cyan-400 font-bold px-5 py-2.5 rounded transition-all"
            >
              &laquo; {t('notFound.homeLink') || 'Return to Control Console'}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-sm font-mono mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500">&copy; {new Date().getFullYear()} RANA. {t('footer.copyright')}</div>
          <div className="flex space-x-6 text-xs">
            <a href="https://www.linkedin.com/in/hrana36/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">LinkedIn</a>
            <a href="https://github.com/hrana36" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">GitHub</a>
            <a href="https://drive.google.com/drive/folders/1B5yzng9PwpBvF2d7s9lpbXqcVRZ3gGPn?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">{t('footer.download_cv')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}