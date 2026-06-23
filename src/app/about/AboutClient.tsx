'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function About() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = t('about.tab_title');
  }, [lang, t]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

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
