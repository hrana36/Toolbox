'use client';

import { useTranslation } from '@/locales/i18n';

export default function About() {
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
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
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
            {t('about.title') || 'About BD Toolbox'}
          </h1>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {t('about.purpose') || 'Our Purpose'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t('about.purposeDescription') || 'To provide free, bilingual (English/Bengali) online tools that empower Bangladeshi users to accomplish everyday tasks with ease and efficiency.'}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {t('about.mission') || 'Our Mission'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t('about.missionDescription') || 'We believe that access to useful online tools should be free and accessible to everyone, regardless of language. Our mission is to break down language barriers by providing a comprehensive suite of tools in both English and Bengali, helping users in Bangladesh and beyond to be more productive in their personal and professional lives.'}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {t('about.builtBy') || 'Built By'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t('about.builtByDescription') || 'BD Toolbox was created by Md Habibur Rahaman Rana, a Systems Engineer specializing in Cybersecurity and IT Infrastructure. With a passion for creating useful software that solves real-world problems, Rana developed this platform to serve the Bangladeshi community.'}
              </p>
              <div className="mt-4 text-center">
                <a href="/portfolio" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  {t('about.viewPortfolio') || 'View Portfolio'}
                </a>
              </div>
            </div>
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