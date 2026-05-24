import React from "react";
import { NavLink } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  BrainCircuit,
  Scale,
  Activity,
  FileText,
  ScrollText,
  TerminalSquare,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Inference", path: "/inference", icon: BrainCircuit },
  { name: "Explainability", path: "/explain", icon: Scale },
  { name: "Compliance", path: "/compliance", icon: FileText },
  { name: "Drift Monitor", path: "/drift", icon: Activity },
  { name: "Policy Studio", path: "/policies", icon: ScrollText },
  { name: "System Logs", path: "/logs", icon: TerminalSquare },
];

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* SIDEBAR */}
      <aside className="w-[270px] border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col justify-between">
        <div>
          {/* LOGO */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="font-black text-2xl tracking-tight">EquiPath</h1>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest">AI Governance OS</p>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border ${
                      isActive
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        : "border-transparent text-slate-400 hover:bg-white/[0.03] hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* SYSTEM TELEMETRY */}
        <div className="p-4 border-t border-white/5">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 uppercase tracking-wider">System Status</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Fairness Engine</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">API Gateway</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT SPACE */}
      <main className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_60%)]">
        {children}
      </main>
    </div>
  );
}