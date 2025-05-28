
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Download } from 'lucide-react';

const recentRides = [
  {
    id: '1',
    date: '2024-01-15',
    time: '2:30 PM',
    pickup: 'Home',
    destination: 'Office',
    driver: 'Rajesh Kumar',
    vehicle: 'Honda City',
    fare: '₹85',
    status: 'completed',
    rating: 5
  },
  {
    id: '2',
    date: '2024-01-14',
    time: '6:45 PM',
    pickup: 'Office',
    destination: 'Mall',
    driver: 'Amit Singh',
    vehicle: 'Maruti Swift',
    fare: '₹65',
    status: 'completed',
    rating: 4
  },
  {
    id: '3',
    date: '2024-01-13',
    time: '11:15 AM',
    pickup: 'Home',
    destination: 'Airport',
    driver: 'Priya Sharma',
    vehicle: 'Toyota Innova',
    fare: '₹320',
    status: 'completed',
    rating: 5
  }
];

const RideHistory = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Rides
            </CardTitle>
            <CardDescription>Your ride history and receipts</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentRides.map((ride) => (
            <div key={ride.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={ride.status === 'completed' ? 'default' : 'secondary'}>
                    {ride.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{ride.date} • {ride.time}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{ride.fare}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{ride.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span>{ride.pickup}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>{ride.destination}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <div className="text-sm text-muted-foreground">
                  {ride.driver} • {ride.vehicle}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Receipt</Button>
                  <Button size="sm" variant="outline">Rebook</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RideHistory;
