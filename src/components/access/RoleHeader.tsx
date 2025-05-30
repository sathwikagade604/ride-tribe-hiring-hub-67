
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Lock } from 'lucide-react';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';

interface RoleHeaderProps {
  role: RoleKey;
  username: string;
  subRole?: string;
  onLogout: () => void;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({ role, username, subRole = '', onLogout }) => {
  const roleData = roleAccessLevels[role];
  const IconComponent = roleData.icon;
  const hasSubRole = subRole && roleData.subRoles && roleData.subRoles[subRole];
  const subRoleData = hasSubRole ? roleData.subRoles?.[subRole] : null;
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold flex items-center">
          <IconComponent className="h-5 w-5 mr-2" />
          <span>
            {roleData.name} Portal
            {subRoleData && (
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">
                {subRoleData.name}
              </span>
            )}
          </span>
        </h2>
        <p className="text-muted-foreground">
          Logged in as {username}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Card className="p-2">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">
              {hasSubRole 
                ? `${subRoleData?.permissions.length} permissions` 
                : `${roleData.permissions.length} permissions`}
            </span>
          </div>
        </Card>
        <Button onClick={onLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default RoleHeader;
