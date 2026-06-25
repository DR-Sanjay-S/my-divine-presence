import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import People from "./pages/People";
import Organizations from "./pages/Organizations";
import Opportunities from "./pages/Opportunities";
import Podcasts from "./pages/Podcasts";
import Events from "./pages/Events";
import Notes from "./pages/Notes";
import Journal from "./pages/Journal";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { seedSampleData } from "./lib/localClient";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    seedSampleData();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/people" element={<People />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/events" element={<Events />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
