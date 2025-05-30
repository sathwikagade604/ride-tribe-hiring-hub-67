
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
    
    // Handle public roles (rider/driver)
    if (role === 'rider') {
      navigate('/dashboard');
      return;
    }
    
    if (role === 'driver') {
      navigate('/driver-app');
      return;
    }
    
    // Handle company/departmental roles
    const validDepartments = ['employee', 'support', 'service', 'chat', 'query', 'tracking', 'technical', 'safety', 'emergency', 'callcenter'];
    if (validDepartments.includes(role)) {
      setCurrentRole(role as RoleKey);
      setShowRoleAuth(false);
      return;
    }
    
    // Default fallback
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
            <div className="container mx-auto px-4">
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
