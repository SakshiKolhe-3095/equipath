import React, { useState } from "react";
import { ScrollText, ToggleLeft, ToggleRight, Sliders } from "lucide-react";
import { useGovernance } from "../context/GovernanceContext.jsx";

export default function PolicyStudio() {
  const { fairnessMode, setFairnessMode, addLogEntry } = useGovernance();
  const [fairnessThreshold, setFairnessThreshold] = useState(80);
  const [isInterceptActive, setIsInterceptActive] = useState(true);

  const policyModes = [
    { id: "raw", name: "Raw Unmitigated", desc: "No runtime interventions. Maximizes raw predictive accuracy while completely disregarding downstream demographic imbalances." },
    { id: "demographic_parity", name: "Demographic Parity", desc: "Forces equal selection rates across all protected groups. Aligns to legal 4/5ths rules." },
    { id: "equalized_odds", name: "Equalized Odds", desc: "Balances both True Positive Rates and False Positive Rates across cohorts. Highly optimized for risk-balanced fairness architectures." },
  ];

  const handleModeChange = (modeId, modeName) => {
    setFairnessMode(modeId);
    if (addLogEntry) {
      addLogEntry("SYSTEM", ` Algorithmic policy regulation matrix modified to: ${modeName.toUpperCase()}`, "policy_studio_change");
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ScrollText className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">Policy Studio</h1>
            <p className="text-sm text-slate-400">Configure runtime fairness objective parameters and adjust strict optimization weights.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-purple-500/5 border border-purple-500/20 px-4 py-2 rounded-xl text-xs font-mono text-purple-400">
          <span>Active Mode: {fairnessMode.toUpperCase()}</span>
        </div>
      </div>

      {/* ALGORITHM SELECTOR GRID */}
      <div className="border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl space-y-4">
        <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-400" /> Mathematical Mitigation Engine
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {policyModes.map((mode) => {
            const isSelected = fairnessMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id, mode.name)}
                className={`p-5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? "bg-purple-500/10 border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.15)] text-white" 
                    : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <div>
                  <span className={`text-xs font-black uppercase tracking-wider block mb-1 ${isSelected ? "text-purple-400" : "text-slate-500"}`}>
                    {mode.name}
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-400 mt-2">
                    {mode.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC CALIBRATION CONTROLS */}
      <div className="border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400 uppercase tracking-wide">Fairness Constraint Envelope</span>
            <span className="text-purple-400 font-bold font-mono">{fairnessThreshold}% Rule</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="100" 
            value={fairnessThreshold} 
            onChange={(e) => setFairnessThreshold(parseInt(e.target.value))} 
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400 mt-2" 
          />
        </div>

        <div className="flex flex-col justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-slate-300 block">Automated Intercepts</span>
              <span className="text-[10px] text-slate-500">Enable real-time inference rewrites</span>
            </div>
            <button onClick={() => setIsInterceptActive(!isInterceptActive)} className="text-purple-400 hover:text-purple-300 transition-all cursor-pointer">
              {isInterceptActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}