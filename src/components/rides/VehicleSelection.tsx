
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { vehicleTypes, calculateFare, formatCurrency, VehicleType } from '@/utils/fareCalculator';

interface VehicleSelectionProps {
  selectedVehicle: VehicleType;
  onVehicleSelect: (vehicle: VehicleType) => void;
  isScheduled: boolean;
}

const VehicleSelection: React.FC<VehicleSelectionProps> = ({
  selectedVehicle,
  onVehicleSelect,
  isScheduled,
}) => {
  return (
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
            onClick={() => onVehicleSelect(vehicle)}
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
                    {formatCurrency(calculateFare(5.2, 15, vehicle.id, isScheduled).total)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelection;
