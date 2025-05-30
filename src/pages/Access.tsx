
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import { useAuth } from '@/hooks/useAuth';
import RoleBasedAuth from '@/components/auth/RoleBasedAuth';
import LandingHero from '@/components/access/LandingHero';
import QuickAccessGrid from '@/components/access/QuickAccessGrid';
import FeatureHighlights from '@/components/access/FeatureHighlights';
import AuthenticatedSection from '@/components/access/AuthenticatedSection';
import { RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import { drivers } from '@/data/mockDrivers';
import { Driver } from '@/data/mockDrivers';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Car, Users, Building, UserPlus } from 'lucide-react';

const Access = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showRoleAuth, setShowRoleAuth] = useState(false);
  const [showDashboardPopup, setShowDashboardPopup] = useState(true);
  const [currentRole, setCurrentRole] = useState<RoleKey>('employee');
  const [currentSubRole, setCurrentSubRole] = useState<SubRoleKey>('');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  const handleRoleAuthSuccess = (role: string) => {
    console.log('Role auth success:', role);
    
    if (role === 'rider') {
      navigate('/dashboard');
      return;
    }
    
    if (role === 'driver') {
      navigate('/driver-app');
      return;
    }
    
    const validDepartments = ['employee', 'support', 'service', 'chat', 'query', 'tracking', 'technical', 'safety', 'emergency', 'callcenter'];
    if (validDepartments.includes(role)) {
      setCurrentRole(role as RoleKey);
      setShowRoleAuth(false);
      return;
    }
    
    setShowRoleAuth(false);
  };

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setActiveTab('driver-detail');
  };

  const handlePopupAction = (action: string) => {
    setShowDashboardPopup(false);
    
    switch (action) {
      case 'need-driver':
        navigate('/rider-signup');
        break;
      case 'am-rider':
        navigate('/rider-login');
        break;
      case 'am-driver':
        navigate('/driver-login');
        break;
      case 'ready-to-hire':
        navigate('/driver-hiring');
        break;
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen">
        {/* Dashboard Popup Modal */}
        <Dialog open={showDashboardPopup} onOpenChange={setShowDashboardPopup}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold mb-6">
                Welcome! How can we help you today?
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* I Need a Driver */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                onClick={() => handlePopupAction('need-driver')}
              >
                <CardHeader className="text-center pb-4">
                  <Users className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-xl">I Need a Driver</CardTitle>
                  <CardDescription>
                    Book a ride and get to your destination safely
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Quick and reliable transportation service
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Book a Ride
                  </Button>
                </CardContent>
              </Card>

              {/* I am a Rider */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
                onClick={() => handlePopupAction('am-rider')}
              >
                <CardHeader className="text-center pb-4">
                  <Users className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <CardTitle className="text-xl">I am a Rider</CardTitle>
                  <CardDescription>
                    Access your rider account and manage trips
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Login to your existing rider account
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Rider Login
                  </Button>
                </CardContent>
              </Card>

              {/* I am a Driver */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-500"
                onClick={() => handlePopupAction('am-driver')}
              >
                <CardHeader className="text-center pb-4">
                  <Car className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                  <CardTitle className="text-xl">I am a Driver</CardTitle>
                  <CardDescription>
                    Access your driver dashboard and start earning
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Login to your driver account
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Driver Login
                  </Button>
                </CardContent>
              </Card>

              {/* I am Ready to Hire */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-500"
                onClick={() => handlePopupAction('ready-to-hire')}
              >
                <CardHeader className="text-center pb-4">
                  <UserPlus className="h-16 w-16 mx-auto mb-4 text-orange-600" />
                  <CardTitle className="text-xl">I am Ready to Hire</CardTitle>
                  <CardDescription>
                    Recruit and manage drivers for your business
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Access driver hiring platform
                  </p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Hiring Portal
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                variant="ghost" 
                onClick={() => setShowDashboardPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip for now
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {showRoleAuth ? (
          <div className="container mx-auto px-4 py-16">
            <RoleBasedAuth onSuccess={handleRoleAuthSuccess} />
          </div>
        ) : user ? (
          <div className="container mx-auto px-4 py-6">
            <AuthenticatedSection
              role={currentRole}
              username={user.email || 'User'}
              subRole={currentSubRole}
              onLogout={() => {
                setCurrentRole('employee');
                setCurrentSubRole('');
                setShowRoleAuth(false);
              }}
              selectedDriver={selectedDriver}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              drivers={drivers}
              onDriverSelect={handleDriverSelect}
            />
          </div>
        ) : (
          <div className="space-y-16">
            <LandingHero onGetStarted={() => setShowDashboardPopup(true)} />
            <div className="container mx-auto px-4 space-y-8">
              {/* Quick Access Options */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="text-center">
                  <CardHeader>
                    <Car className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <CardTitle>Driver Portal</CardTitle>
                    <CardDescription>
                      Join as a driver and start earning money
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      onClick={() => navigate('/driver-login')} 
                      className="w-full"
                    >
                      Driver Login
                    </Button>
                    <Button 
                      onClick={() => navigate('/driver-signup')} 
                      variant="outline" 
                      className="w-full"
                    >
                      Driver Sign Up
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <CardTitle>Rider Portal</CardTitle>
                    <CardDescription>
                      Book rides and travel safely
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      onClick={() => navigate('/rider-login')} 
                      className="w-full"
                    >
                      Rider Login
                    </Button>
                    <Button 
                      onClick={() => navigate('/rider-signup')} 
                      variant="outline" 
                      className="w-full"
                    >
                      Rider Sign Up
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Building className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <CardTitle>Company Portal</CardTitle>
                    <CardDescription>
                      Department access for employees
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setShowRoleAuth(true)} 
                      className="w-full"
                    >
                      Company Access
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <QuickAccessGrid 
                isAuthenticated={!!user}
                onCompanyAccess={() => setShowRoleAuth(true)}
              />
              <FeatureHighlights />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Access;
