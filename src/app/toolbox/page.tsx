'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';
import { unicodeToBijoy, bijoyToUnicode } from '@/utils/banglaConverter';

export default function Toolbox() {
  const { t, lang, toggleLang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'bd' | 'dev_tools' | 'math' | 'helpers' | 'net' | 'pdf'>('bd');
  
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
  
  // BD Essentials States
  const [bdSubTab, setBdSubTab] = useState<'unicode' | 'age' | 'resize'>('unicode');
  const [unicodeInput, setUnicodeInput] = useState('');
  const [unicodeOutput, setUnicodeOutput] = useState('');
  const [ageDob, setAgeDob] = useState('');
  const [ageTargetDate, setAgeTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [ageResult, setAgeResult] = useState('');
  const [resizeImgFile, setResizeImgFile] = useState<File | null>(null);
  const [resizeStatus, setResizeStatus] = useState('');

  // Developer & Design States
  const [devSubTab, setDevSubTab] = useState<'base64' | 'json' | 'color' | 'diff' | 'lorem' | 'qr'>('json');
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [colorInput, setColorInput] = useState('#22d3ee');
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [diffA, setDiffA] = useState('');
  const [diffB, setDiffB] = useState('');
  const [loremParas, setLoremParas] = useState(3);
  const [loremLang, setLoremLang] = useState<'en' | 'bn'>('en');
  const [loremOutput, setLoremOutput] = useState('');
  const [qrInput, setQrInput] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Math & Calculator States
  const [mathSubTab, setMathSubTab] = useState<'gpa' | 'emi' | 'pct' | 'land'>('gpa');
  const [gpaCourses, setGpaCourses] = useState<{ credit: number; grade: number }[]>([
    { credit: 3, grade: 4.0 },
    { credit: 3, grade: 3.75 }
  ]);
  const [gpaResult, setGpaResult] = useState('');
  const [emiPrincipal, setEmiPrincipal] = useState('1000000');
  const [emiRate, setEmiRate] = useState('9');
  const [emiTenure, setEmiTenure] = useState('120'); // months
  const [emiResult, setEmiResult] = useState<any>(null);
  const [pctValA, setPctValA] = useState('20');
  const [pctValB, setPctValB] = useState('500');
  const [pctResult, setPctResult] = useState('');
  const [landVal, setLandVal] = useState('1');
  const [landFrom, setLandFrom] = useState('decimal');
  const [landTo, setLandTo] = useState('katha');
  const [landResult, setLandResult] = useState('');

  // Media & Text Helpers States
  const [helperSubTab, setHelperSubTab] = useState<'yt' | 'word' | 'case'>('yt');
  const [ytUrl, setYtUrl] = useState('');
  const [ytThumbnails, setYtThumbnails] = useState<any>(null);
  const [caseInput, setCaseInput] = useState('');
  
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

  // BD Essentials Handlers
  const handleUnicodeToBijoy = () => {
    setUnicodeOutput(unicodeToBijoy(unicodeInput));
  };

  const handleBijoyToUnicode = () => {
    setUnicodeOutput(bijoyToUnicode(unicodeInput));
  };

  const handleCalculateAge = () => {
    if (!ageDob) return;
    const birthDate = new Date(ageDob);
    const targetDate = new Date(ageTargetDate);
    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAgeResult(
      lang === 'en'
        ? `Age: ${years} Years, ${months} Months, ${days} Days`
        : `বয়স: ${years} বছর, ${months} মাস, ${days} দিন`
    );
  };

  const handleResizeImage = (mode: 'photo' | 'sig') => {
    if (!resizeImgFile) return;
    setResizeStatus(lang === 'en' ? 'Resizing...' : 'রিসাইজ করা হচ্ছে...');
    const reader = new FileReader();
    reader.readAsDataURL(resizeImgFile);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const targetW = mode === 'photo' ? 300 : 300;
        const targetH = mode === 'photo' ? 300 : 80;
        canvas.width = targetW;
        canvas.height = targetH;
        ctx?.drawImage(img, 0, 0, targetW, targetH);
        
        const maxBytes = mode === 'photo' ? 100 * 1024 : 60 * 1024;
        let quality = 0.9;
        
        const compress = () => {
          canvas.toBlob((blob) => {
            if (blob) {
              if (blob.size > maxBytes && quality > 0.1) {
                quality -= 0.05;
                compress();
              } else {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = mode === 'photo' ? 'job_photo_300x300.jpg' : 'job_signature_300x80.jpg';
                link.click();
                setResizeStatus(
                  lang === 'en'
                    ? `Success! File size: ${(blob.size / 1024).toFixed(1)} KB`
                    : `সফল হয়েছে! ফাইল সাইজ: ${(blob.size / 1024).toFixed(1)} KB`
                );
              }
            }
          }, 'image/jpeg', quality);
        };
        compress();
      };
    };
  };

  // Developer Handlers
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (e: any) {
      setJsonError(e.message || 'Invalid JSON syntax');
      setJsonOutput('');
    }
  };

  const handleValidateJson = () => {
    try {
      JSON.parse(jsonInput);
      setJsonError('');
      setJsonOutput(lang === 'en' ? '✓ Valid JSON' : '✓ সঠিক জেসন (JSON)');
    } catch (e: any) {
      setJsonError(e.message || 'Invalid JSON syntax');
      setJsonOutput('');
    }
  };

  const generateColorPalette = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    const variations = [
      hex,
      `#${Math.min(255, r + 30).toString(16).padStart(2, '0')}${Math.min(255, g + 30).toString(16).padStart(2, '0')}${Math.min(255, b + 30).toString(16).padStart(2, '0')}`,
      `#${Math.max(0, r - 30).toString(16).padStart(2, '0')}${Math.max(0, g - 30).toString(16).padStart(2, '0')}${Math.max(0, b - 30).toString(16).padStart(2, '0')}`,
      `#${(255 - r).toString(16).padStart(2, '0')}${(255 - g).toString(16).padStart(2, '0')}${(255 - b).toString(16).padStart(2, '0')}` // Inverted
    ];
    setColorPalette(variations);
  };

  const handleCompareDiff = () => {
    const linesA = diffA.split('\n');
    const linesB = diffB.split('\n');
    const maxLines = Math.max(linesA.length, linesB.length);
    const diffResult: { type: 'normal' | 'added' | 'removed'; text: string }[] = [];
    for (let i = 0; i < maxLines; i++) {
      const lineA = linesA[i];
      const lineB = linesB[i];
      if (lineA === lineB) {
        diffResult.push({ type: 'normal', text: lineA || '' });
      } else {
        if (lineA !== undefined) diffResult.push({ type: 'removed', text: `- ${lineA}` });
        if (lineB !== undefined) diffResult.push({ type: 'added', text: `+ ${lineB}` });
      }
    }
    return diffResult;
  };

  const handleGenerateLorem = () => {
    const enLorem = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];
    const bnLorem = [
      "বাংলাদেশ একটি স্বাধীন ও সার্বভৌম রাষ্ট্র। এর রাজধানী ঢাকা এবং এটি পৃথিবীর অন্যতম সুন্দর একটি ব-দ্বীপ ও প্রাকৃতিক সম্পদে ভরপুর দেশ।",
      "আমাদের দেশে অনেক পর্যটন স্থান রয়েছে যেমন কক্সবাজার সমুদ্র সৈকত, সুন্দরবন ম্যানগ্রোভ বন এবং সিলেটের মনোরম সবুজ চা বাগান।",
      "কম্পিউটার হলো একটি ইলেকট্রনিক যন্ত্র যা তথ্য প্রক্রিয়াকরণ করতে এবং আমাদের দৈনন্দিন কঠিন কাজকে সহজে সমাধান করতে সাহায্য করে।",
      "পড়াশোনা ও জ্ঞান অর্জন মানুষের জীবনকে সুন্দর ও সফল করে তোলে। আমাদের সবসময় নতুন নতুন বিষয় শেখার চেষ্টা করা উচিত।"
    ];
    const pool = loremLang === 'en' ? enLorem : bnLorem;
    let out = "";
    for (let i = 0; i < loremParas; i++) {
      out += pool[i % pool.length] + "\n\n";
    }
    setLoremOutput(out.trim());
  };

  // Math Handlers
  const calculateGpa = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    gpaCourses.forEach((c) => {
      totalCredits += Number(c.credit);
      totalPoints += Number(c.credit) * Number(c.grade);
    });
    if (totalCredits === 0) {
      setGpaResult('0.00');
    } else {
      setGpaResult((totalPoints / totalCredits).toFixed(2));
    }
  };

  const calculateEmi = () => {
    const p = Number(emiPrincipal);
    const r = Number(emiRate) / 12 / 100;
    const n = Number(emiTenure);
    if (p && r && n) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;
      setEmiResult({
        emi: emi.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    }
  };

  const calculatePercentage = () => {
    const a = Number(pctValA);
    const b = Number(pctValB);
    if (a && b) {
      setPctResult(((a / 100) * b).toFixed(2));
    }
  };

  const calculateLandConversion = () => {
    const val = Number(landVal);
    if (!val) return;
    let sqft = 0;
    if (landFrom === 'decimal') sqft = val * 435.6;
    else if (landFrom === 'katha') sqft = val * 1.65 * 435.6;
    else if (landFrom === 'bigha') sqft = val * 33 * 435.6;
    else if (landFrom === 'acre') sqft = val * 100 * 435.6;
    else if (landFrom === 'sqft') sqft = val;

    let out = 0;
    if (landTo === 'decimal') out = sqft / 435.6;
    else if (landTo === 'katha') out = sqft / (1.65 * 435.6);
    else if (landTo === 'bigha') out = sqft / (33 * 435.6);
    else if (landTo === 'acre') out = sqft / (100 * 435.6);
    else if (landTo === 'sqft') out = sqft;

    setLandResult(out.toFixed(3));
  };

  // Helpers Handlers
  const handleGetYtThumbnails = () => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = ytUrl.match(regExp);
    if (match && match[2].length === 11) {
      const videoId = match[2];
      setYtThumbnails({
        max: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
      });
    } else {
      setYtThumbnails(null);
    }
  };

  const getWordCount = (text: string) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  const getReadTime = (text: string) => {
    const wCount = getWordCount(text);
    return Math.max(1, Math.ceil(wCount / 200)); // 200 words per minute average
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
        <div className="flex flex-wrap border-b border-slate-900 mb-6 font-mono text-xs gap-1">
          <button
            onClick={() => setActiveTab('bd')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'bd'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.bd').toUpperCase()}
          </button>
          <button
            onClick={() => setActiveTab('dev_tools')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'dev_tools'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.dev_tools').toUpperCase()}
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'math'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.math').toUpperCase()}
          </button>
          <button
            onClick={() => setActiveTab('helpers')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'helpers'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.helpers').toUpperCase()}
          </button>
          <button
            onClick={() => setActiveTab('net')}
            className={`px-4 py-2 border-b-2 transition-all ${
              activeTab === 'net'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.net').toUpperCase()}
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
          {activeTab === 'bd' && (
            <div className="space-y-6">
              <div className="flex space-x-2 border-b border-slate-900 pb-2">
                <button
                  onClick={() => { setBdSubTab('unicode'); setUnicodeInput(''); setUnicodeOutput(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${bdSubTab === 'unicode' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('bd.sub_unicode')}
                </button>
                <button
                  onClick={() => { setBdSubTab('age'); setAgeResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${bdSubTab === 'age' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('bd.sub_age')}
                </button>
                <button
                  onClick={() => { setBdSubTab('resize'); setResizeImgFile(null); setResizeStatus(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${bdSubTab === 'resize' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('bd.sub_resize')}
                </button>
              </div>

              {bdSubTab === 'unicode' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">INPUT TEXT (ইউনিকোড বা বিজয়)</label>
                    <textarea
                      value={unicodeInput}
                      onChange={(e) => setUnicodeInput(e.target.value)}
                      placeholder="এখানে টেক্সট লিখুন..."
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[100px] font-mono"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleUnicodeToBijoy}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      {t('bd.btn_convert_bijoy')}
                    </button>
                    <button
                      onClick={handleBijoyToUnicode}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      {t('bd.btn_convert_unicode')}
                    </button>
                  </div>
                  {unicodeOutput && (
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs break-all">
                      <div className="text-slate-500 mb-1">// RESULT CONVERSION</div>
                      <div className="text-slate-200">{unicodeOutput}</div>
                    </div>
                  )}
                </div>
              )}

              {bdSubTab === 'age' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">{t('bd.label_dob')}</label>
                      <input
                        type="date"
                        value={ageDob}
                        onChange={(e) => setAgeDob(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/50 font-mono"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">{t('bd.label_target_date')}</label>
                      <input
                        type="date"
                        value={ageTargetDate}
                        onChange={(e) => setAgeTargetDate(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/50 font-mono"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCalculateAge}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2 rounded transition-all w-full"
                  >
                    {t('bd.btn_calc_age')}
                  </button>
                  {ageResult && (
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded text-center text-sm font-mono text-cyan-400">
                      {ageResult}
                    </div>
                  )}
                </div>
              )}

              {bdSubTab === 'resize' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">{t('bd.label_upload_img')}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setResizeImgFile(e.target.files[0]);
                          setResizeStatus('');
                        }
                      }}
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-300 font-mono"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      disabled={!resizeImgFile}
                      onClick={() => handleResizeImage('photo')}
                      className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 disabled:hover:bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-4 py-2.5 rounded transition-all"
                    >
                      {t('bd.btn_resize_photo')}
                    </button>
                    <button
                      disabled={!resizeImgFile}
                      onClick={() => handleResizeImage('sig')}
                      className="flex-1 bg-slate-900 hover:bg-slate-850 disabled:opacity-40 disabled:hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2.5 rounded transition-all"
                    >
                      {t('bd.btn_resize_sig')}
                    </button>
                  </div>
                  {resizeStatus && (
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded text-center text-xs font-mono text-slate-300">
                      {resizeStatus}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'dev_tools' && (
            <div className="space-y-6">
              <div className="flex flex-wrap space-x-2 border-b border-slate-900 pb-2 gap-y-1">
                <button
                  onClick={() => { setDevSubTab('json'); setJsonInput(''); setJsonOutput(''); setJsonError(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${devSubTab === 'json' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  JSON FORMATTER
                </button>
                <button
                  onClick={() => { setDevSubTab('color'); setColorPalette([]); }}
                  className={`px-3 py-1 text-xs font-mono border ${devSubTab === 'color' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  COLOR PICKER
                </button>
                <button
                  onClick={() => { setDevSubTab('diff'); setDiffA(''); setDiffB(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${devSubTab === 'diff' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  DIFF CHECKER
                </button>
                <button
                  onClick={() => { setDevSubTab('lorem'); setLoremOutput(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${devSubTab === 'lorem' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  LOREM IPSUM
                </button>
                <button
                  onClick={() => { setDevSubTab('qr'); setQrInput(''); setQrCodeUrl(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${devSubTab === 'qr' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  QR GENERATOR
                </button>
                <button
                  onClick={() => { setDevSubTab('base64'); setTextInput(''); setTextResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${devSubTab === 'base64' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  BASE64
                </button>
              </div>

              {devSubTab === 'json' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">JSON PAYLOAD</label>
                    <textarea
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder='{"key": "value"}'
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[100px] font-mono"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleFormatJson}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      {t('dev_tools.btn_format_json')}
                    </button>
                    <button
                      onClick={handleValidateJson}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      {t('dev_tools.btn_validate_json')}
                    </button>
                  </div>
                  {jsonError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded text-xs font-mono">
                      ⚠ {jsonError}
                    </div>
                  )}
                  {jsonOutput && (
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs whitespace-pre overflow-x-auto text-slate-200">
                      {jsonOutput}
                    </div>
                  )}
                </div>
              )}

              {devSubTab === 'color' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={colorInput}
                      onChange={(e) => {
                        setColorInput(e.target.value);
                        generateColorPalette(e.target.value);
                      }}
                      className="w-12 h-12 rounded border border-slate-800 bg-slate-950 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => {
                        setColorInput(e.target.value);
                        generateColorPalette(e.target.value);
                      }}
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/50 font-mono"
                    />
                  </div>
                  {colorPalette.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {colorPalette.map((col, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-2">
                          <div
                            className="w-full h-20 rounded border border-slate-800 shadow"
                            style={{ backgroundColor: col }}
                          ></div>
                          <span
                            onClick={() => {
                              navigator.clipboard.writeText(col);
                            }}
                            className="text-xs font-mono text-slate-400 hover:text-cyan-400 cursor-pointer"
                          >
                            {col} 📋
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {devSubTab === 'diff' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">TEXT A</label>
                      <textarea
                        value={diffA}
                        onChange={(e) => setDiffA(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[120px] font-mono"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">TEXT B</label>
                      <textarea
                        value={diffB}
                        onChange={(e) => setDiffB(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[120px] font-mono"
                      />
                    </div>
                  </div>
                  {diffA || diffB ? (
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs space-y-1 overflow-x-auto">
                      <div className="text-slate-500 mb-2">// DIFF OUTPUT</div>
                      {handleCompareDiff().map((line, idx) => (
                        <div
                          key={idx}
                          className={`${
                            line.type === 'added'
                              ? 'text-emerald-400 bg-emerald-500/10 px-1'
                              : line.type === 'removed'
                              ? 'text-red-400 bg-red-500/10 px-1'
                              : 'text-slate-400'
                          }`}
                        >
                          {line.text}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}

              {devSubTab === 'lorem' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">PARAGRAPHS</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={loremParas}
                        onChange={(e) => setLoremParas(Number(e.target.value))}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 w-24 focus:outline-none focus:border-cyan-400/50 font-mono"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">LANGUAGE</label>
                      <div className="flex border border-slate-800 rounded overflow-hidden">
                        <button
                          onClick={() => setLoremLang('en')}
                          className={`px-3 py-2 text-xs font-mono ${loremLang === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
                        >
                          ENGLISH
                        </button>
                        <button
                          onClick={() => setLoremLang('bn')}
                          className={`px-3 py-2 text-xs font-mono ${loremLang === 'bn' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
                        >
                          বাংলা
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleGenerateLorem}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all mt-5"
                    >
                      {t('dev_tools.btn_gen_lorem')}
                    </button>
                  </div>
                  {loremOutput && (
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                      {loremOutput}
                    </div>
                  )}
                </div>
              )}

              {devSubTab === 'qr' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">QR INPUT (TEXT OR URL)</label>
                    <input
                      type="text"
                      value={qrInput}
                      onChange={(e) => {
                        setQrInput(e.target.value);
                        if (e.target.value) {
                          setQrCodeUrl(`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(e.target.value)}`);
                        } else {
                          setQrCodeUrl('');
                        }
                      }}
                      placeholder="https://example.com"
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono"
                    />
                  </div>
                  {qrCodeUrl && (
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 border border-slate-850 rounded mt-4">
                      <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 border-4 border-slate-900 bg-white p-2 rounded" />
                      <a
                        href={qrCodeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 mt-3"
                      >
                        OPEN QR IMAGE 🡵
                      </a>
                    </div>
                  )}
                </div>
              )}

              {devSubTab === 'base64' && (
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
            </div>
          )}

          {activeTab === 'math' && (
            <div className="space-y-6">
              <div className="flex space-x-2 border-b border-slate-900 pb-2">
                <button
                  onClick={() => { setMathSubTab('gpa'); setGpaResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${mathSubTab === 'gpa' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('math.sub_gpa')}
                </button>
                <button
                  onClick={() => { setMathSubTab('emi'); setEmiResult(null); }}
                  className={`px-3 py-1 text-xs font-mono border ${mathSubTab === 'emi' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('math.sub_emi')}
                </button>
                <button
                  onClick={() => { setMathSubTab('pct'); setPctResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${mathSubTab === 'pct' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('math.sub_pct')}
                </button>
                <button
                  onClick={() => { setMathSubTab('land'); setLandResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${mathSubTab === 'land' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('math.sub_land')}
                </button>
              </div>

              {mathSubTab === 'gpa' && (
                <div className="space-y-4">
                  {gpaCourses.map((c, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="flex-1 flex flex-col space-y-1">
                        <label className="text-xs font-mono text-slate-500">CREDIT</label>
                        <input
                          type="number"
                          value={c.credit}
                          onChange={(e) => {
                            const newCourses = [...gpaCourses];
                            newCourses[idx].credit = Number(e.target.value);
                            setGpaCourses(newCourses);
                          }}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-100 font-mono"
                        />
                      </div>
                      <div className="flex-1 flex flex-col space-y-1">
                        <label className="text-xs font-mono text-slate-500">GRADE POINT (4.00 max)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={c.grade}
                          onChange={(e) => {
                            const newCourses = [...gpaCourses];
                            newCourses[idx].grade = Number(e.target.value);
                            setGpaCourses(newCourses);
                          }}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-100 font-mono"
                        />
                      </div>
                      <button
                        onClick={() => setGpaCourses(gpaCourses.filter((_, i) => i !== idx))}
                        className="text-red-500 font-bold px-2 hover:text-red-400 mt-5"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setGpaCourses([...gpaCourses, { credit: 3, grade: 4.0 }])}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      + ADD COURSE
                    </button>
                    <button
                      onClick={calculateGpa}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2 rounded transition-all"
                    >
                      {t('math.btn_calc')}
                    </button>
                  </div>
                  {gpaResult && (
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded text-center text-sm font-mono text-cyan-400">
                      Calculated GPA/CGPA: {gpaResult}
                    </div>
                  )}
                </div>
              )}

              {mathSubTab === 'emi' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">PRINCIPAL AMOUNT</label>
                      <input
                        type="number"
                        value={emiPrincipal}
                        onChange={(e) => setEmiPrincipal(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 font-mono"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">INTEREST RATE (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={emiRate}
                        onChange={(e) => setEmiRate(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 font-mono"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">TENURE (MONTHS)</label>
                      <input
                        type="number"
                        value={emiTenure}
                        onChange={(e) => setEmiTenure(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 font-mono"
                      />
                    </div>
                  </div>
                  <button
                    onClick={calculateEmi}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full"
                  >
                    {t('math.btn_calc')}
                  </button>
                  {emiResult && (
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-slate-500">MONTHLY EMI</div>
                        <div className="text-cyan-400 text-lg font-bold">BDT {emiResult.emi}</div>
                      </div>
                      <div>
                        <div className="text-slate-500">TOTAL INTEREST</div>
                        <div className="text-slate-300 text-lg font-bold">BDT {emiResult.totalInterest}</div>
                      </div>
                      <div>
                        <div className="text-slate-500">TOTAL REPAYMENT</div>
                        <div className="text-slate-300 text-lg font-bold">BDT {emiResult.totalPayment}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mathSubTab === 'pct' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm font-mono">
                    <span>What is</span>
                    <input
                      type="number"
                      value={pctValA}
                      onChange={(e) => setPctValA(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100 w-20 focus:outline-none"
                    />
                    <span>% of</span>
                    <input
                      type="number"
                      value={pctValB}
                      onChange={(e) => setPctValB(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100 w-24 focus:outline-none"
                    />
                    <button
                      onClick={calculatePercentage}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 px-4 py-1 rounded"
                    >
                      =
                    </button>
                    {pctResult && <span className="text-cyan-400 font-bold">{pctResult}</span>}
                  </div>
                </div>
              )}

              {mathSubTab === 'land' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
                    <input
                      type="number"
                      value={landVal}
                      onChange={(e) => setLandVal(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-100 w-28 focus:outline-none"
                    />
                    <select
                      value={landFrom}
                      onChange={(e) => setLandFrom(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    >
                      <option value="decimal">Decimal (শতক)</option>
                      <option value="katha">Katha (কাঠা)</option>
                      <option value="bigha">Bigha (বিঘা)</option>
                      <option value="acre">Acre (একর)</option>
                      <option value="sqft">Square Feet</option>
                    </select>
                    <span>to</span>
                    <select
                      value={landTo}
                      onChange={(e) => setLandTo(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-300 focus:outline-none"
                    >
                      <option value="decimal">Decimal (শতক)</option>
                      <option value="katha">Katha (কাঠা)</option>
                      <option value="bigha">Bigha (বিঘা)</option>
                      <option value="acre">Acre (একর)</option>
                      <option value="sqft">Square Feet</option>
                    </select>
                    <button
                      onClick={calculateLandConversion}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 px-5 py-1.5 rounded"
                    >
                      CONVERT
                    </button>
                  </div>
                  {landResult && (
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded text-center text-sm font-mono text-cyan-400">
                      Result: {landResult}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'helpers' && (
            <div className="space-y-6">
              <div className="flex space-x-2 border-b border-slate-900 pb-2">
                <button
                  onClick={() => { setHelperSubTab('yt'); setYtThumbnails(null); }}
                  className={`px-3 py-1 text-xs font-mono border ${helperSubTab === 'yt' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('helpers.sub_yt')}
                </button>
                <button
                  onClick={() => { setHelperSubTab('word'); setCaseInput(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${helperSubTab === 'word' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('helpers.sub_count')}
                </button>
                <button
                  onClick={() => { setHelperSubTab('case'); setCaseInput(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${helperSubTab === 'case' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('helpers.sub_case')}
                </button>
              </div>

              {helperSubTab === 'yt' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">YOUTUBE VIDEO URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ytUrl}
                        onChange={(e) => setYtUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono"
                      />
                      <button
                        onClick={handleGetYtThumbnails}
                        className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2 rounded transition-all"
                      >
                        {t('helpers.btn_download')}
                      </button>
                    </div>
                  </div>
                  {ytThumbnails && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {Object.keys(ytThumbnails).map((key) => (
                        <div key={key} className="flex flex-col items-center bg-slate-950 border border-slate-850 p-3 rounded">
                          <img src={ytThumbnails[key]} alt={`${key} quality`} className="w-full aspect-video object-cover rounded border border-slate-900 mb-2" />
                          <a
                            href={ytThumbnails[key]}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
                          >
                            Open {key.toUpperCase()} Quality
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {helperSubTab === 'word' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">INPUT TEXT</label>
                    <textarea
                      value={caseInput}
                      onChange={(e) => setCaseInput(e.target.value)}
                      placeholder="Type or paste content..."
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[120px] font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center font-mono text-xs">
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded">
                      <div className="text-slate-500">WORDS</div>
                      <div className="text-cyan-400 text-lg font-bold mt-1">{getWordCount(caseInput)}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded">
                      <div className="text-slate-500">CHARACTERS</div>
                      <div className="text-cyan-400 text-lg font-bold mt-1">{caseInput.length}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded">
                      <div className="text-slate-500">READING TIME</div>
                      <div className="text-cyan-400 text-lg font-bold mt-1">{getReadTime(caseInput)} MIN</div>
                    </div>
                  </div>
                </div>
              )}

              {helperSubTab === 'case' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">TEXT INPUT</label>
                    <textarea
                      value={caseInput}
                      onChange={(e) => setCaseInput(e.target.value)}
                      placeholder="Type text to convert case..."
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[100px] font-mono"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setCaseInput(caseInput.toUpperCase())}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      UPPERCASE
                    </button>
                    <button
                      onClick={() => setCaseInput(caseInput.toLowerCase())}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      lowercase
                    </button>
                    <button
                      onClick={() => {
                        const title = caseInput.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
                        setCaseInput(title);
                      }}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-2 rounded transition-all"
                    >
                      Title Case
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'net' && (
            <div className="space-y-6">
              {/* Network Tool sub selector */}
              <div className="flex space-x-2 border-b border-slate-900 pb-2">
                <button
                  onClick={() => { setIpInput(''); setIpDetails(null); }}
                  className="px-3 py-1 text-xs font-mono border border-transparent text-slate-400 hover:text-slate-200"
                >
                  {t('net.net') || 'IP LOOKUP'}
                </button>
              </div>

              {/* IP Lookup block */}
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

              {/* DNS Diagnostics block */}
              <div className="space-y-4 pt-4 border-t border-slate-900">
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
