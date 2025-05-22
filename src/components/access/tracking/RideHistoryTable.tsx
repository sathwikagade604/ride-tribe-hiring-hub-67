
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface HistoricalRide {
  id: string;
  driver: string;
  rider: string;
  pickup: string;
  destination: string;
  status: string;
  date: string;
  duration: string;
}

interface RideHistoryTableProps {
  rides: HistoricalRide[];
}

const RideHistoryTable: React.FC<RideHistoryTableProps> = ({ rides }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Ride History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ride ID</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Rider</TableHead>
            <TableHead>Pickup</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
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
                <span className={`px-2 py-1 rounded-full text-xs ${
                  ride.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {ride.status}
                </span>
              </TableCell>
              <TableCell>{ride.date}</TableCell>
              <TableCell>{ride.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RideHistoryTable;
