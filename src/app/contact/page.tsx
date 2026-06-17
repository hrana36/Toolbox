'use client';

import { useState } from 'react';
import { useTranslation } from '@/locales/i18n';

export default function Contact() {
  const { t, lang } = useTranslation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simple client-side validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setSubmitStatus({ type: 'error', message: t('contact.validationError') || 'Please fill in all required fields.' });
      setIsSubmitting(false);
      return;
    }

    // Here we would normally send the data to a server or use a service like Formspree
    // For now, we'll simulate a successful submission
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success
      setSubmitStatus({ type: 'success', message: t('contact.submitSuccess') || 'Your message has been sent successfully!' });
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: t('contact.submitError') || 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
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
            <a href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.faq')}
            </a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {t('nav.about')}
            </a>
            <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold">
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
            {t('contact.title') || 'Contact Us'}
          </h1>

          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <p className={`${submitStatus.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                {submitStatus.message}
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.name') || 'Full Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder={t('contact.namePlaceholder') || 'Enter your full name'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.email') || 'Email Address'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder={t('contact.emailPlaceholder') || 'Enter your email'}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.subject') || 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder={t('contact.subjectPlaceholder') || 'Enter subject (optional)'}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.message') || 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder={t('contact.messagePlaceholder') || 'Enter your message'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contact.submitting') || 'Sending...' : t('contact.submitButton') || 'Send Message'}
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">
                {t('contact.contactInfo') || 'Contact Information'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-5 w-5">
                    {/* Email icon placeholder */}
                    <span className="text-blue-500">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {t('contact.email') || 'Email'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      hrana36@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-5 w-5">
                    {/* Phone icon placeholder */}
                    <span className="text-green-500">📱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {t('contact.phone') || 'Phone'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +8801621892727
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-5 w-5">
                    {/* Location icon placeholder */}
                    <span className="text-yellow-500">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {t('contact.location') || 'Location'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  {t('contact.socialLinks') || 'Social Links'}
                </h2>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-transparent hover:underline">
                    LinkedIn
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-transparent hover:underline">
                    GitHub
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-transparent hover:underline">
                    Twitter
                  </a>
                </div>
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