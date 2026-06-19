'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function TermsOfService() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = lang === 'en' ? 'Rana | Terms of Service' : 'রানা | টার্মস অফ সার্ভিস';
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
          {lang === 'en' ? 'বাং' : 'EN'}
        </button>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 md:py-6 flex flex-col justify-center">
        <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 md:p-6 cyber-glow space-y-4 font-mono text-xs">
          <h1 className="text-xl font-bold border-b border-slate-900 pb-2 mb-2 text-white uppercase text-cyber-glow text-center">
            {t('termsOfService.title') || 'Terms of Service'}
          </h1>
          <p className="text-slate-400 leading-relaxed text-center mb-4">
            {t('termsOfService.effectiveDate') || 'Effective Date: June 15, 2026'}
          </p>

          <div className="space-y-4 font-sans text-slate-300">
            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.acceptance') || '1. Acceptance of Terms'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.acceptanceText') || 'By accessing and using the RANA // SYS_OPS website and its online resources, you agree to comply with and be bound by these Terms of Service.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.useLicense') || '2. Use License'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.licenseText') || 'Permission is granted to temporarily view and interact with the dashboards on this website for personal, informational, and non-commercial use only.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.disclaimer') || '3. Disclaimer'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.disclaimerText') || 'The materials and tools on this website are provided "as is". RANA // SYS_OPS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.limitations') || '4. Limitations'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.limitationsText') || 'In no event shall RANA // SYS_OPS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.revisions') || '5. Revisions and Errata'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.revisionsText') || 'The materials appearing on this website may include technical, typographical, or photographic errors. RANA // SYS_OPS does not warrant that any of the materials on its website are accurate, complete, or current.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.links') || '6. Links'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.linksText') || 'RANA // SYS_OPS has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.modifications') || '7. Modifications'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.modificationsText') || 'RANA // SYS_OPS may revise these terms of service at any time without notice. By using this website you agree to be bound by the then current version of these Terms of Service.'}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-white mb-2 uppercase">{t('termsOfService.governingLaw') || '8. Governing Law'}</h2>
              <p className="leading-relaxed">
                {t('termsOfService.governingLawText') || 'These terms and conditions are governed by and construed in accordance with the laws of Bangladesh and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.'}
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