import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Activity, AlertOctagon, CheckCircle, RefreshCcw, ShieldAlert, Zap } from "lucide-react";

// Mock operational data tracing metric degradation over a 6-month window
const driftHistoryData = [
  { month: "Jan", psi: 0.05, ksDistance: 0.02, accuracy: 96.4 },
  { month: "Feb", psi: 0.08, ksDistance: 0.04, accuracy: 96.1 },
  { month: "Mar", psi: 0.12, ksDistance: 0.09, accuracy: 95.2 },
  { month: "Apr", psi: 0.18, ksDistance: 0.14, accuracy: 93.8 },
  { month: "May", psi: 0.26, ksDistance: 0.22, accuracy: 89.5 }, // High drift threshold violated here
];

export default function DriftMonitor() {
  const latestMetrics = driftHistoryData[driftHistoryData.length - 1];
  const isDriftCritical = latestMetrics.psi >= 0.25;

  const triggerModelRecalibration = () => {
    alert("Initiating automated pipeline recalibration... Pulling latest production datasets, computing new feature weights, and retraining policy boundaries.");
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-rose-500 animate-pulse" />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">Data Drift Analytics</h1>
            <p className="text-sm text-slate-400">Track structural input shifts and statistical distribution variances in real time.</p>
          </div>
        </div>

        <button 
          onClick={triggerModelRecalibration}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-black text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.1)]"
        >
          <RefreshCcw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Trigger Automated Pipeline Retraining</span>
        </button>
      </div>

      {/* OPERATIONAL DRIFT BADGE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: PSI STATUS */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Population Stability Index (PSI)</span>
            <AlertOctagon className={`w-5 h-5 ${isDriftCritical ? "text-rose-500" : "text-emerald-400"}`} />
          </div>
          <div className="mt-4">
            <h3 className={`text-4xl font-black font-mono tracking-tight ${isDriftCritical ? "text-rose-500" : "text-emerald-400"}`}>
              {latestMetrics.psi}
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Status: <span className="font-bold text-rose-400">CRITICAL SHIFT DETECTED</span>
            </p>
          </div>
        </div>

        {/* CARD 2: KS DISTANCE METRIC */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Kolmogorov-Smirnov Target</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-black font-mono tracking-tight text-amber-400">
              {latestMetrics.ksDistance}
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Threshold Limit: <span className="font-mono font-bold text-slate-500">0.1500 max</span>
            </p>
          </div>
        </div>

        {/* CARD 3: ACCURACY IMPACT ENGINE */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Production Accuracy</span>
            <CheckCircle className="w-5 h-5 text-slate-500" />
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-black font-mono tracking-tight text-slate-200">
              {latestMetrics.accuracy}%
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Baseline Target: <span className="font-mono font-bold text-emerald-400">95.0% min</span>
            </p>
          </div>
        </div>

      </div>

      {/* CORE TELEMETRY CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CHART VISUALIZER */}
        <div className="lg:col-span-2 bg-black/20 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-2xl">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-6">Historical Vector Drift Tracking</h3>
          <div className="h-64 w-full font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={driftHistoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#030712', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="psi" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e' }} activeDot={{ r: 6 }} name="Population Stability Index" />
                <Line type="monotone" dataKey="ksDistance" stroke="#fbbf24" strokeWidth={2} dot={{ fill: '#fbbf24' }} name="KS Distance" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ALERTS INSIGHT SIDE PANEL */}
        <div className="border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl flex flex-col justify-between shadow-2xl">
          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> Active System Anomalies
            </h3>
            
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-rose-400 uppercase tracking-wide block text-[10px]">Feature Variance Alert</span>
                <p className="leading-relaxed text-slate-400">The distribution profile for features input vector <span className="font-mono text-cyan-400">"age"</span> has diverged past safety bounds.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-amber-400 uppercase tracking-wide block text-[10px]">Degradation Warning</span>
                <p className="leading-relaxed text-slate-400">Model objective evaluation scores have dropped below the required corporate compliance target of 95.0%.</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono text-center mt-4">
            Matured Log Engine: Synchronized 42s ago
          </div>
        </div>

      </div>

    </div>
  );
}