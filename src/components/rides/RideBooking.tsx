
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Navigation, Calendar, Car, Bike, Truck } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const vehicleTypes = [
  { id: 'bike', name: 'Bike', icon: Bike, price: '₹25', time: '15 min' },
  { id: 'auto', name: 'Auto', icon: Car, price: '₹45', time: '12 min' },
  { id: 'mini', name: 'Mini', icon: Car, price: '₹65', time: '10 min' },
  { id: 'sedan', name: 'Sedan', icon: Car, price: '₹85', time: '8 min' },
  { id: 'suv', name: 'SUV', icon: Truck, price: '₹120', time: '8 min' },
];

const RideBooking = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPickup('Current Location');
        toast.success('Current location detected');
      });
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const handleBookRide = () => {
    if (!pickup || !destination || !selectedVehicle) {
      toast.error('Please fill all required fields');
      return;
    }

    const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
    toast.success(`${selectedVehicleData?.name} booked successfully! Driver will arrive in ${selectedVehicleData?.time}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Book Your Ride
        </CardTitle>
        <CardDescription>Enter pickup and destination to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Inputs */}
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
            <Input
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="pl-10"
            />
            <Button
              size="sm"
              variant="outline"
              className="absolute right-2 top-1.5"
              onClick={handleCurrentLocation}
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-500" />
            <Input
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Schedule Option */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="schedule"
            checked={isScheduled}
            onChange={(e) => setIsScheduled(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="schedule" className="text-sm font-medium">Schedule for later</label>
        </div>

        {isScheduled && (
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Vehicle Selection */}
        {pickup && destination && (
          <div className="space-y-3">
            <h3 className="font-semibold">Choose Vehicle Type</h3>
            <div className="grid grid-cols-1 gap-2">
              {vehicleTypes.map((vehicle) => {
                const IconComponent = vehicle.icon;
                return (
                  <div
                    key={vehicle.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedVehicle === vehicle.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-6 w-6" />
                        <div>
                          <div className="font-medium">{vehicle.name}</div>
                          <div className="text-sm text-muted-foreground">{vehicle.time}</div>
                        </div>
                      </div>
                      <div className="font-semibold">{vehicle.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Book Button */}
        {selectedVehicle && (
          <Button onClick={handleBookRide} className="w-full" size="lg">
            {isScheduled ? 'Schedule Ride' : 'Book Now'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RideBooking;
