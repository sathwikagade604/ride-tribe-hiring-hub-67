import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from '@/components/ui/sonner';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import DriverApp from '@/pages/DriverApp';
import Access from '@/pages/Access';
import DriverHiringApp from '@/components/hiring/DriverHiringApp';
import Unauthorized from '@/pages/Unauthorized';
import { AuthProvider } from '@/hooks/useAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/driver-app" element={<DriverApp />} />
            <Route path="/access" element={<Access />} />
            <Route path="/driver-hiring" element={<DriverHiringApp />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Access />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
