
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Search } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

interface LocationInputsProps {
  pickup: Location;
  destination: Location;
  onPickupChange: (location: Location) => void;
  onDestinationChange: (location: Location) => void;
}

const popularLocations = [
  'Connaught Place, Delhi',
  'Mumbai Central Station',
  'Brigade Road, Bangalore',
  'Necklace Road, Hyderabad',
  'Park Street, Kolkata',
  'MG Road, Pune',
  'Airport',
  'Railway Station',
  'Bus Stand'
];

const LocationInputs: React.FC<LocationInputsProps> = ({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
}) => {
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onPickupChange({
            address: 'Current Location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          toast.success('Current location set as pickup');
        },
        (error) => {
          toast.error('Unable to get current location');
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const selectSuggestion = (location: string, type: 'pickup' | 'destination') => {
    const locationData = {
      address: location,
      latitude: 28.6139 + Math.random() * 0.1, // Mock coordinates for demo
      longitude: 77.2090 + Math.random() * 0.1
    };
    
    if (type === 'pickup') {
      onPickupChange(locationData);
      setShowPickupSuggestions(false);
    } else {
      onDestinationChange(locationData);
      setShowDestinationSuggestions(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Pickup Location */}
      <div className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-600" />
          <Input
            placeholder="Pickup location"
            value={pickup.address}
            onChange={(e) => {
              onPickupChange({ ...pickup, address: e.target.value });
              setShowPickupSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowPickupSuggestions(pickup.address.length > 0)}
            onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
            className="pl-10 pr-20"
          />
          <Button
            size="sm"
            variant="outline"
            className="absolute right-2 top-1.5 h-7"
            onClick={handleCurrentLocation}
          >
            <Navigation className="h-3 w-3 mr-1" />
            GPS
          </Button>
        </div>
        
        {showPickupSuggestions && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
            {popularLocations
              .filter(loc => loc.toLowerCase().includes(pickup.address.toLowerCase()))
              .map((location, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => selectSuggestion(location, 'pickup')}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  {location}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Destination Location */}
      <div className="relative">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-600" />
          <Input
            placeholder="Where to?"
            value={destination.address}
            onChange={(e) => {
              onDestinationChange({ ...destination, address: e.target.value });
              setShowDestinationSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowDestinationSuggestions(destination.address.length > 0)}
            onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
            className="pl-10"
          />
        </div>
        
        {showDestinationSuggestions && (
          <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
            {popularLocations
              .filter(loc => loc.toLowerCase().includes(destination.address.toLowerCase()))
              .map((location, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => selectSuggestion(location, 'destination')}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  {location}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInputs;
