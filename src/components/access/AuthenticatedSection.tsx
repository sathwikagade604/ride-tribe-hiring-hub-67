
import React from 'react';
import { Driver } from '@/data/mockDrivers';
import { RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import RoleHeader from '@/components/access/RoleHeader';
import AccessPermissionsBanner from '@/components/access/AccessPermissionsBanner';
import RoleContent from '@/components/access/RoleContent';
import DriverDetail from '@/components/access/DriverDetail';

interface AuthenticatedSectionProps {
  role: RoleKey;
  username: string;
  subRole: SubRoleKey | '';
  onLogout: () => void;
  selectedDriver: Driver | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  drivers: Driver[];
  onDriverSelect: (driver: Driver) => void;
}

const AuthenticatedSection: React.FC<AuthenticatedSectionProps> = ({
  role,
  username,
  subRole,
  onLogout,
  selectedDriver,
  activeTab,
  setActiveTab,
  drivers,
  onDriverSelect
}) => {
  return (
    <div>
      <RoleHeader 
        role={role} 
        username={username}
        subRole={subRole}
        onLogout={onLogout} 
      />
      
      <AccessPermissionsBanner role={role} subRole={subRole} />
      
      {activeTab === 'general' ? (
        <RoleContent 
          role={role} 
          subRole={subRole} 
          onLogout={onLogout}
          drivers={drivers}
          onDriverSelect={onDriverSelect}
        />
      ) : (
        selectedDriver && (
          <DriverDetail 
            driver={selectedDriver} 
            onBack={() => setActiveTab('general')} 
          />
        )
      )}
    </div>
  );
};

export default AuthenticatedSection;
