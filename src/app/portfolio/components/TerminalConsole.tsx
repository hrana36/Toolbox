'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { portfolioData } from '@/data/portfolio';
import { useTranslation } from '@/locales/i18n';

type LogLine = {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
};

export default function TerminalConsole() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputVal, setInputVal] = useState('');
  const [tempDraft, setTempDraft] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([]);

  useEffect(() => {
    setLogs([
      { text: 'Rana-OS [Version 1.0.4]', type: 'success' },
      { text: '', type: 'output' },
      { text: t('portfolio.instructions.body'), type: 'output' },
      { text: '', type: 'output' }
    ]);
  }, []);


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
          { text: '', type: 'output' },
          { text: '  [PORTFOLIO]', type: 'success' },
          { text: '  about          Print professional summary', type: 'output' },
          { text: '  skills         Display EDR and security technical skills', type: 'output' },
          { text: '  experience     List recent job experience audits', type: 'output' },
          { text: '  certifications List verified professional certifications', type: 'output' },
          { text: '  education      Show education credentials', type: 'output' },
          { text: '  contact        Show secure contact details', type: 'output' },
          { text: '  neofetch       Display system profile information', type: 'output' },
          { text: '', type: 'output' },
          { text: '  [DEV & DESIGN]', type: 'success' },
          { text: '  qr             QR Code Generator', type: 'output' },
          { text: '  json           JSON Formatter & Validator', type: 'output' },
          { text: '  color          Color Picker & Palette', type: 'output' },
          { text: '  diff           Text Diff Checker', type: 'output' },
          { text: '  lorem          Lorem Ipsum Generator', type: 'output' },
          { text: '  base64         Base64 Encoder/Decoder', type: 'output' },
          { text: '  unicode        Unicode Converter', type: 'output' },
          { text: '', type: 'output' },
          { text: '  [CALCULATORS]', type: 'success' },
          { text: '  gpa            GPA Calculator', type: 'output' },
          { text: '  emi            EMI/Loan Calculator', type: 'output' },
          { text: '  percentage     Percentage Calculator', type: 'output' },
          { text: '  land           Land Unit Converter', type: 'output' },
          { text: '  calculator     Scientific Calculator', type: 'output' },
          { text: '  age            Age Calculator', type: 'output' },
          { text: '', type: 'output' },
          { text: '  [MEDIA & HELPERS]', type: 'success' },
          { text: '  youtube        YouTube Thumbnail Grabber', type: 'output' },
          { text: '  videodl        Video Downloader', type: 'output' },
          { text: '  wordcount      Word & Character Counter', type: 'output' },
          { text: '  textcase       Text Case Converter', type: 'output' },
          { text: '  resize         Image Resizer', type: 'output' },
          { text: '', type: 'output' },
          { text: '  [PDF TOOLS]', type: 'success' },
          { text: '  wordtopdf      Word to PDF Converter', type: 'output' },
          { text: '  jpgtopdf       JPG to PDF Converter', type: 'output' },
          { text: '  mergepdf       Merge PDF Files', type: 'output' },
          { text: '  splitpdf       Split PDF Pages', type: 'output' },
          { text: '  organize       Organize PDF Pages', type: 'output' },
          { text: '', type: 'output' },
          { text: '  [SECURITY]', type: 'success' },
          { text: '  ip             IP Address Lookup', type: 'output' },
          { text: '  dns            DNS Record Lookup', type: 'output' },
          { text: '  password       Password Generator', type: 'output' },
          { text: '  hash           Hash Generator', type: 'output' },
          { text: '  ssl            SSL/TLS Certificate Inspector', type: 'output' },
          { text: '', type: 'output' },
          { text: '  [SYSTEM]', type: 'success' },
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
            { text: `  SHA-256 Validation Hash: [OK] ${Math.random().toString(16).slice(2, 18)}...`, type: 'output' }
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
      case 'neofetch': {
        // Detect OS from userAgent
        const ua = navigator.userAgent;
        let os = 'Unknown OS';
        if (ua.includes('Windows NT 10')) os = 'Windows 10/11 x86_64';
        else if (ua.includes('Windows NT')) os = 'Windows x86_64';
        else if (ua.includes('Mac OS X')) { const v = ua.match(/Mac OS X ([\d_]+)/); os = `macOS ${v ? v[1].replace(/_/g, '.') : ''} arm64`; }
        else if (ua.includes('Android')) { const v = ua.match(/Android ([\d.]+)/); os = `Android ${v ? v[1] : ''}`; }
        else if (ua.includes('iPhone') || ua.includes('iPad')) { const v = ua.match(/OS ([\d_]+)/); os = `iOS ${v ? v[1].replace(/_/g, '.') : ''}`; }
        else if (ua.includes('Linux')) os = 'Linux x86_64';
        else if (ua.includes('CrOS')) os = 'ChromeOS';

        // Detect browser
        let browser = 'Unknown';
        if (ua.includes('Edg/')) { const v = ua.match(/Edg\/([\d.]+)/); browser = `Edge ${v ? v[1] : ''}`; }
        else if (ua.includes('Chrome/')) { const v = ua.match(/Chrome\/([\d.]+)/); browser = `Chrome ${v ? v[1] : ''}`; }
        else if (ua.includes('Firefox/')) { const v = ua.match(/Firefox\/([\d.]+)/); browser = `Firefox ${v ? v[1] : ''}`; }
        else if (ua.includes('Safari/') && !ua.includes('Chrome')) { const v = ua.match(/Version\/([\d.]+)/); browser = `Safari ${v ? v[1] : ''}`; }

        // Screen
        const resolution = `${screen.width}x${screen.height}`;
        const colorDepth = `${screen.colorDepth}-bit`;

        // Hardware
        const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : 'N/A';
        const ram = (navigator as any).deviceMemory ? `~${(navigator as any).deviceMemory} GB` : 'N/A';

        // Locale & timezone
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
        const lang = navigator.language || 'en-US';

        // Connection
        const conn = (navigator as any).connection;
        const network = conn ? `${conn.effectiveType?.toUpperCase() || 'Unknown'}${conn.downlink ? ` (${conn.downlink} Mbps)` : ''}` : 'N/A';

        // Uptime (time since page load)
        const uptimeSec = Math.floor(performance.now() / 1000);
        const uptimeMin = Math.floor(uptimeSec / 60);
        const uptimeStr = uptimeMin > 0 ? `${uptimeMin}m ${uptimeSec % 60}s` : `${uptimeSec}s`;

        newLogs.push(
          { text: '      .---.          guest@rana-ops', type: 'success' },
          { text: '     /     \\         --------------', type: 'success' },
          { text: `     \\_.._/          OS: ${os}`, type: 'output' },
          { text: `     .-----.         Browser: ${browser}`, type: 'output' },
          { text: `    /       \\        Resolution: ${resolution} (${colorDepth})`, type: 'output' },
          { text: `    \\_.._.._/        CPU: ${cores} | RAM: ${ram}`, type: 'output' },
          { text: `      \`---\`          Network: ${network}`, type: 'output' },
          { text: `                     Timezone: ${tz}`, type: 'output' },
          { text: `                     Language: ${lang}`, type: 'output' },
          { text: `                     Session: ${uptimeStr}`, type: 'output' }
        );
        break;
      }
      // Dev & Design tools
      case 'qr':
        newLogs.push({ text: 'Launching QR Generator...', type: 'success' });
        window.open('/toolbox?tab=dev_tools&sub=qr', '_self');
        break;
      case 'json':
        newLogs.push({ text: 'Launching JSON Formatter...', type: 'success' });
        window.open('/toolbox?tab=dev_tools&sub=json', '_self');
        break;
      case 'color':
        newLogs.push({ text: 'Launching Color Picker...', type: 'success' });
        window.open('/toolbox?tab=dev_tools&sub=color', '_self');
        break;
      case 'diff':
        newLogs.push({ text: 'Launching Diff Checker...', type: 'success' });
        window.open('/toolbox?tab=dev_tools&sub=diff', '_self');
        break;
      case 'lorem':
        newLogs.push({ text: 'Launching Lorem Ipsum Generator...', type: 'success' });
        window.open('/toolbox?tab=dev_tools&sub=lorem', '_self');
        break;
      case 'base64':
        newLogs.push({ text: 'Launching Base64 Encoder...', type: 'success' });
        window.open('/toolbox?tab=dev_tools&sub=base64', '_self');
        break;
      case 'unicode':
        newLogs.push({ text: 'Launching Unicode Converter...', type: 'success' });
        window.open('/toolbox?tab=dev_tools&sub=unicode', '_self');
        break;
      // Calculator tools
      case 'gpa':
        newLogs.push({ text: 'Launching GPA Calculator...', type: 'success' });
        window.open('/toolbox?tab=math&sub=gpa', '_self');
        break;
      case 'emi':
        newLogs.push({ text: 'Launching EMI Calculator...', type: 'success' });
        window.open('/toolbox?tab=math&sub=emi', '_self');
        break;
      case 'percentage':
        newLogs.push({ text: 'Launching Percentage Calculator...', type: 'success' });
        window.open('/toolbox?tab=math&sub=pct', '_self');
        break;
      case 'land':
        newLogs.push({ text: 'Launching Land Unit Converter...', type: 'success' });
        window.open('/toolbox?tab=math&sub=land', '_self');
        break;
      case 'calculator':
        newLogs.push({ text: 'Launching Scientific Calculator...', type: 'success' });
        window.open('/toolbox?tab=math&sub=sci_calc', '_self');
        break;
      case 'age':
        newLogs.push({ text: 'Launching Age Calculator...', type: 'success' });
        window.open('/toolbox?tab=math&sub=age', '_self');
        break;
      // Media & Helper tools
      case 'youtube':
        newLogs.push({ text: 'Launching YouTube Thumbnail Grabber...', type: 'success' });
        window.open('/toolbox?tab=helpers&sub=yt', '_self');
        break;
      case 'videodl':
        newLogs.push({ text: 'Launching Video Downloader...', type: 'success' });
        window.open('/toolbox?tab=helpers&sub=video_dl', '_self');
        break;
      case 'wordcount':
        newLogs.push({ text: 'Launching Word Counter...', type: 'success' });
        window.open('/toolbox?tab=helpers&sub=word', '_self');
        break;
      case 'textcase':
        newLogs.push({ text: 'Launching Text Case Converter...', type: 'success' });
        window.open('/toolbox?tab=helpers&sub=case', '_self');
        break;
      case 'resize':
        newLogs.push({ text: 'Launching Image Resizer...', type: 'success' });
        window.open('/toolbox?tab=helpers&sub=resize', '_self');
        break;
      // PDF tools
      case 'wordtopdf':
        newLogs.push({ text: 'Launching Word to PDF...', type: 'success' });
        window.open('/toolbox?tab=pdf&sub=word_to_pdf', '_self');
        break;
      case 'jpgtopdf':
        newLogs.push({ text: 'Launching JPG to PDF...', type: 'success' });
        window.open('/toolbox?tab=pdf&sub=jpg_to_pdf', '_self');
        break;
      case 'mergepdf':
        newLogs.push({ text: 'Launching PDF Merge...', type: 'success' });
        window.open('/toolbox?tab=pdf&sub=merge', '_self');
        break;
      case 'splitpdf':
        newLogs.push({ text: 'Launching PDF Splitter...', type: 'success' });
        window.open('/toolbox?tab=pdf&sub=split', '_self');
        break;
      case 'organize':
        newLogs.push({ text: 'Launching PDF Organizer...', type: 'success' });
        window.open('/toolbox?tab=pdf&sub=organize', '_self');
        break;
      // Security tools
      case 'ip':
        newLogs.push({ text: 'Launching IP Lookup...', type: 'success' });
        window.open('/toolbox?tab=security&sub=ip', '_self');
        break;
      case 'dns':
        newLogs.push({ text: 'Launching DNS Lookup...', type: 'success' });
        window.open('/toolbox?tab=security&sub=dns', '_self');
        break;
      case 'password':
        newLogs.push({ text: 'Launching Password Generator...', type: 'success' });
        window.open('/toolbox?tab=security&sub=pwd', '_self');
        break;
      case 'hash':
        newLogs.push({ text: 'Launching Hash Generator...', type: 'success' });
        window.open('/toolbox?tab=security&sub=hash', '_self');
        break;
      case 'ssl':
        newLogs.push({ text: 'Launching SSL/TLS Inspector...', type: 'success' });
        window.open('/toolbox?tab=security&sub=ssl', '_self');
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
          aria-label="Terminal Command Input"
        />
      </div>
    </div>
  );
}
