'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';
import { blogPosts } from '@/data/blog';

type Params = Promise<{ slug: string }>;

export default function BlogPostPage(props: { params: Params }) {
  const { t, lang, toggleLang } = useTranslation();
  const { slug } = use(props.params);
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `Rana | ${post.title.substring(0, 25)}...`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-mono">
        <span className="text-red-400 text-lg">{t('blog.error_title')}</span>
        <Link href="/blog" className="text-cyan-400 mt-4 hover:underline">&laquo; {t('blog.error_back')}</Link>
      </div>
    );
  }

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog'), active: true },
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
              className={`hover:text-cyan-400 transition-colors ${link.active ? 'text-cyan-400 border-b border-cyan-400' : 'text-slate-400'}`}
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
        <div className="mb-4">
          <Link href="/blog" className="text-cyan-400 hover:underline font-mono text-xs">&laquo; {t('blog.back')}</Link>
        </div>

        <article className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 md:p-6 cyber-glow space-y-4">
          <header className="border-b border-slate-950 pb-3">
            <div className="flex items-center space-x-4 font-mono text-[10px] text-slate-500 mb-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.category}</span>
              <span>•</span>
              <span className="text-red-400">{t('blog.severity_label')}: {post.severity}</span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-white leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
            {post.content}
          </div>
        </article>
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
