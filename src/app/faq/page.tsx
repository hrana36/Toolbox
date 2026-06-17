'use client';

import { useState } from 'react';
import { useTranslation } from '@/locales/i18n';

export default function FAQ() {
  const { t, lang } = useTranslation();

  const faqItems = [
    {
      question: t('faq.question1') || 'Are files uploaded to the server when using the tools?',
      answer: t('faq.answer1') || 'No, all tools are client-side. Your files never leave your browser, ensuring privacy and security. The only exception is the currency converter, which fetches live exchange rates from a free API.'
    },
    {
      question: t('faq.question2') || 'How do I use the PDF converter tool?',
      answer: t('faq.answer2') || 'Simply upload your JPG, PNG, or WebP images and click \"Convert to PDF\". You can also merge multiple PDFs, split a PDF into multiple files, or extract text from a PDF.'
    },
    {
      question: t('faq.question3') || 'Is the ATS resume checker accurate?',
      answer: t('faq.answer3') || 'The ATS resume checker provides a score based on common criteria that applicant tracking systems look for, such as keyword matching, formatting, and length. While it\'s a helpful guide, actual ATS systems may use different algorithms, so the score is an estimate.'
    },
    {
      question: t('faq.question4') || 'Can I use these tools on my mobile device?',
      answer: t('faq.answer4') || 'Yes, the BD Toolbox is fully responsive and works on all devices, including smartphones and tablets. All tools are designed to be mobile-friendly.'
    },
    {
      question: t('faq.question5') || 'Do I need to create an account to use the tools?',
      answer: t('faq.answer5') || 'No, all tools are available immediately without any registration or account creation. We believe in providing frictionless access to useful utilities.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            <a href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
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
            {t('faq.title') || 'Frequently Asked Questions'}
          </h1>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div
                  onClick={() => toggleItem(index)}
                  className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex-1">
                    {item.question}
                  </h3>
                  <span className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                    {/* Chevron icon */}
                    <span className="inline-block h-4 w-4">{openIndex === index ? '▼' : '▶'}</span>
                  </span>
                </div>
                {openIndex === index && (
                  <div className="px-6 py-4 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
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