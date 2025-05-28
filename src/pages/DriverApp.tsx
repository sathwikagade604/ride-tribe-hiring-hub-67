
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import DriverDashboard from '@/components/driver/DriverDashboard';
import DriverVerification from '@/components/driver/DriverVerification';
import { useAuthState } from '@/hooks/useAuthState';
import { Car, Shield, User, Settings, LogOut } from 'lucide-react';

const DriverApp = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, handleLogout } = useAuthState();
  const [activeTab, setActiveTab] = useState('dashboard');

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Driver Portal</h1>
            <p className="text-muted-foreground">Welcome back, {username}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
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
  );
};

export default DriverApp;
