
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
import { MapPin, Car, User } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

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
                {user.type === 'Driver' ? (
                  <span className="flex items-center">
                    <Car className="h-3 w-3 mr-1" /> Driver
                  </span>
                ) : (
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" /> Rider
                  </span>
                )}
              </TableCell>
              <TableCell>{user.currentLocation}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.status === 'On Trip' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
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
