'use client';

export default function ComplianceGauge() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 flex flex-col items-center cyber-glow">
      <h3 className="text-slate-400 text-xs font-mono mb-4 uppercase tracking-wider">Compliance & Security Gauge</h3>
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Simple SVG radial track & circle */}
        <svg className="w-full h-full transform -rotate-90">
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
            stroke="#10b981" 
            strokeWidth="8" 
            fill="transparent" 
            strokeDasharray="402"
            strokeDashoffset="16" /* 96% completion */
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest text-green-glow">Secure</span>
          <span className="text-3xl font-extrabold text-white">96%</span>
        </div>
      </div>
      <div className="w-full mt-4 space-y-2 border-t border-slate-850 pt-3 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-slate-500">System Health:</span>
          <span className="text-emerald-400">Optimal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Vulnerabilities:</span>
          <span className="text-yellow-400">3 Low / 0 High</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Standard:</span>
          <span className="text-cyan-400">ISO 27001</span>
        </div>
      </div>
    </div>
  );
}
