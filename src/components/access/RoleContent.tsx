
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
import WorkAllocationSystem from '@/components/work/WorkAllocationSystem';
import DepartmentWorkManager from '@/components/work/DepartmentWorkManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  // For roles that have work management capabilities
  const hasWorkManagement = ['employee', 'support', 'service', 'chat', 'query', 'tracking', 'technical'].includes(role);

  if (hasWorkManagement) {
    return (
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="work-allocation">Work Allocation</TabsTrigger>
          <TabsTrigger value="work-manager">Work Manager</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          {renderRoleSpecificContent()}
        </TabsContent>

        <TabsContent value="work-allocation" className="mt-6">
          <WorkAllocationSystem currentUserRole={role} currentUserSubRole={subRole} />
        </TabsContent>

        <TabsContent value="work-manager" className="mt-6">
          <DepartmentWorkManager currentUserRole={role} currentUserSubRole={subRole} />
        </TabsContent>
      </Tabs>
    );
  }

  // For other roles, show default content
  function renderRoleSpecificContent() {
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
  }

  return renderRoleSpecificContent();
};

export default RoleContent;
