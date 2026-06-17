'use client';

import { useState, useEffect } from 'react';

export default function UtilityWidgets() {
  const [uptime, setUptime] = useState({ days: 1, hours: 14, mins: 32, secs: 5 });

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => {
        let s = prev.secs + 1;
        let m = prev.mins;
        let h = prev.hours;
        let d = prev.days;

        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h += 1;
        }
        if (h >= 24) {
          h = 0;
          d += 1;
        }

        return { days: d, hours: h, mins: m, secs: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
      {/* Live Uptime */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col justify-between cyber-glow">
        <span className="text-slate-500 uppercase tracking-wider">Operational Uptime</span>
        <div className="text-lg font-bold text-cyan-400 mt-2">
          UPTIME: {pad(uptime.days)}d:{pad(uptime.hours)}h:{pad(uptime.mins)}m:{pad(uptime.secs)}s
        </div>
      </div>

      {/* EDR Shields */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col justify-between cyber-glow">
        <span className="text-slate-500 uppercase tracking-wider">EDR Shield Status</span>
        <div className="grid grid-cols-2 gap-1 mt-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300">S1 [Active]</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300">Bitdef [Active]</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300">Datto [Active]</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300">FW [On]</span>
          </div>
        </div>
      </div>

      {/* Network Metadata */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col justify-between cyber-glow">
        <span className="text-slate-500 uppercase tracking-wider">Security Tunnel Details</span>
        <div className="space-y-1 mt-2 text-slate-300">
          <div>Geo-IP: <span className="text-cyan-400">103.43.14.92 (Dhaka, BD)</span></div>
          <div>Target: <span className="text-cyan-400">Sydney, AU (Remote Ops)</span></div>
        </div>
      </div>
    </div>
  );
}
