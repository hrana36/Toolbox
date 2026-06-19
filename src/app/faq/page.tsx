'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function FAQ() {
  const { t, lang, toggleLang } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = t('faq.tab_title');
  }, [lang, t]);

  const faqItems = [
    { question: t('faq.question1'), answer: t('faq.answer1') },
    { question: t('faq.question2'), answer: t('faq.answer2') },
    { question: t('faq.question3'), answer: t('faq.answer3') },
    { question: t('faq.question4'), answer: t('faq.answer4') },
    { question: t('faq.question5'), answer: t('faq.answer5') }
  ];

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq'), active: true },
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
          {lang === 'en' ? 'EN' : 'BN'}
        </button>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 md:py-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold font-mono tracking-wider border-b border-slate-900 pb-2 mb-4 text-white uppercase text-cyber-glow">
          {t('faq.title')}
        </h1>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-slate-900 bg-slate-900/20 rounded-lg overflow-hidden cyber-glow">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left font-mono text-sm text-slate-200 hover:bg-slate-900/50 transition-colors"
              >
                <span>{item.question}</span>
                <span className="text-cyan-400 font-bold ml-2">
                  {openIndex === index ? '[-]' : '[+]'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-950 text-slate-400 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
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
