'use client';

import { useTranslation } from '@/locales/i18n';

export default function PrivacyPolicy() {
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
            {t('privacyPolicy.title') || 'Privacy Policy'}
          </h1>
          <div className="prose dark:prose-invert mx-auto">
            <p className="mb-6">
              {t('privacyPolicy.effectiveDate') || 'Effective Date: June 15, 2026'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('privacyPolicy.introduction') || 'Introduction'}
            </h2>
            <p className="mb-4">
              {t('privacyPolicy.introductionText') || 'This privacy policy describes how BD Toolbox collects, uses, and protects your information when you use our website and online tools.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('privacyPolicy.informationCollection') || 'Information We Collect'}
            </h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>
                {t('privacyPolicy.noPersonalData') || 'We do not collect personal data such as names, email addresses, or phone numbers unless you voluntarily provide it through our contact forms.'}
              </li>
              <li>
                {t('privacyPolicy.fileData') || 'When using our tools, we do not store or access any files you upload. All processing happens client-side in your browser.'}
              </li>
              <li>
                {t('privacyPolicy.cookies') || 'We may use cookies to remember your language preference and improve your experience.'}
              </li>
              <li>
                {t('privacyPolicy.analytics') || 'We use anonymous analytics to understand how users interact with our site, but this data does not identify individual users.'}
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">
              {t('privacyPolicy.howWeUseInformation') || 'How We Use Your Information'}
            </h2>
            <p className="mb-4">
              {t('privacyPolicy.useInformationText') || 'Any information you provide through contact forms is used solely to respond to your inquiry. We do not share your information with third parties.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('privacyPolicy.dataSecurity') || 'Data Security'}
            </h2>
            <p className="mb-4">
              {t('privacyPolicy.dataSecurityText') || 'We implement reasonable security measures to protect against unauthorized access, alteration, or destruction of information we collect.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('privacyPolicy.changesToPolicy') || 'Changes to This Policy'}
            </h2>
            <p className="mb-4">
              {t('privacyPolicy.changesText') || 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.'}
            </p>
            <h2 className="text-2xl font-semibold mb-4">
              {t('privacyPolicy.contactUs') || 'Contact Us'}
            </h2>
            <p className="mb-4">
              {t('privacyPolicy.contactText') || 'If you have any questions about this privacy policy, please contact us at hrana36@gmail.com'}
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