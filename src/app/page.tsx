'use client';

import { useState } from 'react';
import { useTranslation } from '@/locales/i18n';

export default function Home() {
  const { t, lang, toggleLang } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">BD Toolbox</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
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
            <button onClick={toggleLang} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {lang === 'en' ? 'বাং' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            {t('home.title')}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {t('home.description')}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Tool cards will go here */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">PDF Converter</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Convert images to PDF, merge/split PDFs, and more.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Word Counter</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Count words, characters, sentences, and paragraphs.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Unit Converter</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Convert between different units, including Bangladeshi land units.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-bold mb-2">{t('footer.quick_links')}</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white">{t('footer.about')}</a></li>
                <li><a href="/contact" className="hover:text-white">{t('footer.contact')}</a></li>
                <li><a href="/faq" className="hover:text-white">{t('footer.faq')}</a></li>
                <li><a href="/privacy-policy" className="hover:text-white">{t('footer.privacy')}</a></li>
                <li><a href="/terms-of-service" className="hover:text-white">{t('footer.terms')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('footer.tools')}</h4>
              <ul className="space-y-2">
                <li><a href="/tools/pdf-converter" className="hover:text-white">PDF Converter</a></li>
                <li><a href="/tools/word-counter" className="hover:text-white">Word Counter</a></li>
                <li><a href="/tools/unit-converter" className="hover:text-white">Unit Converter</a></li>
                {/* More tools can be added */}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">{t('footer.follow')}</h4>
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