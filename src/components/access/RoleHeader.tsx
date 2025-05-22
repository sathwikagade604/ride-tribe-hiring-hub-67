
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';

interface RoleHeaderProps {
  role: RoleKey;
  username: string;
  onLogout: () => void;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({ role, username, onLogout }) => {
  const IconComponent = roleAccessLevels[role].icon;
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold flex items-center">
          <IconComponent className="h-5 w-5 mr-2" />
          <span>
            {roleAccessLevels[role].name} Portal
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
              {roleAccessLevels[role].permissions.length} permissions
            </span>
          </div>
        </Card>
        <Button onClick={onLogout} variant="outline">Logout</Button>
      </div>
    </div>
  );
};

export default RoleHeader;
