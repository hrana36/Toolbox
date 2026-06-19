'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function Home() {
  const { t, lang, toggleLang } = useTranslation();
  const [latency, setLatency] = useState(24);
  const [displayText, setDisplayText] = useState('');

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
    { href: '/about', label: t('nav.about') },
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
          {lang === 'en' ? 'à¦¬à¦¾à¦‚' : 'EN'}
        </button>
      </header>

      {/* Hero Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-block min-h-[38px] bg-slate-900/60 border border-slate-800 rounded px-4 py-2 font-mono text-xs text-emerald-400 mb-6 cyber-glow">
            {displayText}
            <span className="animate-pulse ml-0.5 font-bold">_</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            {t('home.title')}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {t('home.description')}
          </p>
        </div>

        {/* Dynamic Status Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 font-mono text-xs">
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

        {/* Dashboard Navigation Cards */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/portfolio" className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500 rounded-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 cyber-glow block group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{t('home.card_port_title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('home.card_port_desc')}</p>
          </Link>
          <Link href="/about" className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500 rounded-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 cyber-glow block group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{t('home.card_about_title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('home.card_about_desc')}</p>
          </Link>
          <Link href="/blog" className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500 rounded-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 cyber-glow block group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{t('home.card_blog_title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('home.card_blog_desc')}</p>
          </Link>
          <Link href="/contact" className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500 rounded-lg p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 cyber-glow block group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{t('home.card_contact_title')}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t('home.card_contact_desc')}</p>
          </Link>
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
