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
    { question: t('faq.question5'), answer: t('faq.answer5') },
    { question: t('faq.question1'), answer: t('faq.answer1') },
    { question: t('faq.question7'), answer: t('faq.answer7') },
    { question: t('faq.question6'), answer: t('faq.answer6') },
    { question: t('faq.question3'), answer: t('faq.answer3') },
    { question: t('faq.question2'), answer: t('faq.answer2') },
    { question: t('faq.question8'), answer: t('faq.answer8') },
    { question: t('faq.question9'), answer: t('faq.answer9') },
    { question: t('faq.question10'), answer: t('faq.answer10') },
    { question: t('faq.question4'), answer: t('faq.answer4') }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

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
          <div className="text-slate-500">&copy; {new Date().getFullYear()} RANA. {t('footer.copyright')}</div>
          <div className="flex space-x-6 text-xs">
            <a href="https://www.linkedin.com/in/hrana36/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">LinkedIn</a>
            <a href="https://github.com/hrana36" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">GitHub</a>
            <a href="https://drive.google.com/drive/folders/1B5yzng9PwpBvF2d7s9lpbXqcVRZ3gGPn?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">{t('footer.download_cv')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
