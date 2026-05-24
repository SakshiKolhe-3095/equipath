import React, { useState } from "react";
import { FileText, CheckCircle2, XCircle, DownloadCloud, Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Compliance() {
  const [showToast, setShowToast] = useState(false);

  const triggerToastNotification = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const auditChecks = [
    { rule: "Disparate Impact 4/5ths Rule Verification", status: "PASSED", details: "Selection probability ratio is within standard regulatory bounds.", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
    { rule: "Equalized Odds Boundary Test", status: "PASSED", details: "True Positive rate variances do not violate active enforcement thresholds.", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
    { rule: "Data Drift Severity Threshold Checks", status: "FAILED", details: "Statistical distribution drift detected on core feature tracking lines.", icon: XCircle, color: "text-rose-400 bg-rose-500/5 border-rose-500/10" }
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto relative">
      
      {/* TOAST NOTIFICATION CONTAINER */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50 bg-slate-900 border border-emerald-500/30 text-white px-5 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 font-medium text-xs border-b-2 border-b-emerald-500"
          >
            <Bell className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>Compiling Executive Governance Dossier... Saved asset directly to memory layer.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">Compliance Auditor</h1>
            <p className="text-sm text-slate-400">Automated verification audits against statutory AI frameworks and regulatory metrics.</p>
          </div>
        </div>

        <button 
          onClick={triggerToastNotification}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-black text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          <DownloadCloud className="w-4 h-4" />
          <span>Export Compliance Dossier</span>
        </button>
      </div>

      <div className="space-y-4">
        {auditChecks.map((check, idx) => {
          const StatusIcon = check.icon;
          return (
            <div key={idx} className={`border p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-xl bg-black/20 ${check.color}`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-200 block">{check.rule}</span>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{check.details}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusIcon className="w-4 h-4" />
                <span className="text-[10px] font-black tracking-wider uppercase font-mono">{check.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}