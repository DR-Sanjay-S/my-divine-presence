import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";

const App = () => (
  <TooltipProvider>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </TooltipProvider>
);

export default App;
