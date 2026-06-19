'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';
import { portfolioData } from '@/data/portfolio';

export default function Contact() {
  const { t, lang, toggleLang } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'General', message: '' });

  useEffect(() => {
    document.title = t('contact.tab_title');
  }, [lang, t]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', category: 'General', message: '' });
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/contact', label: t('nav.contact'), active: true },
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
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 md:py-6 flex flex-col justify-center gap-8">
        {/* Personnel Security Dossier */}
        <div className="w-full flex flex-col justify-center">
          <h1 className="text-2xl font-bold font-mono tracking-wider border-b border-slate-900 pb-2 mb-4 text-white uppercase text-cyber-glow">
            {t('about.title')}
          </h1>
          <div className="space-y-4 leading-relaxed text-slate-300 text-sm">
            {/* Profile Section */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 md:p-5 cyber-glow">
              <h2 className="text-base font-bold font-mono text-cyan-400 mb-3 uppercase tracking-wider">{t('about.section_profile')}</h2>
              <p className="text-slate-400 text-xs">{t('about.profile_desc')}</p>
            </section>

            {/* Mission Section */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 md:p-5 cyber-glow">
              <h2 className="text-base font-bold font-mono text-emerald-400 mb-3 uppercase tracking-wider">{t('about.section_mission')}</h2>
              <p className="text-slate-400 text-xs">{t('about.mission_desc')}</p>
            </section>
          </div>
        </div>

        {/* Centered Form */}
        <div className="w-full flex flex-col justify-center">
          <h1 className="text-2xl font-bold font-mono tracking-wider border-b border-slate-900 pb-2 mb-4 text-white uppercase text-cyber-glow">
            {t('contact.title')}
          </h1>
          <p className="text-slate-400 text-sm mb-3 leading-relaxed">
            {t('contact.description')}
          </p>

          {submitted ? (
            <div className="bg-emerald-950/40 border border-emerald-900 text-emerald-400 p-4 rounded text-sm font-mono cyber-glow">
              [OK] {t('contact.form_success')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-500 uppercase mb-1.5">{t('contact.form_name')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyan-500 rounded p-2.5 text-slate-200 outline-none focus:ring-0 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-500 uppercase mb-1.5">{t('contact.form_email')}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyan-500 rounded p-2.5 text-slate-200 outline-none focus:ring-0 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-500 uppercase mb-1.5">{t('contact.form_subject')}</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyan-500 rounded p-2.5 text-slate-200 outline-none focus:ring-0 transition-colors"
                >
                  <option value="General">{t('contact.option_general')}</option>
                  <option value="Audit">{t('contact.option_audit')}</option>
                  <option value="Contract">{t('contact.option_contract')}</option>
                  <option value="Threat">{t('contact.option_threat')}</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 uppercase mb-1.5">{t('contact.form_message')}</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyan-500 rounded p-2.5 text-slate-200 outline-none focus:ring-0 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded font-bold tracking-widest uppercase border border-cyan-500/20 transition-colors cyber-glow"
              >
                {t('contact.form_submit')}
              </button>
            </form>
          )}
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
