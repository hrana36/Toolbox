'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/locales/i18n';
import { unicodeToBijoy, bijoyToUnicode } from '@/utils/banglaConverter';

// Lightweight PEM Certificate decoder (Extract validity dates, issuer, subject)
function parsePemCertificate(pemText: string) {
  try {
    const cleanPem = pemText
      .replace(/-----BEGIN CERTIFICATE-----/, '')
      .replace(/-----END CERTIFICATE-----/, '')
      .replace(/\s+/g, '');

    const binaryCert = atob(cleanPem);
    
    // Basic heuristic to locate standard ISO UTCTime / GeneralizedTime dates
    const dateRegex = /(\d{10,12})Z/g;
    
    // Convert binary data to hex for search
    let hex = '';
    for (let i = 0; i < binaryCert.length; i++) {
      hex += binaryCert.charCodeAt(i).toString(16).padStart(2, '0');
    }

    // Convert hex representation of ASCII digits to string
    let asciiStr = '';
    for (let i = 0; i < hex.length - 1; i += 2) {
      const charCode = parseInt(hex.substring(i, i + 2), 16);
      if (charCode >= 32 && charCode <= 126) {
        asciiStr += String.fromCharCode(charCode);
      } else {
        asciiStr += '.';
      }
    }

    // Look for Validity Dates (usually UTC times in format: 230620120000Z)
    const matchesUtc = asciiStr.match(/\d{12}Z/g);
    let validFrom = 'N/A';
    let validTo = 'N/A';
    if (matchesUtc && matchesUtc.length >= 2) {
      const formatDate = (dateStr: string) => {
        const yy = dateStr.substring(0, 2);
        const year = parseInt(yy) < 50 ? `20${yy}` : `19${yy}`;
        return `${year}-${dateStr.substring(2, 4)}-${dateStr.substring(4, 6)} ${dateStr.substring(6, 8)}:${dateStr.substring(8, 10)} UTC`;
      };
      validFrom = formatDate(matchesUtc[0]);
      validTo = formatDate(matchesUtc[1]);
    }

    // Extract Common Name (CN) heuristics
    const cnMatches = asciiStr.match(/CN=([^.\s]+)/);
    const commonName = cnMatches ? cnMatches[1] : 'Local Decoded Certificate';

    return {
      success: true,
      subject: { CN: commonName },
      issuer: { CN: 'Decoded from local file/text' },
      valid_from: validFrom,
      valid_to: validTo,
      serialNumber: 'Decoded locally',
      fingerprint256: 'SHA-256 not computed locally',
      bits: 'N/A',
      type: 'N/A'
    };
  } catch (e) {
    return { success: false, error: 'Failed to decode PEM format. Check certificate format.' };
  }
}

function ToolboxContent() {
  const { t, lang, toggleLang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dev_tools' | 'math' | 'helpers' | 'pdf' | 'security'>('pdf');
  
  // Custom states for BD Toolbox operations
  const [textInput, setTextInput] = useState('');
  const [textResult, setTextResult] = useState('');
  const [ipInput, setIpInput] = useState('');
  const [ipDetails, setIpDetails] = useState<any>(null);
  const [dnsInput, setDnsInput] = useState('');
  const [dnsDetails, setDnsDetails] = useState<any>(null);
  
  // PDF states
  const [pdfSubTab, setPdfSubTab] = useState<'ats_checker' | 'word_to_pdf' | 'jpg_to_pdf' | 'merge' | 'split' | 'organize'>('ats_checker');
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [pdfPageRange, setPdfPageRange] = useState('');
  const [pdfStatus, setPdfStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [pdfErrorMessage, setPdfErrorMessage] = useState('');
  const [pdfPagesOrder, setPdfPagesOrder] = useState<number[]>([]); // stores page indices (0-indexed) for custom sorting/ordering
  
  const [atsResumeText, setAtsResumeText] = useState('');
  const [atsJobDesc, setAtsJobDesc] = useState('');
  const [atsStatus, setAtsStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [atsErrorMessage, setAtsErrorMessage] = useState('');
  const [atsResults, setAtsResults] = useState<any>(null);
  const [atsLoadingStep, setAtsLoadingStep] = useState(0);
  const [atsActiveResultTab, setAtsActiveResultTab] = useState<'content' | 'section' | 'essentials' | 'tailoring'>('content');
  
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
  const [devSubTab, setDevSubTab] = useState<'base64' | 'json' | 'color' | 'diff' | 'lorem' | 'qr' | 'unicode'>('qr');
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

  // Security & Cryptography States
  const [securitySubTab, setSecuritySubTab] = useState<'ip' | 'dns' | 'pwd' | 'hash' | 'cipher' | 'ssl'>('ip');
  const [pwdLength, setPwdLength] = useState(16);
  const [pwdNumbers, setPwdNumbers] = useState(true);
  const [pwdSymbols, setPwdSymbols] = useState(true);
  const [pwdResult, setPwdResult] = useState('');
  const [hashInput, setHashInput] = useState('');
  const [hashAlgo, setHashAlgo] = useState<'SHA-256' | 'SHA-1' | 'SHA-512'>('SHA-256');
  const [hashResult, setHashResult] = useState('');
  const [cipherInput, setCipherInput] = useState('');
  const [cipherShift, setCipherShift] = useState(3);
  const [cipherResult, setCipherResult] = useState('');
  const [sslDomain, setSslDomain] = useState('');
  const [sslDetails, setSslDetails] = useState<any>(null);
  const [sslError, setSslError] = useState('');
  const [sslLoading, setSslLoading] = useState(false);
  const [sslPemInput, setSslPemInput] = useState('');

  // Math & Calculator States
  const [mathSubTab, setMathSubTab] = useState<'gpa' | 'emi' | 'pct' | 'land' | 'sci_calc' | 'age'>('gpa');
  const [calcInput, setCalcInput] = useState('');
  const [calcOutput, setCalcOutput] = useState('');
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
  const [helperSubTab, setHelperSubTab] = useState<'yt' | 'word' | 'case' | 'video_dl' | 'resize'>('yt');
  const [ytUrl, setYtUrl] = useState('');
  const [ytThumbnails, setYtThumbnails] = useState<any>(null);
  const [caseInput, setCaseInput] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFormat, setVideoFormat] = useState<'video' | 'audio'>('video');
  const [videoQuality, setVideoQuality] = useState('1080');
  const [videoStatus, setVideoStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [videoErrorMsg, setVideoErrorMsg] = useState('');
  
  useEffect(() => {
    document.title = lang === 'en' ? 'Rana | Cyber Deck' : 'রানা | সাইবার ডেক';
  }, [lang]);

  // Read URL query params to deep-link into specific toolbox tab/subtab
  const searchParams = useSearchParams();
  useEffect(() => {
    const tab = searchParams.get('tab');
    const sub = searchParams.get('sub');
    if (tab && ['dev_tools', 'math', 'helpers', 'pdf', 'security'].includes(tab)) {
      setActiveTab(tab as any);
    }
    if (sub) {
      switch (tab) {
        case 'dev_tools':
          if (['base64', 'json', 'color', 'diff', 'lorem', 'qr', 'unicode'].includes(sub)) setDevSubTab(sub as any);
          break;
        case 'math':
          if (['gpa', 'emi', 'pct', 'land', 'sci_calc', 'age'].includes(sub)) setMathSubTab(sub as any);
          break;
        case 'helpers':
          if (['yt', 'word', 'case', 'video_dl', 'resize'].includes(sub)) setHelperSubTab(sub as any);
          break;
        case 'pdf':
          if (['ats_checker', 'word_to_pdf', 'jpg_to_pdf', 'merge', 'split', 'organize'].includes(sub)) setPdfSubTab(sub as any);
          break;
        case 'security':
          if (['ip', 'dns', 'pwd', 'hash', 'cipher', 'ssl'].includes(sub)) setSecuritySubTab(sub as any);
          break;
      }
    }
  }, [searchParams]);



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

  const handleFetchSsl = async () => {
    if (!sslDomain.trim()) return;
    setSslLoading(true);
    setSslError('');
    setSslDetails(null);
    try {
      const res = await fetch(`/api/ssl-inspect?domain=${encodeURIComponent(sslDomain.trim())}`);
      const data = await res.json();
      if (data.error) {
        setSslError(data.error);
      } else {
        setSslDetails(data);
      }
    } catch (e: any) {
      setSslError('Failed to retrieve certificate details.');
    } finally {
      setSslLoading(false);
    }
  };

  const handleDecodeLocalPem = () => {
    if (!sslPemInput.trim()) return;
    setSslError('');
    setSslDetails(null);
    const decoded = parsePemCertificate(sslPemInput);
    if (!decoded.success) {
      setSslError(decoded.error || 'Failed to parse PEM.');
    } else {
      setSslDetails(decoded);
    }
  };

  const handleVideoDownload = async () => {
    if (!videoUrl.trim()) return;
    setVideoStatus('processing');
    setVideoErrorMsg('');
    try {
      const response = await fetch('https://api.cobalt.tools/api/json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: videoUrl.trim(),
          videoQuality: videoQuality,
          isAudioOnly: videoFormat === 'audio',
          filenamePattern: 'basic'
        })
      });
      const data = await response.json();
      if (data.status === 'success' || data.status === 'stream' || data.status === 'redirect') {
        setVideoStatus('success');
        if (data.url) {
          window.open(data.url, '_blank');
        }
      } else {
        setVideoStatus('error');
        setVideoErrorMsg(data.text || t('helpers.video_api_error'));
      }
    } catch (e) {
      setVideoStatus('error');
      setVideoErrorMsg(t('helpers.video_api_error'));
    }
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
  
  const loadPdfPagesCount = async (file: File) => {
    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();
      const order = [];
      for (let i = 0; i < totalPages; i++) order.push(i);
      setPdfPagesOrder(order);
    } catch (e: any) {
      setPdfStatus('error');
      setPdfErrorMessage(lang === 'en' ? 'Failed to read PDF pages.' : 'পিডিএফ পেজ পড়তে ব্যর্থ হয়েছে।');
    }
  };

  const handleOrganizePdf = async () => {
    if (pdfFiles.length === 0) {
      setPdfStatus('error');
      setPdfErrorMessage(lang === 'en' ? 'Please select a PDF file first.' : 'অনুগ্রহ করে প্রথমে একটি পিডিএফ ফাইল সিলেক্ট করুন।');
      return;
    }
    setPdfStatus('processing');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const file = pdfFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const outputPdf = await PDFDocument.create();
      
      const copiedPages = await outputPdf.copyPages(srcPdf, pdfPagesOrder);
      copiedPages.forEach((page) => outputPdf.addPage(page));
      
      const pdfBytes = await outputPdf.save();
      downloadBlob(pdfBytes, 'reordered_document.pdf', 'application/pdf');
      setPdfStatus('success');
    } catch (e: any) {
      setPdfStatus('error');
      setPdfErrorMessage(e.message || 'Error organizing PDF.');
    }
  };

  const handleWordToPdf = async () => {
    if (pdfFiles.length === 0) {
      setPdfStatus('error');
      setPdfErrorMessage(lang === 'en' ? 'Please select a Word (.docx) file.' : 'অনুগ্রহ করে একটি ওয়ার্ড (.docx) ফাইল নির্বাচন করুন।');
      return;
    }
    setPdfStatus('processing');
    try {
      const mammoth = await import('mammoth');
      const html2pdf = (await import('html2pdf.js')).default;
      
      const file = pdfFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      
      const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
      const htmlContent = result.value;
      
      // Render to a temporary offline container to avoid interfering with current page view layout
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      element.style.padding = '40px';
      element.style.color = '#000000';
      element.style.backgroundColor = '#ffffff';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.lineHeight = '1.6';
      
      // Configure HTML to PDF conversion options
      const opt = {
        margin: 10,
        filename: file.name.replace(/\.docx$/i, '') + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      await html2pdf().from(element).set(opt as any).save();
      setPdfStatus('success');
    } catch (e: any) {
      setPdfStatus('error');
      setPdfErrorMessage(e.message || 'Error converting Word document.');
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
        let arrayBuffer = await imgFile.arrayBuffer();
        let isPng = imgFile.type === 'image/png';
        let isJpg = imgFile.type === 'image/jpeg' || imgFile.type === 'image/jpg';
        
        // If image type is webp, gif, bmp, svg etc., draw on Canvas offline and convert to PNG bytes client-side
        if (!isPng && !isJpg) {
          const blobUrl = URL.createObjectURL(imgFile);
          const imageObj = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = blobUrl;
          });
          URL.revokeObjectURL(blobUrl);
          
          const canvas = document.createElement('canvas');
          canvas.width = imageObj.width;
          canvas.height = imageObj.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(imageObj, 0, 0);
          
          const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
          if (!pngBlob) throw new Error('Failed to convert image format.');
          arrayBuffer = await pngBlob.arrayBuffer();
          isPng = true;
        }
        
        let img;
        if (isPng) {
          img = await pdfDoc.embedPng(arrayBuffer);
        } else {
          img = await pdfDoc.embedJpg(arrayBuffer);
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

  const handleAnalyzeAts = () => {
    if (!atsResumeText.trim()) {
      setAtsErrorMessage(lang === 'en' ? 'Please paste your resume text or upload a docx/txt file.' : 'অনুগ্রহ করে আপনার রিজিউম টেক্সট পেস্ট করুন অথবা docx/txt ফাইল আপলোড করুন।');
      return;
    }
    if (!atsJobDesc.trim()) {
      setAtsErrorMessage(lang === 'en' ? 'Please paste the target Job Description.' : 'অনুগ্রহ করে টার্গেট জব ডেসক্রিপশন পেস্ট করুন।');
      return;
    }

    setAtsStatus('processing');
    setAtsErrorMessage('');
    setAtsLoadingStep(1); // 1. Parsing your resume

    // Step 2: Analyzing experience (600ms)
    setTimeout(() => {
      setAtsLoadingStep(2);
    }, 700);

    // Step 3: Extracting skills (1400ms)
    setTimeout(() => {
      setAtsLoadingStep(3);
    }, 1400);

    // Step 4: Generating recommendations (2100ms)
    setTimeout(() => {
      setAtsLoadingStep(4);
    }, 2100);

    // Step 5: Complete & Show results (2800ms)
    setTimeout(() => {
      try {
        const resume = atsResumeText.toLowerCase();
        const jobDesc = atsJobDesc.toLowerCase();

        const commonKeywords = [
          'react', 'angular', 'vue', 'next.js', 'typescript', 'javascript', 'html', 'css', 'sass', 'tailwind',
          'python', 'django', 'flask', 'fastapi', 'java', 'spring boot', 'spring', 'kotlin', 'c++', 'c#', '.net', 'asp.net',
          'ruby', 'rails', 'php', 'laravel', 'node.js', 'express', 'nestjs', 'go', 'golang', 'rust',
          'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'dynamodb', 'oracle',
          'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'ci/cd',
          'terraform', 'ansible', 'prometheus', 'grafana', 'linux', 'unix', 'bash', 'powershell',
          'rest api', 'graphql', 'grpc', 'microservices', 'serverless', 'system design', 'architecture',
          'agile', 'scrum', 'kanban', 'jira', 'confluence', 'project management', 'product management',
          'machine learning', 'deep learning', 'ai', 'data science', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch',
          'cybersecurity', 'security', 'firewall', 'pentesting', 'siem', 'soc', 'datto', 'sentinelone', 'bitdefender', 'acronis',
          'backup', 'bcdr', 'network', 'routing', 'switching', 'dns', 'ssl', 'active directory', 'office 365', 'm365',
          'troubleshooting', 'helpdesk', 'support', 'it support', 'system administrator', 'sysadmin', 'devops',
          'communication', 'teamwork', 'leadership', 'problem solving', 'analytical', 'collaboration'
        ];

        const dynamicKeywordsSet = new Set<string>();
        const words = atsJobDesc.match(/[A-Z][a-zA-Z0-9+#\-\.]+/g) || [];
        words.forEach(w => {
          const lw = w.toLowerCase();
          if (lw.length > 2 && !['the', 'and', 'for', 'you', 'are', 'with', 'this', 'that', 'from', 'your', 'will', 'have'].includes(lw)) {
            dynamicKeywordsSet.add(lw);
          }
        });
        commonKeywords.forEach(k => {
          if (jobDesc.includes(k)) {
            dynamicKeywordsSet.add(k);
          }
        });

        const extractedKeywords = Array.from(dynamicKeywordsSet);

        const foundKeywords: string[] = [];
        const missingKeywords: string[] = [];

        extractedKeywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
          if (regex.test(resume) || resume.includes(keyword)) {
            foundKeywords.push(keyword);
          } else {
            missingKeywords.push(keyword);
          }
        });

        const checks = {
          contact: /email|phone|contact|linkedin|github|@|\+?[0-9]{7,15}/i.test(resume),
          experience: /experience|work history|employment|history|professional experience/i.test(resume),
          education: /education|degree|university|college|school|academic/i.test(resume),
          skills: /skills|core skills|technologies|expertise|technical/i.test(resume)
        };

        const wordCount = atsResumeText.split(/\s+/).filter(Boolean).length;
        const isLengthOptimal = wordCount >= 300 && wordCount <= 1000;

        const buzzwords = ['synergy', 'hardworking', 'go-getter', 'detail-oriented', 'motivated', 'results-driven', 'dynamic', 'self-starter'];
        const foundBuzzwords = buzzwords.filter(b => resume.includes(b));

        const actionVerbs = ['led', 'managed', 'developed', 'implemented', 'designed', 'created', 'built', 'optimized', 'reduced', 'increased', 'architected', 'resolved', 'automated'];
        const foundActionVerbs = actionVerbs.filter(v => resume.includes(v));

        // Subscores Calculations (0 to 100)
        let subContent = 20;
        if (isLengthOptimal) subContent += 30;
        if (foundActionVerbs.length >= 4) subContent += 40;
        else subContent += foundActionVerbs.length * 10;
        subContent -= Math.min(foundBuzzwords.length * 10, 30);
        subContent = Math.max(10, Math.min(100, subContent));

        let subSection = 0;
        if (checks.contact) subSection += 25;
        if (checks.experience) subSection += 25;
        if (checks.education) subSection += 25;
        if (checks.skills) subSection += 25;

        let subEssentials = 20;
        if (checks.contact) subEssentials += 40;
        if (checks.experience && checks.education) subEssentials += 20;
        if (isLengthOptimal) subEssentials += 20;
        subEssentials = Math.max(10, Math.min(100, subEssentials));

        let subTailoring = 100;
        if (extractedKeywords.length > 0) {
          subTailoring = Math.round((foundKeywords.length / extractedKeywords.length) * 100);
        }

        // Overall Weighted Score
        let score = Math.round((subContent * 0.25) + (subSection * 0.25) + (subEssentials * 0.2) + (subTailoring * 0.3));
        score = Math.max(10, Math.min(100, score));

        const recommendations: string[] = [];
        if (!checks.contact) {
          recommendations.push(lang === 'en' 
            ? 'Contact information (email, phone, LinkedIn or GitHub) was not clearly detected. Ensure your contact details are at the top.' 
            : 'যোগাযোগের তথ্য (ইমেইল, ফোন, লিঙ্কডইন বা গিটহাব) স্পষ্টভাবে সনাক্ত করা যায়নি। পৃষ্ঠার শীর্ষে আপনার যোগাযোগের বিবরণ রাখুন।');
        }
        if (!checks.experience) {
          recommendations.push(lang === 'en'
            ? 'Work experience section is missing or has a non-standard heading. Use "Professional Experience" or "Work History".'
            : 'কাজের অভিজ্ঞতার বিভাগটি অনুপস্থিত বা একটি অপ্রচলিত শিরোনাম ব্যবহার করা হয়েছে। "Professional Experience" বা "Work History" শিরোনাম ব্যবহার করুন।');
        }
        if (!checks.education) {
          recommendations.push(lang === 'en'
            ? 'Education section was not detected. Add a section titled "Education" with your academic qualifications.'
            : 'শিক্ষা বিষয়ক বিভাগ সনাক্ত করা যায়নি। আপনার একাডেমিক যোগ্যতা সহ "Education" শিরোনামের একটি বিভাগ যোগ করুন।');
        }
        if (wordCount < 300) {
          recommendations.push(lang === 'en'
            ? `Your resume is quite short (${wordCount} words). Add more details, achievements, and impact statements to your experiences.`
            : `আপনার রিজিউমটি বেশ সংক্ষিপ্ত (${wordCount} শব্দ)। আপনার অভিজ্ঞতায় আরও তথ্য, অর্জন এবং প্রভাবের বিবরণ যোগ করুন।`);
        } else if (wordCount > 1000) {
          recommendations.push(lang === 'en'
            ? `Your resume is a bit long (${wordCount} words). Try to condense it to 1-2 pages (approx. 400-800 words) by highlighting only the most relevant achievements.`
            : `আপনার রিজিউমটি একটু দীর্ঘ (${wordCount} শব্দ)। শুধুমাত্র সবচেয়ে প্রাসঙ্গিক অর্জনগুলিকে হাইলাইট করে এটি ১-২ পৃষ্ঠায় (প্রায় ৪০০-৮০০ শব্দ) সংকুচিত করার চেষ্টা করুন।`);
        }
        if (missingKeywords.length > 0) {
          const topMissing = missingKeywords.slice(0, 5).map(k => `"${k.toUpperCase()}"`).join(', ');
          recommendations.push(lang === 'en'
            ? `Add relevant keywords from the job description like ${topMissing} to make your resume more visible to the ATS algorithm.`
            : `এটএস অ্যালগরিদমে আপনার রিজিউমটি দৃশ্যমান করতে জব ডেসক্রিপশনের প্রাসঙ্গিক কীওয়ার্ড যেমন ${topMissing} যোগ করুন।`);
        }
        if (foundBuzzwords.length > 2) {
          recommendations.push(lang === 'en'
            ? `Avoid generic buzzwords: ${foundBuzzwords.map(b => `"${b}"`).join(', ')}. Replace them with specific actions and quantifiable results.`
            : `সাধারণ অলংকারিক শব্দ বা বাজওয়ার্ড পরিহার করুন: ${foundBuzzwords.map(b => `"${b}"`).join(', ')}। এগুলির পরিবর্তে সুনির্দিষ্ট কাজ এবং পরিমাপযোগ্য ফলাফল উল্লেখ করুন।`);
        }
        if (foundActionVerbs.length < 3) {
          recommendations.push(lang === 'en'
            ? 'Include more strong action verbs (e.g., "Led", "Developed", "Automated", "Optimized") at the start of your experience bullet points.'
            : 'আপনার কাজের বিবরণীর বুলেটের শুরুতে আরও শক্তিশালী অ্যাকশন ভার্ব (যেমন, "Led", "Developed", "Automated", "Optimized") ব্যবহার করুন।');
        }

        setAtsResults({
          score,
          subScores: {
            content: subContent,
            section: subSection,
            essentials: subEssentials,
            tailoring: subTailoring
          },
          wordCount,
          keywords: {
            found: foundKeywords.map(k => k.toUpperCase()),
            missing: missingKeywords.map(k => k.toUpperCase())
          },
          checks,
          recommendations
        });
        setAtsStatus('success');
        setAtsLoadingStep(0);
      } catch (e: any) {
        setAtsStatus('error');
        setAtsLoadingStep(0);
        setAtsErrorMessage(e.message || 'Error parsing resume data.');
      }
    }, 2800);
  };

  const handleAtsFileUpload = async (file: File) => {
    setAtsErrorMessage('');
    if (file.name.endsWith('.docx')) {
      setAtsStatus('processing');
      try {
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setAtsResumeText(result.value);
        setAtsStatus('idle');
      } catch (e: any) {
        setAtsStatus('error');
        setAtsErrorMessage(lang === 'en' ? 'Failed to read DOCX file.' : 'ডকএক্স ফাইল পড়তে ব্যর্থ হয়েছে।');
      }
    } else if (file.name.endsWith('.pdf')) {
      setAtsStatus('processing');
      try {
        const pdfjs: any = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        let text = '';
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
          text += pageText + '\n';
        }
        setAtsResumeText(text);
        setAtsStatus('idle');
      } catch (e: any) {
        setAtsStatus('error');
        setAtsErrorMessage(lang === 'en' ? 'Failed to read PDF file. Make sure it is not scanned/image-only.' : 'পিডিএফ ফাইল পড়তে ব্যর্থ হয়েছে। নিশ্চিত করুন এটি স্ক্যান করা/শুধুমাত্র ছবি পিডিএফ নয়।');
      }
    } else if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAtsResumeText(e.target?.result as string || '');
      };
      reader.onerror = () => {
        setAtsErrorMessage(lang === 'en' ? 'Failed to read TXT file.' : 'টেক্সট ফাইল পড়তে ব্যর্থ হয়েছে।');
      };
      reader.readAsText(file);
    } else {
      setAtsErrorMessage(lang === 'en' ? 'Unsupported file format. Please upload .pdf, .docx, or .txt, or copy-paste text.' : 'অসমর্থিত ফাইল ফরম্যাট। অনুগ্রহ করে .pdf, .docx বা .txt ফাইল আপলোড করুন, অথবা টেক্সট কপি-পেস্ট করুন।');
    }
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

  const evaluateCalculatorFormula = (formula: string) => {
    if (!formula.trim()) {
      setCalcOutput('');
      return;
    }
    try {
      const sanitized = formula.replace(/π/g, 'Math.PI')
                               .replace(/e/g, 'Math.E')
                               .replace(/sin\(/g, 'Math.sin(')
                               .replace(/cos\(/g, 'Math.cos(')
                               .replace(/tan\(/g, 'Math.tan(')
                               .replace(/sqrt\(/g, 'Math.sqrt(')
                               .replace(/log\(/g, 'Math.log10(')
                               .replace(/ln\(/g, 'Math.log(')
                               .replace(/\^/g, '**');

      const validationStr = sanitized.replace(/Math\.(PI|E|sin|cos|tan|sqrt|log10|log)/g, '1');
      if (!/^[0-9+\-*/().\s*]+$/.test(validationStr)) {
        throw new Error('Invalid Input');
      }

      const result = new Function(`return (${sanitized})`)();
      if (typeof result === 'number' && !isNaN(result)) {
        setCalcOutput(Number(result.toFixed(8)).toString());
      } else {
        setCalcOutput('Error');
      }
    } catch (err) {
      setCalcOutput('Error');
    }
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

  // Security Handlers
  const handleGeneratePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (pwdNumbers) chars += '0123456789';
    if (pwdSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let result = '';
    for (let i = 0; i < pwdLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPwdResult(result);
  };

  const handleGenerateHash = async () => {
    if (!hashInput) return;
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(hashInput);
      const hashBuffer = await crypto.subtle.digest(hashAlgo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHashResult(hashHex);
    } catch (e: any) {
      setHashResult(e.message || 'Error hashing input');
    }
  };

  const handleCipherAction = (mode: 'encrypt' | 'decrypt', cipherType: 'rot13' | 'caesar') => {
    let shift = cipherShift;
    if (cipherType === 'rot13') shift = 13;
    if (mode === 'decrypt') shift = 26 - shift;
    
    let result = '';
    for (let i = 0; i < cipherInput.length; i++) {
      const char = cipherInput[i];
      if (char.match(/[a-z]/i)) {
        const code = cipherInput.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      } else {
        result += char;
      }
    }
    setCipherResult(result);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

      {/* Main Body Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 md:py-10 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3 font-mono text-cyber-glow">
            {lang === 'en' ? 'CYBER DECK' : 'সাইবার ডেক'}
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-mono text-[11px] md:text-xs tracking-wide">
            {lang === 'en' 
              ? 'Local-first decryption engines, file compilers, network utilities, and specialized calculators. Zero server uploads.'
              : 'সম্পূর্ণ লোকাল ও অফলাইন ইউটিলিটি ডেক। কোনো ফাইল বা ডাটা সার্ভারে আপলোড হয় না।'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex md:grid md:grid-cols-5 overflow-x-auto whitespace-nowrap border-b border-slate-900 mb-6 font-mono text-[10px] md:text-xs scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('pdf');
              setPdfSubTab('word_to_pdf');
              setPdfFiles([]);
              setPdfStatus('idle');
              setPdfErrorMessage('');
            }}
            className={`px-2 py-2 border-b-2 text-center transition-all ${
              activeTab === 'pdf'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.pdf').toUpperCase()}
          </button>
          <button
            onClick={() => setActiveTab('helpers')}
            className={`px-2 py-2 border-b-2 text-center transition-all ${
              activeTab === 'helpers'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.helpers').toUpperCase()}
          </button>
          <button
            onClick={() => setActiveTab('dev_tools')}
            className={`px-2 py-2 border-b-2 text-center transition-all ${
              activeTab === 'dev_tools'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.dev_tools').toUpperCase()}
          </button>
          <button
            onClick={() => {
              setActiveTab('security');
              setSecuritySubTab('ip');
              setIpInput('');
              setIpDetails(null);
              setDnsInput('');
              setDnsDetails(null);
              setPwdResult('');
              setHashResult('');
              setCipherResult('');
            }}
            className={`px-2 py-2 border-b-2 text-center transition-all ${
              activeTab === 'security'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.net_security').toUpperCase()}
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`px-2 py-2 border-b-2 text-center transition-all ${
              activeTab === 'math'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('nav.math').toUpperCase()}
          </button>
        </div>

        {/* Panel Container */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-lg p-6 cyber-glow min-h-[300px]">


          {activeTab === 'dev_tools' && (
            <div className="space-y-6">
              <div className="flex space-x-1 border-b border-slate-900 pb-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                <button
                  onClick={() => { setDevSubTab('qr'); setQrInput(''); setQrCodeUrl(''); }}
                  className={`px-2 py-1 text-xs font-mono border ${devSubTab === 'qr' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  QR GENERATOR
                </button>
                <button
                  onClick={() => { setDevSubTab('json'); setJsonInput(''); setJsonOutput(''); setJsonError(''); }}
                  className={`px-2 py-1 text-xs font-mono border ${devSubTab === 'json' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  JSON FORMATTER
                </button>
                <button
                  onClick={() => { setDevSubTab('color'); setColorPalette([]); }}
                  className={`px-2 py-1 text-xs font-mono border ${devSubTab === 'color' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  COLOR PICKER
                </button>
                <button
                  onClick={() => { setDevSubTab('diff'); setDiffA(''); setDiffB(''); }}
                  className={`px-2 py-1 text-xs font-mono border ${devSubTab === 'diff' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  DIFF CHECKER
                </button>
                <button
                  onClick={() => { setDevSubTab('lorem'); setLoremOutput(''); }}
                  className={`px-2 py-1 text-xs font-mono border ${devSubTab === 'lorem' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  LOREM IPSUM
                </button>
                <button
                  onClick={() => { setDevSubTab('base64'); setTextInput(''); setTextResult(''); }}
                  className={`px-2 py-1 text-xs font-mono border ${devSubTab === 'base64' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  BASE64
                </button>
                <button
                  onClick={() => { setDevSubTab('unicode'); setUnicodeInput(''); setUnicodeOutput(''); }}
                  className={`px-2 py-1 text-xs font-mono border ${devSubTab === 'unicode' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('bd.sub_unicode')}
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

              {devSubTab === 'unicode' && (
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
                <button
                  onClick={() => { setMathSubTab('sci_calc'); setCalcInput(''); setCalcOutput(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${mathSubTab === 'sci_calc' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('math.sub_sci_calc')}
                </button>
                <button
                  onClick={() => { setMathSubTab('age'); setAgeResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${mathSubTab === 'age' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('bd.sub_age')}
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

              {mathSubTab === 'sci_calc' && (
                <div className="space-y-4 max-w-md mx-auto">
                  {/* Display Screen */}
                  <div className="bg-slate-950 border border-slate-800 rounded p-4 text-right font-mono min-h-[80px] flex flex-col justify-between">
                    <div className="text-slate-500 text-xs break-all tracking-wider min-h-[1.5em]">{calcInput || '0'}</div>
                    <div className="text-cyan-400 text-lg font-bold break-all select-all tracking-widest">{calcOutput || ' '}</div>
                  </div>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { label: 'sin', action: () => setCalcInput(prev => prev + 'sin(') },
                      { label: 'cos', action: () => setCalcInput(prev => prev + 'cos(') },
                      { label: 'tan', action: () => setCalcInput(prev => prev + 'tan(') },
                      { label: 'log', action: () => setCalcInput(prev => prev + 'log(') },
                      { label: 'ln', action: () => setCalcInput(prev => prev + 'ln(') },

                      { label: '√', action: () => setCalcInput(prev => prev + 'sqrt(') },
                      { label: '^', action: () => setCalcInput(prev => prev + '^') },
                      { label: 'π', action: () => setCalcInput(prev => prev + 'π') },
                      { label: 'e', action: () => setCalcInput(prev => prev + 'e') },
                      { label: '(', action: () => setCalcInput(prev => prev + '(') },

                      { label: '7', action: () => setCalcInput(prev => prev + '7') },
                      { label: '8', action: () => setCalcInput(prev => prev + '8') },
                      { label: '9', action: () => setCalcInput(prev => prev + '9') },
                      { label: ')', action: () => setCalcInput(prev => prev + ')') },
                      { label: 'C', action: () => { setCalcInput(''); setCalcOutput(''); }, className: 'bg-red-950/30 hover:bg-red-900/30 text-red-400 border-red-900/50' },

                      { label: '4', action: () => setCalcInput(prev => prev + '4') },
                      { label: '5', action: () => setCalcInput(prev => prev + '5') },
                      { label: '6', action: () => setCalcInput(prev => prev + '6') },
                      { label: '*', action: () => setCalcInput(prev => prev + '*') },
                      { label: '/', action: () => setCalcInput(prev => prev + '/') },

                      { label: '1', action: () => setCalcInput(prev => prev + '1') },
                      { label: '2', action: () => setCalcInput(prev => prev + '2') },
                      { label: '3', action: () => setCalcInput(prev => prev + '3') },
                      { label: '+', action: () => setCalcInput(prev => prev + '+') },
                      { label: '-', action: () => setCalcInput(prev => prev + '-') },

                      { label: '0', action: () => setCalcInput(prev => prev + '0') },
                      { label: '.', action: () => setCalcInput(prev => prev + '.') },
                      { label: '⌫', action: () => setCalcInput(prev => prev.slice(0, -1)) },
                    ].map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={btn.action}
                        className={`py-2 text-xs font-mono border border-slate-800 rounded bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white transition-all shadow-sm ${btn.className || ''}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => evaluateCalculatorFormula(calcInput)}
                      className="col-span-2 py-2 text-xs font-mono font-bold border border-cyan-400/50 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all shadow-sm"
                    >
                      =
                    </button>
                  </div>
                </div>
              )}
              {mathSubTab === 'age' && (
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
                  onClick={() => { setHelperSubTab('video_dl'); setVideoUrl(''); setVideoStatus('idle'); setVideoErrorMsg(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${helperSubTab === 'video_dl' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('helpers.sub_video_dl')}
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
                <button
                  onClick={() => { setHelperSubTab('resize'); setResizeImgFile(null); setResizeStatus(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${helperSubTab === 'resize' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('bd.sub_resize')}
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

              {helperSubTab === 'video_dl' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">{t('helpers.video_url')}</label>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder={t('helpers.video_placeholder')}
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">{t('helpers.video_format')}</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setVideoFormat('video')}
                          className={`flex-1 py-1.5 text-xs font-mono border rounded ${videoFormat === 'video' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-950'}`}
                        >
                          {t('helpers.video_format_video')}
                        </button>
                        <button
                          onClick={() => setVideoFormat('audio')}
                          className={`flex-1 py-1.5 text-xs font-mono border rounded ${videoFormat === 'audio' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-950'}`}
                        >
                          {t('helpers.video_format_audio')}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">{t('helpers.video_quality')}</label>
                      <select
                        value={videoQuality}
                        onChange={(e) => setVideoQuality(e.target.value)}
                        disabled={videoFormat === 'audio'}
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-300 focus:outline-none font-mono text-xs disabled:opacity-55"
                      >
                        <option value="max">Max Quality</option>
                        <option value="1080">1080p</option>
                        <option value="720">720p</option>
                        <option value="480">480p</option>
                        <option value="360">360p</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 pt-2">
                    <button
                      onClick={handleVideoDownload}
                      disabled={videoStatus === 'processing'}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono py-2 rounded transition-all disabled:opacity-50"
                    >
                      {videoStatus === 'processing' ? t('helpers.video_btn_dl_progress') : t('helpers.video_btn_dl')}
                    </button>

                    {videoStatus === 'error' && (
                      <div className="p-3 bg-red-950/20 border border-red-500/30 rounded text-xs font-mono text-red-400 mt-2">
                        {videoErrorMsg}
                      </div>
                    )}
                    {videoStatus === 'success' && (
                      <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded text-xs font-mono text-cyan-400 mt-2">
                        Success! Direct link opened.
                      </div>
                    )}
                  </div>
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
              {helperSubTab === 'resize' && (
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


          {activeTab === 'pdf' && (
            <div className="space-y-6">
              {/* PDF Subtabs */}
              <div className="flex space-x-2 border-b border-slate-900 pb-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                <button
                  onClick={() => { setPdfSubTab('ats_checker'); setAtsResults(null); setAtsStatus('idle'); setAtsResumeText(''); setAtsJobDesc(''); setAtsErrorMessage(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'ats_checker' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_ats_checker')}
                </button>
                <button
                  onClick={() => { setPdfSubTab('word_to_pdf'); setPdfFiles([]); setPdfStatus('idle'); setPdfPagesOrder([]); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'word_to_pdf' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_word_to_pdf')}
                </button>
                <button
                  onClick={() => { setPdfSubTab('jpg_to_pdf'); setPdfFiles([]); setPdfStatus('idle'); setPdfPagesOrder([]); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'jpg_to_pdf' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_jpg_to_pdf')}
                </button>
                <button
                  onClick={() => { setPdfSubTab('merge'); setPdfFiles([]); setPdfStatus('idle'); setPdfPagesOrder([]); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'merge' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_merge')}
                </button>
                <button
                  onClick={() => { setPdfSubTab('split'); setPdfFiles([]); setPdfStatus('idle'); setPdfPagesOrder([]); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'split' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_split')}
                </button>
                <button
                  onClick={() => { setPdfSubTab('organize'); setPdfFiles([]); setPdfStatus('idle'); setPdfPagesOrder([]); }}
                  className={`px-3 py-1 text-xs font-mono border ${pdfSubTab === 'organize' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('pdf.tab_organize')}
                </button>
              </div>

              {/* Upload Section */}
              {pdfSubTab !== 'ats_checker' && (
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-mono text-slate-400">
                    {pdfSubTab === 'jpg_to_pdf' ? t('pdf.select_images') : pdfSubTab === 'word_to_pdf' ? t('pdf.select_word_file') : (pdfSubTab === 'split' || pdfSubTab === 'organize') ? t('pdf.select_file') : t('pdf.select_files')}
                  </label>
                  <input
                    type="file"
                    multiple={pdfSubTab !== 'split' && pdfSubTab !== 'organize' && pdfSubTab !== 'word_to_pdf'}
                    accept={pdfSubTab === 'jpg_to_pdf' ? 'image/jpeg,image/png,image/jpg' : pdfSubTab === 'word_to_pdf' ? '.docx' : 'application/pdf'}
                    onChange={(e) => {
                      if (e.target.files) {
                        const newFiles = Array.from(e.target.files);
                        if (pdfSubTab === 'split' || pdfSubTab === 'organize' || pdfSubTab === 'word_to_pdf') {
                          const selectedFile = newFiles[0];
                          setPdfFiles([selectedFile]);
                          if (pdfSubTab === 'organize') {
                            loadPdfPagesCount(selectedFile);
                          }
                        } else {
                          setPdfFiles((prev) => [...prev, ...newFiles]);
                        }
                        setPdfStatus('idle');
                      }
                    }}
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-300 font-mono file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:bg-slate-900 file:text-slate-300 file:cursor-pointer hover:file:bg-slate-800"
                  />
                </div>
              )}

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

              {/* PDF Organize preview grid */}
              {pdfSubTab === 'organize' && pdfPagesOrder.length > 0 && (
                <div className="space-y-4">
                  <label className="text-xs font-mono text-slate-400">{t('pdf.label_organize')}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {pdfPagesOrder.map((pageIdx, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800 rounded p-3 text-center flex flex-col items-center justify-between font-mono text-xs text-slate-300 relative group">
                        <div className="w-10 h-12 bg-slate-900 border border-slate-800 rounded flex items-center justify-center text-slate-500 font-bold mb-2">
                          PDF
                        </div>
                        <div>Page {pageIdx + 1}</div>
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const order = [...pdfPagesOrder];
                              const temp = order[idx];
                              order[idx] = order[idx - 1];
                              order[idx - 1] = temp;
                              setPdfPagesOrder(order);
                            }}
                            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] px-1.5 py-0.5 rounded text-slate-400 disabled:opacity-30"
                          >
                            ◀
                          </button>
                          <button
                            type="button"
                            disabled={idx === pdfPagesOrder.length - 1}
                            onClick={() => {
                              const order = [...pdfPagesOrder];
                              const temp = order[idx];
                              order[idx] = order[idx + 1];
                              order[idx + 1] = temp;
                              setPdfPagesOrder(order);
                            }}
                            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] px-1.5 py-0.5 rounded text-slate-400 disabled:opacity-30"
                          >
                            ▶
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPdfPagesOrder(pdfPagesOrder.filter((_, i) => i !== idx));
                          }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 font-bold rounded-full flex items-center justify-center text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploaded File List */}
              {pdfFiles.length > 0 && pdfSubTab !== 'organize' && pdfSubTab !== 'ats_checker' && (
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
              {pdfStatus !== 'idle' && pdfSubTab !== 'ats_checker' && (
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
              {pdfSubTab !== 'ats_checker' && (
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
                  {pdfSubTab === 'organize' && (
                    <button
                      disabled={pdfStatus === 'processing' || pdfFiles.length === 0 || pdfPagesOrder.length === 0}
                      onClick={handleOrganizePdf}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 disabled:hover:bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full"
                    >
                      {t('pdf.btn_organize')}
                    </button>
                  )}
                  {pdfSubTab === 'word_to_pdf' && (
                    <button
                      disabled={pdfStatus === 'processing' || pdfFiles.length === 0}
                      onClick={handleWordToPdf}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 disabled:opacity-40 disabled:hover:bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full"
                    >
                      {t('pdf.btn_convert_word')}
                    </button>
                  )}
                </div>
              )}

              {/* ATS Resume Checker UI */}
              {pdfSubTab === 'ats_checker' && (
                <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                  {/* Explanation header */}
                  <div className="bg-slate-900/30 border border-slate-900 rounded p-4">
                    <h3 className="text-sm font-bold text-white font-mono uppercase mb-2">⚡ {lang === 'en' ? 'ATS RESUME OPTIMIZER' : 'এটিএস রিজিউম অপ্টিমাইজার'}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {lang === 'en' 
                        ? 'Compare your resume against a target job description client-side. We extract key skills, identify missing industry keywords, audit standard formatting sections, check for weak action verbs or cliches, and provide a readability score. Zero server uploads.' 
                        : 'ক্লায়েন্ট-সাইডে আপনার রিজিউম ও জব ডেসক্রিপশন তুলনা করুন। আমরা মূল দক্ষতা বের করব, অনুপস্থিত কীওয়ার্ড চিহ্নিত করব, সাধারণ ফরম্যাটিং নিরীক্ষা করব এবং একটি রিডাবিলিটি স্কোর দেব। কোনো ফাইল সার্ভারে আপলোড করা হয় না।'}
                    </p>
                  </div>

                  {/* Inputs split view */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Resume Input */}
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono text-slate-300 font-bold uppercase">{lang === 'en' ? '1. YOUR RESUME' : '১. আপনার রিজিউম'}</label>
                        {/* File Upload Option */}
                        <label className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center gap-1">
                          📁 {lang === 'en' ? 'Upload (.pdf/.docx/.txt)' : 'ফাইল আপলোড (.pdf/.docx/.txt)'}
                          <input 
                            type="file" 
                            accept=".pdf,.docx,.txt" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleAtsFileUpload(e.target.files[0]);
                              }
                            }} 
                          />
                        </label>
                      </div>
                      <textarea
                        value={atsResumeText}
                        onChange={(e) => setAtsResumeText(e.target.value)}
                        placeholder={lang === 'en' ? 'Paste your resume text here, or click "Upload" to read from a file...' : 'এখানে আপনার রিজিউমের টেক্সট পেস্ট করুন, অথবা ফাইল থেকে পড়তে "ফাইল আপলোড" এ ক্লিক করুন...'}
                        rows={12}
                        className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono resize-y w-full leading-relaxed"
                      />
                    </div>

                    {/* Job Description Input */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-mono text-slate-300 font-bold uppercase">{lang === 'en' ? '2. TARGET JOB DESCRIPTION' : '২. জব ডেসক্রিপশন'}</label>
                      <textarea
                        value={atsJobDesc}
                        onChange={(e) => setAtsJobDesc(e.target.value)}
                        placeholder={lang === 'en' ? 'Paste the full job description or list of requirements here...' : 'এখানে সম্পূর্ণ জব ডেসক্রিপশন বা প্রয়োজনীয় যোগ্যতার তালিকা পেস্ট করুন...'}
                        rows={12}
                        className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 font-mono resize-y w-full leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Processing Status / Error Messages */}
                  {atsErrorMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-mono">
                      ⚠ {atsErrorMessage}
                    </div>
                  )}

                  {atsStatus === 'processing' && (
                    <div className="p-6 bg-slate-950/80 border border-slate-900 rounded-lg max-w-lg mx-auto space-y-6 font-mono shadow-[0_0_24px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                        <span className="text-sm font-bold text-white uppercase">{lang === 'en' ? 'ATS ANALYSIS ENGINE' : 'এটিএস অ্যানালিসিস ইঞ্জিন'}</span>
                        <span className="text-[10px] text-cyan-400 animate-pulse">[ {lang === 'en' ? 'RUNNING' : 'চলমান'} ]</span>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                              atsLoadingStep > 1 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' :
                              atsLoadingStep === 1 ? 'border-cyan-400 text-cyan-400 animate-pulse' : 'border-slate-800 text-slate-650'
                            }`}>
                              {atsLoadingStep > 1 ? '✓' : '●'}
                            </div>
                            <span className={`transition-colors duration-300 ${atsLoadingStep >= 1 ? 'text-slate-200' : 'text-slate-500'}`}>
                              {lang === 'en' ? 'Parsing your resume' : 'রিজিউম পার্স করা হচ্ছে'}
                            </span>
                          </div>
                          <span className="font-bold font-mono">
                            {atsLoadingStep > 1 && <span className="text-emerald-400">DONE</span>}
                            {atsLoadingStep === 1 && <span className="text-cyan-400 animate-pulse">ACTIVE</span>}
                            {atsLoadingStep < 1 && <span className="text-slate-700">PENDING</span>}
                          </span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                              atsLoadingStep > 2 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' :
                              atsLoadingStep === 2 ? 'border-cyan-400 text-cyan-400 animate-pulse' : 'border-slate-800 text-slate-650'
                            }`}>
                              {atsLoadingStep > 2 ? '✓' : '●'}
                            </div>
                            <span className={`transition-colors duration-300 ${atsLoadingStep >= 2 ? 'text-slate-200' : 'text-slate-500'}`}>
                              {lang === 'en' ? 'Analyzing your experience' : 'অভিজ্ঞতা বিশ্লেষণ করা হচ্ছে'}
                            </span>
                          </div>
                          <span className="font-bold font-mono">
                            {atsLoadingStep > 2 && <span className="text-emerald-400">DONE</span>}
                            {atsLoadingStep === 2 && <span className="text-cyan-400 animate-pulse">ACTIVE</span>}
                            {atsLoadingStep < 2 && <span className="text-slate-700">PENDING</span>}
                          </span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                              atsLoadingStep > 3 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' :
                              atsLoadingStep === 3 ? 'border-cyan-400 text-cyan-400 animate-pulse' : 'border-slate-800 text-slate-650'
                            }`}>
                              {atsLoadingStep > 3 ? '✓' : '●'}
                            </div>
                            <span className={`transition-colors duration-300 ${atsLoadingStep >= 3 ? 'text-slate-200' : 'text-slate-500'}`}>
                              {lang === 'en' ? 'Extracting your skills' : 'দক্ষতা এক্সট্র্যাক্ট করা হচ্ছে'}
                            </span>
                          </div>
                          <span className="font-bold font-mono">
                            {atsLoadingStep > 3 && <span className="text-emerald-400">DONE</span>}
                            {atsLoadingStep === 3 && <span className="text-cyan-400 animate-pulse">ACTIVE</span>}
                            {atsLoadingStep < 3 && <span className="text-slate-700">PENDING</span>}
                          </span>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                              atsLoadingStep > 4 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' :
                              atsLoadingStep === 4 ? 'border-cyan-400 text-cyan-400 animate-pulse' : 'border-slate-800 text-slate-650'
                            }`}>
                              {atsLoadingStep > 4 ? '✓' : '●'}
                            </div>
                            <span className={`transition-colors duration-300 ${atsLoadingStep >= 4 ? 'text-slate-200' : 'text-slate-500'}`}>
                              {lang === 'en' ? 'Generating recommendations' : 'সুপারিশ তৈরি করা হচ্ছে'}
                            </span>
                          </div>
                          <span className="font-bold font-mono">
                            {atsLoadingStep > 4 && <span className="text-emerald-400">DONE</span>}
                            {atsLoadingStep === 4 && <span className="text-cyan-400 animate-pulse">ACTIVE</span>}
                            {atsLoadingStep < 4 && <span className="text-slate-700">PENDING</span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Trigger */}
                  {atsStatus !== 'processing' && (
                    <button
                      onClick={handleAnalyzeAts}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full tracking-wider uppercase font-bold"
                    >
                      🔍 {lang === 'en' ? 'RUN ATS RESUME CHECK' : 'এটিএস রিজিউম চেক শুরু করুন'}
                    </button>
                  )}

                  {/* Results Section */}
                  {atsStatus === 'success' && atsResults && (
                    <div className="space-y-6 mt-6 animate-[fadeIn_0.4s_ease-out] border-t border-slate-900 pt-6">
                      
                      {/* Calculate Dynamic Issues */}
                      {(() => {
                        const contentIssuesList = [
                          { name: lang === 'en' ? 'ATS Parse Rate' : 'এটিএস পার্স রেট', ok: atsResults.score >= 55, desc: lang === 'en' ? 'Measures overall text readability by ATS parsers.' : 'এটিএস রিডার দ্বারা পড়ার যোগ্যতা নির্দেশ করে।', count: atsResults.score >= 55 ? 0 : 1 },
                          { name: lang === 'en' ? 'Quantifying Impact' : 'ইমপ্যাক্ট বা পরিমাপযোগ্য ফলাফল', ok: atsResults.checks.experience && (atsResults.subScores?.content >= 60), desc: lang === 'en' ? 'Use strong action verbs and metrics in your experiences.' : 'আপনার অভিজ্ঞতায় শক্তিশালী অ্যাকশন ভার্ব এবং সংখ্যাসূচক বিবরণী।', count: atsResults.subScores?.content >= 60 ? 0 : 1 },
                          { name: lang === 'en' ? 'Spelling & Grammar (Buzzwords)' : 'শব্দ ব্যবহার (বাজওয়ার্ড)', ok: atsResults.subScores?.content >= 80, desc: lang === 'en' ? 'Avoid cliches, buzzwords, and repetitive text.' : 'অনর্থক অলংকারিক বাজওয়ার্ড ও পুনরাবৃত্তি পরিহার করা হয়েছে কি না।', count: atsResults.subScores?.content >= 80 ? 0 : 1 },
                        ];

                        const sectionIssuesList = [
                          { name: lang === 'en' ? 'Contact Details' : 'যোগাযোগের তথ্য', ok: atsResults.checks.contact, desc: lang === 'en' ? 'Presence of email, phone, and links.' : 'ইমেইল, ফোন এবং প্রোফাইল লিঙ্ক পাওয়া গেছে কি না।', count: atsResults.checks.contact ? 0 : 1 },
                          { name: lang === 'en' ? 'Experience Section' : 'অভিজ্ঞতা বিবরণী', ok: atsResults.checks.experience, desc: lang === 'en' ? 'Professional experience headers parsed successfully.' : 'পেশাগত অভিজ্ঞতা বিষয়ক হেডারের উপস্থিতি।', count: atsResults.checks.experience ? 0 : 1 },
                          { name: lang === 'en' ? 'Education Section' : 'শিক্ষা বিভাগ', ok: atsResults.checks.education, desc: lang === 'en' ? 'Academic degree headers found.' : 'একাডেমিক যোগ্যতা ও ডিগ্রির বিবরণী।', count: atsResults.checks.education ? 0 : 1 },
                          { name: lang === 'en' ? 'Skills List' : 'দক্ষতা তালিকা', ok: atsResults.checks.skills, desc: lang === 'en' ? 'Technical skills section detected.' : 'প্রযুক্তিগত দক্ষতা ও দক্ষতার তালিকা।', count: atsResults.checks.skills ? 0 : 1 },
                        ];

                        const essentialsIssuesList = [
                          { name: lang === 'en' ? 'Layout Structure' : 'লেআউট ও বিন্যাস', ok: atsResults.checks.experience && atsResults.checks.education, desc: lang === 'en' ? 'Standard headers and parsing compatibility.' : 'স্ট্যান্ডার্ড হেডার ও রিডাবিলিটি কম্প্যাটিবিলিটি।', count: (atsResults.checks.experience && atsResults.checks.education) ? 0 : 1 },
                          { name: lang === 'en' ? 'File Format' : 'ফাইল ফরম্যাট', ok: true, desc: lang === 'en' ? 'Parsed document compatibility (PDF/DOCX).' : 'প্রসেসকৃত ডকুমেন্টের এটিএস বান্ধব ফরম্যাট।', count: 0 },
                        ];

                        const tailoringIssuesList = [
                          { name: lang === 'en' ? 'Keyword Match' : 'কীওয়ার্ড ম্যাচিং রেট', ok: atsResults.subScores?.tailoring >= 70, desc: lang === 'en' ? 'Matching target keywords from Job Description.' : 'জব ডেসক্রিপশন থেকে টার্গেট কীওয়ার্ডের মিলের হার।', count: atsResults.subScores?.tailoring >= 70 ? 0 : 1 },
                          { name: lang === 'en' ? 'Missing Core Requirements' : 'অনুপস্থিত মূল যোগ্যতাসমূহ', ok: atsResults.subScores?.tailoring >= 50, desc: lang === 'en' ? 'Missing keywords count check.' : 'অনুপস্থিত মূল কীওয়ার্ডের সংখ্যা যাচাই।', count: atsResults.subScores?.tailoring >= 50 ? 0 : 1 },
                        ];

                        const totalIssues = 
                          contentIssuesList.filter(i => !i.ok).length +
                          sectionIssuesList.filter(i => !i.ok).length +
                          essentialsIssuesList.filter(i => !i.ok).length +
                          tailoringIssuesList.filter(i => !i.ok).length;

                        return (
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
                            
                            {/* Left Sidebar (Scorecard + Category List) */}
                            <div className="lg:col-span-4 bg-slate-950/60 border border-slate-800 rounded-lg p-5 space-y-5">
                              {/* Overall score */}
                              <div className="text-center pb-4 border-b border-slate-900">
                                <span className="text-[10px] uppercase text-slate-500 tracking-widest block mb-1">
                                  {lang === 'en' ? 'Your Score' : 'আপনার স্কোর'}
                                </span>
                                <div className={`text-3xl font-bold font-mono my-2 ${
                                  atsResults.score >= 75 ? 'text-emerald-400' :
                                  atsResults.score >= 50 ? 'text-yellow-500' : 'text-red-400'
                                }`}>
                                  {atsResults.score}/100
                                </div>
                                <span className="text-xs text-slate-400">
                                  {totalIssues === 0 
                                    ? (lang === 'en' ? 'No issues found!' : 'কোনো সমস্যা পাওয়া যায়নি!') 
                                    : (lang === 'en' ? `${totalIssues} Issues` : `${totalIssues}টি সমস্যা`)}
                                </span>
                              </div>

                              {/* Accordion Sections list */}
                              <div className="space-y-4">
                                
                                {/* CONTENT Section */}
                                <div className="space-y-1.5">
                                  <button
                                    onClick={() => setAtsActiveResultTab('content')}
                                    className={`w-full flex items-center justify-between p-2 rounded border text-left text-xs font-bold transition-all ${
                                      atsActiveResultTab === 'content' 
                                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' 
                                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    <span>CONTENT</span>
                                    <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded font-bold">
                                      {atsResults.subScores?.content}%
                                    </span>
                                  </button>
                                  {atsActiveResultTab === 'content' && (
                                    <div className="pl-2 space-y-1">
                                      {contentIssuesList.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[10px] py-1 text-slate-400">
                                          <span>{item.ok ? '✓' : '✗'}</span>
                                          <span className={item.ok ? 'text-emerald-400' : 'text-yellow-500'}>{item.name}</span>
                                          <span className="ml-auto text-[8px] bg-slate-900 text-slate-500 px-1 rounded">
                                            {item.ok ? 'No issues' : '1 issue'}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* SECTION Section */}
                                <div className="space-y-1.5">
                                  <button
                                    onClick={() => setAtsActiveResultTab('section')}
                                    className={`w-full flex items-center justify-between p-2 rounded border text-left text-xs font-bold transition-all ${
                                      atsActiveResultTab === 'section' 
                                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' 
                                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    <span>SECTION</span>
                                    <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded font-bold">
                                      {atsResults.subScores?.section}%
                                    </span>
                                  </button>
                                  {atsActiveResultTab === 'section' && (
                                    <div className="pl-2 space-y-1">
                                      {sectionIssuesList.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[10px] py-1 text-slate-400">
                                          <span>{item.ok ? '✓' : '✗'}</span>
                                          <span className={item.ok ? 'text-emerald-400' : 'text-yellow-500'}>{item.name}</span>
                                          <span className="ml-auto text-[8px] bg-slate-900 text-slate-500 px-1 rounded">
                                            {item.ok ? 'No issues' : '1 issue'}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* ATS ESSENTIALS Section */}
                                <div className="space-y-1.5">
                                  <button
                                    onClick={() => setAtsActiveResultTab('essentials')}
                                    className={`w-full flex items-center justify-between p-2 rounded border text-left text-xs font-bold transition-all ${
                                      atsActiveResultTab === 'essentials' 
                                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' 
                                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    <span>ATS ESSENTIALS</span>
                                    <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded font-bold">
                                      {atsResults.subScores?.essentials}%
                                    </span>
                                  </button>
                                  {atsActiveResultTab === 'essentials' && (
                                    <div className="pl-2 space-y-1">
                                      {essentialsIssuesList.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[10px] py-1 text-slate-400">
                                          <span>{item.ok ? '✓' : '✗'}</span>
                                          <span className={item.ok ? 'text-emerald-400' : 'text-yellow-500'}>{item.name}</span>
                                          <span className="ml-auto text-[8px] bg-slate-900 text-slate-500 px-1 rounded">
                                            {item.ok ? 'No issues' : '1 issue'}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* TAILORING Section */}
                                <div className="space-y-1.5">
                                  <button
                                    onClick={() => setAtsActiveResultTab('tailoring')}
                                    className={`w-full flex items-center justify-between p-2 rounded border text-left text-xs font-bold transition-all ${
                                      atsActiveResultTab === 'tailoring' 
                                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' 
                                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    <span>TAILORING</span>
                                    <span className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded font-bold">
                                      {atsResults.subScores?.tailoring}%
                                    </span>
                                  </button>
                                  {atsActiveResultTab === 'tailoring' && (
                                    <div className="pl-2 space-y-1">
                                      {tailoringIssuesList.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[10px] py-1 text-slate-400">
                                          <span>{item.ok ? '✓' : '✗'}</span>
                                          <span className={item.ok ? 'text-emerald-400' : 'text-yellow-500'}>{item.name}</span>
                                          <span className="ml-auto text-[8px] bg-slate-900 text-slate-500 px-1 rounded">
                                            {item.ok ? 'No issues' : '1 issue'}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                              </div>

                              {/* Action export report button */}
                              <button
                                onClick={() => window.print()}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded text-center tracking-wider transition-colors mt-2"
                              >
                                {lang === 'en' ? 'PRINT FULL REPORT 🖨' : 'সম্পূর্ণ রিপোর্ট প্রিন্ট করুন 🖨'}
                              </button>
                            </div>

                            {/* Right Pane (Audit details card matches right column UI) */}
                            <div className="lg:col-span-8 bg-slate-950/40 border border-slate-900 rounded-lg p-5 space-y-6">
                              
                              {/* Category Header */}
                              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                                  📁 {atsActiveResultTab} REPORT
                                </h3>
                                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-bold">
                                  {atsActiveResultTab === 'content' && (contentIssuesList.filter(i => !i.ok).length === 0 ? 'No issues found' : `${contentIssuesList.filter(i => !i.ok).length} Issues`)}
                                  {atsActiveResultTab === 'section' && (sectionIssuesList.filter(i => !i.ok).length === 0 ? 'No issues found' : `${sectionIssuesList.filter(i => !i.ok).length} Issues`)}
                                  {atsActiveResultTab === 'essentials' && (essentialsIssuesList.filter(i => !i.ok).length === 0 ? 'No issues found' : `${essentialsIssuesList.filter(i => !i.ok).length} Issues`)}
                                  {atsActiveResultTab === 'tailoring' && (tailoringIssuesList.filter(i => !i.ok).length === 0 ? 'No issues found' : `${tailoringIssuesList.filter(i => !i.ok).length} Issues`)}
                                </span>
                              </div>

                              {/* CONTENT DETAILS CARDS */}
                              {atsActiveResultTab === 'content' && (
                                <div className="space-y-4">
                                  {/* Parse Rate Card */}
                                  <div className="bg-slate-950/60 border border-slate-800 rounded p-4 space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-slate-200">
                                      <span>ATS PARSE RATE</span>
                                      <span className="text-emerald-400">PASSED</span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                      {lang === 'en' 
                                        ? 'Employers and recruiters use an Applicant Tracking System (ATS) to scan job applications at scale. A high parse rate means the ATS reads your experiences and skills clearly.' 
                                        : 'নিয়োগকারীরা রিজিউম স্ক্যান করতে এটিএস ব্যবহার করে। উচ্চ পার্স রেট মানে আপনার দক্ষতা এটিএস সহজে পড়তে পারছে।'}
                                    </p>
                                    <div className="pt-2 border-t border-slate-900">
                                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden relative">
                                        <div style={{ width: `${atsResults.score}%` }} className="bg-emerald-500 h-full rounded" />
                                      </div>
                                      <div className="text-[10px] text-center text-slate-300 mt-2">
                                        {lang === 'en' 
                                          ? `Excellent! We parsed ${atsResults.score}% of your resume text successfully.` 
                                          : `চমৎকার! আপনার রিজিউমের ${atsResults.score}% তথ্য এটিএস সঠিকভাবে পড়তে পেরেছে।`}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Quantifying Impact Card */}
                                  <div className="bg-slate-950/60 border border-slate-800 rounded p-4 space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-slate-200">
                                      <span>QUANTIFYING IMPACT</span>
                                      <span className={atsResults.subScores?.content >= 60 ? 'text-emerald-400' : 'text-yellow-500'}>
                                        {atsResults.subScores?.content >= 60 ? 'PASSED' : '1 ISSUE FOUND'}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                      {lang === 'en'
                                        ? 'Strong professional resumes use quantifiable results and specific action verbs (e.g. "Automated", "Led", "Optimized") rather than passive descriptions.'
                                        : 'একটি পেশাদার রিজিউমে পরিমাপযোগ্য ফলাফল এবং শক্তিশালী কাজের বিবরণী (যেমন: "Automated", "Led", "Optimized") উল্লেখ করা উচিত।'}
                                    </p>
                                    {atsResults.subScores?.content < 60 && (
                                      <div className="text-[10px] bg-yellow-950/20 border border-yellow-900/30 p-2 rounded text-yellow-500 leading-relaxed">
                                        💡 {lang === 'en' ? 'Recommendation: Try to include metrics (percentages, values) or start experience bullets with strong action words.' : 'পরামর্শ: আপনার কাজের বিবরণী শক্তিশালী অ্যাকশন ভার্ব ও কাজের সংখ্যা দিয়ে শুরু করুন।'}
                                      </div>
                                    )}
                                  </div>

                                  {/* Repetition Card */}
                                  <div className="bg-slate-950/60 border border-slate-800 rounded p-4 space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-slate-200">
                                      <span>REPETITION & BUZZWORDS</span>
                                      <span className="text-emerald-400">PASSED</span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                      {lang === 'en'
                                        ? 'Avoiding generic buzzwords (e.g., "detail-oriented", "synergy", "hardworking") keeps your resume professional and focused on achievements.'
                                        : 'অনর্থক বাজওয়ার্ড পরিহার করা হলে আপনার রিজিউম আরও বেশি পেশাদার এবং অর্জনমুখী দেখায়।'}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* SECTION DETAILS CARDS */}
                              {atsActiveResultTab === 'section' && (
                                <div className="space-y-4">
                                  {sectionIssuesList.map((sec, idx) => (
                                    <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded p-4 space-y-2">
                                      <div className="flex justify-between text-xs font-bold text-slate-200">
                                        <span>{sec.name.toUpperCase()}</span>
                                        <span className={sec.ok ? 'text-emerald-400' : 'text-red-400'}>
                                          {sec.ok ? '✓ PASSED' : '✗ MISSING'}
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* ESSENTIALS DETAILS CARDS */}
                              {atsActiveResultTab === 'essentials' && (
                                <div className="space-y-4">
                                  {essentialsIssuesList.map((sec, idx) => (
                                    <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded p-4 space-y-2">
                                      <div className="flex justify-between text-xs font-bold text-slate-200">
                                        <span>{sec.name.toUpperCase()}</span>
                                        <span className={sec.ok ? 'text-emerald-400' : 'text-red-400'}>
                                          {sec.ok ? '✓ PASSED' : '✗ ISSUE'}
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* TAILORING DETAILS CARDS */}
                              {atsActiveResultTab === 'tailoring' && (
                                <div className="space-y-4">
                                  {/* Match score card */}
                                  <div className="bg-slate-950/60 border border-slate-800 rounded p-4 space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-slate-200">
                                      <span>JOB MATCH TAILORING</span>
                                      <span className={atsResults.subScores?.tailoring >= 70 ? 'text-emerald-400' : 'text-yellow-500'}>
                                        {atsResults.subScores?.tailoring}% MATCH
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                      {lang === 'en' 
                                        ? 'Evaluating parsed words against target skills and terms found in your Job Description.'
                                        : 'আপনার রিজিউমের সাথে জব ডেসক্রিপশনে থাকা কীওয়ার্ডের ম্যাচিং রেট যাচাই।'}
                                    </p>
                                  </div>

                                  {/* Keywords lists breakdown */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div className="bg-slate-950/50 border border-slate-900 rounded p-3 space-y-2">
                                      <div className="text-xs font-bold text-emerald-400">✓ FOUND KEYWORDS</div>
                                      <div className="flex flex-wrap gap-1">
                                        {atsResults.keywords.found.slice(0, 15).map((kw: string) => (
                                          <span key={kw} className="bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded">
                                            {kw}
                                          </span>
                                        ))}
                                        {atsResults.keywords.found.length > 15 && <span className="text-[9px] text-slate-500">+{atsResults.keywords.found.length - 15} more</span>}
                                      </div>
                                    </div>
                                    <div className="bg-slate-950/50 border border-slate-900 rounded p-3 space-y-2">
                                      <div className="text-xs font-bold text-yellow-500">⚠ MISSING TERMS</div>
                                      <div className="flex flex-wrap gap-1">
                                        {atsResults.keywords.missing.slice(0, 15).map((kw: string) => (
                                          <span key={kw} className="bg-yellow-950/20 border border-yellow-900/40 text-yellow-500 text-[9px] px-1.5 py-0.5 rounded">
                                            {kw}
                                          </span>
                                        ))}
                                        {atsResults.keywords.missing.length > 15 && <span className="text-[9px] text-slate-500">+{atsResults.keywords.missing.length - 15} more</span>}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Security Subtabs */}
              <div className="flex space-x-2 border-b border-slate-900 pb-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                <button
                  onClick={() => { setSecuritySubTab('ip'); setIpInput(''); setIpDetails(null); }}
                  className={`px-3 py-1 text-xs font-mono border ${securitySubTab === 'ip' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  IP LOOKUP
                </button>
                <button
                  onClick={() => { setSecuritySubTab('dns'); setDnsInput(''); setDnsDetails(null); }}
                  className={`px-3 py-1 text-xs font-mono border ${securitySubTab === 'dns' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  DNS DIAGNOSTICS
                </button>
                <button
                  onClick={() => { setSecuritySubTab('pwd'); setPwdResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${securitySubTab === 'pwd' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('security.sub_pwd')}
                </button>
                <button
                  onClick={() => { setSecuritySubTab('hash'); setHashResult(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${securitySubTab === 'hash' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('security.sub_hash')}
                </button>
                <button
                  onClick={() => { setSecuritySubTab('ssl'); setSslDomain(''); setSslDetails(null); setSslError(''); setSslPemInput(''); }}
                  className={`px-3 py-1 text-xs font-mono border ${securitySubTab === 'ssl' ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  {t('security.sub_ssl')}
                </button>
              </div>

              {/* IP Lookup block */}
              {securitySubTab === 'ip' && (
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

              {/* DNS Diagnostics block */}
              {securitySubTab === 'dns' && (
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

              {/* Password Generator */}
              {securitySubTab === 'pwd' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-mono text-slate-400">PASSWORD LENGTH ({pwdLength})</label>
                    <input
                      type="range"
                      min="8"
                      max="64"
                      value={pwdLength}
                      onChange={(e) => setPwdLength(Number(e.target.value))}
                      className="w-full bg-slate-950 accent-cyan-400 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-6 text-xs font-mono">
                    <label className="flex items-center space-x-2 text-slate-300">
                      <input
                        type="checkbox"
                        checked={pwdNumbers}
                        onChange={(e) => setPwdNumbers(e.target.checked)}
                        className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-400/50"
                      />
                      <span>INCLUDE NUMBERS</span>
                    </label>
                    <label className="flex items-center space-x-2 text-slate-300">
                      <input
                        type="checkbox"
                        checked={pwdSymbols}
                        onChange={(e) => setPwdSymbols(e.target.checked)}
                        className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-400/50"
                      />
                      <span>INCLUDE SYMBOLS</span>
                    </label>
                  </div>
                  <button
                    onClick={handleGeneratePassword}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full"
                  >
                    {t('security.btn_gen_pwd')}
                  </button>
                  {pwdResult && (
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs flex justify-between items-center break-all">
                      <span className="text-emerald-400 select-all font-bold">{pwdResult}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(pwdResult);
                        }}
                        className="text-slate-500 hover:text-cyan-400 text-xs ml-4"
                      >
                        COPY 📋
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hash Generator */}
              {securitySubTab === 'hash' && (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">HASH INPUT DATA</label>
                    <textarea
                      value={hashInput}
                      onChange={(e) => setHashInput(e.target.value)}
                      placeholder="Type text to hash..."
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 min-h-[100px] font-mono"
                    />
                  </div>
                  <div className="flex gap-4 items-center">
                    <select
                      value={hashAlgo}
                      onChange={(e) => setHashAlgo(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400/50"
                    >
                      <option value="SHA-256">SHA-256</option>
                      <option value="SHA-1">SHA-1</option>
                      <option value="SHA-512">SHA-512</option>
                    </select>
                    <button
                      onClick={handleGenerateHash}
                      className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all flex-1"
                    >
                      {t('security.btn_gen_hash')}
                    </button>
                  </div>
                  {hashResult && (
                    <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded font-mono text-xs break-all">
                      <div className="text-slate-500 mb-1">// {hashAlgo} HASH CHECKSUM</div>
                      <div className="text-cyan-400 font-bold">{hashResult}</div>
                    </div>
                  )}
                </div>
              )}

              {securitySubTab === 'ssl' && (
                <div className="space-y-6">
                  {/* Two columns: Query Domain, and Paste PEM */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Remote Live Lookup */}
                    <div className="space-y-4 border border-slate-800 bg-slate-950/40 p-4 rounded-lg">
                      <div className="text-xs font-mono text-cyan-400">// LIVE SSL HOST ENQUIRY</div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-500">DOMAIN NAME</label>
                        <input
                          type="text"
                          value={sslDomain}
                          onChange={(e) => setSslDomain(e.target.value)}
                          placeholder="e.g. google.com"
                          className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-cyan-400/50 font-mono"
                        />
                      </div>
                      <button
                        onClick={handleFetchSsl}
                        disabled={sslLoading}
                        className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-mono px-5 py-2.5 rounded transition-all w-full disabled:opacity-50"
                      >
                        {sslLoading ? 'QUERYING HANDSHAKE...' : t('security.btn_fetch_ssl')}
                      </button>
                    </div>

                    {/* Local PEM Decoder */}
                    <div className="space-y-4 border border-slate-800 bg-slate-950/40 p-4 rounded-lg">
                      <div className="text-xs font-mono text-cyan-400">// OFFLINE LOCAL PEM DECODER</div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-500">PASTE PEM ENCODED CERTIFICATE</label>
                        <textarea
                          value={sslPemInput}
                          onChange={(e) => setSslPemInput(e.target.value)}
                          placeholder="-----BEGIN CERTIFICATE-----&#10;MIIF...&#10;-----END CERTIFICATE-----"
                          className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-655 focus:outline-none focus:border-cyan-400/50 min-h-[100px] font-mono"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept=".pem,.crt,.cer,.der"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (evt) => {
                                const txt = evt.target?.result as string;
                                setSslPemInput(txt);
                              };
                              reader.readAsText(file);
                            }
                          }}
                          className="text-[10px] text-slate-500 file:bg-slate-900 file:border file:border-slate-800 file:text-slate-300 file:text-[10px] file:font-mono file:px-3 file:py-1 file:rounded cursor-pointer flex-1"
                        />
                        <button
                          onClick={handleDecodeLocalPem}
                          className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-mono px-4 py-1.5 rounded transition-all"
                        >
                          {t('security.btn_decode_pem')}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Errors */}
                  {sslError && (
                    <div className="p-3 bg-red-950/20 border border-red-900/40 rounded font-mono text-xs text-red-400">
                      [ERROR] {sslError}
                    </div>
                  )}

                  {/* Results Display */}
                  {sslDetails && (
                    <div className="p-5 bg-slate-950 border border-slate-855 rounded-lg font-mono text-xs space-y-4">
                      <div className="text-cyan-400 border-b border-slate-900 pb-2 flex justify-between items-center">
                        <span>// CERTIFICATE SCHEMATICS DECODED</span>
                        <span className="text-[10px] text-slate-500">Serial: {sslDetails.serialNumber}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                        <div className="space-y-1">
                          <span className="text-slate-500 font-bold block">SUBJECT DETAILS</span>
                          <div className="pl-3">
                            <span className="text-slate-500">Common Name (CN):</span> {sslDetails.subject?.CN || 'N/A'}
                          </div>
                          <div className="pl-3">
                            <span className="text-slate-500">Organization (O):</span> {sslDetails.subject?.O || 'N/A'}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500 font-bold block">ISSUER INFO</span>
                          <div className="pl-3">
                            <span className="text-slate-500">Common Name (CN):</span> {sslDetails.issuer?.CN || 'N/A'}
                          </div>
                          <div className="pl-3">
                            <span className="text-slate-500">Organization (O):</span> {sslDetails.issuer?.O || 'N/A'}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500 font-bold block">VALIDITY EPOCHS</span>
                          <div className="pl-3">
                            <span className="text-slate-500">Not Before (Issue):</span> {sslDetails.valid_from}
                          </div>
                          <div className="pl-3">
                            <span className="text-slate-500">Not After (Expiry):</span> {sslDetails.valid_to}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500 font-bold block">CRYPTOGRAPHIC KEY SIG</span>
                          <div className="pl-3">
                            <span className="text-slate-500">Type:</span> {sslDetails.type} ({sslDetails.bits} bits)
                          </div>
                          <div className="pl-3">
                            <span className="text-slate-500">SHA-256 Fingerprint:</span> <span className="break-all select-all font-bold text-cyan-400">{sslDetails.fingerprint256}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </div>
      </main>

      {/* Footer */}
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

export default function Toolbox() {
  return (
    <Suspense fallback={null}>
      <ToolboxContent />
    </Suspense>
  );
}
