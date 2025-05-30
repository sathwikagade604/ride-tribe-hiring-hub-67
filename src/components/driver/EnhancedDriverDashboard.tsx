
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Car, 
  MapPin, 
  Star, 
  TrendingUp, 
  Clock, 
  Phone,
  Navigation,
  Wallet,
  FileText,
  Shield,
  Power,
  ChevronRight
} from 'lucide-react';
import { formatCurrency } from '@/utils/fareCalculator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

interface DriverStats {
  todayEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  totalRides: number;
  rating: number;
  isOnline: boolean;
}

interface RideRequest {
  id: string;
  pickup: string;
  destination: string;
  distance: number;
  fare: number;
  passengerName: string;
  passengerRating: number;
  estimatedTime: string;
}

const EnhancedDriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [stats, setStats] = useState<DriverStats>({
    todayEarnings: 1250,
    weeklyEarnings: 8750,
    monthlyEarnings: 32500,
    totalRides: 342,
    rating: 4.8,
    isOnline: false
  });
  const [activeRide, setActiveRide] = useState<any>(null);
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([
    {
      id: '1',
      pickup: 'Connaught Place Metro Station',
      destination: 'IGI Airport Terminal 3',
      distance: 15.2,
      fare: 285,
      passengerName: 'Priya S.',
      passengerRating: 4.9,
      estimatedTime: '25 min'
    },
    {
      id: '2',
      pickup: 'Saket District Centre',
      destination: 'Cyber Hub, Gurgaon',
      distance: 12.8,
      fare: 245,
      passengerName: 'Amit K.',
      passengerRating: 4.7,
      estimatedTime: '22 min'
    }
  ]);
  const [currentLocation, setCurrentLocation] = useState('Sector 18, Noida');

  useEffect(() => {
    // Simulate real-time location updates
    const interval = setInterval(() => {
      if (isOnline) {
        // Update location in database
        updateDriverLocation();
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isOnline]);

  const updateDriverLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { data: user } = await supabase.auth.getUser();
        if (!user.user) return;

        await supabase
          .from('driver_profiles')
          .update({
            current_latitude: position.coords.latitude,
            current_longitude: position.coords.longitude,
            is_online: isOnline
          })
          .eq('user_id', user.user.id);
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const toggleOnlineStatus = async () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    setStats(prev => ({ ...prev, isOnline: newStatus }));
    
    if (newStatus) {
      toast.success('You are now online and ready to receive ride requests!');
    } else {
      toast.info('You are now offline. You won\'t receive new ride requests.');
    }
    
    await updateDriverLocation();
  };

  const acceptRide = (request: RideRequest) => {
    setActiveRide({
      ...request,
      status: 'accepted',
      acceptedAt: new Date()
    });
    setRideRequests(prev => prev.filter(r => r.id !== request.id));
    toast.success('Ride accepted! Navigate to pickup location.');
  };

  const rejectRide = (requestId: string) => {
    setRideRequests(prev => prev.filter(r => r.id !== requestId));
    toast.info('Ride request declined.');
  };

  const startRide = () => {
    if (activeRide) {
      setActiveRide({ ...activeRide, status: 'in_progress', startedAt: new Date() });
      toast.success('Trip started! Drive safely.');
    }
  };

  const completeRide = () => {
    if (activeRide) {
      setStats(prev => ({
        ...prev,
        todayEarnings: prev.todayEarnings + activeRide.fare,
        totalRides: prev.totalRides + 1
      }));
      setActiveRide(null);
      toast.success(`Trip completed! You earned ${formatCurrency(activeRide.fare)}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Status Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <div>
                <h2 className="text-xl font-semibold">
                  {isOnline ? 'You\'re Online' : 'You\'re Offline'}
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {currentLocation}
                </p>
              </div>
            </div>
            <Button 
              onClick={toggleOnlineStatus}
              variant={isOnline ? 'destructive' : 'default'}
              size="lg"
              className="min-w-[120px]"
            >
              <Power className="h-4 w-4 mr-2" />
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Ride */}
      {activeRide && (
        <Card className="border-blue-500 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Active Ride
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div>
                  <p className="font-medium">{activeRide.passengerName}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{activeRide.passengerRating}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{activeRide.pickup}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300 ml-1.5"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{activeRide.destination}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(activeRide.fare)}
                </p>
                <p className="text-sm text-gray-600">{activeRide.distance} km</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Passenger
              </Button>
              <Button variant="outline" className="flex-1">
                <Navigation className="h-4 w-4 mr-2" />
                Navigate
              </Button>
              {activeRide.status === 'accepted' && (
                <Button onClick={startRide} className="flex-1">
                  Start Trip
                </Button>
              )}
              {activeRide.status === 'in_progress' && (
                <Button onClick={completeRide} className="flex-1">
                  Complete Trip
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ride Requests */}
      {isOnline && rideRequests.length > 0 && !activeRide && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">New Ride Requests</h3>
          {rideRequests.map((request) => (
            <Card key={request.id} className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">{request.passengerName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{request.passengerRating}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{request.pickup}</span>
                      </div>
                      <div className="w-px h-4 bg-gray-300 ml-1.5"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">{request.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(request.fare)}
                    </p>
                    <p className="text-sm text-gray-600">{request.distance} km • {request.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => rejectRide(request.id)}
                    className="flex-1"
                  >
                    Decline
                  </Button>
                  <Button 
                    onClick={() => acceptRide(request)}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Dashboard */}
      <Tabs defaultValue="earnings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="trips">Trips</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-2xl font-bold">{formatCurrency(stats.todayEarnings)}</p>
                  </div>
                  <Wallet className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold">{formatCurrency(stats.weeklyEarnings)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold">{formatCurrency(stats.monthlyEarnings)}</p>
                  </div>
                  <Car className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Trips Completed</span>
                <span className="font-bold">{stats.totalRides}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{stats.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Online Hours Today</span>
                <span className="font-bold">6.5 hours</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { from: 'Connaught Place', to: 'IGI Airport', fare: 285, time: '2 hours ago', rating: 5 },
                  { from: 'Saket', to: 'Gurgaon', fare: 245, time: '4 hours ago', rating: 4 },
                  { from: 'Noida', to: 'Delhi', fare: 180, time: '6 hours ago', rating: 5 }
                ].map((trip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{trip.from} → {trip.to}</p>
                      <p className="text-sm text-gray-600">{trip.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(trip.fare)}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{trip.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Driving License', status: 'verified', expiry: '2026-08-15' },
              { name: 'Vehicle Registration', status: 'verified', expiry: '2025-12-20' },
              { name: 'Insurance Certificate', status: 'pending', expiry: '2025-06-30' },
              { name: 'Background Verification', status: 'verified', expiry: null }
            ].map((doc, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        {doc.expiry && (
                          <p className="text-sm text-gray-600">Expires: {doc.expiry}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'}>
                      {doc.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedDriverDashboard;
