
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { MapPin, Car, User, History, Search } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Mock data for rides
const mockActiveRides = [
  { id: 'R1001', driver: 'Amit Kumar', rider: 'Priya Singh', pickup: 'Connaught Place', destination: 'Nehru Place', status: 'In Progress', estimatedTime: '15 mins' },
  { id: 'R1002', driver: 'Rahul Sharma', rider: 'Neha Patel', pickup: 'IGI Airport T3', destination: 'Vasant Kunj', status: 'Just Started', estimatedTime: '28 mins' },
  { id: 'R1003', driver: 'Vikram Singh', rider: 'Anjali Gupta', pickup: 'Saket Metro', destination: 'Cyber Hub', status: 'In Progress', estimatedTime: '22 mins' },
];

const mockRideHistory = [
  { id: 'R0998', driver: 'Sanjay Mehra', rider: 'Karan Shah', pickup: 'Saket', destination: 'Gurgaon', status: 'Completed', date: '2025-05-21', duration: '35 mins' },
  { id: 'R0999', driver: 'Deepak Verma', rider: 'Isha Khanna', pickup: 'Noida Sector 18', destination: 'Greater Kailash', status: 'Completed', date: '2025-05-21', duration: '42 mins' },
  { id: 'R1000', driver: 'Raj Kapoor', rider: 'Maya Reddy', pickup: 'Lajpat Nagar', destination: 'Hauz Khas', status: 'Cancelled', date: '2025-05-22', duration: '0 mins' },
];

// Mock data for users to track
const mockUsers = [
  { id: 'D1001', name: 'Amit Kumar', type: 'Driver', currentLocation: 'Connaught Place', status: 'On Trip', vehicle: 'DL 01 AB 1234' },
  { id: 'D1002', name: 'Rahul Sharma', type: 'Driver', currentLocation: 'IGI Airport', status: 'On Trip', vehicle: 'DL 02 CD 5678' },
  { id: 'R2001', name: 'Priya Singh', type: 'Rider', currentLocation: 'Connaught Place', status: 'On Trip', lastActivity: '15 mins ago' },
  { id: 'R2002', name: 'Neha Patel', type: 'Rider', currentLocation: 'IGI Airport', status: 'On Trip', lastActivity: '5 mins ago' },
];

const TrackingContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('live');

  const handleTrackRide = (rideId: string) => {
    toast.info(`Tracking ride ${rideId} in detail view`);
  };

  const handleTrackUser = (userId: string) => {
    toast.info(`Viewing detailed tracking information for user ${userId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tracking Dashboard</CardTitle>
          <CardDescription>
            Monitor and track rides and riders in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ride ID, driver, or rider name..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>Search</Button>
          </div>

          <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="live">
                <MapPin className="mr-2 h-4 w-4" /> Live Tracking
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" /> Ride History
              </TabsTrigger>
              <TabsTrigger value="users">
                <User className="mr-2 h-4 w-4" /> Users
              </TabsTrigger>
            </TabsList>

            {/* Live Tracking Tab */}
            <TabsContent value="live" className="border rounded-md p-4">
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
                  {mockActiveRides.map((ride) => (
                    <TableRow key={ride.id}>
                      <TableCell>{ride.id}</TableCell>
                      <TableCell>{ride.driver}</TableCell>
                      <TableCell>{ride.rider}</TableCell>
                      <TableCell>{ride.pickup}</TableCell>
                      <TableCell>{ride.destination}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ride.status === 'In Progress' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {ride.status}
                        </span>
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
            </TabsContent>

            {/* Ride History Tab */}
            <TabsContent value="history" className="border rounded-md p-4">
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
                  {mockRideHistory.map((ride) => (
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
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="border rounded-md p-4">
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
                  {mockUsers.map((user) => (
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingContent;
