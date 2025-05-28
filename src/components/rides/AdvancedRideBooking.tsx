
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock,
  Users,
  Package,
  Zap,
  Shield,
  Heart,
  Briefcase
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import IndianMap from '@/components/maps/IndianMap';
import { vehicleTypes, calculateFare, formatCurrency, calculateDistance, calculateEstimatedTime } from '@/utils/fareCalculator';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const AdvancedRideBooking = () => {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [rideType, setRideType] = useState<'now' | 'scheduled' | 'rental'>('now');
  const [scheduleTime, setScheduleTime] = useState('');
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [passengers, setPassengers] = useState(1);

  const specialOptions = [
    { id: 'ac', label: 'Air Conditioning', icon: Zap },
    { id: 'safety', label: 'Safety Priority', icon: Shield },
    { id: 'female', label: 'Female Driver', icon: Heart },
    { id: 'business', label: 'Business Trip', icon: Briefcase },
    { id: 'luggage', label: 'Extra Luggage', icon: Package },
  ];

  const handleLocationSelect = (location: Location, type: 'pickup' | 'destination') => {
    if (type === 'pickup') {
      setPickup(location);
    } else {
      setDestination(location);
    }
  };

  const toggleSpecialRequest = (requestId: string) => {
    setSpecialRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const calculateFareEstimate = () => {
    if (!pickup || !destination || !selectedVehicle) return null;
    
    const distance = calculateDistance(pickup.lat, pickup.lng, destination.lat, destination.lng);
    const estimatedTime = calculateEstimatedTime(distance, selectedVehicle);
    
    return calculateFare(distance, estimatedTime, selectedVehicle, rideType === 'scheduled');
  };

  const fareEstimate = calculateFareEstimate();

  const handleBookRide = () => {
    if (!pickup || !destination || !selectedVehicle) {
      toast.error('Please select pickup, destination, and vehicle type');
      return;
    }

    const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
    const rideTypeText = rideType === 'scheduled' ? 'scheduled' : rideType === 'rental' ? 'rental' : '';
    
    toast.success(
      `${selectedVehicleData?.name} ${rideTypeText} ride booked successfully! ${
        rideType === 'now' ? `Driver will arrive in ${selectedVehicleData?.estimatedTime}` : ''
      }`
    );
  };

  return (
    <div className="space-y-6">
      {/* Ride Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Ride Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={rideType} onValueChange={(value) => setRideType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="now">Ride Now</TabsTrigger>
              <TabsTrigger value="scheduled">Schedule</TabsTrigger>
              <TabsTrigger value="rental">Rental</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Map and Location Selection */}
      <IndianMap 
        pickup={pickup} 
        destination={destination} 
        onLocationSelect={handleLocationSelect} 
      />

      {/* Schedule Time */}
      {rideType === 'scheduled' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Your Ride
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date & Time</label>
                <Input
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Passengers</label>
                <Input
                  type="number"
                  min="1"
                  max="8"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vehicle Selection with Indian Pricing */}
      {pickup && destination && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Ride</CardTitle>
            <CardDescription>Select vehicle type and see fare breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {vehicleTypes.map((vehicle) => {
                const distance = calculateDistance(pickup.lat, pickup.lng, destination.lat, destination.lng);
                const estimatedTime = calculateEstimatedTime(distance, vehicle.id);
                const fare = calculateFare(distance, estimatedTime, vehicle.id, rideType === 'scheduled');
                
                return (
                  <div
                    key={vehicle.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedVehicle === vehicle.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-medium">{vehicle.name}</div>
                          <div className="text-sm text-muted-foreground">{vehicle.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {vehicle.capacity} passengers • {vehicle.estimatedTime} away
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{formatCurrency(fare.total)}</div>
                        <div className="text-xs text-muted-foreground">{distance.toFixed(1)} km</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fare Breakdown */}
      {fareEstimate && (
        <Card>
          <CardHeader>
            <CardTitle>Fare Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>{formatCurrency(fareEstimate.basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Charge</span>
                <span>{formatCurrency(fareEstimate.distanceCharge)}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Charge</span>
                <span>{formatCurrency(fareEstimate.timeCharge)}</span>
              </div>
              {fareEstimate.peakHourSurcharge > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>Peak Hour Surcharge</span>
                  <span>{formatCurrency(fareEstimate.peakHourSurcharge)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>{formatCurrency(fareEstimate.platformFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>{formatCurrency(fareEstimate.taxes)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">{formatCurrency(fareEstimate.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Special Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Special Requests</CardTitle>
          <CardDescription>Add preferences for your ride</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specialOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = specialRequests.includes(option.id);
              
              return (
                <Button
                  key={option.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSpecialRequest(option.id)}
                  className="flex items-center gap-2 h-auto py-3"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-xs">{option.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Book Ride Button */}
      {selectedVehicle && pickup && destination && (
        <Card>
          <CardContent className="pt-6">
            <Button onClick={handleBookRide} className="w-full" size="lg">
              {rideType === 'scheduled' ? 'Schedule Ride' : 
               rideType === 'rental' ? 'Book Rental' : 
               'Book Now'} 
              {fareEstimate && ` - ${formatCurrency(fareEstimate.total)}`}
            </Button>
            <div className="mt-3 text-center">
              <p className="text-sm text-muted-foreground">
                {rideType === 'now' && 'Driver will arrive in 5-10 minutes'}
                {rideType === 'scheduled' && 'You can schedule up to 7 days in advance'}
                {rideType === 'rental' && 'Perfect for multiple stops and long trips'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedRideBooking;
