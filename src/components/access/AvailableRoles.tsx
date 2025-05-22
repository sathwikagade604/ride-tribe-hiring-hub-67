
import React from 'react';
import RoleInfo from '@/components/access/RoleInfo';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';

const AvailableRoles: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Available Access Roles</h2>
      <div className="space-y-4">
        {Object.keys(roleAccessLevels).map((key) => (
          <div key={key}>
            <RoleInfo roleKey={key as RoleKey} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRoles;
