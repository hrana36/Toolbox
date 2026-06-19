'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  const { t, lang, toggleLang } = useTranslation();
  const [latency, setLatency] = useState(24);
  const [displayText, setDisplayText] = useState('');
  const [activeTab, setActiveTab] = useState<'Network' | 'Endpoint' | 'Cloud' | 'SecOps' | 'Toolbox'>('Network');

  useEffect(() => {
    document.title = t('home.tab_title');
  }, [lang, t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(15, Math.min(45, prev + Math.floor(Math.random() * 7) - 3)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heroSubText = t('home.hero_sub');
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    let active = true;
    const interval = setInterval(() => {
      if (!active) return;
      setDisplayText(heroSubText.slice(0, i + 1));
      i++;
      if (i >= heroSubText.length) {
        clearInterval(interval);
      }
    }, 20);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [heroSubText]);

  const navLinks = [
    { href: '/', label: t('nav.home'), active: true },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-base font-bold tracking-widest text-slate-200">
            RANA // SYS_OPS
          </span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-mono">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`hover:text-cyan-400 transition-colors ${link.active ? 'text-cyan-400 border-b border-cyan-400' : 'text-slate-400'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button 
          onClick={toggleLang} 
          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 px-3 py-1.5 rounded transition-all"
        >
          {lang === 'en' ? 'EN' : 'BN'}
        </button>
      </header>

      {/* Hero Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Left Badge: MD-102 */}
          <div className="hidden md:flex w-36 h-36 justify-center items-center flex-shrink-0">
            <img src="/md-102.png" alt="MD-102 Badge" className="w-30 h-30 object-contain cyber-glow rounded-full p-1 border border-slate-800/40 bg-slate-950/20" />
          </div>

          {/* Center Content */}
          <div className="text-center max-w-3xl flex-1">
            <div className="inline-block min-h-[38px] bg-slate-900/60 border border-slate-800 rounded px-4 py-2 font-mono text-xs text-emerald-400 mb-6 cyber-glow">
              {displayText}
              <span className="animate-pulse ml-0.5 font-bold">_</span>
            </div>

            {/* Mobile Badges Row (only shown on small screens) */}
            <div className="flex md:hidden justify-center items-center gap-6 mb-6">
              <img src="/md-102.png" alt="MD-102 Badge" className="w-20 h-20 object-contain cyber-glow rounded-full p-1 border border-slate-800/40 bg-slate-950/20" />
              <img src="/az-104.png" alt="AZ-104 Badge" className="w-20 h-20 object-contain cyber-glow rounded-full p-1 border border-slate-800/40 bg-slate-950/20" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {lang === 'en' ? 'Systems & Security Center' : 'সিস্টেম ও সিকিউরিটি সেন্টার'}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              {t('home.description')}
            </p>
          </div>

          {/* Right Badge: AZ-104 */}
          <div className="hidden md:flex w-36 h-36 justify-center items-center flex-shrink-0">
            <img src="/az-104.png" alt="AZ-104 Badge" className="w-30 h-30 object-contain cyber-glow rounded-full p-1 border border-slate-800/40 bg-slate-950/20" />
          </div>
        </div>

        {/* Projects Section */}
        <section className="bg-slate-900/20 border border-slate-900 rounded-lg p-5 mb-6 cyber-glow">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-mono text-cyan-400 uppercase tracking-wider">
                {t('home.project_title')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('home.project_desc')}
              </p>
            </div>

            {/* Terminal Category Tabs */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {(['Network', 'Endpoint', 'Cloud', 'SecOps', 'Toolbox'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded border transition-all ${
                    activeTab === tab
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolioData.projects
              .filter((p) => p.category === activeTab)
              .map((project, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 rounded p-4 flex flex-col justify-between hover:border-cyan-500/50 transition-colors animate-[fadeIn_0.3s_ease-out]"
                >
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      // {project.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{project.description}</p>
                  </div>
                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((techItem) => (
                        <span
                          key={techItem}
                          className="bg-slate-900 text-slate-300 border border-slate-800 text-[9px] px-1.5 py-0.5 rounded font-mono"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                    <div className="text-left">
                      <Link href="/portfolio" className="text-cyan-400 hover:text-cyan-300 font-mono text-[10px] uppercase tracking-wider">
                        {t('about.view_portfolio')} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Dynamic Status Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900/40 border border-slate-800 rounded p-4 flex flex-col justify-between cyber-glow">
            <span className="text-slate-500 uppercase">{t('home.pinger_latency')}</span>
            <span className="text-lg font-bold text-cyan-400 mt-2">{latency}ms</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded p-4 flex flex-col justify-between cyber-glow">
            <span className="text-slate-500 uppercase">{t('home.pinger_shields')}</span>
            <span className="text-lg font-bold text-emerald-400 mt-2">{t('home.status_nominal')}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded p-4 flex flex-col justify-between cyber-glow">
            <span className="text-slate-500 uppercase">{t('home.pinger_vpn')}</span>
            <span className="text-lg font-bold text-cyan-400 mt-2">{t('home.status_encrypted')}</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded p-4 flex flex-col justify-between cyber-glow">
            <span className="text-slate-500 uppercase">{t('home.pinger_status')}</span>
            <span className="text-lg font-bold text-emerald-400 mt-2">{t('home.status_online')}</span>
          </div>
        </section>
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
