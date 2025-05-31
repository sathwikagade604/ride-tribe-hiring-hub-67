
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PageLayout from '@/layouts/PageLayout';
import DriverDashboard from '@/components/driver/DriverDashboard';
import DriverVerification from '@/components/driver/DriverVerification';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/auth/AuthGuard';
import { useNavigate } from 'react-router-dom';
import { Car, Shield, User, Settings, LogOut, Home } from 'lucide-react';

const DriverApp = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <AuthGuard requireAuth={true}>
      <PageLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Driver Portal</h1>
              <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || user?.email}!</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGoHome} variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Driver Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="verification" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Verification
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <DriverDashboard />
            </TabsContent>

            <TabsContent value="verification">
              <DriverVerification />
            </TabsContent>

            <TabsContent value="profile">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Driver profile management coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Driver settings coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </AuthGuard>
  );
};

export default DriverApp;
