'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/locales/i18n';

export default function Header() {
  const { t, lang, toggleLang } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/about', label: t('nav.about') },
    { href: '/toolbox', label: t('nav.toolbox'), showHot: true },
  ];

  return (
    <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-base font-bold tracking-widest text-slate-200">
            RANA
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-mono items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${isActive ? 'text-cyan-400 border-b border-cyan-400' : 'text-slate-400'}`}
              >
                {link.label}
                {link.showHot && (
                  <img src="/hot.png" alt="hot" className="w-4 h-4 object-contain" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold px-4 py-1.5 rounded transition-all shadow-[0_0_12px_rgba(34,211,238,0.4)] hover:shadow-[0_0_18px_rgba(34,211,238,0.6)]"
          >
            {lang === 'en' ? 'Hire Me' : 'হায়ার মি'}
          </Link>
          <button 
            onClick={toggleLang} 
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 px-3 py-1.5 rounded transition-all"
          >
            {lang === 'en' ? 'EN' : 'BN'}
          </button>
        </div>

        {/* Mobile Toggle & Quick Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={toggleLang} 
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 px-2 py-1 rounded transition-all"
          >
            {lang === 'en' ? 'EN' : 'BN'}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-400 hover:text-slate-200 focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-900 bg-slate-950/95 backdrop-blur-lg flex flex-col space-y-4 px-2 pb-4">
          <nav className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`hover:text-cyan-400 transition-colors flex items-center justify-between px-3 py-2 rounded-md ${isActive ? 'bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-400' : 'text-slate-400'}`}
                >
                  <span>{link.label}</span>
                  {link.showHot && (
                    <img src="/hot.png" alt="hot" className="w-4 h-4 object-contain" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold py-2.5 rounded transition-all shadow-[0_0_12px_rgba(34,211,238,0.4)]"
            >
              {lang === 'en' ? 'Hire Me' : 'হায়ার মি'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
