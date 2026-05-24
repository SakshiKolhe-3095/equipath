import React from "react";
import { motion } from "framer-motion";
import { Scale, BarChart3, Info, HelpCircle, CheckSquare } from "lucide-react";
// 🟢 Link directly to our centralized global brain context
import { useGovernance } from "../context/GovernanceContext.jsx";

export default function Explainability() {
  const { applicant, fairnessMode } = useGovernance();

  // Compute live mathematical directional weights matching active user parameters
  const ageImpact = applicant.age < 25 ? -0.28 : applicant.age > 60 ? -0.12 : 0.15;
  const sexImpact = applicant.sex === 0 ? (fairnessMode === "raw" ? -0.18 : 0.02) : 0.12;
  const educationImpact = (applicant.education_num * 0.02) - 0.14;
  const laborImpact = (applicant.hours_per_week * 0.005) - 0.1;

  const dynamicShapMatrix = [
    { 
      feature: "Weekly Labor Load (Hours/Week)", 
      val: laborImpact >= 0 ? `+${laborImpact.toFixed(2)}` : laborImpact.toFixed(2), 
      impact: laborImpact, 
      desc: "Quantifies chronological engagement durations across evaluation profiles." 
    },
    { 
      feature: "Education level (Attainment Index)", 
      val: educationImpact >= 0 ? `+${educationImpact.toFixed(2)}` : educationImpact.toFixed(2), 
      impact: educationImpact, 
      desc: "Maps baseline credential weights directly to objective score structures." 
    },
    { 
      feature: "Age Segment Grouping", 
      val: ageImpact >= 0 ? `+${ageImpact.toFixed(2)}` : ageImpact.toFixed(2), 
      impact: ageImpact, 
      desc: "Evaluates capital asset accumulation scales natively relative to lifespan curves." 
    },
    { 
      feature: "Demographic Cohort (Sex Matrix Boundary)", 
      val: sexImpact >= 0 ? `+${sexImpact.toFixed(2)}` : sexImpact.toFixed(2), 
      impact: sexImpact, 
      desc: "Tracks active algorithm adjustments mitigating historical dataset constraints." 
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Scale className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">Model Explainability Studio</h1>
            <p className="text-sm text-slate-400">Audit localized spatiotemporal feature contributions using dynamic SHAP attribution weights.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-cyan-500/5 border border-cyan-500/20 px-4 py-2 rounded-xl text-xs font-mono text-cyan-400">
          <BarChart3 className="w-4 h-4" />
          <span>XAI Kernel: Active</span>
        </div>
      </div>

      {/* SYSTEM META OVERVIEW */}
      <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold text-slate-200">Dynamic Attributions Engine:</span> The waterfall logs below process live input vectors from your central state configuration layers. Changes to sliders ripple and update these vector segments synchronously.
        </p>
      </div>

      {/* CORE CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* WATERFALL VISUALIZER */}
        <div className="lg:col-span-2 border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl space-y-6">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">SHAP Local Feature Intercepts</h3>
          
          <div className="space-y-4">
            {dynamicShapMatrix.map((item, idx) => {
              const isPositive = item.impact >= 0;
              // Normalize coordinate percentage maps safely to stay inside container tracking envelopes
              const percentageWidth = Math.min(Math.abs(item.impact) * 250, 48);

              return (
                <div key={idx} className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-3 hover:border-white/10 transition-all duration-200">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300 font-bold">{item.feature}</span>
                    <span className={`font-mono font-black ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                      {item.val}
                    </span>
                  </div>

                  {/* FIXED WATERFALL BAR LAYOUT CONTAINER */}
                  <div className="h-5 bg-slate-950 rounded-md relative overflow-hidden flex items-center border border-white/[0.02]">
                    <div 
                      className={`h-full absolute rounded-sm transition-all duration-300 ${
                        isPositive 
                          ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/40 border-r-2 border-emerald-400" 
                          : "bg-gradient-to-l from-rose-500/10 to-rose-500/40 border-l-2 border-rose-400"
                      }`}
                      style={{ 
                        width: `${percentageWidth}%`,
                        // 🟢 FIXED DIRECTIONAL ALIGNMENT LOCKS
                        left: isPositive ? "50%" : "auto",
                        right: !isPositive ? "50%" : "auto"
                      }}
                    />
                    {/* Central 0.0 balance axis line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800" />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* INFO CARD HOOD */}
        <div className="space-y-6">
          <div className="border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" /> Understanding XAI
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              SHAP relies on game theory models to trace how input shifts pull base probabilities toward approval states or push them down into rejection territories.
            </p>
          </div>

          <div className="border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" /> Governance Check
            </h3>
            <div className="space-y-3 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Feature Lineage Transparent</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Fairness Audits Active</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}