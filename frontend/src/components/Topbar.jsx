import React, { useEffect, useState } from 'react';
import { Bell, ShieldCheck, Wifi, Cpu, UserCircle2 } from 'lucide-react';
import { useGovernance } from "../context/GovernanceContext.jsx";
import { checkBackendHealth } from "../services/api.js";

export default function Topbar() {
  const { fairnessMode } = useGovernance();
  const [health, setHealth] = useState({
    status: "offline",
    model_loaded: false,
    policy_loaded: false,
  });

  // Background heartbeat effect to query the FastAPI infrastructure layer
  useEffect(() => {
    const runSystemPing = async () => {
      const currentHealth = await checkBackendHealth();
      setHealth(currentHealth);
    };

    runSystemPing();
    const interval = setInterval(runSystemPing, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mb-6 flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 backdrop-blur-xl">

      {/* LEFT */}
      <div>
        <h1 className="text-xl font-black tracking-tight text-slate-100">
          EquiPath Governance OS
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Responsible AI Compliance Infrastructure
        </p>
      </div>

      {/* CENTER */}
      <div className="hidden lg:flex items-center gap-3 font-mono">
        {/* Dynamic API Status Indicator */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
          health.status === "online" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
        }`}>
          <Wifi className={`w-4 h-4 ${health.status === "online" ? "animate-pulse" : ""}`} />
          <span className="text-xs font-bold uppercase">
            API {health.status === "online" ? "CONNECTED" : "OFFLINE"}
          </span>
        </div>

        {/* Dynamic Governance Enforcement Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-400 uppercase">
            {fairnessMode === "raw" ? "RAW INFERENCE MODE" : "FAIRNESS ACTIVE"}
          </span>
        </div>

        {/* Dynamic Neural Network Deployment Status */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-purple-400 uppercase">
            ANN_CORE: {health.model_loaded ? "ACTIVE" : "UNLOADED"}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
          <Bell className="w-4 h-4 text-slate-300" />
          <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${health.status === "online" ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle2 className="w-8 h-8 text-slate-400" />
          <div className="hidden md:block">
            <p className="text-xs font-bold text-slate-200">Sakshi</p>
            <p className="text-[10px] text-slate-500">Governance Engineer</p>
          </div>
        </div>
      </div>

    </div>
  );
}