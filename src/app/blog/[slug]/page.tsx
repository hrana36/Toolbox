'use client';

import { blogPosts } from '@/data/blog';
import { useTranslation } from '@/locales/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { t, lang } = useTranslation();
  const { slug } = params;

  // Find the blog post by slug
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose dark:prose-invert mx-auto">
            <h1 className="mb-6">{post.title[lang as keyof typeof post.title]}</h1>
            <div className="mb-8">
              <p>{post.excerpt[lang as keyof typeof post.excerpt]}</p>
            </div>
            {/* In a real app, we would have the full content here */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                {t('blog.fullContent') || 'Full Content'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('blog.contentPlaceholder') || 'This is where the full blog post content would be displayed. In a real implementation, we would have the complete article with multiple sections, headings, paragraphs, and possibly images.'}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                {t('blog.contentPlaceholder2') || 'For now, this is a placeholder to demonstrate the structure. The actual content would be fetched from a CMS or markdown file.'}
              </p>
            </section>
          </article>
          <div className="mt-12 text-center">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
              {t('blog.backToBlog') || '← Back to Blog'}
            </Link>
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