import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Page Imports
import Dashboard from "../pages/Dashboard";
import Inference from "../pages/Inference";
import Explainability from "../pages/Explainability";
import Compliance from "../pages/Compliance";
import DriftMonitor from "../pages/DriftMonitor";
import PolicyStudio from "../pages/PolicyStudio";
import SystemLogs from "../pages/SystemLogs";

export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        {/* Core Operational Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/inference" element={<Inference />} />
        <Route path="/explain" element={<Explainability />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/drift" element={<DriftMonitor />} />
        <Route path="/policies" element={<PolicyStudio />} />
        <Route path="/logs" element={<SystemLogs />} />

        {/* Fallback Guardrail: Redirects any broken links back to the Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}