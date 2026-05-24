import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, ShieldCheck } from 'lucide-react';

export default function Policies() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl max-w-xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <ScrollText className="w-4 h-4 text-emerald-400" />
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">policy.json Governance Node</h2>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">
        Operational Thresholds: <span className="text-emerald-400 font-mono font-bold">Male (0.630)</span> | <span className="text-emerald-400 font-mono font-bold">Female (0.200)</span>
      </p>
      <div className="mt-4 p-3 bg-slate-900/40 rounded-xl border border-white/[0.01] flex items-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Target Demographic Parity index locked to &gt;= 0.80 boundary.</span>
      </div>
    </motion.div>
  );
}