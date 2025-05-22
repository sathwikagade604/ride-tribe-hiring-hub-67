
import React from 'react';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';

interface RoleInfoProps {
  roleKey: RoleKey;
  onClick?: () => void;
}

const RoleInfo: React.FC<RoleInfoProps> = ({ roleKey, onClick }) => {
  const role = roleAccessLevels[roleKey];
  
  return (
    <div 
      className="flex items-start space-x-4 p-4 rounded-lg border hover:border-primary hover:bg-accent cursor-pointer"
      onClick={onClick}
    >
      <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
        {role.icon}
      </div>
      <div className="space-y-1">
        <p className="font-semibold">{role.name}</p>
        <p className="text-sm text-muted-foreground">{role.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {role.permissions.map((permission, index) => (
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

export default RoleInfo;
