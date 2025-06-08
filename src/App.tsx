import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";
import PaymentsTransfersPage from "./pages/PaymentsTransfersPage";
import JointAccountCreationPage from "./pages/JointAccountCreationPage";
import SettingsProfilePage from "./pages/SettingsProfilePage";
import NotFound from "./pages/NotFound"; // Always Must Include

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} /> {/* Assuming Dashboard is the main page */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/payments-transfers" element={<PaymentsTransfersPage />} />
          <Route path="/joint-account-creation" element={<JointAccountCreationPage />} />
          <Route path="/settings-profile" element={<SettingsProfilePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;