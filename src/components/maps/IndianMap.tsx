
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Locate } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface IndianMapProps {
  pickup?: Location;
  destination?: Location;
  onLocationSelect?: (location: Location, type: 'pickup' | 'destination') => void;
}

const IndianMap: React.FC<IndianMapProps> = ({ pickup, destination, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocationType, setSelectedLocationType] = useState<'pickup' | 'destination'>('pickup');
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  // Major Indian cities for demonstration
  const indianCities = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location'
          };
          setCurrentLocation(location);
          if (onLocationSelect) {
            onLocationSelect(location, selectedLocationType);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to Mumbai if location access is denied
          const mumbai = { lat: 19.0760, lng: 72.8777, address: 'Mumbai, India' };
          setCurrentLocation(mumbai);
        }
      );
    }
  };

  const selectCity = (city: { name: string; lat: number; lng: number }) => {
    const location = {
      lat: city.lat,
      lng: city.lng,
      address: `${city.name}, India`
    };
    if (onLocationSelect) {
      onLocationSelect(location, selectedLocationType);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedLocationType === 'pickup' ? 'default' : 'outline'}
              onClick={() => setSelectedLocationType('pickup')}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2 text-green-500" />
              Set Pickup
            </Button>
            <Button
              variant={selectedLocationType === 'destination' ? 'default' : 'outline'}
              onClick={() => setSelectedLocationType('destination')}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2 text-red-500" />
              Set Destination
            </Button>
          </div>

          <div 
            ref={mapRef} 
            className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50"></div>
            <div className="relative z-10 text-center">
              <Navigation className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Interactive Map Area</p>
              <p className="text-xs text-gray-500">Select cities below or use current location</p>
            </div>
            
            {/* Visual representation of locations */}
            {pickup && (
              <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
                <MapPin className="h-4 w-4 text-green-500" />
              </div>
            )}
            {destination && (
              <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg">
                <MapPin className="h-4 w-4 text-red-500" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                onClick={getCurrentLocation}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Locate className="h-4 w-4" />
                Use Current Location
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {indianCities.map((city) => (
                <Button
                  key={city.name}
                  onClick={() => selectCity(city)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {city.name}
                </Button>
              ))}
            </div>
          </div>

          {pickup && destination && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Route Selected</p>
              <p className="text-xs text-blue-600">From: {pickup.address}</p>
              <p className="text-xs text-blue-600">To: {destination.address}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndianMap;
