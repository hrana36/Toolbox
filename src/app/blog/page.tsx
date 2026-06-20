'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';
import { blogPosts } from '@/data/blog';

export default function Blog() {
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    document.title = t('blog.tab_title');
  }, [lang, t]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog'), active: true },
    { href: '/faq', label: t('nav.faq') },

    { href: '/toolbox', label: t('nav.toolbox') },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-base font-bold tracking-widest text-slate-200">
            RANA
          </span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-mono">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`hover:text-cyan-400 transition-colors flex items-center gap-1 ${link.active ? 'text-cyan-400 border-b border-cyan-400' : 'text-slate-400'}`}
            >
              {link.label}
              {link.href === '/toolbox' && (
                <img src="/hot.png" alt="hot" className="w-4 h-4 object-contain" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold px-4 py-1.5 rounded transition-all shadow-[0_0_12px_rgba(34,211,238,0.4)] hover:shadow-[0_0_18px_rgba(34,211,238,0.6)]"
          >
            Hire Me
          </Link>
          <button 
            onClick={toggleLang} 
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 px-3 py-1.5 rounded transition-all"
          >
            {lang === 'en' ? 'EN' : 'BN'}
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-4 md:py-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold font-mono tracking-wider border-b border-slate-900 pb-2 mb-2 text-white uppercase text-cyber-glow">
          {t('blog.title')}
        </h1>
        <p className="text-slate-400 text-xs mb-4">{t('blog.subtitle')}</p>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <div key={post.slug} className="bg-slate-900/30 border border-slate-800 rounded-lg p-4 md:p-5 cyber-glow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] mb-3">
                  <span className="text-slate-500">{post.date} Â· {post.category}</span>
                  <span className={`px-2 py-0.5 rounded border ${
                    post.severity === 'HIGH' 
                      ? 'bg-red-950/40 border-red-800 text-red-400' 
                      : 'bg-yellow-950/40 border-yellow-800 text-yellow-400'
                  }`}>
                    {t('blog.severity_label')}: {post.severity}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-mono mb-2 hover:text-cyan-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
              </div>
              <div className="text-right">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-mono font-bold hover:underline"
                >
                  {t('blog.read_more')} &raquo;
                </Link>
              </div>
            </div>
          ))}
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
