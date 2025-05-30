
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import { useAuth } from '@/hooks/useAuth';
import RoleBasedAuth from '@/components/auth/RoleBasedAuth';
import AuthenticatedSection from '@/components/access/AuthenticatedSection';
import UnauthenticatedSection from '@/components/access/UnauthenticatedSection';
import DashboardPopup from '@/components/access/DashboardPopup';
import { RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import { drivers } from '@/data/mockDrivers';
import { Driver } from '@/data/mockDrivers';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Access = () => {
  const { user, loading, signOut } = useAuth();
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

  const handleLogout = async () => {
    await signOut();
    setCurrentRole('employee');
    setCurrentSubRole('');
    setShowRoleAuth(false);
    navigate('/');
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
        <DashboardPopup 
          open={showDashboardPopup} 
          onOpenChange={setShowDashboardPopup} 
        />

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
              onLogout={handleLogout}
              selectedDriver={selectedDriver}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              drivers={drivers}
              onDriverSelect={handleDriverSelect}
            />
          </div>
        ) : (
          <UnauthenticatedSection
            onGetStarted={() => setShowDashboardPopup(true)}
            onCompanyAccess={() => setShowRoleAuth(true)}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Access;
