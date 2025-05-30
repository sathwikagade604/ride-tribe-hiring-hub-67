
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageLayout from '@/layouts/PageLayout';
import RideBookingApp from '@/components/rides/RideBookingApp';
import RiderDashboard from '@/components/rides/RiderDashboard';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/auth/AuthGuard';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <AuthGuard requireAuth={true}>
      <PageLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Rider Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || user?.email}!</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RideBookingApp />
            </div>
            <div className="lg:col-span-1">
              <RiderDashboard />
            </div>
          </div>
        </div>
      </PageLayout>
    </AuthGuard>
  );
};

export default Dashboard;
