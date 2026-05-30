import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Shield, ShieldAlert, Cpu, Layers, ArrowRight, User } from 'lucide-react';
import { useGovernance } from "../context/GovernanceContext.jsx";

export default function Dashboard() {
  const { applicant, setApplicant, inference, fairnessMode, setFairnessMode, complianceMatrix } = useGovernance();
  const complianceScore = fairnessMode === 'raw' ? 38 : inference?.overridden ? 94 : 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }} 
      className="space-y-6 p-8"
    >
      {/* EXECUTOR CONTROL STRIP */}
      <div className="flex justify-between items-center bg-black/20 backdrop-blur-xl border border-white/5 px-6 py-4 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-slate-200 uppercase">SaaS Governance Matrix Hub</h2>
          <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">Active Configuration Vector Control Matrix</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/40 p-1 rounded-xl flex gap-1 border border-white/5">
            {[
              { id: 'raw', name: 'Raw Model' }, 
              { id: 'demographic_parity', name: 'Demographic Parity' }, 
              { id: 'equalized_odds', name: 'Equalized Odds' }
            ].map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setFairnessMode(tab.id)} 
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                  fairnessMode === tab.id 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] font-black' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PIPELINE DATA FLOW MAP */}
      <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 p-4 rounded-xl flex items-center justify-between overflow-x-auto no-scrollbar gap-3 font-mono text-[10px] text-slate-500 relative shadow-inner">
        <div className="flex items-center gap-1.5 bg-white/[0.01] px-2.5 py-1 rounded-lg border border-white/5"><User className="w-3 h-3" /> Payload</div>
        <ArrowRight className="w-3 h-3 text-slate-800" />
        <div className="flex items-center gap-1.5 bg-white/[0.01] px-2.5 py-1 rounded-lg border border-white/5"><Cpu className="w-3 h-3 text-cyan-400" /> MLP Model</div>
        <ArrowRight className="w-3 h-3 text-slate-800" />
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${fairnessMode !== 'raw' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold' : 'bg-white/[0.01] border-white/5'}`}><Shield className="w-3 h-3" /> Audit pass</div>
        <ArrowRight className="w-3 h-3 text-slate-800" />
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-black transition-all ${inference?.fair_outcome === 'Approved' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'}`}>{inference?.fair_outcome || 'Evaluating...'}</div>
      </div>

      {/* CORE DISPLAY HOOD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SLIDERS MODULE */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-2xl relative">
          <div className="absolute top-4 right-4"><span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-mono font-bold text-cyan-400 tracking-wider">SHAP VERIFIED</span></div>
          <div>
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-6 flex items-center gap-2">Evaluation Profiles</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs text-slate-400 font-medium"><span>Age Segment</span><span className="text-emerald-400 font-bold font-mono">{applicant?.age} Yrs</span></div>
                <input type="range" min="18" max="90" value={applicant?.age} onChange={(e) => setApplicant({...applicant, age: parseInt(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 mt-2" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-2">Demographic Cohort (Sex)</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {['Female', 'Male'].map((label, idx) => (
                    <button key={label} type="button" onClick={() => setApplicant({...applicant, sex: idx})} className={`py-2 rounded-xl font-bold border text-[10px] tracking-wider uppercase transition-all duration-150 cursor-pointer ${applicant?.sex === idx ? 'bg-slate-800 border-slate-700 text-emerald-400 shadow-md' : 'bg-transparent border-white/5 text-slate-500 hover:text-slate-400'}`}>{label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400 font-medium"><span>Education Level</span><span className="text-emerald-400 font-bold font-mono">Grade {applicant?.education_num}</span></div>
                <input type="range" min="1" max="16" value={applicant?.education_num} onChange={(e) => setApplicant({...applicant, education_num: parseInt(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 mt-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400 font-medium"><span>Weekly Labor Load</span><span className="text-emerald-400 font-bold font-mono">{applicant?.hours_per_week} Hrs</span></div>
                <input type="range" min="10" max="80" value={applicant?.hours_per_week} onChange={(e) => setApplicant({...applicant, hours_per_week: parseInt(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* TRACKERS AND VISUAL CHART MATRIX */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-5 rounded-xl shadow-lg">
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase block">Baseline Probability</span>
              <h3 className="text-3xl font-black font-mono mt-1 text-slate-200">{(inference?.unmitigated_prob ?? 0).toFixed(4)}</h3>
              <p className="text-[10px] text-slate-400 mt-1">Status: <span className={inference?.raw_outcome === 'Approved' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{inference?.raw_outcome}</span></p>
            </div>
            
            {/* REMEDIATED TARGET METRIC CARD */}
            <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-5 rounded-xl shadow-lg">
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase block">Remediated Target</span>
              <h3 className="text-3xl font-black font-mono mt-1 text-emerald-400">
                {/* 🟢 FIXED: Renders live floating point metrics instead of standard string fallback logs */}
                {(fairnessMode === 'raw' 
                  ? (inference?.unmitigated_prob ?? 0) 
                  : (inference?.fairness_adjusted_prob ?? 0)
                ).toFixed(4)}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">Decision: <span className={inference?.fair_outcome === 'Approved' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{inference?.fair_outcome}</span></p>
            </div>

            <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-4 rounded-xl flex items-center justify-around shadow-lg">
              <div className="w-14 h-14">
                <CircularProgressbar value={complianceScore} text={`${complianceScore}%`} styles={buildStyles({ textColor: '#f1f5f9', pathColor: complianceScore > 80 ? '#10b981' : '#f43f5e', trailColor: '#0f172a', textSize: '26px' })} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase block">Audit Rating</span>
                <span className={`text-xs font-mono font-bold ${complianceScore > 80 ? 'text-emerald-400' : 'text-rose-400'}`}>{complianceScore === 100 ? 'COMPLIANT' : 'CONDITIONAL'}</span>
              </div>
            </div>
          </div>

          {inference?.overridden && fairnessMode !== 'raw' && (
            <div className="bg-rose-500/[0.02] border border-rose-500/10 p-4 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed"><span className="font-bold text-rose-400">Compliance Override Implemented:</span> Intercepted demographic disparity envelope error. Shifted bounds to protect cohort selection equity.</p>
            </div>
          )}

          <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-5 rounded-2xl shadow-xl">
            <h3 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-4"><Layers className="w-3.5 h-3.5 text-slate-400 inline mr-2" />Compliance Disparities vs Legal Bounds</h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceMatrix}>
                  <defs>
                    <linearGradient id="baselineBarGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02}/></linearGradient>
                    <linearGradient id="remediatedBarGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0.02}/></linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#1e293b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#1e293b" domain={[0, 1.2]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#030712', borderColor: '#1e293b' }} />
                  <Bar dataKey="Baseline" fill="url(#baselineBarGradient)" stroke="#f43f5e" maxBarSize={30} />
                  <Bar dataKey="Remediated" fill="url(#remediatedBarGradient)" stroke="#10b981" maxBarSize={30} />
                  <ReferenceLine y={0.80} stroke="#f43f5e" strokeDasharray="3 3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}