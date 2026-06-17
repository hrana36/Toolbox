'use client';

import { useTranslation } from '@/locales/i18n';

export default function TermsOfService() {
  const { t, lang } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">BD Toolbox</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.home')}
            </a>
            <a href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.portfolio')}
            </a>
            <a href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.blog')}
            </a>
            <a href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.faq')}
            </a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.about')}
            </a>
            <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.contact')}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => { /* toggleLang */ }} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {lang === 'en' ? 'বাং' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            {t('termsOfService.title') || 'Terms of Service'}
          </h1>
          <div className="prose dark:prose-invert mx-auto">
            <p className="mb-6">
              {t('termsOfService.effectiveDate') || 'Effective Date: June 15, 2026'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.acceptance') || 'Acceptance of Terms'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.acceptanceText') || 'By accessing and using the BD Toolbox website and its online tools, you agree to comply with and be bound by these Terms of Service.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.useLicense') || 'Use License'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.licenseText') || 'Permission is granted to temporarily download and use the tools available on BD Toolbox for personal, non-commercial use only. This is a license, not a transfer of title.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.disclaimer') || 'Disclaimer'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.disclaimerText') || 'The tools on BD Toolbox are provided "as is". BD Toolbox makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.limitations') || 'Limitations'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.limitationsText') || 'In no event shall BD Toolbox or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BD Toolbox.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.revisions') || 'Revisions and Errata'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.revisionsText') || 'The materials appearing on BD Toolbox may include technical, typographical, or photographic errors. BD Toolbox does not warrant that any of the materials on its website are accurate, complete, or current.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.links') || 'Links'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.linksText') || 'BD Toolbox has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.modifications') || 'Modifications'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.modificationsText') || 'BD Toolbox may revise these terms of service at any time without notice. By using this website you agree to be bound by the then current version of these Terms of Service.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('termsOfService.governingLaw') || 'Governing Law'}
            </h2>
            <p className="mb-4">
              {t('termsOfService.governingLawText') || 'These terms and conditions are governed by and construed in accordance with the laws of Bangladesh and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.'}
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-bold mb-2">{t('footer.quick_links') || 'Quick Links'}</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white">{t('nav.home') || 'Home'}</a></li>
                <li><a href="/portfolio" className="hover:text-white">{t('nav.portfolio') || 'Portfolio'}</a></li>
                <li><a href="/blog" className="hover:text-white">{t('nav.blog') || 'Blog'}</a></li>
                <li><a href="/faq" className="hover:text-white">{t('nav.faq') || 'FAQ'}</a></li>
                <li><a href="/about" className="hover:text-white">{t('nav.about') || 'About'}</a></li>
                <li><a href="/contact" className="hover:text-white">{t('nav.contact') || 'Contact'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('footer.tools') || 'Tools'}</h4>
              <ul className="space-y-2">
                <li><a href="/tools/pdf-converter" className="hover:text-white">PDF Converter</a></li>
                <li><a href="/tools/word-counter" className="hover:text-white">Word Counter</a></li>
                <li><a href="/tools/unit-converter" className="hover:text-white">Unit Converter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('footer.follow') || 'Follow Us'}</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">GitHub</a>
                <a href="#" className="hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-xs">
            &copy; {new Date().getFullYear()} BD Toolbox. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}