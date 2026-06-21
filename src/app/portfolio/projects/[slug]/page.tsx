'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';
import { labsData } from '@/data/labs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LabDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { t, lang, toggleLang } = useTranslation();
  const lab = labsData[slug];
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lab) {
      document.title = `Rana | Lab - ${lab.title}`;
    } else {
      document.title = `Rana | Lab Not Found`;
    }
  }, [lab]);

  if (!lab) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-mono p-6">
        <div className="border border-red-500 bg-red-950/20 rounded p-6 max-w-md w-full text-center cyber-glow">
          <h2 className="text-red-400 font-bold mb-4 uppercase tracking-widest">[ERROR] 404: LAB_NOT_FOUND</h2>
          <p className="text-xs text-slate-400 mb-6">
            The requested security laboratory environment is either currently undergoing maintenance or does not exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 text-xs font-bold px-5 py-2 rounded transition-all"
          >
            &laquo; Return to Console Home
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

      {/* Main Content Body */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 md:py-10">
        {/* Terminal path simulation */}
        <div className="font-mono text-xs text-slate-500 mb-4 select-none">
          guest@rana-ops:~$ <span className="text-slate-400">cd ~/projects/{lab.slug}</span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/5 px-2 py-0.5 rounded uppercase tracking-widest inline-block mb-3">
            // {lab.category} Lab environment
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {lab.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {lab.tech.map((tag) => (
              <span
                key={tag}
                className="bg-slate-900 text-slate-300 border border-slate-800 text-[10px] px-2 py-0.5 rounded font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
            {lab.description}
          </p>
        </div>

        {/* Two-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main walkthrough instructions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Objectives */}
            <section className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 cyber-glow">
              <h3 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                01. Objectives & Deliverables
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                {lab.objectives.map((obj, i) => (
                  <li key={i} className="leading-relaxed">{obj}</li>
                ))}
              </ul>
            </section>

            {/* Topology Diagram */}
            <section className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 cyber-glow">
              <h3 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                02. Network Architecture Topology
              </h3>
              <pre className="font-mono text-[10px] leading-normal bg-slate-950 border border-slate-900 p-4 rounded overflow-x-auto text-emerald-400 whitespace-pre">
                {lab.topology.trim()}
              </pre>
            </section>

            {/* Step-by-Step Implementation Runbook */}
            <section className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 cyber-glow">
              <h3 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                03. Step-by-Step Implementation
              </h3>
              <div className="space-y-6">
                {lab.steps.map((step, idx) => (
                  <div key={idx} className="border-l border-slate-800 pl-4 relative">
                    <span className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-cyan-500/25 border border-cyan-500/70 flex items-center justify-center font-mono text-[8px] text-cyan-400">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-2 ml-1">{step.title}</h4>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed ml-1">{step.description}</p>
                    
                    {step.commands && step.commands.length > 0 && (
                      <div className="bg-slate-950 rounded border border-slate-900 p-3 mb-3 relative font-mono text-xs text-slate-300">
                        <button
                          onClick={() => handleCopy(step.commands!.join('\n'), idx)}
                          className="absolute right-2 top-2 text-[10px] text-slate-500 hover:text-cyan-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded"
                        >
                          {copiedIndex === idx ? 'Copied!' : 'Copy'}
                        </button>
                        {step.commands.map((cmd, cIdx) => (
                          <div key={cIdx}>{cmd}</div>
                        ))}
                      </div>
                    )}

                    {step.codeSnippet && (
                      <div className="bg-slate-950 rounded border border-slate-900 p-3 relative font-mono text-xs text-emerald-400 overflow-x-auto">
                        <button
                          onClick={() => handleCopy(step.codeSnippet!, idx + 100)}
                          className="absolute right-2 top-2 text-[10px] text-slate-500 hover:text-cyan-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded"
                        >
                          {copiedIndex === idx + 100 ? 'Copied!' : 'Copy'}
                        </button>
                        <pre className="whitespace-pre">{step.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Panel */}
            <section className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 cyber-glow">
              <h3 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                04. Verification Plan
              </h3>
              <div className="space-y-3">
                {lab.verification.map((vItem, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id={`chk-${i}`}
                      className="mt-0.5 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                    />
                    <label htmlFor={`chk-${i}`} className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                      {vItem}
                    </label>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions Panel */}
            <section className="bg-slate-900/30 border border-slate-800 rounded-lg p-5 cyber-glow font-mono text-xs">
              <h3 className="text-slate-500 uppercase tracking-wider mb-4 block border-b border-slate-800 pb-2">Console Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/portfolio"
                  className="flex items-center justify-between bg-slate-950 hover:bg-slate-900 border border-slate-800 p-2.5 rounded transition-all text-slate-300 hover:text-cyan-400"
                >
                  <span>Launch Operations Terminal</span>
                  <span>&raquo;</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-between bg-slate-950 hover:bg-slate-900 border border-slate-800 p-2.5 rounded transition-all text-slate-300 hover:text-cyan-400"
                >
                  <span>Return to Main Dashboard</span>
                  <span>&raquo;</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-center font-mono text-xs text-slate-500">
        All rights reserved. Secure terminal session active.
      </footer>
    </div>
  );
}
