
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import DriverLogin from '@/pages/DriverLogin';
import RiderLogin from '@/pages/RiderLogin';
import DriverSignup from '@/pages/DriverSignup';
import RiderSignup from '@/pages/RiderSignup';
import Dashboard from '@/pages/Dashboard';
import DriverApp from '@/pages/DriverApp';
import Access from '@/pages/Access';
import DriverHiringApp from '@/components/hiring/DriverHiringApp';
import { AuthProvider } from '@/hooks/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/driver-login" element={<DriverLogin />} />
              <Route path="/rider-login" element={<RiderLogin />} />
              <Route path="/driver-signup" element={<DriverSignup />} />
              <Route path="/rider-signup" element={<RiderSignup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/driver-app" element={<DriverApp />} />
              <Route path="/access" element={<Access />} />
              <Route path="/driver-hiring" element={<DriverHiringApp />} />
              <Route path="/" element={<Access />} />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
