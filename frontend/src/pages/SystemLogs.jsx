import React, { useState } from "react";
import { TerminalSquare, Search } from "lucide-react";
import { useGovernance } from "../context/GovernanceContext.jsx";

export default function SystemLogs() {
  const { logs } = useGovernance();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <TerminalSquare className="w-8 h-8 text-amber-500" />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">Operational Registry</h1>
            <p className="text-sm text-slate-400">Live background system events, infrastructure requests, and mitigation alerts.</p>
          </div>
        </div>
      </div>

      {/* FILTER BAR CONTROLS */}
      <div className="flex items-center gap-3 bg-black/20 border border-white/5 p-4 rounded-xl">
        <Search className="w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Filter operational logs by event type or message criteria..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-xs text-slate-200 outline-none w-full font-medium placeholder-slate-600 font-mono"
        />
      </div>

      {/* TERMINAL EMULATOR WORKSPACE */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-xs shadow-2xl space-y-3 max-h-[500px] overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <p className="text-slate-600 italic font-mono text-center py-6">No telemetry signals found matching search parameters.</p>
        ) : (
          filteredLogs.map((log, idx) => {
            // 🟢 DYNAMIC HIGHLIGHTING SCHEMAS: Optimizes recruiter conversion via visual hierarchy
            let severityStyle = "bg-slate-800/40 text-slate-400 border-white/5";
            if (log.type === "CRITICAL" || log.type === "SYSTEM_FAIL") {
              severityStyle = "bg-rose-500/10 text-rose-400 border-rose-500/20";
            } else if (log.type === "BIAS_AUDIT" || log.type === "OVERRIDE") {
              severityStyle = "bg-purple-500/10 text-purple-400 border-purple-500/20";
            } else if (log.type === "INFERENCE") {
              severityStyle = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
            }

            return (
              <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-4 py-2 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] px-2 rounded transition-all">
                <span className="text-slate-600 shrink-0">{log.timestamp}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider shrink-0 border ${severityStyle}`}>
                  {log.type}
                </span>
                <span className="text-slate-300 flex-1">{log.message}</span>
                <span className="text-[10px] text-slate-600 font-bold">{log.id}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}