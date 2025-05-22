
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import StatusBadge from './StatusBadge';
import UserTypeIcon from './UserTypeIcon';

interface TrackingUser {
  id: string;
  name: string;
  type: string;
  currentLocation: string;
  status: string;
  vehicle?: string;
  lastActivity?: string;
}

interface UsersTrackingTableProps {
  users: TrackingUser[];
}

const UsersTrackingTable: React.FC<UsersTrackingTableProps> = ({ users }) => {
  const handleTrackUser = (userId: string) => {
    toast.info(`Viewing detailed tracking information for user ${userId}`);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Track Users</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Current Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <UserTypeIcon type={user.type} />
              </TableCell>
              <TableCell>{user.currentLocation}</TableCell>
              <TableCell>
                <StatusBadge 
                  status={user.status} 
                  variant={user.status === 'On Trip' ? 'green' : 'gray'}
                />
              </TableCell>
              <TableCell>
                {user.type === 'Driver' ? 
                  `Vehicle: ${user.vehicle}` : 
                  `Last activity: ${user.lastActivity}`}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTrackUser(user.id)}
                >
                  <MapPin className="h-4 w-4 mr-1" /> Track
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTrackingTable;
