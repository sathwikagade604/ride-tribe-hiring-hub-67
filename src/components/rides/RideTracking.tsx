
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Phone, MessageSquare, Clock, Star, Shield } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Driver {
  name: string;
  photo: string;
  rating: number;
  vehicle: string;
  plateNumber: string;
  phone: string;
}

interface RideTrackingProps {
  rideId: string;
  status: 'searching' | 'driver_assigned' | 'driver_arriving' | 'in_progress' | 'completed';
}

const RideTracking: React.FC<RideTrackingProps> = ({ rideId, status }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [estimatedArrival, setEstimatedArrival] = useState(5);
  
  const driver: Driver = {
    name: 'Rajesh Kumar',
    photo: '/placeholder.svg',
    rating: 4.8,
    vehicle: 'Maruti Swift Dzire',
    plateNumber: 'DL 01 AB 1234',
    phone: '+91 98765 43210'
  };

  const statusSteps = [
    { key: 'searching', label: 'Finding Driver', completed: true },
    { key: 'driver_assigned', label: 'Driver Assigned', completed: currentStatus !== 'searching' },
    { key: 'driver_arriving', label: 'Driver Arriving', completed: ['in_progress', 'completed'].includes(currentStatus) },
    { key: 'in_progress', label: 'Trip Started', completed: currentStatus === 'completed' },
    { key: 'completed', label: 'Trip Completed', completed: currentStatus === 'completed' }
  ];

  useEffect(() => {
    // Simulate ride progress
    const timer = setInterval(() => {
      if (estimatedArrival > 0) {
        setEstimatedArrival(prev => prev - 1);
      }
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [estimatedArrival]);

  const getStatusMessage = () => {
    switch (currentStatus) {
      case 'searching':
        return 'Looking for a driver near you...';
      case 'driver_assigned':
        return `${driver.name} is assigned to your ride`;
      case 'driver_arriving':
        return `${driver.name} is on the way`;
      case 'in_progress':
        return 'Trip in progress';
      case 'completed':
        return 'Trip completed successfully';
      default:
        return 'Unknown status';
    }
  };

  const handleEmergency = () => {
    toast.error('Emergency contacts have been notified!');
  };

  const shareLocation = () => {
    navigator.clipboard.writeText(`Live location: https://maps.google.com/live/${rideId}`);
    toast.success('Live location link copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Status Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-lg font-medium">{getStatusMessage()}</p>
            
            <div className="flex justify-between items-center">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <p className="text-xs mt-1 text-center">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Map */}
      <Card>
        <CardContent className="p-0">
          <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative">
            <div className="text-center">
              <Navigation className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <p className="text-lg font-medium">Live Tracking</p>
              <p className="text-sm text-muted-foreground">Real-time location updates</p>
            </div>
            
            {/* Driver location indicator */}
            {currentStatus !== 'searching' && (
              <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            )}
            
            {/* Destination indicator */}
            <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg">
              <MapPin className="h-4 w-4 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Driver Details */}
      {currentStatus !== 'searching' && (
        <Card>
          <CardHeader>
            <CardTitle>Your Driver</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">{driver.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{driver.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{driver.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                <p className="text-sm font-mono">{driver.plateNumber}</p>
              </div>
              <div className="text-right">
                {currentStatus === 'driver_arriving' && (
                  <div>
                    <p className="text-2xl font-bold text-green-600">{estimatedArrival}</p>
                    <p className="text-xs text-muted-foreground">min away</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trip Details */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-500" />
              <span className="text-sm">Connaught Place, New Delhi</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="text-sm">India Gate, New Delhi</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm text-muted-foreground">Estimated Fare</span>
              <span className="font-semibold">₹85</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Distance</span>
              <span className="font-semibold">5.2 km</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safety & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button onClick={shareLocation} variant="outline" className="w-full">
              Share Live Location
            </Button>
            <Button onClick={handleEmergency} variant="destructive" className="w-full">
              Emergency SOS
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Your safety is our priority. Emergency contacts will be notified if needed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideTracking;
