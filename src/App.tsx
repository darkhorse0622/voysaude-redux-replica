
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
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
import Unauthorized from "./pages/Unauthorized";
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
              {/* Public routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/index" element={<Index />} />
              <Route path="/treatments" element={<Treatment />} />
              
              {/* Auth routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected routes - require authentication */}
              <Route 
                path="/survey" 
                element={
                  <ProtectedRoute requiredRole="REGISTERED">
                    <Survey />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user-dashboard" 
                element={
                  <ProtectedRoute requiredRole="REGISTERED">
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/support" 
                element={
                  <ProtectedRoute requiredRole="REGISTERED">
                    <Support />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/account-details" 
                element={
                  <ProtectedRoute requiredRole="REGISTERED">
                    <AccountDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/personal-data" 
                element={
                  <ProtectedRoute requiredRole="REGISTERED">
                    <PersonalData />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/delivery-address" 
                element={
                  <ProtectedRoute requiredRole="REGISTERED">
                    <DeliveryAddress />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/change-password" 
                element={
                  <ProtectedRoute requiredRole="REGISTERED">
                    <ChangePassword />
                  </ProtectedRoute>
                } 
              />
              
              {/* Special routes */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
