
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
import { Car, Users, Building } from 'lucide-react';

const Access = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showRoleAuth, setShowRoleAuth] = useState(false);
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
            <LandingHero onGetStarted={() => setShowRoleAuth(true)} />
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
