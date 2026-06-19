'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function PrivacyPolicy() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = lang === 'en' ? 'Rana | Privacy Policy' : 'রানা | প্রাইভেসী পলিসি';
  }, [lang]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
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
              className="hover:text-cyan-400 transition-colors text-slate-400"
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
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 md:p-6 cyber-glow space-y-4 font-mono text-xs">
          <h1 className="text-xl font-bold border-b border-slate-900 pb-2 mb-2 text-white uppercase text-cyber-glow text-center">
            {t('privacyPolicy.title') || 'Privacy Policy'}
          </h1>
          <p className="text-slate-400 leading-relaxed text-center mb-4">
            {t('privacyPolicy.effectiveDate') || 'Effective Date: June 15, 2026'}
          </p>

          <div className="space-y-4 font-sans text-slate-300">
            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('privacyPolicy.introduction') || '1. Introduction'}</h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.introductionText') || 'This privacy policy describes how RANA // SYS_OPS collects, uses, and protects your information when you use our website.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('privacyPolicy.informationCollection') || '2. Information We Collect'}</h2>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                <li>
                  {t('privacyPolicy.noPersonalData') || 'We do not collect personal data such as names, email addresses, or phone numbers unless you voluntarily provide it through our contact forms.'}
                </li>
                <li>
                  {t('privacyPolicy.fileData') || 'When using our tools or apps, all operations happen client-side in your local browser. We do not store or access any local files.'}
                </li>
                <li>
                  {t('privacyPolicy.cookies') || 'We may use cookies to remember your language preference and improve your experience.'}
                </li>
                <li>
                  {t('privacyPolicy.analytics') || 'We use anonymous analytics to understand how users interact with our site, but this data does not identify individual users.'}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('privacyPolicy.howWeUseInformation') || '3. How We Use Your Information'}</h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.useInformationText') || 'Any information you provide through contact forms is used solely to respond to your inquiry. We do not share your information with third parties.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('privacyPolicy.dataSecurity') || '4. Data Security'}</h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.dataSecurityText') || 'We implement reasonable security measures to protect against unauthorized access, alteration, or destruction of information we collect.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('privacyPolicy.changesToPolicy') || '5. Changes to This Policy'}</h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.changesText') || 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('privacyPolicy.contactUs') || '6. Contact Us'}</h2>
              <p className="leading-relaxed">
                {t('privacyPolicy.contactText') || 'If you have any questions about this privacy policy, please contact us at hrana36@gmail.com'}
              </p>
            </div>
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