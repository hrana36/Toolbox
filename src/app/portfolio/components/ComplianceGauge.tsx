'use client';

import { useState, useEffect } from 'react';

interface SecurityCheck {
  name: string;
  status: string;
  passed: boolean;
  color: string;
}

export default function ComplianceGauge() {
  const [score, setScore] = useState<number>(0);
  const [statusLabel, setStatusLabel] = useState<string>('SCANNING');
  const [statusColor, setStatusColor] = useState<string>('text-slate-400');
  const [checks, setChecks] = useState<SecurityCheck[]>([
    { name: 'HTTPS Connection', status: 'SCANNING', passed: false, color: 'text-slate-500' },
    { name: 'Secure Context', status: 'SCANNING', passed: false, color: 'text-slate-500' },
    { name: 'Cookies Enabled', status: 'SCANNING', passed: false, color: 'text-slate-500' },
    { name: 'Do Not Track', status: 'SCANNING', passed: false, color: 'text-slate-500' },
    { name: 'Ad Blocker', status: 'SCANNING', passed: false, color: 'text-slate-500' },
    { name: 'WebRTC Leak Risk', status: 'SCANNING', passed: false, color: 'text-slate-500' },
    { name: 'Screen Lock', status: 'SCANNING', passed: false, color: 'text-slate-500' },
  ]);

  useEffect(() => {
    let isMounted = true;

    const runDiagnostics = async () => {
      const hasHttps = typeof location !== 'undefined' && location.protocol === 'https:';
      const hasSecureContext = typeof window !== 'undefined' && window.isSecureContext === true;
      const hasCookies = typeof navigator !== 'undefined' && navigator.cookieEnabled === true;
      
      const hasDNT = typeof navigator !== 'undefined' && (
        navigator.doNotTrack === '1' || 
        (navigator as any).msDoNotTrack === '1' || 
        (window as any).doNotTrack === '1'
      );
      
      let hasAdBlocker = false;
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        try {
          // Attempt to load doubleclick/google ad script
          await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store'
          });
        } catch (e) {
          hasAdBlocker = true;
        }
      }

      const hasWebRTCRisk = typeof window !== 'undefined' && 'RTCPeerConnection' in window;
      const hasScreenLock = typeof navigator !== 'undefined' && !!navigator.credentials;

      // Calculate score
      let currentScore = 0;
      if (hasHttps) currentScore += 20;
      if (hasSecureContext) currentScore += 20;
      if (hasCookies) currentScore += 10;
      if (hasDNT) currentScore += 15;
      if (hasAdBlocker) currentScore += 15;
      if (!hasWebRTCRisk) currentScore += 10;
      if (hasScreenLock) currentScore += 10;

      let label = 'Vulnerable';
      let color = 'text-red-400';

      if (currentScore >= 80) {
        label = 'Optimal';
        color = 'text-emerald-400';
      } else if (currentScore >= 50) {
        label = 'Warning';
        color = 'text-yellow-400';
      }

      const list: SecurityCheck[] = [
        { 
          name: 'HTTPS Connection', 
          status: hasHttps ? 'SECURE' : 'INSECURE', 
          passed: hasHttps, 
          color: hasHttps ? 'text-emerald-400' : 'text-red-400' 
        },
        { 
          name: 'Secure Context', 
          status: hasSecureContext ? 'YES' : 'NO', 
          passed: hasSecureContext, 
          color: hasSecureContext ? 'text-emerald-400' : 'text-red-400' 
        },
        { 
          name: 'Cookies Enabled', 
          status: hasCookies ? 'ENABLED' : 'DISABLED', 
          passed: hasCookies, 
          color: hasCookies ? 'text-emerald-400' : 'text-amber-400' 
        },
        { 
          name: 'Do Not Track', 
          status: hasDNT ? 'ACTIVE' : 'INACTIVE', 
          passed: hasDNT, 
          color: hasDNT ? 'text-emerald-400' : 'text-slate-400' 
        },
        { 
          name: 'Ad Blocker', 
          status: hasAdBlocker ? 'DETECTED' : 'NOT FOUND', 
          passed: hasAdBlocker, 
          color: hasAdBlocker ? 'text-emerald-400' : 'text-slate-400' 
        },
        { 
          name: 'WebRTC Leak Risk', 
          status: hasWebRTCRisk ? 'RISK FOUND' : 'PROTECTED', 
          passed: !hasWebRTCRisk, 
          color: hasWebRTCRisk ? 'text-amber-400' : 'text-emerald-400' 
        },
        { 
          name: 'Screen Lock', 
          status: hasScreenLock ? 'AVAILABLE' : 'UNAVAILABLE', 
          passed: hasScreenLock, 
          color: hasScreenLock ? 'text-emerald-400' : 'text-slate-400' 
        },
      ];

      if (isMounted) {
        setScore(currentScore);
        setStatusLabel(label);
        setStatusColor(color);
        setChecks(list);
      }
    };

    runDiagnostics();
    return () => {
      isMounted = false;
    };
  }, []);

  // Determine dynamic stroke color
  const getStrokeColor = () => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 50) return '#eab308'; // yellow-500
    return '#f43f5e'; // rose-500
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-5 flex flex-col items-center cyber-glow">
      <h3 className="text-slate-400 text-xs font-mono mb-4 uppercase tracking-wider">Compliance & Security Gauge</h3>
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Simple SVG radial track & circle */}
        <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
          <circle 
            cx="80" 
            cy="80" 
            r="64" 
            stroke="#1e293b" 
            strokeWidth="8" 
            fill="transparent" 
          />
          <circle 
            cx="80" 
            cy="80" 
            r="64" 
            stroke={getStrokeColor()} 
            strokeWidth="8" 
            fill="transparent" 
            strokeDasharray="402"
            strokeDashoffset={402 - (402 * score) / 100}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-xs font-mono uppercase tracking-widest text-green-glow ${statusColor}`}>
            {statusLabel}
          </span>
          <span className="text-3xl font-extrabold text-white">{score}%</span>
        </div>
      </div>
      <div className="w-full mt-4 space-y-2 border-t border-slate-800 pt-3 text-xs font-mono">
        {checks.map((check) => (
          <div key={check.name} className="flex justify-between">
            <span className="text-slate-500">{check.name}:</span>
            <span className={check.color}>{check.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
