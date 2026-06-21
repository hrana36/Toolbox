'use client';

import { useState, useEffect } from 'react';

export default function UtilityWidgets() {
  const [uptime, setUptime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [deviceInfo, setDeviceInfo] = useState({
    os: '...', browser: '...', cores: '...', ram: '...', screen: '...', gpu: '...'
  });
  const [netInfo, setNetInfo] = useState({
    online: true, type: '...', downlink: '...', timezone: '...', language: '...'
  });

  useEffect(() => {
    // Session uptime
    const updateUptime = () => {
      const totalSecs = Math.floor(performance.now() / 1000);
      const d = Math.floor(totalSecs / 86400);
      const h = Math.floor((totalSecs % 86400) / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;
      setUptime({ days: d, hours: h, mins: m, secs: s });
    };
    updateUptime();
    const timer = setInterval(updateUptime, 1000);

    // Device info
    const ua = navigator.userAgent;
    let os = 'Unknown';
    if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
    else if (ua.includes('Windows NT')) os = 'Windows';
    else if (ua.includes('Mac OS X')) os = 'macOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('CrOS')) os = 'ChromeOS';

    let browser = 'Unknown';
    if (ua.includes('Edg/')) browser = 'Edge';
    else if (ua.includes('Chrome/')) browser = 'Chrome';
    else if (ua.includes('Firefox/')) browser = 'Firefox';
    else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';

    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : 'N/A';
    const ram = (navigator as any).deviceMemory ? `~${(navigator as any).deviceMemory} GB` : 'N/A';
    const screenRes = `${screen.width}×${screen.height}`;

    // GPU detection via WebGL
    let gpu = 'N/A';
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const ext = (gl as any).getExtension('WEBGL_debug_renderer_info');
        if (ext) {
          gpu = (gl as any).getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'N/A';
          if (gpu.length > 28) gpu = gpu.substring(0, 26) + '..';
        }
      }
    } catch { /* silently fail */ }

    setDeviceInfo({ os, browser, cores, ram, screen: screenRes, gpu });

    // Network info
    const conn = (navigator as any).connection;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    const lang = navigator.language || 'en-US';

    const updateNet = () => {
      const c = (navigator as any).connection;
      setNetInfo({
        online: navigator.onLine,
        type: c?.effectiveType?.toUpperCase() || 'Unknown',
        downlink: c?.downlink ? `${c.downlink} Mbps` : 'N/A',
        timezone: tz,
        language: lang
      });
    };
    updateNet();

    window.addEventListener('online', updateNet);
    window.addEventListener('offline', updateNet);
    conn?.addEventListener?.('change', updateNet);

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', updateNet);
      window.removeEventListener('offline', updateNet);
      conn?.removeEventListener?.('change', updateNet);
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
      {/* Live Uptime */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col justify-between cyber-glow">
        <span className="text-slate-500 uppercase tracking-wider">Session Uptime</span>
        <div className="text-lg font-bold text-cyan-400 mt-2">
          TIME: {pad(uptime.days)}d:{pad(uptime.hours)}h:{pad(uptime.mins)}m:{pad(uptime.secs)}s
        </div>
      </div>

      {/* Device Specs - Real data from browser */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col justify-between cyber-glow">
        <span className="text-slate-500 uppercase tracking-wider">Device Profile</span>
        <div className="grid grid-cols-2 gap-1 mt-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="text-slate-300">OS: <span className="text-cyan-400">{deviceInfo.os}</span></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="text-slate-300">CPU: <span className="text-cyan-400">{deviceInfo.cores}</span></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="text-slate-300">App: <span className="text-cyan-400">{deviceInfo.browser}</span></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="text-slate-300">RAM: <span className="text-cyan-400">{deviceInfo.ram}</span></span>
          </div>
          <div className="flex items-center space-x-1.5 col-span-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="text-slate-300">GPU: <span className="text-cyan-400">{deviceInfo.gpu}</span></span>
          </div>
        </div>
      </div>

      {/* Connection Status - Real data from browser */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col justify-between cyber-glow">
        <span className="text-slate-500 uppercase tracking-wider">Connection Status</span>
        <div className="space-y-1 mt-2 text-slate-300">
          <div className="flex items-center space-x-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${netInfo.online ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span>Status: <span className={netInfo.online ? 'text-emerald-400' : 'text-red-400'}>{netInfo.online ? 'ONLINE' : 'OFFLINE'}</span></span>
          </div>
          <div>Network: <span className="text-cyan-400">{netInfo.type} ({netInfo.downlink})</span></div>
          <div>Screen: <span className="text-cyan-400">{deviceInfo.screen}</span></div>
          <div>Timezone: <span className="text-cyan-400">{netInfo.timezone}</span></div>
        </div>
      </div>
    </div>
  );
}
