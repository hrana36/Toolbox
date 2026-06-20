'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';

export default function Toolbox() {
  const { t, lang, toggleLang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'text' | 'ip' | 'dns' | 'pdf'>('text');
  
  // Custom states for BD Toolbox operations
  const [textInput, setTextInput] = useState('');
  const [textResult, setTextResult] = useState('');
  const [ipInput, setIpInput] = useState('');
  const [ipDetails, setIpDetails] = useState<any>(null);
  const [dnsInput, setDnsInput] = useState('');
  const [dnsDetails, setDnsDetails] = useState<any>(null);
  
  // PDF states
  const [pdfSubTab, setPdfSubTab] = useState<'merge' | 'split' | 'jpg_to_pdf'>('merge');
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfPageRange, setPdfPageRange] = useState('');
  const [pdfStatus, setPdfStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [pdfErrorMessage, setPdfErrorMessage] = useState('');
  
  useEffect(() => {
    document.title = lang === 'en' ? 'Rana | Cyber Deck' : 'রানা | সাইবার ডেক';
  }, [lang]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },

    { href: '/toolbox', label: t('nav.toolbox'), active: true },
  ];

  const handleBase64Encode = () => {
    try {
      setTextResult(btoa(unescape(encodeURIComponent(textInput))));
    } catch (e) {
      setTextResult('Error encoding text.');
    }
  };

  const handleBase64Decode = () => {
    try {
      setTextResult(decodeURIComponent(escape(atob(textInput))));
    } catch (e) {
      setTextResult('Error decoding text. Make sure input is valid Base64.');
    }
  };

  const handleIpLookup = async () => {
    if (!ipInput.trim()) return;
    try {
      const res = await fetch(`https://ipapi.co/${ipInput.trim()}/json/`);
      const data = await res.json();
      if (data.error) {
        setIpDetails({ error: true, reason: data.reason });
      } else {
        setIpDetails(data);
      }
    } catch (e) {
      setIpDetails({ error: true, reason: 'Failed to query IP database.' });
    }
  };

  const handleDnsLookup = () => {
    if (!dnsInput.trim()) return;
    // Simulate premium terminal-style DNS query output
    setDnsDetails({
      host: dnsInput.trim(),
      a: ['104.21.32.110', '172.67.140.18'],
      aaaa: ['2606:4700:3030::ac43:8c12', '2606:4700:3036::6815:206e'],
      mx: ['10 mail.protection.outlook.com.'],
      txt: ['v=spf1 include:spf.protection.outlook.com -all', 'google-site-verification=xyz123'],
      ns: ['ns1.cloudflare.com', 'ns2.cloudflare.com']
    });
  };

  const downloadBlob = (bytes: Uint8Array, fileName: string, mimeType: string) => {
    const blob = new Blob([bytes as any], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 100);
  };

  const handleMergePdfs = async () => {
    if (pdfFiles.length < 2) {
      setPdfStatus('error');
      setPdfErrorMessage(lang === 'en' ? 'Please select at least 2 PDF files to merge.' : 'মার্জ করার জন্য অনুগ্রহ করে কমপক্ষে ২টি পিডিএফ ফাইল নির্বাচন করুন।');
      return;
    }
    setPdfStatus('processing');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();
      for (const file of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      downloadBlob(pdfBytes, 'merged_document.pdf', 'application/pdf');
      setPdfStatus('success');
    } catch (e: any) {
      setPdfStatus('error');
      setPdfErrorMessage(e.message || 'Error merging PDFs.');
    }
  };

  const handleSplitPdf = async () => {
    if (pdfFiles.length === 0) {
      setPdfStatus('error');
      setPdfErrorMessage(lang === 'en' ? 'Please select a PDF file to split.' : 'বিভক্ত করার জন্য অনুগ্রহ করে একটি পিডিএফ ফাইল নির্বাচন করুন।');
      return;
    }
    setPdfStatus('processing');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const file = pdfFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();
      
      let pagesToExtract: number[] = [];
      if (!pdfPageRange.trim()) {
        // extract all pages individually
        for (let i = 0; i < totalPages; i++) pagesToExtract.push(i);
      } else {
        const parts = pdfPageRange.split(',');
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.includes('-')) {
            const [start, end] = trimmed.split('-').map(Number);
            if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
              throw new Error(lang === 'en' ? `Invalid range pattern: ${trimmed}` : `ভুল রেঞ্জ ফরম্যাট: ${trimmed}`);
            }
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) pagesToExtract.push(i - 1);
            }
          } else {
            const pageNum = Number(trimmed);
            if (isNaN(pageNum) || pageNum < 1) {
              throw new Error(lang === 'en' ? `Invalid page number: ${trimmed}` : `ভুল পৃষ্ঠা নম্বর: ${trimmed}`);
            }
            if (pageNum >= 1 && pageNum <= totalPages) pagesToExtract.push(pageNum - 1);
          }
        }
      }

      if (pagesToExtract.length === 0) {
        throw new Error(lang === 'en' ? 'No valid pages specified or pages exceed document page count.' : 'কোন সঠিক পৃষ্ঠা নির্দিষ্ট করা হয়নি অথবা পৃষ্ঠা সংখ্যা ডকুমেন্ট ছাড়িয়ে গেছে।');
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));
      const pdfBytes = await newPdf.save();
      
      downloadBlob(pdfBytes, 'split_document.pdf', 'application/pdf');
      setPdfStatus('success');
    } catch (e: any) {
      setPdfStatus('error');
      setPdfErrorMessage(e.message || 'Error splitting PDF.');
    }
  };

  const handleJpgToPdf = async () => {
    if (pdfFiles.length === 0) {
      setPdfStatus('error');
      setPdfErrorMessage(lang === 'en' ? 'Please select at least 1 image file.' : 'অনুগ্রহ করে কমপক্ষে ১টি ইমেজ ফাইল নির্বাচন করুন।');
      return;
    }
    setPdfStatus('processing');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      for (const imgFile of pdfFiles) {
        const arrayBuffer = await imgFile.arrayBuffer();
        let img;
        if (imgFile.type === 'image/png') {
          img = await pdfDoc.embedPng(arrayBuffer);
        } else if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/jpg') {
          img = await pdfDoc.embedJpg(arrayBuffer);
        } else {
          throw new Error(lang === 'en' ? `Unsupported image type: ${imgFile.type}` : `অসমর্থিত ইমেজ ফরম্যাট: ${imgFile.type}`);
        }
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const pdfBytes = await pdfDoc.save();
      downloadBlob(pdfBytes, 'converted_images.pdf', 'application/pdf');
      setPdfStatus('success');
    } catch (e: any) {
      setPdfStatus('error');
      setPdfErrorMessage(e.message || 'Error converting images to PDF.');
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...pdfFiles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setPdfFiles(newFiles);
  };

  const removeFile = (index: number) => {
    setPdfFiles(pdfFiles.filter((_, i) => i !== index));
  };

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

      {/* Main Body Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 md:py-10 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3 font-mono text-cyber-glow">
            {lang === 'en' ? 'CYBER DECK' : 'সাইবার ডেক'}
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            {lang === 'en' 
              ? 'Bilingual local utilities for developers & sysadmins. Perform Base64 encoding/decoding, IP geographical inquiries, and simulate DNS checks locally.'
              : 'ডেভেলপার এবং সিস্টেম অ্যাডমিনদের জন্য দ্বিপাক্ষিক স্থানীয় ইউটিলিটি। বেস৬৪ এনকোডিং/ডিকোডিং, আইপি জিওগ্রাফিক্যাল অনুসন্ধান এবং ডিএনএস সিমুলেশন রান করুন।'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-900 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'text'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'en' ? 'BASE64 CONVERTER' : 'বেস৬৪ কনভার্টার'}
          </button>
          <button
            onClick={() => setActiveTab('ip')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'ip'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'en' ? 'IP LOOKUP' : 'আইপি অনুসন্ধান'}
          </button>
          <button
            onClick={() => setActiveTab('dns')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'dns'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'en' ? 'DNS DIAGNOSTICS' : 'ডিএনএস ডায়াগনস্টিকস'}
          </button>
          <button
            onClick={() => {
              setActiveTab('pdf');
              setPdfFiles([]);
              setPdfStatus('idle');
              setPdfErrorMessage('');
            }}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'pdf'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.pdf').toUpperCase()}
          </button>
        </div>

        {/* Panel Container */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-lg p-6 cyber-glow min-h-[300px]">
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-slate-400">INPUT DATA</label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text payload to process..."
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[100px] font-mono"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBase64Encode}
                  className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-4 py-2 rounded transition-all"
                >
                  ENCODE BASE64
                </button>
                <button
                  onClick={handleBase64Decode}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2 rounded transition-all"
                >
                  DECODE BASE64
                </button>
              </div>
              {textResult && (
                <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs break-all">
                  <div className="text-slate-500 mb-1">// RESULT PAYLOAD</div>
                  <div className="text-slate-200">{textResult}</div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ip' && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-slate-400">TARGET IP ADDRESS</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="e.g. 8.8.8.8 (Leave empty for current IP)"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono"
                  />
                  <button
                    onClick={handleIpLookup}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2 rounded transition-all"
                  >
                    QUERY
                  </button>
                </div>
              </div>

              {ipDetails && (
                <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs">
                  {ipDetails.error ? (
                    <div className="text-red-400">Error: {ipDetails.reason}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                      <div><span className="text-slate-500">IP Node:</span> {ipDetails.ip}</div>
                      <div><span className="text-slate-500">ISP / Network:</span> {ipDetails.org}</div>
                      <div><span className="text-slate-500">Location:</span> {ipDetails.city}, {ipDetails.region}</div>
                      <div><span className="text-slate-500">Country Code:</span> {ipDetails.country_code} ({ipDetails.country_name})</div>
                      <div><span className="text-slate-500">Timezone:</span> {ipDetails.timezone}</div>
                      <div><span className="text-slate-500">Coordinates:</span> Lat: {ipDetails.latitude}, Lon: {ipDetails.longitude}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'dns' && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-mono text-slate-400">DOMAIN NAME</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dnsInput}
                    onChange={(e) => setDnsInput(e.target.value)}
                    placeholder="e.g. google.com"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono"
                  />
                  <button
                    onClick={handleDnsLookup}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2 rounded transition-all"
                  >
                    RESOLVE
                  </button>
                </div>
              </div>

              {dnsDetails && (
                <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs space-y-2">
                  <div className="text-cyan-400">// DIG / NSLOOKUP SIMULATION FOR {dnsDetails.host.toUpperCase()}</div>
                  <div className="grid grid-cols-1 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-500 font-bold block mb-0.5">A RECORDS (IPv4)</span>
                      {dnsDetails.a.map((rec: string) => <div key={rec} className="pl-3">{rec}</div>)}
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block mb-0.5">AAAA RECORDS (IPv6)</span>
                      {dnsDetails.aaaa.map((rec: string) => <div key={rec} className="pl-3">{rec}</div>)}
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block mb-0.5">MX RECORDS</span>
                      {dnsDetails.mx.map((rec: string) => <div key={rec} className="pl-3">{rec}</div>)}
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold block mb-0.5">TXT RECORDS</span>
                      {dnsDetails.txt.map((rec: string) => <div key={rec} className="pl-3">{rec}</div>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-6">
              {/* PDF Subtabs */}
              <div className="flex space-x-2 border-b border-slate-900 pb-2">
                <button
                  onClick={() => { setPdfSubTab('merge'); setPdfFiles([]); setPdfStatus('idle'); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'merge' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_merge')}
                </button>
                <button
                  onClick={() => { setPdfSubTab('split'); setPdfFiles([]); setPdfStatus('idle'); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'split' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_split')}
                </button>
                <button
                  onClick={() => { setPdfSubTab('jpg_to_pdf'); setPdfFiles([]); setPdfStatus('idle'); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'jpg_to_pdf' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_jpg_to_pdf')}
                </button>
              </div>

              <div className="text-sm text-slate-400 italic font-mono">
                // {t('pdf.desc')}
              </div>

              {/* Upload Section */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-mono text-slate-400">
                  {pdfSubTab === 'jpg_to_pdf' ? t('pdf.select_images') : pdfSubTab === 'split' ? t('pdf.select_file') : t('pdf.select_files')}
                </label>
                <input
                  type="file"
                  multiple={pdfSubTab !== 'split'}
                  accept={pdfSubTab === 'jpg_to_pdf' ? 'image/jpeg,image/png,image/jpg' : 'application/pdf'}
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files);
                      if (pdfSubTab === 'split') {
                        setPdfFiles(newFiles.slice(0, 1));
                      } else {
                        setPdfFiles((prev) => [...prev, ...newFiles]);
                      }
                      setPdfStatus('idle');
                    }
                  }}
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-300 font-mono file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:bg-slate-900 file:text-slate-300 file:cursor-pointer hover:file:bg-slate-800"
                />
              </div>

              {/* Page Range input for Split */}
              {pdfSubTab === 'split' && (
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">{t('pdf.label_page_range')}</label>
                  <input
                    type="text"
                    value={pdfPageRange}
                    onChange={(e) => setPdfPageRange(e.target.value)}
                    placeholder={t('pdf.placeholder_page_range')}
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono"
                  />
                </div>
              )}

              {/* Uploaded File List */}
              {pdfFiles.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400">{t('pdf.label_files')}</label>
                  <div className="bg-slate-950/50 border border-slate-900 rounded divide-y divide-slate-900">
                    {pdfFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between px-3 py-2 text-xs font-mono text-slate-300">
                        <span className="truncate max-w-[200px] md:max-w-md">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                        <div className="flex items-center space-x-2">
                          {pdfSubTab !== 'split' && idx > 0 && (
                            <button
                              type="button"
                              onClick={() => moveFile(idx, 'up')}
                              className="text-slate-500 hover:text-cyan-400 px-1"
                            >
                              ▲
                            </button>
                          )}
                          {pdfSubTab !== 'split' && idx < pdfFiles.length - 1 && (
                            <button
                              type="button"
                              onClick={() => moveFile(idx, 'down')}
                              className="text-slate-500 hover:text-cyan-400 px-1"
                            >
                              ▼
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-slate-500 hover:text-red-400 font-bold px-1"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing and Status UI */}
              {pdfStatus !== 'idle' && (
                <div className={`p-3 rounded border font-mono text-xs ${pdfStatus === 'error' ? 'bg-red-500/10 border-red-500/30' : 'bg-cyan-500/10 border-cyan-500/30'}`}>
                  {pdfStatus === 'processing' && (
                    <div className="text-cyan-400 animate-pulse">
                      ⚡ {t('pdf.status_processing')}
                    </div>
                  )}
                  {pdfStatus === 'success' && (
                    <div className="text-emerald-400">
                      ✓ {t('pdf.status_success')}
                    </div>
                  )}
                  {pdfStatus === 'error' && (
                    <div className="text-red-400">
                      ⚠ {t('pdf.status_error')}{pdfErrorMessage}
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <div>
                {pdfSubTab === 'merge' && (
                  <button
                    disabled={pdfStatus === 'processing' || pdfFiles.length < 2}
                    onClick={handleMergePdfs}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 disabled:hover:bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full"
                  >
                    {t('pdf.btn_merge')}
                  </button>
                )}
                {pdfSubTab === 'split' && (
                  <button
                    disabled={pdfStatus === 'processing' || pdfFiles.length === 0}
                    onClick={handleSplitPdf}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 disabled:hover:bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full"
                  >
                    {t('pdf.btn_split')}
                  </button>
                )}
                {pdfSubTab === 'jpg_to_pdf' && (
                  <button
                    disabled={pdfStatus === 'processing' || pdfFiles.length === 0}
                    onClick={handleJpgToPdf}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 disabled:hover:bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full"
                  >
                    {t('pdf.btn_convert')}
                  </button>
                )}
              </div>
            </div>
          )}
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
