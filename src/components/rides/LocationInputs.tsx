
import React from 'react';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

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

const LocationInputs: React.FC<LocationInputsProps> = ({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-600" />
        <Input
          placeholder="Pickup location"
          value={pickup.address}
          onChange={(e) => onPickupChange({ ...pickup, address: e.target.value })}
          className="pl-10"
        />
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-600" />
        <Input
          placeholder="Where to?"
          value={destination.address}
          onChange={(e) => onDestinationChange({ ...destination, address: e.target.value })}
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default LocationInputs;
