'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function NotFound() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = lang === 'en' ? 'Rana | 404 - Not Found' : 'রানা | ৪০৪ - পাওয়া যায়নি';
  }, [lang]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

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