
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';
import { vehicleTypes, calculateFare, formatCurrency, VehicleType } from '@/utils/fareCalculator';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import LocationInputs from './LocationInputs';
import VehicleSelection from './VehicleSelection';
import PaymentMethodSelector from './PaymentMethodSelector';
import SpecialRequestsSelector from './SpecialRequestsSelector';
import FareBreakdown from './FareBreakdown';
import RideConfirmation from './RideConfirmation';
import RideTrackingView from './RideTrackingView';
import RideScheduling from './RideScheduling';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

const RideBookingApp = () => {
  const [pickup, setPickup] = useState<Location>({ address: '' });
  const [destination, setDestination] = useState<Location>({ address: '' });
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>(vehicleTypes[0]);
  const [currentStep, setCurrentStep] = useState<'booking' | 'confirmation' | 'tracking'>('booking');
  const [currentRide, setCurrentRide] = useState<any>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet' | 'upi'>('cash');
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Get current location with better error handling
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Current location obtained:', position.coords);
          setPickup({
            address: 'Current Location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setError('');
        },
        (error) => {
          console.log('Location access error:', error);
          const errorMessage = error.code === 1 
            ? 'Location access denied. Please enable location services.' 
            : 'Unable to get your location. Please enter pickup location manually.';
          setError(errorMessage);
          toast.error(errorMessage);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    } else {
      const errorMessage = 'Geolocation is not supported by this browser.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  const calculateEstimatedFare = () => {
    if (!pickup.latitude || !destination.latitude) return null;
    
    // Mock distance calculation - in real app, use Google Maps API
    const distance = Math.abs(pickup.latitude - destination.latitude) * 111 + 
                    Math.abs((pickup.longitude || 0) - (destination.longitude || 0)) * 111;
    const timeMinutes = Math.max(10, distance * 3); // Rough estimation
    
    return calculateFare(distance, timeMinutes, selectedVehicle.id, isScheduled);
  };

  const handleBookRide = async () => {
    if (!pickup.address || !destination.address) {
      toast.error('Please enter both pickup and destination locations');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const fare = calculateEstimatedFare();
      
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user.user) {
        toast.error('Please login to book a ride');
        return;
      }

      // Create ride booking
      const rideData = {
        rider_id: user.user.id,
        pickup_address: pickup.address,
        pickup_latitude: pickup.latitude || 0,
        pickup_longitude: pickup.longitude || 0,
        destination_address: destination.address,
        destination_latitude: destination.latitude || 0,
        destination_longitude: destination.longitude || 0,
        vehicle_type: selectedVehicle.id as 'bike' | 'auto' | 'mini' | 'sedan' | 'suv',
        payment_method: paymentMethod as 'cash' | 'card' | 'wallet' | 'upi',
        fare_amount: fare?.total || 0,
        distance_km: fare ? 5.2 : 0,
        special_requests: specialRequests,
        scheduled_time: isScheduled && scheduledTime ? new Date(scheduledTime).toISOString() : null,
        ride_status: 'requested' as const
      };

      const { data: ride, error } = await supabase
        .from('rides')
        .insert([rideData])
        .select()
        .single();

      if (error) {
        console.error('Booking error:', error);
        throw new Error('Failed to book ride. Please try again.');
      }

      setCurrentRide(ride);
      setCurrentStep('confirmation');
      toast.success('Ride booked successfully! Looking for nearby drivers...');
      
      // Simulate driver assignment
      setTimeout(() => {
        setCurrentStep('tracking');
        toast.success('Driver assigned! Your ride is on the way.');
      }, 3000);

    } catch (error: any) {
      console.error('Error booking ride:', error);
      const errorMessage = error.message || 'Failed to book ride. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
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
    return <RideTrackingView pickup={pickup} destination={destination} />;
  }

  if (currentStep === 'confirmation') {
    return (
      <RideConfirmation 
        selectedVehicle={selectedVehicle}
        paymentMethod={paymentMethod}
        fare={fare}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Book Your Ride
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <LocationInputs
            pickup={pickup}
            destination={destination}
            onPickupChange={setPickup}
            onDestinationChange={setDestination}
          />

          <RideScheduling
            isScheduled={isScheduled}
            scheduledTime={scheduledTime}
            onScheduleChange={setIsScheduled}
            onTimeChange={setScheduledTime}
          />

          <VehicleSelection
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
            isScheduled={isScheduled}
          />

          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />

          <SpecialRequestsSelector
            specialRequests={specialRequests}
            onToggleRequest={toggleSpecialRequest}
          />

          {fare && <FareBreakdown fare={fare} />}

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
