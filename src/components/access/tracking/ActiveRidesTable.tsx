
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

interface Ride {
  id: string;
  driver: string;
  rider: string;
  pickup: string;
  destination: string;
  status: string;
  estimatedTime: string;
}

interface ActiveRidesTableProps {
  rides: Ride[];
}

const ActiveRidesTable: React.FC<ActiveRidesTableProps> = ({ rides }) => {
  const handleTrackRide = (rideId: string) => {
    toast.info(`Tracking ride ${rideId} in detail view`);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Active Rides</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ride ID</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Rider</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>{ride.id}</TableCell>
              <TableCell>{ride.driver}</TableCell>
              <TableCell>{ride.rider}</TableCell>
              <TableCell>{ride.pickup}</TableCell>
              <TableCell>{ride.destination}</TableCell>
              <TableCell>
                <StatusBadge 
                  status={ride.status} 
                  variant={ride.status === 'In Progress' ? 'green' : 'blue'} 
                />
              </TableCell>
              <TableCell>{ride.estimatedTime}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTrackRide(ride.id)}
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

export default ActiveRidesTable;
