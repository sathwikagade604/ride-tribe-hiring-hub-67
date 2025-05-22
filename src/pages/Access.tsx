
import React from 'react';
import { mockDrivers } from '@/data/mockDrivers';
import { RoleKey } from '@/constants/roleAccessLevels';
import LoginSection from '@/components/access/LoginSection';
import AuthenticatedSection from '@/components/access/AuthenticatedSection';
import PageTitle from '@/components/access/PageTitle';
import PageLayout from '@/layouts/PageLayout';
import { useAuthState } from '@/hooks/useAuthState';

const Access = () => {
  const {
    isLoggedIn,
    role,
    subRole,
    username,
    selectedDriver,
    activeTab,
    handleLogin,
    handleLogout,
    handleDriverSelect,
    setActiveTab
  } = useAuthState();

  return (
    <PageLayout>
      <PageTitle 
        title="Access RideShare India | Quick Links" 
        description="Quick access links to all RideShare India services and features."
      />
      
      {!isLoggedIn ? (
        <LoginSection onLogin={handleLogin} />
      ) : (
        <AuthenticatedSection 
          role={role as RoleKey}
          username={username}
          subRole={subRole}
          onLogout={handleLogout}
          selectedDriver={selectedDriver}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          drivers={mockDrivers}
          onDriverSelect={handleDriverSelect}
        />
      )}
    </PageLayout>
  );
};

export default Access;
