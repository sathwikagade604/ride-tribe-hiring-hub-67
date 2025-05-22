
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, History, User } from 'lucide-react';

// Import the refactored components
import SearchBar from './tracking/SearchBar';
import ActiveRidesTable from './tracking/ActiveRidesTable';
import RideHistoryTable from './tracking/RideHistoryTable';
import UsersTrackingTable from './tracking/UsersTrackingTable';
import { mockActiveRides, mockRideHistory, mockUsers } from './tracking/TrackingData';

const TrackingContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('live');

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
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
              <ActiveRidesTable rides={mockActiveRides} />
            </TabsContent>

            {/* Ride History Tab */}
            <TabsContent value="history" className="border rounded-md p-4">
              <RideHistoryTable rides={mockRideHistory} />
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="border rounded-md p-4">
              <UsersTrackingTable users={mockUsers} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingContent;
