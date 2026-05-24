import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, Play, Cpu, ShieldAlert, CheckCircle2, 
  RefreshCw, Database, Terminal, Server 
} from "lucide-react";
// 🟢 Import our central context hook
import { useGovernance } from "../context/GovernanceContext.jsx";

export default function Inference() {
  // 🟢 Destructure orchestrated state directly from global context
  const { 
    isAuditing, 
    auditStep, 
    runInferenceSimulation, 
    inference, 
    fairnessMode 
  } = useGovernance();

  const pipelineSteps = [
    { label: "Parsing Ingestion Payload...", icon: Database, color: "text-cyan-400" },
    { label: "Running Baseline Feature Attribution...", icon: Cpu, color: "text-purple-400" },
    { label: "Evaluating Cohort Equalized Odds Envelopes...", icon: ShieldAlert, color: "text-amber-400" },
    { label: "Applying Post-Processing Remediation...", icon: RefreshCw, color: "text-emerald-400" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">Inference Orchestration</h1>
            <p className="text-sm text-slate-400">Deploy real-time runtime mitigations and trace decision pipelines.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono bg-black/40 border border-white/5 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-500" />
            <span className="text-slate-400">Node:</span>
            <span className="text-cyan-400">EquiPath-West-01</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PAYLOAD TRIGGER PANEL */}
        <div className="border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl flex flex-col justify-between shadow-2xl h-fit space-y-6">
          <div>
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Production Payload Testing
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Simulate an edge microservice transaction call. Triggering the runner pushes customer record profiles directly through the validation network layers.
            </p>

            <div className="bg-slate-950/80 rounded-xl p-4 font-mono text-[11px] text-slate-300 border border-white/5 shadow-inner leading-relaxed">
              <span className="text-purple-400">{"{"}</span>
              <div className="pl-4">
                <div><span className="text-slate-500">"request_id":</span> <span className="text-emerald-400">"req_9x2b99e"</span>,</div>
                <div><span className="text-slate-500">"active_policy":</span> <span className="text-purple-400">"{fairnessMode}"</span>,</div>
                <div><span className="text-slate-500">"features":</span> <span className="text-purple-400">{"{"}</span></div>
                <div className="pl-4 text-slate-400">
                  <div>"age": <span className="text-amber-400">24</span>,</div>
                  <div>"sex": <span className="text-amber-400">0</span>,</div>
                  <div>"education_num": <span className="text-amber-400">13</span>,</div>
                  <div>"hours_per_week": <span className="text-amber-400">45</span></div>
                </div>
                <div><span className="text-purple-400">{"}"}</span></div>
              </div>
              <span className="text-purple-400">{"}"}</span>
            </div>
          </div>

          <button
            // 🟢 Triggers global logging simulation machine sequence
            onClick={runInferenceSimulation}
            disabled={isAuditing}
            className={`w-full py-4 rounded-xl font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAuditing
                ? "bg-slate-900 border border-white/5 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]"
            }`}
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-500" />
                <span>Executing Pipeline Trace...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Trigger Model Audit Loop</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: PIPELINE TELEMETRY TRACE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-white/5 bg-black/20 backdrop-blur-xl p-6 rounded-2xl min-h-[420px] flex flex-col justify-between shadow-2xl">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-6">Runtime Traversal Log</h2>
              
              <div className="space-y-4">
                {pipelineSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  // 🟢 Evaluate real-time states matching global contexts
                  const isPending = !isAuditing && auditStep === 0 ? true : idx > auditStep;
                  const isActive = isAuditing && idx === auditStep;
                  const isCompleted = (!isAuditing && auditStep === 3) || (isAuditing && idx < auditStep);

                  return (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                        isActive 
                          ? "bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
                          : isCompleted 
                            ? "bg-white/[0.01] border-white/5 opacity-80" 
                            : "border-transparent opacity-30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-slate-900/50 border border-white/5 ${isActive ? step.color : "text-slate-500"}`}>
                          <StepIcon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                        </div>
                        <span className={`text-xs font-medium ${isActive ? "text-slate-100 font-bold" : isCompleted ? "text-slate-400" : "text-slate-600"}`}>
                          {step.label}
                        </span>
                      </div>

                      <div>
                        {isActive && <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest animate-pulse">Processing</div>}
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {isPending && <div className="w-2 h-2 rounded-full bg-slate-800" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PIPELINE OUTPUT DISPLAY */}
            <AnimatePresence>
              {!isAuditing && auditStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 shadow-inner"
                >
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">Input Vector Prob</span>
                    <span className="text-lg font-mono font-bold text-slate-300">{inference?.unmitigated_prob?.toFixed(4)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">Remediated Prob</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      {inference?.fair_outcome === 'Approved' ? '1.0000' : '0.0000'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">Pipeline Compute Delta</span>
                    <span className="text-lg font-mono font-bold text-cyan-400">14.2ms</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">Decision Envelope</span>
                    <span className={`text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase mt-1 inline-block ${
                      inference?.fair_outcome === 'Approved' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {inference?.fair_outcome}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}