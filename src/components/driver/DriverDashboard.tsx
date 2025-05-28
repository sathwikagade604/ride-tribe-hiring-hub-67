
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Car, 
  MapPin, 
  Clock, 
  Star, 
  Wallet, 
  Navigation,
  Phone,
  MessageSquare,
  Shield,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface RideRequest {
  id: string;
  pickup: string;
  destination: string;
  distance: string;
  fare: number;
  riderName: string;
  riderRating: number;
  estimatedTime: string;
}

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState<RideRequest | null>(null);
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([
    {
      id: '1',
      pickup: 'Connaught Place, New Delhi',
      destination: 'India Gate, New Delhi',
      distance: '5.2 km',
      fare: 85,
      riderName: 'Rahul Sharma',
      riderRating: 4.8,
      estimatedTime: '15 min'
    },
    {
      id: '2',
      pickup: 'Karol Bagh Metro Station',
      destination: 'Red Fort',
      distance: '8.1 km',
      fare: 120,
      riderName: 'Priya Singh',
      riderRating: 4.9,
      estimatedTime: '22 min'
    }
  ]);

  const todayStats = {
    ridesCompleted: 12,
    earnings: 850,
    onlineTime: '8h 30m',
    rating: 4.7,
    acceptance: 95
  };

  const handleGoOnline = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? 'You are now offline' : 'You are now online and ready to receive rides');
  };

  const acceptRide = (ride: RideRequest) => {
    setCurrentRide(ride);
    setRideRequests(prev => prev.filter(r => r.id !== ride.id));
    toast.success('Ride accepted! Navigate to pickup location');
  };

  const completeRide = () => {
    if (currentRide) {
      toast.success(`Ride completed! You earned ₹${currentRide.fare}`);
      setCurrentRide(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Driver Status
              </CardTitle>
              <CardDescription>
                {isOnline ? 'You are online and ready to receive rides' : 'You are offline'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
              <Switch checked={isOnline} onCheckedChange={handleGoOnline} />
            </div>
          </div>
        </CardHeader>
        {isOnline && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{todayStats.ridesCompleted}</div>
                <div className="text-xs text-muted-foreground">Rides Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹{todayStats.earnings}</div>
                <div className="text-xs text-muted-foreground">Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{todayStats.onlineTime}</div>
                <div className="text-xs text-muted-foreground">Online Time</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold">{todayStats.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Current Ride */}
      {currentRide && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Current Ride</CardTitle>
            <CardDescription>Navigate to pickup location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{currentRide.riderName}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{currentRide.riderRating}</span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">₹{currentRide.fare}</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{currentRide.pickup}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{currentRide.destination}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button onClick={completeRide} className="bg-green-600 hover:bg-green-700">
                  Complete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ride Requests */}
      {isOnline && !currentRide && rideRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ride Requests</CardTitle>
            <CardDescription>New ride requests near you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rideRequests.map((ride) => (
                <div key={ride.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{ride.riderName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{ride.riderRating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">₹{ride.fare}</div>
                      <div className="text-xs text-muted-foreground">{ride.distance}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{ride.pickup}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{ride.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{ride.estimatedTime}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Decline</Button>
                      <Button onClick={() => acceptRide(ride)} size="sm">Accept</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Driver Analytics */}
      <Tabs defaultValue="earnings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Earnings Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{todayStats.earnings}</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">₹5,200</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">₹18,750</div>
                  <div className="text-sm text-muted-foreground">This Month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Acceptance Rate</span>
                    <span className="font-bold">{todayStats.acceptance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${todayStats.acceptance}%` }}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Customer Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{todayStats.rating}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(todayStats.rating / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Weekly Earnings Goal</span>
                    <span>₹5,200 / ₹8,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Rides Completed</span>
                    <span>42 / 60</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverDashboard;
