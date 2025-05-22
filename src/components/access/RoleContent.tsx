
import React from 'react';
import { Button } from '@/components/ui/button';
import { RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import EmployeeContent from '@/components/access/EmployeeContent';
import SupportContent from '@/components/access/SupportContent';
import ServiceContent from '@/components/access/ServiceContent';
import ChatContent from '@/components/access/ChatContent';
import QueryContent from '@/components/access/QueryContent';
import TrackingContent from '@/components/access/TrackingContent';
import TechnicalContent from '@/components/access/technical/TechnicalContent';
import { Driver } from '@/data/mockDrivers';

interface RoleContentProps {
  role: RoleKey;
  subRole: SubRoleKey | '';
  onLogout: () => void;
  drivers?: Driver[];
  onDriverSelect?: (driver: Driver) => void;
}

const RoleContent: React.FC<RoleContentProps> = ({ 
  role, 
  subRole, 
  onLogout, 
  drivers = [], 
  onDriverSelect = () => {} 
}) => {
  switch(role) {
    case 'employee':
      return <EmployeeContent drivers={drivers} onDriverSelect={onDriverSelect} />;
    case 'support':
      return <SupportContent subRole={subRole} />;
    case 'service':
      return <ServiceContent />;
    case 'chat':
      return <ChatContent />;
    case 'query':
      return <QueryContent />;
    case 'tracking':
      return <TrackingContent />;
    case 'technical':
      return <TechnicalContent subRole={subRole} />;
    case 'safety':
    case 'emergency':
    case 'callcenter':
      return (
        <div className="text-center p-8">
          <p>Content for {role} role is under development.</p>
          <Button onClick={onLogout} className="mt-4">Logout</Button>
        </div>
      );
    default:
      return (
        <div className="text-center p-8">
          <p>Unknown role: {role}</p>
          <Button onClick={onLogout} className="mt-4">Logout</Button>
        </div>
      );
  }
};

export default RoleContent;
