
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Survey from "./pages/Survey";
import UserDashboard from "./pages/UserDashboard";
import Support from "./pages/Support";
import AccountDetails from "./pages/AccountDetails";
import PersonalData from "./pages/PersonalData";
import DeliveryAddress from "./pages/DeliveryAddress";
import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Treatment from "./pages/Treatment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/index" element={<Index />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/support" element={<Support />} />
              <Route path="/account-details" element={<AccountDetails />} />
              <Route path="/personal-data" element={<PersonalData />} />
              <Route path="/delivery-address" element={<DeliveryAddress />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/treatments" element={<Treatment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
