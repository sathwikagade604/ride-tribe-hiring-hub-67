
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Navigation, Clock, Star, Phone, Shield, CreditCard, Wallet } from 'lucide-react';
import { vehicleTypes, calculateFare, formatCurrency } from '@/utils/fareCalculator';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

const RideBookingApp = () => {
  const [pickup, setPickup] = useState<Location>({ address: '' });
  const [destination, setDestination] = useState<Location>({ address: '' });
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0]);
  const [currentStep, setCurrentStep] = useState<'booking' | 'confirmation' | 'tracking'>('booking');
  const [currentRide, setCurrentRide] = useState<any>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet' | 'upi'>('cash');
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Current location:', position.coords);
        setPickup({
          address: 'Current Location',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.log('Location access denied:', error);
        toast.error('Please enable location access for better experience');
      }
    );
  }, []);

  const calculateEstimatedFare = () => {
    if (!pickup.latitude || !destination.latitude) return null;
    
    // Mock distance calculation (in real app, use Google Maps API)
    const distance = 5.2; // km
    const timeMinutes = 15;
    
    return calculateFare(distance, timeMinutes, selectedVehicle.id, isScheduled);
  };

  const handleBookRide = async () => {
    if (!pickup.address || !destination.address) {
      toast.error('Please enter pickup and destination locations');
      return;
    }

    setIsLoading(true);
    try {
      const fare = calculateEstimatedFare();
      
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        toast.error('Please login to book a ride');
        return;
      }

      // Create proper point geometries for PostgreSQL
      const pickupPoint = pickup.latitude && pickup.longitude 
        ? `POINT(${pickup.longitude} ${pickup.latitude})`
        : 'POINT(0 0)';
      
      const destinationPoint = destination.latitude && destination.longitude
        ? `POINT(${destination.longitude} ${destination.latitude})`
        : 'POINT(0 0)';

      const rideData = {
        rider_id: user.user.id,
        pickup_address: pickup.address,
        pickup_location: pickupPoint,
        pickup_latitude: pickup.latitude || 0,
        pickup_longitude: pickup.longitude || 0,
        destination_address: destination.address,
        destination_location: destinationPoint,
        destination_latitude: destination.latitude || 0,
        destination_longitude: destination.longitude || 0,
        vehicle_type: selectedVehicle.id as 'bike' | 'auto' | 'mini' | 'sedan' | 'suv',
        payment_method: paymentMethod as 'cash' | 'card' | 'wallet' | 'upi',
        fare_amount: fare?.total || 0,
        distance_km: 5.2,
        special_requests: specialRequests,
        scheduled_time: isScheduled ? new Date(scheduledTime).toISOString() : null,
        ride_status: 'requested' as const
      };

      const { data: ride, error } = await supabase
        .from('rides')
        .insert([rideData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setCurrentRide(ride);
      setCurrentStep('confirmation');
      toast.success('Ride booked successfully! Looking for nearby drivers...');
      
      // Simulate driver assignment after 3 seconds
      setTimeout(() => {
        setCurrentStep('tracking');
        toast.success('Driver assigned! Check ride tracking for updates.');
      }, 3000);

    } catch (error) {
      console.error('Error booking ride:', error);
      toast.error('Failed to book ride. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSpecialRequest = (request: string) => {
    setSpecialRequests(prev => 
      prev.includes(request) 
        ? prev.filter(r => r !== request)
        : [...prev, request]
    );
  };

  const fare = calculateEstimatedFare();

  if (currentStep === 'tracking') {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Live Ride Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Driver Assigned</span>
                <Badge className="bg-green-100 text-green-800">On the way</Badge>
              </div>
              <p className="text-sm text-gray-600">Raj Kumar • ★ 4.8 • DL 01 AB 1234</p>
              <p className="text-sm text-gray-600">Estimated arrival: 5 minutes</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">{pickup.address}</span>
              </div>
              <div className="w-px h-6 bg-gray-300 ml-1.5"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">{destination.address}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Driver
              </Button>
              <Button variant="outline" className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ride Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Navigation className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Looking for nearby drivers...</h3>
              <p className="text-gray-600">We'll notify you once a driver accepts your ride</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Vehicle Type:</span>
                <span className="font-medium">{selectedVehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Fare:</span>
                <span className="font-medium">{fare ? formatCurrency(fare.total) : 'Calculating...'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Book Your Ride
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-600" />
              <Input
                placeholder="Pickup location"
                value={pickup.address}
                onChange={(e) => setPickup({ ...pickup, address: e.target.value })}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-600" />
              <Input
                placeholder="Where to?"
                value={destination.address}
                onChange={(e) => setDestination({ ...destination, address: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          {/* Ride Options */}
          <Tabs defaultValue="now" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="now" onClick={() => setIsScheduled(false)}>
                Ride Now
              </TabsTrigger>
              <TabsTrigger value="schedule" onClick={() => setIsScheduled(true)}>
                Schedule Ride
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule" className="mt-4">
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Vehicle Selection */}
          <div className="space-y-3">
            <h3 className="font-medium">Choose Vehicle Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vehicleTypes.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className={`cursor-pointer transition-colors ${
                    selectedVehicle.id === vehicle.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{vehicle.name}</h4>
                        <p className="text-sm text-gray-600">{vehicle.description}</p>
                        <p className="text-xs text-gray-500">
                          {vehicle.capacity} passengers • {vehicle.estimatedTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {fare ? formatCurrency(calculateFare(5.2, 15, vehicle.id, isScheduled).total) : '₹--'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="font-medium">Payment Method</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'cash', label: 'Cash', icon: '💵' },
                { id: 'card', label: 'Card', icon: '💳' },
                { id: 'wallet', label: 'Wallet', icon: '👛' },
                { id: 'upi', label: 'UPI', icon: '📱' }
              ].map((method) => (
                <Button
                  key={method.id}
                  variant={paymentMethod === method.id ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className="h-12"
                >
                  <span className="mr-2">{method.icon}</span>
                  {method.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-3">
            <h3 className="font-medium">Special Requests (Optional)</h3>
            <div className="flex flex-wrap gap-2">
              {['AC Required', 'Pet Friendly', 'Extra Luggage', 'Wheelchair Accessible'].map((request) => (
                <Badge
                  key={request}
                  variant={specialRequests.includes(request) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleSpecialRequest(request)}
                >
                  {request}
                </Badge>
              ))}
            </div>
          </div>

          {/* Fare Breakdown */}
          {fare && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Fare Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>{formatCurrency(fare.basePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance (5.2 km):</span>
                    <span>{formatCurrency(fare.distanceCharge)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time (15 min):</span>
                    <span>{formatCurrency(fare.timeCharge)}</span>
                  </div>
                  {fare.peakHourSurcharge > 0 && (
                    <div className="flex justify-between text-orange-600">
                      <span>Peak Hour Surcharge:</span>
                      <span>{formatCurrency(fare.peakHourSurcharge)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Platform Fee:</span>
                    <span>{formatCurrency(fare.platformFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>{formatCurrency(fare.taxes)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{formatCurrency(fare.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Book Button */}
          <Button 
            onClick={handleBookRide}
            disabled={!pickup.address || !destination.address || isLoading}
            className="w-full h-12 text-lg"
          >
            {isLoading ? 'Booking...' : `Book ${selectedVehicle.name} - ${fare ? formatCurrency(fare.total) : 'Calculate Fare'}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideBookingApp;
