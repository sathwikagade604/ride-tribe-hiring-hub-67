
import React from 'react';
import { Info } from 'lucide-react';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';

interface AccessPermissionsBannerProps {
  role: RoleKey;
  subRole?: string;
}

const AccessPermissionsBanner: React.FC<AccessPermissionsBannerProps> = ({ role, subRole = '' }) => {
  const roleData = roleAccessLevels[role];
  const hasSubRole = subRole && roleData.subRoles && roleData.subRoles[subRole];
  
  // Get correct access level name and permissions based on whether there is a sub-role
  const accessLevelName = hasSubRole 
    ? `${roleData.name} - ${roleData.subRoles?.[subRole]?.name}` 
    : roleData.name;
    
  const permissions = hasSubRole 
    ? roleData.subRoles?.[subRole]?.permissions 
    : roleData.permissions;
  
  return (
    <div className="mb-6 p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium">Access Level: {accessLevelName}</h3>
      </div>
      <div className="text-sm text-muted-foreground">
        You have access to: 
        <div className="flex flex-wrap gap-2 mt-2">
          {permissions?.map((permission, index) => (
            <span 
              key={index} 
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {permission.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessPermissionsBanner;
