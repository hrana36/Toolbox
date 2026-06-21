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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

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
              <span className={
                post.severity === 'HIGH' 
                  ? 'text-red-400' 
                  : post.severity === 'MEDIUM'
                    ? 'text-yellow-400'
                    : 'text-cyan-400'
              }>{t('blog.severity_label')}: {post.severity}</span>
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
