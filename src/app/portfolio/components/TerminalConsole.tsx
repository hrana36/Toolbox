'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { portfolioData } from '@/data/portfolio';

type LogLine = {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
};

export default function TerminalConsole() {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputVal, setInputVal] = useState('');
  const [tempDraft, setTempDraft] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([
    { text: 'Rana-OS [Version 1.0.4]', type: 'success' },
    { text: 'Type "help" to list available commands.', type: 'output' },
    { text: '', type: 'output' }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Autofocus the terminal input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const processCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) {
      setLogs([...logs, { text: 'guest@rana-ops:~$ ', type: 'input' as const }]);
      setInputVal('');
      setHistoryIndex(-1);
      setTempDraft('');
      return;
    }

    const newLogs = [...logs, { text: `guest@rana-ops:~$ ${cmdStr}`, type: 'input' as const }];
    setHistory([...history, cmdStr]);
    setHistoryIndex(-1);
    setTempDraft('');

    switch (trimmed) {
      case 'clear':
        setLogs([]);
        setInputVal('');
        return;
      case 'help':
        newLogs.push(
          { text: 'Available Commands:', type: 'success' },
          { text: '  about          Print professional summary', type: 'output' },
          { text: '  skills         Display EDR and security technical skills', type: 'output' },
          { text: '  experience     List recent job experience audits', type: 'output' },
          { text: '  certifications List verified professional certifications', type: 'output' },
          { text: '  education      Show education credentials', type: 'output' },
          { text: '  contact        Show secure contact details', type: 'output' },
          { text: '  neofetch       Display system profile information', type: 'output' },
          { text: '  clear          Clear the console log buffer', type: 'output' }
        );
        break;
      case 'about':
        newLogs.push({ text: portfolioData.about.description, type: 'output' });
        break;
      case 'skills':
        newLogs.push({ text: '+----------------------------------+----------------------------------------------------------------------------+', type: 'success' });
        newLogs.push({ text: '| Category                         | Technologies                                                               |', type: 'success' });
        newLogs.push({ text: '+----------------------------------+----------------------------------------------------------------------------+', type: 'success' });
        portfolioData.technicalSkills.categories.forEach((cat) => {
          const catStr = cat.title.padEnd(32);
          const skillStr = cat.skills.join(', ').padEnd(74);
          newLogs.push({ text: `| ${catStr} | ${skillStr} |`, type: 'output' });
        });
        newLogs.push({ text: '+----------------------------------+----------------------------------------------------------------------------+', type: 'success' });
        break;
      case 'experience':
        portfolioData.experience.forEach((exp) => {
          newLogs.push(
            { text: `[AUDIT_LOG] ${exp.period} - ${exp.role.toUpperCase()}`, type: 'success' },
            { text: `Company: ${exp.company} (${exp.location})`, type: 'output' }
          );
          exp.achievements.forEach((ach) => {
            newLogs.push({ text: `  -> ${ach}`, type: 'output' });
          });
          newLogs.push({ text: '', type: 'output' });
        });
        break;
      case 'certifications':
        portfolioData.educationAndCertifications.certifications.forEach((cert) => {
          newLogs.push(
            { text: `✔ Verified: ${cert.name}`, type: 'success' },
            { text: `  Issued: ${cert.date} | Authority: Microsoft/Google`, type: 'output' },
            { text: `  SHA-256 Validation Hash: [OK] ${Math.random().toString(16).substr(2, 16)}...`, type: 'output' }
          );
        });
        break;
      case 'education':
        portfolioData.educationAndCertifications.education.forEach((edu) => {
          newLogs.push(
            { text: `🎓 Degree: ${edu.degree}`, type: 'success' },
            { text: `   Institution: ${edu.institution} (${edu.year})`, type: 'output' },
            { text: edu.cgpa ? `   Result: CGPA ${edu.cgpa}` : `   Result: GPA ${edu.gpa}`, type: 'output' }
          );
        });
        break;
      case 'contact':
        newLogs.push(
          { text: 'Secure Communications Channels:', type: 'success' },
          { text: `  Email:    ${portfolioData.contact.email}`, type: 'output' },
          { text: `  Phone:    ${portfolioData.contact.phone}`, type: 'output' },
          { text: `  LinkedIn: ${portfolioData.contact.linkedin}`, type: 'output' },
          { text: `  GitHub:   ${portfolioData.contact.github}`, type: 'output' }
        );
        break;
      case 'neofetch':
        newLogs.push(
          { text: '      .---.          guest@rana-ops', type: 'success' },
          { text: '     /     \\         --------------', type: 'success' },
          { text: '     \\_.._/          OS: Rana-OS x86_64', type: 'output' },
          { text: '     .-----.         Host: Systems & Security Console', type: 'output' },
          { text: '    /       \\        Kernel: 5.15.0-security', type: 'output' },
          { text: '    \\_.._.._/        Shell: React Interactive Shell', type: 'output' },
          { text: '      `---`          Uptime: Live-Ticking', type: 'output' },
          { text: '                     Location: Dhaka, Bangladesh', type: 'output' },
          { text: `                     Active EDR: SentinelOne, Datto, Bitdefender`, type: 'output' }
        );
        break;
      default:
        newLogs.push({ text: `command not found: ${trimmed}. Type "help" for active directives.`, type: 'error' });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === -1) {
        setTempDraft(inputVal);
      }
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal(tempDraft);
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    }
  };

  return (
    <div 
      onClick={handleContainerClick} 
      className="flex-1 flex flex-col bg-slate-950/80 border border-slate-800 rounded-lg p-4 font-mono text-sm overflow-hidden cyber-glow cursor-text"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 select-none">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-slate-500 text-xs">guest@rana-ops:~</div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 pr-2">
        {logs.map((log, index) => {
          let colorClass = 'text-slate-300';
          if (log.type === 'input') colorClass = 'text-cyan-400 font-semibold';
          if (log.type === 'error') colorClass = 'text-red-400';
          if (log.type === 'success') colorClass = 'text-emerald-400';
          return (
            <div key={index} className={`${colorClass} whitespace-pre-wrap`}>
              {log.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center mt-3 pt-2 border-t border-slate-900 relative">
        <span className="text-cyan-400 font-bold mr-2 select-none">guest@rana-ops:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-slate-100 caret-cyan-400 focus:ring-0 p-0 font-mono"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
