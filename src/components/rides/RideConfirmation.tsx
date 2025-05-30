
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import { VehicleType, formatCurrency, FareBreakdown } from '@/utils/fareCalculator';

interface RideConfirmationProps {
  selectedVehicle: VehicleType;
  paymentMethod: string;
  fare: FareBreakdown | null;
}

const RideConfirmation: React.FC<RideConfirmationProps> = ({
  selectedVehicle,
  paymentMethod,
  fare,
}) => {
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
};

export default RideConfirmation;
