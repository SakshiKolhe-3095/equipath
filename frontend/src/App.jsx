import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { GovernanceProvider } from "./context/GovernanceContext.jsx";

export default function App() {
  return (
    <GovernanceProvider>
      <Router>
        <AppRoutes />
      </Router>
    </GovernanceProvider>
  );
}